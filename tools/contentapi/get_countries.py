import asyncio
import inspect
import json
import agentscope

from pydantic import BaseModel, Field
from agentscope.message import TextBlock, ToolUseBlock
from agentscope.tool import ToolResponse, Toolkit, execute_python_code
from utils.request import Get, Post

# {
#   "type": "function",
#   "function": {
#     "name": "get_countries",
#     "description": "此API用于检索DIDA平台支持的的全部国家列表，返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "language": {
#           "description": "目前支持的语言包括：zh-CN、ja-JP、ko-KR、pt-BR、es-ES、id-ID",
#           "type": "string"
#         }
#       },
#       "required": ["language"],
#       "type": "object"
#     }
#   }
# }


def get_countries(language: str) -> ToolResponse:
    """此API用于检索DIDA平台支持的的全部国家列表，返回JSON格式的数据。

    Args:
        language (str):
            目前支持的语言包括：zh-CN、ja-JP、ko-KR、pt-BR、es-ES、id-ID
    """

    print(f"当前语言 '{language}'")

    res = Get("content", '/api/v1/region/countries',
              params={"language": language})

    # 格式化数据为字符串
    result_summary: str = f"当前语言 '{language}', 响应数据: \n\n"

    # 检查响应数据结构
    if res and "data" in res:
        # 格式 {'code': 'ZM', 'name': '赞比亚'}
        for i, country in enumerate(res["data"]):
            if isinstance(country, dict) and "code" in country and "name" in country:
                result_summary += f"{i+1}: {country['code']}, {country['name']}\n"
            else:
                result_summary += f"{i+1}: {country}\n"
    else:
        result_summary += f"API响应格式异常: {res}"

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"{result_summary}",
            ),
        ],
    )
