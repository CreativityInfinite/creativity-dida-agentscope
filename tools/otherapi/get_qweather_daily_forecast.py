from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_daily_forecast(location_id: str, days: int = 3, lang: str = "zh") -> ToolResponse:
    """获取指定城市的和风天气多日预报信息。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        days (int): 预报天数，支持1-30天，默认3天
        lang (str): 多语言设置，默认中文(zh)
    """

    print(f"获取多日天气预报: 城市ID '{location_id}', 天数: {days}, 语言: '{lang}'")

    # 根据天数选择合适的API端点
    if days <= 3:
        endpoint = '/v7/weather/3d'
    elif days <= 7:
        endpoint = '/v7/weather/7d'
    elif days <= 10:
        endpoint = '/v7/weather/10d'
    elif days <= 15:
        endpoint = '/v7/weather/15d'
    else:
        endpoint = '/v7/weather/30d'

    params = {
        'location': location_id,
        'lang': lang
    }

    data = GetQWeather(endpoint, params)
    
    if data and data.get('daily'):
        daily_data = data['daily'][:days]  # 限制返回天数
        forecast_info = []
        
        for day in daily_data:
            forecast_info.append({
                'date': day.get('fxDate', ''),           # 预报日期
                'sunrise': day.get('sunrise', ''),       # 日出时间
                'sunset': day.get('sunset', ''),         # 日落时间
                'moonrise': day.get('moonrise', ''),     # 月升时间
                'moonset': day.get('moonset', ''),       # 月落时间
                'moonPhase': day.get('moonPhase', ''),   # 月相
                'tempMax': day.get('tempMax', ''),       # 最高温度
                'tempMin': day.get('tempMin', ''),       # 最低温度
                'iconDay': day.get('iconDay', ''),       # 白天天气图标
                'textDay': day.get('textDay', ''),       # 白天天气现象
                'iconNight': day.get('iconNight', ''),   # 夜间天气图标
                'textNight': day.get('textNight', ''),   # 夜间天气现象
                'wind360Day': day.get('wind360Day', ''), # 白天风向角度
                'windDirDay': day.get('windDirDay', ''), # 白天风向
                'windScaleDay': day.get('windScaleDay', ''), # 白天风力等级
                'windSpeedDay': day.get('windSpeedDay', ''), # 白天风速
                'wind360Night': day.get('wind360Night', ''), # 夜间风向角度
                'windDirNight': day.get('windDirNight', ''), # 夜间风向
                'windScaleNight': day.get('windScaleNight', ''), # 夜间风力等级
                'windSpeedNight': day.get('windSpeedNight', ''), # 夜间风速
                'humidity': day.get('humidity', ''),     # 相对湿度
                'precip': day.get('precip', ''),         # 降水量
                'pressure': day.get('pressure', ''),     # 大气压强
                'vis': day.get('vis', ''),               # 能见度
                'cloud': day.get('cloud', ''),           # 云量
                'uvIndex': day.get('uvIndex', '')        # 紫外线强度指数
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的{days}日天气预报: {forecast_info}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的{days}日天气预报失败",
                ),
            ],
        )