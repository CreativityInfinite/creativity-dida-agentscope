from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_sun_moon(location_id: str, date: str = "", lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气日出日落、月升月落时间。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        date (str): 查询日期，格式为YYYY-MM-DD，为空则查询今天
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取天文数据: 城市ID '{location_id}', 日期: '{date}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }
    
    if date:
        params['date'] = date

    data = GetQWeather('/v7/astronomy/sun', params)
    
    if data:
        sun_data = data
        astronomy_info = {
            'sunrise': sun_data.get('sunrise', ''),     # 日出时间
            'sunset': sun_data.get('sunset', ''),       # 日落时间
            'moonrise': sun_data.get('moonrise', ''),   # 月升时间
            'moonset': sun_data.get('moonset', ''),     # 月落时间
            'moonPhase': sun_data.get('moonPhase', ''), # 月相名称
            'moonPhaseIcon': sun_data.get('moonPhaseIcon', ''), # 月相图标
            'temp': sun_data.get('temp', ''),           # 当前温度
            'icon': sun_data.get('icon', ''),           # 天气状况图标
            'text': sun_data.get('text', '')            # 天气状况文字描述
        }
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的天文数据: {astronomy_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的天文数据失败",
                ),
            ],
        )


def get_qweather_moon_phase(location_id: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气月相数据。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取月相数据: 城市ID '{location_id}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather('/v7/astronomy/moon', params)
    
    if data:
        moon_data = data
        moon_info = {
            'moonPhase': moon_data.get('moonPhase', []), # 月相数据数组
            'refer': moon_data.get('refer', {})          # 数据来源信息
        }
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的月相数据: {moon_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的月相数据失败",
                ),
            ],
        )