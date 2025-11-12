
import os
from datetime import datetime
from typing import Any, List, Optional

from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Post
from dotenv import load_dotenv

load_dotenv('debug.env')

LicenseKey = os.environ["DIDA_LICENSE_KEY"]
ClientID = os.environ["DIDA_CLIENT_ID"]

# {
#   "type": "function",
#   "function": {
#     "name": "get_lowest_price",
#     "description": "根据目的地城市代码或指定的酒店ID列表，查询酒店在指定日期的最低价格，返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "check_in_date": {
#           "description": "入住日期，格式：YYYY-MM-DD，如：2023-08-26",
#           "type": "string"
#         },
#         "check_out_date": {
#           "description": "离店日期，格式：YYYY-MM-DD，如：2023-08-27",
#           "type": "string"
#         },
#         "city_code": {
#           "description": "目的地城市/区域代码，如：602651。与hotel_ids二选一",
#           "type": "string"
#         },
#         "hotel_ids": {
#           "description": "酒店ID列表，最多支持查询多个酒店。与city_code二选一",
#           "type": "array",
#           "items": {
#             "type": "integer"
#           }
#         },
#         "nationality": {
#           "description": "客人国籍，使用ISO 3166-1 alpha-2标准（2个字母），默认为CN",
#           "type": "string"
#         },
#         "currency": {
#           "description": "期望返回价格的币种，如：CNY、USD、JPY等",
#           "type": "string"
#         }
#       },
#       "required": ["check_in_date", "check_out_date", "currency"],
#       "type": "object"
#     }
#   }
# }


def get_lowest_price(
    check_in_date: str,
    check_out_date: str,
    currency: str,
    city_code: Optional[str] = None,
    hotel_ids: Optional[list[int]] = None,
    nationality: str = "CN"
) -> ToolResponse:
    """根据目的地城市代码或指定的酒店ID列表，查询酒店在指定日期的最低价格，返回JSON格式的数据。

    Args:
        check_in_date (str): 入住日期，格式：YYYY-MM-DD，如：2023-08-26
        check_out_date (str): 离店日期，格式：YYYY-MM-DD，如：2023-08-27
        currency (str): 期望返回价格的币种，如：CNY、USD、JPY等
        city_code (str, optional): 目的地城市/区域代码，如：602651。与hotel_ids二选一
        hotel_ids (List[int], optional): 酒店ID列表，最多支持查询多个酒店。与city_code二选一
        nationality (str): 客人国籍，使用ISO 3166-1 alpha-2标准（2个字母），默认为CN
    """

    # 参数验证
    if not city_code and not hotel_ids:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 必须提供city_code或hotel_ids中的一个参数",
                ),
            ],
        )

    if city_code and hotel_ids:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: city_code和hotel_ids不能同时提供，请选择其中一个",
                ),
            ],
        )

    # 验证日期格式
    try:
        datetime.strptime(check_in_date, "%Y-%m-%d")
        datetime.strptime(check_out_date, "%Y-%m-%d")
    except ValueError:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 日期格式不正确，请使用YYYY-MM-DD格式",
                ),
            ],
        )

    # 验证入住日期不能晚于离店日期
    if check_in_date >= check_out_date:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 入住日期必须早于离店日期",
                ),
            ],
        )

    print(
        f"查询最低价格 - 入住: {check_in_date}, 离店: {check_out_date}, 币种: {currency}")
    if city_code:
        print(f"查询目的地: {city_code}")
    if hotel_ids:
        print(f"查询酒店ID: {hotel_ids}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "CheckInDate": check_in_date,
        "CheckOutDate": check_out_date,
        "LowestPriceOnly": True,  # 必须设置为true，表示只返回最低价
        "Nationality": nationality,
        "Currency": currency
    }

    # 添加目的地或酒店ID参数
    if city_code:
        request_data["Destination"] = {
            "CityCode": city_code
        }
    elif hotel_ids:
        request_data["HotelIDList"] = hotel_ids

    try:
        # 调用API
        res = Post("booking", '/api/rate/pricesearch',
                   params={"$format": "json"}, data=request_data)

        if res is None:
            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text="API请求失败，请检查网络连接和参数设置",
                    ),
                ],
            )

        # 检查响应是否包含成功数据
        if "Success" not in res:
            error_msg = "API响应中未找到Success字段"
            if "Error" in res:
                error_msg = f"API返回错误: {res['Error']}"

            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=f"查询失败: {error_msg}",
                    ),
                ],
            )

        # 提取有用信息进行格式化显示
        success_data = res["Success"]
        price_details = success_data.get("PriceDetails", {})
        hotel_list = price_details.get("HotelList", [])

        if not hotel_list:
            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=f"未找到符合条件的酒店价格信息。入住: {check_in_date}, 离店: {check_out_date}",
                    ),
                ],
            )

        # 格式化显示结果
        result_summary = f"最低价格查询结果 (入住: {check_in_date}, 离店: {check_out_date}):\n"
        result_summary += f"找到 {len(hotel_list)} 家酒店的价格信息\n\n"

        for i, hotel in enumerate(hotel_list[:10], 1):  # 只显示前10家酒店
            hotel_name = hotel.get("HotelName", "未知酒店")
            hotel_id = hotel.get("HotelID", "未知")
            lowest_price = hotel.get("LowestPrice", {})
            price_value = lowest_price.get("Value", "N/A")
            price_currency = lowest_price.get("Currency", currency)

            result_summary += f"{i}. {hotel_name} (ID: {hotel_id})\n"
            result_summary += f"   最低价格: {price_value} {price_currency}\n"

            # 显示房型信息
            rate_plan_info = hotel.get("LowestRateRatePlanInfo", {})
            if rate_plan_info:
                plan_name = rate_plan_info.get("RatePlanName", "未知房型")
                result_summary += f"   房型: {plan_name}\n"

            result_summary += "\n"

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"{result_summary}原始响应数据: {res}",
                ),
            ],
        )

    except Exception as e:
        error_msg = f"查询最低价格时发生错误: {str(e)}"
        print(error_msg)

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=error_msg,
                ),
            ],
        )
