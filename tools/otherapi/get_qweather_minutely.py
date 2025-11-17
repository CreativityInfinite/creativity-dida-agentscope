from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_minutely(location_id: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气分钟级降水预报（仅支持中国地区）。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取分钟级降水预报: 城市ID '{location_id}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather('/v7/minutely/5m', params)
    
    if data:
        minutely_data = data.get('minutely', [])
        summary = data.get('summary', '')
        
        minutely_info = {
            'summary': summary,  # 分钟降水描述
            'minutely': []
        }
        
        for minute in minutely_data:
            minutely_info['minutely'].append({
                'fxTime': minute.get('fxTime', ''),     # 预报时间
                'precip': minute.get('precip', ''),     # 5分钟累计降水量
                'type': minute.get('type', '')          # 降水类型
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的分钟级降水预报: {minutely_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的分钟级降水预报失败，可能该地区不支持此功能（仅支持中国地区）",
                ),
            ],
        )