from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Post

# {
#   "type": "function",
#   "function": {
#     "name": "get_hotel_details",
#     "description": "根据酒店ID列表获取酒店详细信息（包括基本信息、政策、设施等），返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "hotelIds": {
#           "description": "酒店ID列表，最多支持50个ID",
#           "type": "array",
#           "items": {
#             "type": "integer"
#           }
#         },
#         "language": {
#           "description": "返回内容的语言代码，如：en-US、zh-CN、ja-JP等",
#           "type": "string"
#         }
#       },
#       "required": ["hotelIds"],
#       "type": "object"
#     }
#   }
# }


def get_hotel_details(hotelIds: list[int], language: str = "en-US") -> ToolResponse:
    """根据酒店ID列表获取酒店详细信息（包括基本信息、政策、设施等），返回JSON格式的数据。

    Args:
        hotelIds (List[int]): 酒店ID列表，最多支持50个ID
        language (str): 返回内容的语言代码，默认为 en-US
    """

    print(f"查询酒店详情，酒店ID: {hotelIds}, 语言: '{language}'")

    # 验证酒店ID数量限制
    if len(hotelIds) > 50:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 酒店ID列表最多支持50个ID，当前提供了 {} 个ID".format(
                        len(hotelIds)),
                ),
            ],
        )

    # 验证酒店ID格式
    if not all(isinstance(hotel_id, int) and hotel_id > 0 for hotel_id in hotelIds):
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text="错误: 酒店ID必须为正整数",
                ),
            ],
        )

    # 构建请求数据
    request_data = {
        "language": language,
        "hotelIds": hotelIds
    }

    res = Post('/api/v1/hotel/details', params={}, data=request_data)

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"查询酒店详情，酒店ID: {hotelIds}, 语言: '{language}', 响应数据: {res}",
            ),
        ],
    )
