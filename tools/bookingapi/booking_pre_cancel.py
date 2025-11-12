import os
from typing import Any

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
#     "name": "booking_pre_cancel",
#     "description": "预取消订单。接口将返回取消金额以及取消确认ID。注意：这是预取消，只调用这个API不足以真正取消订单，需要配合取消确认API使用。",
#     "parameters": {
#       "properties": {
#         "booking_id": {
#           "description": "道旅订单号",
#           "type": "string"
#         }
#       },
#       "required": ["booking_id"],
#       "type": "object"
#     }
#   }
# }


def booking_pre_cancel(booking_id: str) -> ToolResponse:
    """预取消订单。接口将返回取消金额以及取消确认ID。注意：这是预取消，只调用这个API不足以真正取消订单，需要配合取消确认API使用。

    Args:
        booking_id (str): 道旅订单号
    """

    if not booking_id or booking_id.strip() == "":
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 必须提供道旅订单号",
                ),
            ],
        )

    print(f"预取消订单 - 订单号: {booking_id}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "BookingID": booking_id
    }

    try:
        # 调用API
        res = Post("booking", '/api/booking/HotelBookingCancel',
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

            booking_id_result = success_data.get("BookingID", "")
            confirm_id = success_data.get("ConfirmID", "")
            currency = success_data.get("Currency", "")
            amount = success_data.get("Amount", 0)

            result_text = f"预取消成功!\n"
            result_text += f"道旅订单号: {booking_id_result}\n"
            result_text += f"取消确认号: {confirm_id}\n"
            result_text += f"取消罚金: {amount} {currency}\n\n"
            result_text += "⚠️ 重要提醒:\n"
            result_text += "1. 这是预取消，订单尚未真正取消\n"
            result_text += "2. 取消确认号有效期仅10分钟\n"
            result_text += "3. 如需真正取消订单，请在10分钟内使用取消确认号调用'订单取消确认'接口\n"
            result_text += "4. 如超过10分钟未确认，需重新调用此预取消接口获取新的确认号"

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
            error_booking_id = error_info.get("BookingID", "")

            error_text = f"预取消失败: [{error_code}] {error_message}"
            if error_booking_id:
                error_text += f"\n相关订单号: {error_booking_id}"

            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=error_text,
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
                    text=f"预取消过程中发生异常: {str(e)}",
                ),
            ],
        )
