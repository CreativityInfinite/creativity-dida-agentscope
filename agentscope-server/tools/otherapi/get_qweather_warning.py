from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_warning(location_id: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气灾害预警信息。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取天气预警信息: 城市ID '{location_id}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather('/v7/warning/now', params)
    
    if data:
        warning_data = data.get('warning', [])
        
        if warning_data:
            warning_info = []
            for warning in warning_data:
                warning_info.append({
                    'id': warning.get('id', ''),           # 预警ID
                    'sender': warning.get('sender', ''),   # 预警发布单位
                    'pubTime': warning.get('pubTime', ''), # 预警发布时间
                    'title': warning.get('title', ''),     # 预警信息标题
                    'startTime': warning.get('startTime', ''), # 预警开始时间
                    'endTime': warning.get('endTime', ''), # 预警结束时间
                    'status': warning.get('status', ''),   # 预警状态
                    'level': warning.get('level', ''),     # 预警等级
                    'severity': warning.get('severity', ''), # 预警严重程度
                    'severityColor': warning.get('severityColor', ''), # 预警颜色
                    'type': warning.get('type', ''),       # 预警类型ID
                    'typeName': warning.get('typeName', ''), # 预警类型名称
                    'urgency': warning.get('urgency', ''), # 紧急程度
                    'certainty': warning.get('certainty', ''), # 确定性
                    'text': warning.get('text', ''),       # 预警详细文字描述
                    'related': warning.get('related', '')  # 与该预警相关的预警ID
                })
            
            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=f"城市ID '{location_id}' 的天气预警信息: {warning_info}",
                    ),
                ],
            )
        else:
            return ToolResponse(
                content=[
                    TextBlock(
                        type="text",
                        text=f"城市ID '{location_id}' 当前无天气预警信息",
                    ),
                ],
            )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的天气预警信息失败",
                ),
            ],
        )