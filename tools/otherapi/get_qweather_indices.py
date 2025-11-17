from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import GetQWeather


def get_qweather_indices(location_id: str, index_type: str = "0", days: int = 1) -> ToolResponse:
    """获取指定城市的和风天气指数信息。

    Args:
        location_id (str): 城市ID，通过search_qweather_city_code获取
        index_type (str): 指数类型，"0"表示全部指数，也可以指定具体类型如"1,2,3"
        days (int): 预报天数，默认为1天
    """

    print(f"获取天气指数: 城市ID '{location_id}', 指数类型: '{index_type}', 天数: {days}")

    # 处理指数类型参数
    if isinstance(index_type, list):
        type_param = ','.join(index_type)
    else:
        type_param = index_type
        
    params = {
        'location': location_id,
        'type': type_param
    }

    data = GetQWeather(f'/v7/indices/{days}d', params)
    
    if data and data.get('daily'):
        indices_data = []
        for item in data['daily']:
            indices_data.append({
                'date': item.get('date', ''),
                'type': item.get('type', ''),
                'name': item.get('name', ''),
                'level': item.get('level', ''),
                'category': item.get('category', ''),
                'text': item.get('text', ''),
                'summary': item.get('summary', '')
            })
        
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"城市ID '{location_id}' 的天气指数数据: {indices_data}",
                ),
            ],
        )
    else:
        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取城市ID '{location_id}' 的天气指数失败",
                ),
            ],
        )