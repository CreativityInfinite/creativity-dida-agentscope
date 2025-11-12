import os
from typing import Any, Optional

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
#     "name": "booking_cancel_confirm",
#     "description": "订单取消确认接口，用取消确认ID做最后的取消确认。此接口真正完成订单取消操作。",
#     "parameters": {
#       "properties": {
#         "booking_id": {
#           "description": "道旅订单号",
#           "type": "string"
#         },
#         "confirm_id": {
#           "description": "取消确认号，来自预取消接口，有效期10分钟",
#           "type": "string"
#         },
#         "description": {
#           "description": "客户备注，可以填取消原因等信息（可选）",
#           "type": "string"
#         }
#       },
#       "required": ["booking_id", "confirm_id"],
#       "type": "object"
#     }
#   }
# }


def booking_cancel_confirm(
    booking_id: str,
    confirm_id: str,
    description: Optional[str] = None
) -> ToolResponse:
    """订单取消确认接口，用取消确认ID做最后的取消确认。此接口真正完成订单取消操作。

    Args:
        booking_id (str): 道旅订单号
        confirm_id (str): 取消确认号，来自预取消接口，有效期10分钟
        description (str, optional): 客户备注，可以填取消原因等信息
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

    if not confirm_id or confirm_id.strip() == "":
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 必须提供取消确认号",
                ),
            ],
        )

    print(f"取消确认订单 - 订单号: {booking_id}, 确认号: {confirm_id}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "BookingID": booking_id,
        "ConfirmID": confirm_id
    }

    # 添加描述信息（如果提供）
    if description:
        request_data["Description"] = description

    try:
        # 调用API
        res: dict[str, Any] | None = Post("booking", '/api/booking/HotelBookingCancelConfirm',
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
            result_text = f"✅ 订单取消成功!\n"
            result_text += f"订单号: {booking_id}\n"
            result_text += f"确认号: {confirm_id}\n"

            if description:
                result_text += f"取消备注: {description}\n"

            result_text += "\n订单已成功取消，相关费用将按照取消政策处理。"

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

            error_text = f"❌ 订单取消失败: [{error_code}] {error_message}\n"

            # 根据常见错误提供解决建议
            if "expired" in error_message.lower() or "invalid" in error_message.lower():
                error_text += "\n💡 可能的解决方案:\n"
                error_text += "1. 取消确认号可能已过期（有效期10分钟）\n"
                error_text += "2. 请重新调用'预取消'接口获取新的确认号\n"
                error_text += "3. 确认订单号和确认号是否正确"
            elif "already" in error_message.lower() and "cancel" in error_message.lower():
                error_text += "\n💡 订单可能已经被取消，请通过订单查询接口确认订单状态"

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
                    text=f"订单取消确认过程中发生异常: {str(e)}",
                ),
            ],
        )
