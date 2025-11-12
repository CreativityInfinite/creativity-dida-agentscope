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

    res = Get('/api/v1/region/countries', params={"language": language})

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"当前语言 '{language}', 响应数据: {res}",
            ),
        ],
    )
