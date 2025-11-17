from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Get


def get_destinations(countryCode: str, language: str = "en-US") -> ToolResponse:
    """此API用于检索特定国家的目的地列表。

    Args:
        countryCode (str):
            国家代码
        language (str):
            响应的语言，默认为 en-US
    """

    print(f"查询国家代码 '{countryCode}' 的目的地，语言: '{language}'")

    res = Get("content", '/api/v1/region/destinations',
              params={"countryCode": countryCode, "language": language})

    # 仅保留前十个目的地
    limit = 10
    res["data"] = res["data"][:limit]
    print(f"响应数据: {res}")

    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"国家代码 '{countryCode}', 语言 '{language}', 当前限制返回目的地数量 {len(res['data'])}, 响应数据: {res}",
            ),
        ],
    )
