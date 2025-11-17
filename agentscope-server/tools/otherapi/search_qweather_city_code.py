from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def search_qweather_city_code(location_name: str, lang: str = "zh") -> ToolResponse:
    """搜索和风天气城市编码，用于后续天气查询。

    Args:
        location_name (str): 城市名称，例如：北京、上海、Seoul
        lang (str): 语言设置，默认为"zh"
    """

    print(f"搜索城市编码: '{location_name}', 语言: '{lang}'")

    params = {
        'location': location_name,
    }

    data = GetQWeather('/geo/v2/city/lookup', params)
    
    if data and data.get('location'):
        city_info = data['location'][0]
        city_data = {
            'id': city_info['id'],
            'name': city_info['name'],
            'country': city_info.get('country', ''),
            'adm1': city_info.get('adm1', ''),
            'adm2': city_info.get('adm2', ''),
            'lat': city_info.get('lat', ''),
            'lon': city_info.get('lon', '')
        }
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市搜索成功: {location_name}, 城市信息: {city_data}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"未找到城市: {location_name}，请检查城市名称是否正确",
                ),
            ],
        )