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
#     "name": "price_confirm",
#     "description": "确认一个酒店报价的有效性，并获取订单参考号（ReferenceNo），该参考号是后续创建订单的必需参数。",
#     "parameters": {
#       "properties": {
#         "search_code": {
#           "description": "来自价格查询API响应中的SearchCode",
#           "type": "string"
#         },
#         "hotel_id": {
#           "description": "酒店ID",
#           "type": "integer"
#         },
#         "rate_plan_id": {
#           "description": "价格计划ID",
#           "type": "string"
#         },
#         "check_in_date": {
#           "description": "入住日期，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "check_out_date": {
#           "description": "离店日期，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "num_of_rooms": {
#           "description": "房间数量",
#           "type": "integer"
#         },
#         "guest_list": {
#           "description": "住客信息列表，按房间分组。格式：[{\"room_num\": 1, \"guest_info\": [{\"name\": {\"first\": \"名字\", \"last\": \"姓氏\"}, \"is_adult\": true, \"age\": 25}]}]",
#           "type": "array"
#         },
#         "currency": {
#           "description": "期望返回价格的货币代码，如：USD、CNY、JPY等，默认为USD",
#           "type": "string"
#         }
#       },
#       "required": ["search_code", "hotel_id", "rate_plan_id", "check_in_date", "check_out_date", "num_of_rooms", "guest_list"],
#       "type": "object"
#     }
#   }
# }


def price_confirm(
    search_code: str,
    hotel_id: int,
    rate_plan_id: str,
    check_in_date: str,
    check_out_date: str,
    num_of_rooms: int,
    guest_list: List[dict],
    currency: str = "USD"
) -> ToolResponse:
    """确认一个酒店报价的有效性，并获取订单参考号（ReferenceNo），该参考号是后续创建订单的必需参数。

    Args:
        search_code (str): 来自价格查询API响应中的SearchCode
        hotel_id (int): 酒店ID
        rate_plan_id (str): 价格计划ID
        check_in_date (str): 入住日期，格式：YYYY-MM-DD
        check_out_date (str): 离店日期，格式：YYYY-MM-DD
        num_of_rooms (int): 房间数量
        guest_list (List[dict]): 住客信息列表，按房间分组
        currency (str): 期望返回价格的货币代码，默认为USD
    """

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

    # 验证房间数量
    if num_of_rooms <= 0:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 房间数量必须大于0",
                ),
            ],
        )

    # 验证住客信息
    if not guest_list or len(guest_list) == 0:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 必须提供住客信息",
                ),
            ],
        )

    print(
        f"价格确认 - 酒店ID: {hotel_id}, 入住: {check_in_date}, 离店: {check_out_date}")
    print(f"SearchCode: {search_code}, RatePlanID: {rate_plan_id}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "SearchCode": search_code,
        "HotelID": hotel_id,
        "RatePlanID": rate_plan_id,
        "CheckInDate": check_in_date,
        "CheckOutDate": check_out_date,
        "NumOfRooms": num_of_rooms,
        "GuestList": [],
        "Currency": currency
    }

    # 转换住客列表格式
    for room_info in guest_list:
        room_data = {
            "RoomNum": room_info.get("room_num", 1),
            "GuestInfo": []
        }

        for guest in room_info.get("guest_info", []):
            guest_data = {
                "Name": {
                    "First": guest.get("name", {}).get("first", ""),
                    "Last": guest.get("name", {}).get("last", "")
                },
                "IsAdult": guest.get("is_adult", True)
            }

            # 如果是儿童，添加年龄
            if not guest.get("is_adult", True) and "age" in guest:
                guest_data["Age"] = guest["age"]

            room_data["GuestInfo"].append(guest_data)

        request_data["GuestList"].append(room_data)

    try:
        # 调用API
        res = Post("booking", '/api/booking/HotelPriceConfirm',
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
        if "Success" in res:
            success_data = res["Success"]
            reference_no = success_data.get("ReferenceNo", "")
            total_price = success_data.get("TotalPrice", 0)
            currency_code = success_data.get("Currency", currency)
            hotel_info = success_data.get("Hotel", {})
            hotel_name = hotel_info.get("HotelName", "")

            result_text = f"价格确认成功!\n"
            result_text += f"订单参考号: {reference_no}\n"
            result_text += f"酒店名称: {hotel_name}\n"
            result_text += f"入住日期: {check_in_date}\n"
            result_text += f"离店日期: {check_out_date}\n"
            result_text += f"总价: {total_price} {currency_code}\n"
            result_text += f"房间数: {num_of_rooms}\n\n"
            result_text += "重要提醒: 订单参考号有效期为10-30分钟，请尽快使用此参考号创建订单！"

            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=result_text,
                    ),
                ],
            )

        elif "Error" in res:
            error_info = res["Error"]
            error_code = error_info.get("Code", "UNKNOWN")
            error_message = error_info.get("Message", "未知错误")

            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=f"价格确认失败: [{error_code}] {error_message}",
                    ),
                ],
            )

        else:
            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text="API响应格式异常，请检查请求参数",
                    ),
                ],
            )

    except Exception as e:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"价格确认过程中发生异常: {str(e)}",
                ),
            ],
        )
