import os
from datetime import datetime
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
#     "name": "booking_search",
#     "description": "根据订单号、客户参考号、入住日期等条件查询订单信息。",
#     "parameters": {
#       "properties": {
#         "booking_id": {
#           "description": "道旅订单号（推荐使用，查询最精确）",
#           "type": "string"
#         },
#         "client_reference": {
#           "description": "客户订单号（推荐使用）",
#           "type": "string"
#         },
#         "check_in_date_from": {
#           "description": "入住日期范围开始，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "check_in_date_to": {
#           "description": "入住日期范围结束，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "check_out_date_from": {
#           "description": "离店日期范围开始，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "check_out_date_to": {
#           "description": "离店日期范围结束，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "book_date_from": {
#           "description": "订单创建日期范围开始，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "book_date_to": {
#           "description": "订单创建日期范围结束，格式：YYYY-MM-DD",
#           "type": "string"
#         },
#         "guest_first_name": {
#           "description": "客人名字",
#           "type": "string"
#         },
#         "guest_last_name": {
#           "description": "客人姓氏",
#           "type": "string"
#         },
#         "contact_first_name": {
#           "description": "联系人名字",
#           "type": "string"
#         },
#         "contact_last_name": {
#           "description": "联系人姓氏",
#           "type": "string"
#         },
#         "status": {
#           "description": "订单状态：0=PreBook, 2=Confirmed, 3=Canceled, 4=Failed, 5=Pending, 6=OnRequest",
#           "type": "integer"
#         },
#         "city_code": {
#           "description": "城市代码",
#           "type": "string"
#         }
#       },
#       "required": [],
#       "type": "object"
#     }
#   }
# }


