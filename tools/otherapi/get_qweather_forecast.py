from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_forecast(location_id: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气实时信息。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取实时天气: 城市ID '{location_id}', 语言: '{lang}'")

    params = {
        'location': location_id
    }

    data = GetQWeather('/v7/weather/now', params)
    
    if data and data.get('now'):
        weather_data = data['now']
        weather_info = {
            'obsTime': weather_data.get('obsTime', ''),      # 观测时间
            'temp': weather_data.get('temp', ''),            # 温度
            'feelsLike': weather_data.get('feelsLike', ''),  # 体感温度
            'icon': weather_data.get('icon', ''),            # 天气图标代码
            'text': weather_data.get('text', ''),            # 天气状况文字
            'windDir': weather_data.get('windDir', ''),      # 风向
            'windScale': weather_data.get('windScale', ''),  # 风力等级
            'windSpeed': weather_data.get('windSpeed', ''),  # 风速
            'humidity': weather_data.get('humidity', ''),    # 相对湿度
            'precip': weather_data.get('precip', ''),        # 降水量
            'pressure': weather_data.get('pressure', ''),    # 大气压强
            'vis': weather_data.get('vis', ''),              # 能见度
            'cloud': weather_data.get('cloud', ''),          # 云量
            'dew': weather_data.get('dew', '')               # 露点温度
        }
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的实时天气数据: {weather_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的实时天气失败",
                ),
            ],
        )