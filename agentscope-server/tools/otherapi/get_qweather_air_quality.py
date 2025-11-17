from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_air_quality(location_id: str, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气实时空气质量数据。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取实时空气质量: 城市ID '{location_id}', 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather('/v7/air/now', params)
    
    if data and data.get('now'):
        air_data = data['now']
        air_info = {
            'pubTime': air_data.get('pubTime', ''),     # 空气质量数据发布时间
            'aqi': air_data.get('aqi', ''),             # 空气质量指数
            'level': air_data.get('level', ''),         # 空气质量指数等级
            'category': air_data.get('category', ''),   # 空气质量指数级别
            'primary': air_data.get('primary', ''),     # 空气质量的主要污染物
            'pm10': air_data.get('pm10', ''),           # PM10
            'pm2p5': air_data.get('pm2p5', ''),         # PM2.5
            'no2': air_data.get('no2', ''),             # 二氧化氮
            'so2': air_data.get('so2', ''),             # 二氧化硫
            'co': air_data.get('co', ''),               # 一氧化碳
            'o3': air_data.get('o3', '')                # 臭氧
        }
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的实时空气质量数据: {air_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的实时空气质量数据失败",
                ),
            ],
        )


def get_qweather_air_forecast(location_id: str, days: int = 5, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气空气质量预报数据。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        days (int): 预报天数，支持1-5天，默认5天
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取空气质量预报: 城市ID '{location_id}', 天数: {days}, 语言: '{lang}'")

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather('/v7/air/5d', params)
    
    if data and data.get('daily'):
        daily_data = data['daily'][:days]  # 限制返回天数
        forecast_info = []
        
        for day in daily_data:
            forecast_info.append({
                'fxDate': day.get('fxDate', ''),         # 预报日期
                'aqi': day.get('aqi', ''),               # 空气质量指数
                'level': day.get('level', ''),           # 空气质量指数等级
                'category': day.get('category', ''),     # 空气质量指数级别
                'primary': day.get('primary', '')        # 空气质量的主要污染物
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的{days}日空气质量预报: {forecast_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的{days}日空气质量预报失败",
                ),
            ],
        )