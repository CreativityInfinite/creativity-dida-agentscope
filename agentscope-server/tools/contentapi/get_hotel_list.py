from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Get

# {
#   "type": "function",
#   "function": {
#     "name": "get_hotel_list",
#     "description": "获取您在特定国家代码下被授权访问的酒店ID列表，返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "countryCode": {
#           "description": "国家代码（如：CN、JP、US等）",
#           "type": "string"
#         },
#         "lastUpdateTime": {
#           "description": "精确到秒的Unix时间戳（不能小于1732982400，即2024-12-01）。如果提供此值，API将仅返回在此时间之后更改的酒店列表",
#           "type": "string"
#         },
#         "language": {
#           "description": "响应的语言，如：en-US、zh-CN、ja-JP等",
#           "type": "string"
#         }
#       },
#       "required": ["countryCode"],
#       "type": "object"
#     }
#   }
# }


def get_hotel_list(countryCode: str, lastUpdateTime: str | None = None, language: str = "en-US") -> ToolResponse:
    """获取您在特定国家代码下被授权访问的酒店ID列表，返回JSON格式的数据。

    Args:
        countryCode (str): 国家代码（如：CN、JP、US等）
        lastUpdateTime (str, optional): 精确到秒的Unix时间戳（不能小于1732982400，即2024-12-01）。
                                       如果提供此值，API将仅返回在此时间之后更改的酒店列表
        language (str): 响应的语言，默认为 en-US
    """

    print(f"查询国家代码 '{countryCode}' 的酒店列表")
    if lastUpdateTime:
        print(f"仅获取 {lastUpdateTime} 之后更新的酒店")

    # 构建请求参数
    params = {
        "countryCode": countryCode,
        "language": language
    }

    # 如果提供了lastUpdateTime参数，则添加到请求中
    if lastUpdateTime:
        params["lastUpdateTime"] = lastUpdateTime

    res = Get("content", '/api/v1/hotel/list', params=params)

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"国家代码 '{countryCode}', 语言 '{language}', 响应数据: {res}",
            ),
        ],
    )
