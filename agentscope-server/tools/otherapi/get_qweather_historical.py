from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_historical_weather(location_id: str, date: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气历史天气数据（最近10天）。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        date (str): 查询日期，格式为YYYY-MM-DD，最多查询最近10天
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取历史天气数据: 城市ID '{location_id}', 日期: '{date}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'date': date,
        'lang': lang
    }

    data = GetQWeather('/v7/historical/weather', params)
    
    if data and data.get('weatherHourly'):
        hourly_data = data['weatherHourly']
        historical_info = []
        
        for hour in hourly_data:
            historical_info.append({
                'time': hour.get('time', ''),             # 当地时间
                'temp': hour.get('temp', ''),             # 温度
                'icon': hour.get('icon', ''),             # 天气状况图标
                'text': hour.get('text', ''),             # 天气状况文字描述
                'wind360': hour.get('wind360', ''),       # 风向360角度
                'windDir': hour.get('windDir', ''),       # 风向
                'windScale': hour.get('windScale', ''),   # 风力等级
                'windSpeed': hour.get('windSpeed', ''),   # 风速
                'humidity': hour.get('humidity', ''),     # 相对湿度
                'precip': hour.get('precip', ''),         # 当前小时累计降水量
                'pressure': hour.get('pressure', ''),     # 大气压强
                'cloud': hour.get('cloud', '')            # 云量
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 在 {date} 的历史天气数据: {historical_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 在 {date} 的历史天气数据失败，请确认日期格式正确（YYYY-MM-DD）且在最近10天内",
                ),
            ],
        )


def get_qweather_historical_air(location_id: str, date: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气历史空气质量数据（最近10天）。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        date (str): 查询日期，格式为YYYY-MM-DD，最多查询最近10天
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取历史空气质量数据: 城市ID '{location_id}', 日期: '{date}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'date': date,
        'lang': lang
    }

    data = GetQWeather('/v7/historical/air', params)
    
    if data and data.get('airHourly'):
        hourly_data = data['airHourly']
        historical_info = []
        
        for hour in hourly_data:
            historical_info.append({
                'time': hour.get('time', ''),             # 当地时间
                'aqi': hour.get('aqi', ''),               # 空气质量指数
                'level': hour.get('level', ''),           # 空气质量指数等级
                'category': hour.get('category', ''),     # 空气质量指数级别
                'primary': hour.get('primary', ''),       # 空气质量的主要污染物
                'pm10': hour.get('pm10', ''),             # PM10
                'pm2p5': hour.get('pm2p5', ''),           # PM2.5
                'no2': hour.get('no2', ''),               # 二氧化氮
                'so2': hour.get('so2', ''),               # 二氧化硫
                'co': hour.get('co', ''),                 # 一氧化碳
                'o3': hour.get('o3', '')                  # 臭氧
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 在 {date} 的历史空气质量数据: {historical_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 在 {date} 的历史空气质量数据失败，请确认日期格式正确（YYYY-MM-DD）且在最近10天内",
                ),
            ],
        )