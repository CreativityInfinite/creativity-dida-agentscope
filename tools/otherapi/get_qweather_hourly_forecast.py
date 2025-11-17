from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_hourly_forecast(location_id: str, hours: int = 24, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气逐小时预报数据。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        hours (int): 预报小时数，支持24/72/168小时，默认24小时
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取逐小时天气预报: 城市ID '{location_id}', 小时数: {hours}, 语言: '{lang}'")

    # 根据小时数选择合适的API端点
    if hours <= 24:
        endpoint = '/v7/weather/24h'
    elif hours <= 72:
        endpoint = '/v7/weather/72h'
    else:
        endpoint = '/v7/weather/168h'

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather(endpoint, params)
    
    if data and data.get('hourly'):
        hourly_data = data['hourly'][:hours]  # 限制返回小时数
        hourly_info = []
        
        for hour in hourly_data:
            hourly_info.append({
                'fxTime': hour.get('fxTime', ''),         # 预报时间
                'temp': hour.get('temp', ''),             # 温度
                'icon': hour.get('icon', ''),             # 天气状况图标
                'text': hour.get('text', ''),             # 天气状况文字描述
                'wind360': hour.get('wind360', ''),       # 风向360角度
                'windDir': hour.get('windDir', ''),       # 风向
                'windScale': hour.get('windScale', ''),   # 风力等级
                'windSpeed': hour.get('windSpeed', ''),   # 风速
                'humidity': hour.get('humidity', ''),     # 相对湿度
                'pop': hour.get('pop', ''),               # 降水概率
                'precip': hour.get('precip', ''),         # 当前小时累计降水量
                'pressure': hour.get('pressure', ''),     # 大气压强
                'cloud': hour.get('cloud', ''),           # 云量
                'dew': hour.get('dew', '')                # 露点温度
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的{hours}小时天气预报: {hourly_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的{hours}小时天气预报失败",
                ),
            ],
        )