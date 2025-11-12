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
#     "name": "booking_confirm",
#     "description": "创建酒店预订订单。在调用此接口前，必须先从价格确认接口获取有效的订单参考号（ReferenceNo）。",
#     "parameters": {
#       "properties": {
#         "reference_no": {
#           "description": "从价格确认接口返回的参考号",
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
#           "description": "住客信息列表，按房间分组。格式：[{\"room_num\": 1, \"guest_info\": [{\"name\": {\"first\": \"名字\", \"last\": \"姓氏\"}, \"is_adult\": true, \"age\": 25, \"gender\": \"M\"}]}]",
#           "type": "array"
#         },
#         "contact": {
#           "description": "联系人信息。格式：{\"name\": {\"first\": \"名字\", \"last\": \"姓氏\"}, \"email\": \"邮箱\", \"phone\": \"电话\"}",
#           "type": "object"
#         },
#         "client_reference": {
#           "description": "您系统内的订单号（可选），需保证唯一性",
#           "type": "string"
#         },
#         "customer_request": {
#           "description": "特殊需求（可选），酒店会尽力满足但不保证",
#           "type": "string"
#         }
#       },
#       "required": ["reference_no", "check_in_date", "check_out_date", "num_of_rooms", "guest_list", "contact"],
#       "type": "object"
#     }
#   }
# }


def booking_confirm(
    reference_no: str,
    check_in_date: str,
    check_out_date: str,
    num_of_rooms: int,
    guest_list: List[dict],
    contact: dict,
    client_reference: Optional[str] = None,
    customer_request: Optional[str] = None
) -> ToolResponse:
    """创建酒店预订订单。在调用此接口前，必须先从价格确认接口获取有效的订单参考号（ReferenceNo）。

    Args:
        reference_no (str): 从价格确认接口返回的参考号
        check_in_date (str): 入住日期，格式：YYYY-MM-DD
        check_out_date (str): 离店日期，格式：YYYY-MM-DD
        num_of_rooms (int): 房间数量
        guest_list (List[dict]): 住客信息列表，按房间分组
        contact (dict): 联系人信息
        client_reference (str, optional): 您系统内的订单号，需保证唯一性
        customer_request (str, optional): 特殊需求，酒店会尽力满足但不保证
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

    # 验证联系人信息
    if not contact or "name" not in contact or "email" not in contact or "phone" not in contact:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 联系人信息必须包含姓名、邮箱和电话",
                ),
            ],
        )

    print(f"创建预订订单 - 参考号: {reference_no}")
    print(f"入住: {check_in_date}, 离店: {check_out_date}, 房间数: {num_of_rooms}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "ReferenceNo": reference_no,
        "CheckInDate": check_in_date,
        "CheckOutDate": check_out_date,
        "NumOfRooms": num_of_rooms,
        "GuestList": [],
        "Contact": {
            "Name": {
                "First": contact.get("name", {}).get("first", ""),
                "Last": contact.get("name", {}).get("last", "")
            },
            "Email": contact.get("email", ""),
            "Phone": contact.get("phone", "")
        }
    }

    # 添加客户订单号（如果提供）
    if client_reference:
        request_data["ClientReference"] = client_reference

    # 添加特殊需求（如果提供）
    if customer_request:
        request_data["CustomerRequest"] = customer_request

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

            # 添加性别（如果提供）
            if "gender" in guest:
                guest_data["Gender"] = guest["gender"]

            room_data["GuestInfo"].append(guest_data)

        request_data["GuestList"].append(room_data)

    try:
        # 调用API
        res = Post("booking", '/api/booking/HotelBookingConfirm',
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
            booking_details = success_data.get("BookingDetails", {})

            booking_id = booking_details.get("BookingID", "")
            status = booking_details.get("Status", -1)
            confirmation_code = booking_details.get("ConfirmationCode", "")
            total_price = booking_details.get("TotalPrice", 0)
            client_ref = booking_details.get("ClientReference", "")

            # 状态映射
            status_map = {
                0: "PreBook（预订）",
                2: "Confirmed（已确认）",
                3: "Canceled（已取消）",
                4: "Failed（失败）",
                5: "Pending（处理中）",
                6: "OnRequest（申请中）"
            }

            status_text = status_map.get(status, f"未知状态({status})")

            result_text = f"预订订单创建成功!\n"
            result_text += f"道旅订单号: {booking_id}\n"
            result_text += f"订单状态: {status_text}\n"

            if confirmation_code:
                result_text += f"酒店确认号: {confirmation_code}\n"
            else:
                result_text += "酒店确认号: 暂未返回（建议入住前3天通过订单查询接口查询）\n"

            result_text += f"入住日期: {check_in_date}\n"
            result_text += f"离店日期: {check_out_date}\n"
            result_text += f"总价: {total_price}\n"

            if client_ref:
                result_text += f"客户订单号: {client_ref}\n"

            # 根据状态提供相应提示
            if status in [2]:
                result_text += "\n✅ 订单已确认，预订成功！"
            elif status in [5, 6]:
                result_text += f"\n⏳ 订单正在处理中，请稍后通过订单查询接口查询最终状态"
            elif status in [3, 4]:
                result_text += "\n❌ 订单创建失败或已取消"

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
                        text=f"预订订单创建失败: [{error_code}] {error_message}",
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
                    text=f"预订订单创建过程中发生异常: {str(e)}",
                ),
            ],
        )