def booking_search(
    booking_id: Optional[str] = None,
    client_reference: Optional[str] = None,
    check_in_date_from: Optional[str] = None,
    check_in_date_to: Optional[str] = None,
    check_out_date_from: Optional[str] = None,
    check_out_date_to: Optional[str] = None,
    book_date_from: Optional[str] = None,
    book_date_to: Optional[str] = None,
    guest_first_name: Optional[str] = None,
    guest_last_name: Optional[str] = None,
    contact_first_name: Optional[str] = None,
    contact_last_name: Optional[str] = None,
    status: Optional[int] = None,
    city_code: Optional[str] = None
) -> ToolResponse:
    """根据订单号、客户参考号、入住日期等条件查询订单信息。

    Args:
        booking_id (str, optional): 道旅订单号（推荐使用，查询最精确）
        client_reference (str, optional): 客户订单号（推荐使用）
        check_in_date_from (str, optional): 入住日期范围开始，格式：YYYY-MM-DD
        check_in_date_to (str, optional): 入住日期范围结束，格式：YYYY-MM-DD
        check_out_date_from (str, optional): 离店日期范围开始，格式：YYYY-MM-DD
        check_out_date_to (str, optional): 离店日期范围结束，格式：YYYY-MM-DD
        book_date_from (str, optional): 订单创建日期范围开始，格式：YYYY-MM-DD
        book_date_to (str, optional): 订单创建日期范围结束，格式：YYYY-MM-DD
        guest_first_name (str, optional): 客人名字
        guest_last_name (str, optional): 客人姓氏
        contact_first_name (str, optional): 联系人名字
        contact_last_name (str, optional): 联系人姓氏
        status (int, optional): 订单状态：0=PreBook, 2=Confirmed, 3=Canceled, 4=Failed, 5=Pending, 6=OnRequest
        city_code (str, optional): 城市代码
    """

    # 验证至少提供一个查询条件
    if not any([booking_id, client_reference, check_in_date_from, check_out_date_from,
                book_date_from, guest_first_name, guest_last_name, contact_first_name,
                contact_last_name, status, city_code]):
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 必须提供至少一个查询条件",
                ),
            ],
        )

    # 验证日期格式
    date_fields = [
        (check_in_date_from, "入住日期开始"),
        (check_in_date_to, "入住日期结束"),
        (check_out_date_from, "离店日期开始"),
        (check_out_date_to, "离店日期结束"),
        (book_date_from, "订单创建日期开始"),
        (book_date_to, "订单创建日期结束")
    ]

    for date_value, field_name in date_fields:
        if date_value:
            try:
                datetime.strptime(date_value, "%Y-%m-%d")
            except ValueError:
                return ToolResponse(
                    content=[
                        TextBlock(
                            type="text",
                            text=f"错误: {field_name}格式不正确，请使用YYYY-MM-DD格式",
                        ),
                    ],
                )

    print(f"查询订单")
    if booking_id:
        print(f"道旅订单号: {booking_id}")
    if client_reference:
        print(f"客户订单号: {client_reference}")

    # 构建请求数据
    request_data: Any = {
        "Header": {
            "ClientID": ClientID,
            "LicenseKey": LicenseKey
        },
        "SearchBy": {}
    }

    # 如果提供了道旅订单号，优先使用（最精确的查询方式）
    if booking_id:
        request_data["SearchBy"]["BookingID"] = booking_id
    else:
        # 构建其他查询条件
        booking_info = {}

        if client_reference:
            booking_info["ClientReference"] = client_reference

        if check_in_date_from or check_in_date_to:
            check_in_range = {}
            if check_in_date_from:
                check_in_range["from"] = check_in_date_from
            if check_in_date_to:
                check_in_range["to"] = check_in_date_to
            booking_info["CheckInDateRange"] = check_in_range

        if check_out_date_from or check_out_date_to:
            check_out_range = {}
            if check_out_date_from:
                check_out_range["from"] = check_out_date_from
            if check_out_date_to:
                check_out_range["to"] = check_out_date_to
            booking_info["CheckOutDateRange"] = check_out_range

        if book_date_from or book_date_to:
            book_date_range = {}
            if book_date_from:
                book_date_range["from"] = book_date_from
            if book_date_to:
                book_date_range["to"] = book_date_to
            booking_info["BookDateRange"] = book_date_range

        if guest_first_name or guest_last_name:
            guest_name = {}
            if guest_first_name:
                guest_name["First"] = guest_first_name
            if guest_last_name:
                guest_name["Last"] = guest_last_name
            booking_info["GuestName"] = guest_name

        if contact_first_name or contact_last_name:
            contact_name = {}
            if contact_first_name:
                contact_name["First"] = contact_first_name
            if contact_last_name:
                contact_name["Last"] = contact_last_name
            booking_info["ContactName"] = contact_name

        if status is not None:
            booking_info["Status"] = status

        if city_code:
            booking_info["CityCode"] = city_code

        if booking_info:
            request_data["SearchBy"]["BookingInfo"] = booking_info

    try:
        # 调用API
        res = Post("booking", '/api/booking/HotelBookingSearch',
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
            booking_list = success_data.get("BookingDetailsList", [])

            if not booking_list:
                return ToolResponse(
                    content=[
                        TextBlock(
                            type="text",
                            text="未找到符合条件的订单信息",
                        ),
                    ],
                )

            # 状态映射
            status_map = {
                0: "PreBook（预订）",
                2: "Confirmed（已确认）",
                3: "Canceled（已取消）",
                4: "Failed（失败）",
                5: "Pending（处理中）",
                6: "OnRequest（申请中）"
            }

            result_text = f"找到 {len(booking_list)} 个订单:\n\n"

            for i, booking in enumerate(booking_list, 1):
                booking_id_result = booking.get("BookingID", "")
                status_result = booking.get("Status", -1)
                check_in = booking.get("CheckInDate", "").split()[
                    0] if booking.get("CheckInDate") else ""
                check_out = booking.get("CheckOutDate", "").split()[
                    0] if booking.get("CheckOutDate") else ""
                order_date = booking.get("OrderDate", "").split()[
                    0] if booking.get("OrderDate") else ""
                num_rooms = booking.get("NumOfRooms", 0)
                total_price = booking.get("TotalPrice", 0)
                client_ref = booking.get("ClientReference", "")
                confirmation_code = booking.get("ConfirmationCode", "")

                hotel = booking.get("Hotel", {})
                hotel_name = hotel.get("HotelName", "")
                hotel_id = hotel.get("HotelID", "")

                contact = booking.get("Contact", {})
                contact_name = contact.get("Name", {})
                contact_first = contact_name.get("First", "")
                contact_last = contact_name.get("Last", "")
                contact_phone = contact.get("Phone", "")
                contact_email = contact.get("Email", "")

                status_text = status_map.get(
                    status_result, f"未知状态({status_result})")

                result_text += f"=== 订单 {i} ===\n"
                result_text += f"道旅订单号: {booking_id_result}\n"
                result_text += f"订单状态: {status_text}\n"

                if client_ref:
                    result_text += f"客户订单号: {client_ref}\n"

                if confirmation_code:
                    result_text += f"酒店确认号: {confirmation_code}\n"

                result_text += f"酒店名称: {hotel_name} (ID: {hotel_id})\n"
                result_text += f"入住日期: {check_in}\n"
                result_text += f"离店日期: {check_out}\n"
                result_text += f"订单创建: {order_date}\n"
                result_text += f"房间数: {num_rooms}\n"
                result_text += f"总价: {total_price}\n"

                if contact_first or contact_last:
                    result_text += f"联系人: {contact_first} {contact_last}\n"
                if contact_phone:
                    result_text += f"联系电话: {contact_phone}\n"
                if contact_email:
                    result_text += f"联系邮箱: {contact_email}\n"

                result_text += "\n"

            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=result_text.rstrip(),
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
                        text=f"订单查询失败: [{error_code}] {error_message}",
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
                    text=f"订单查询过程中发生异常: {str(e)}",
                ),
            ],
        )
