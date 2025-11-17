from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Get

# {
#   "type": "function",
#   "function": {
#     "name": "get_meal_types",
#     "description": "获取所有API接口中可能返回的用餐类型（餐型）名称及对应代码，返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "language": {
#           "description": "指定返回内容的语言，如：zh-CN、en-US、ja-JP等，缺省时可能回退至英文",
#           "type": "string"
#         }
#       },
#       "required": [],
#       "type": "object"
#     }
#   }
# }


def get_meal_types(language: str = "zh-CN") -> ToolResponse:
    """获取所有API接口中可能返回的用餐类型（餐型）名称及对应代码，返回JSON格式的数据。

    Args:
        language (str): 指定返回内容的语言，默认为 zh-CN
    """

    print(f"查询用餐类型（餐型）数据字典，语言: '{language}'")

    res = Get("content", '/api/v1/dictionary/meal-types',
              params={"language": language})

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"用餐类型（餐型）数据字典，语言: '{language}', 响应数据: {res}",
            ),
        ],
    )
