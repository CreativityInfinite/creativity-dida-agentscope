import asyncio
import inspect
import json
import agentscope
import requests
import os

from pydantic import BaseModel, Field
from agentscope.message import TextBlock, ToolUseBlock
from agentscope.tool import ToolResponse, Toolkit, execute_python_code
from dotenv import load_dotenv

# 加载环境变量
load_dotenv('.env')

# {
#   "type": "function",
#   "function": {
#     "name": "get_weather",
#     "description": "获取指定国家和目的地的天气信息，返回JSON格式的数据。",
#     "parameters": {
#       "properties": {
#         "country": {
#           "description": "国家名称，例如：China, United States, Japan",
#           "type": "string"
#         },
#         "destination": {
#           "description": "目的地城市名称，例如：Beijing, New York, Tokyo",
#           "type": "string"
#         },
#         "units": {
#           "description": "温度单位：metric(摄氏度), imperial(华氏度), kelvin(开尔文度)，默认为metric",
#           "type": "string"
#         },
#         "language": {
#           "description": "返回语言：zh_cn(中文), en(英文), ja(日文)等，默认为zh_cn",
#           "type": "string"
#         }
#       },
#       "required": ["country", "destination"],
#       "type": "object"
#     }
#   }
# }


def get_weather(country: str, destination: str, units: str = "metric", language: str = "zh_cn") -> ToolResponse:
    """获取指定国家和目的地的天气信息，返回JSON格式的数据。

    Args:
        country (str): 国家名称，例如：China, United States, Japan
        destination (str): 目的地城市名称，例如：Beijing, New York, Tokyo
        units (str): 温度单位：metric(摄氏度), imperial(华氏度), kelvin(开尔文度)，默认为metric
        language (str): 返回语言：zh_cn(中文), en(英文), ja(日文)等，默认为zh_cn
    """

    print(f"查询天气: {destination}, {country}")

    # OpenWeatherMap API密钥 (需要注册获取)
    # 这里使用免费的API密钥，实际使用时需要替换为真实的API密钥
    api_key = os.environ.get("OPENWEATHERMAP_API_KEY", "your_api_key_here")

    if api_key == "your_api_key_here":
        # 如果没有配置API密钥，使用模拟数据
        mock_weather_data = {
            "location": f"{destination}, {country}",
            "temperature": "22°C",
            "description": "晴朗",
            "humidity": "65%",
            "wind_speed": "5 km/h",
            "pressure": "1013 hPa",
            "visibility": "10 km",
            "uv_index": "5",
            "note": "这是模拟数据，请配置OPENWEATHERMAP_API_KEY环境变量以获取真实天气数据"
        }

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"位置: {destination}, {country}\n天气信息: {json.dumps(mock_weather_data, ensure_ascii=False, indent=2)}",
                ),
            ],
        )

    try:
        # 使用OpenWeatherMap Current Weather API
        base_url = "http://api.openweathermap.org/data/2.5/weather"

        # 构建查询参数
        params = {
            "q": f"{destination},{country}",
            "appid": api_key,
            "units": units,
            "lang": language
        }

        # 发送请求
        response = requests.get(base_url, params=params, timeout=10)
        response.raise_for_status()

        weather_data = response.json()

        # 解析天气数据
        current_weather = {
            "location": f"{weather_data['name']}, {weather_data['sys']['country']}",
            "temperature": f"{weather_data['main']['temp']}°{'C' if units == 'metric' else 'F' if units == 'imperial' else 'K'}",
            "feels_like": f"{weather_data['main']['feels_like']}°{'C' if units == 'metric' else 'F' if units == 'imperial' else 'K'}",
            "description": weather_data['weather'][0]['description'],
            "humidity": f"{weather_data['main']['humidity']}%",
            "pressure": f"{weather_data['main']['pressure']} hPa",
            "visibility": f"{weather_data.get('visibility', 0) / 1000} km" if weather_data.get('visibility') else "N/A",
            "wind_speed": f"{weather_data.get('wind', {}).get('speed', 0)} {'m/s' if units == 'metric' else 'mph'}",
            "wind_direction": f"{weather_data.get('wind', {}).get('deg', 0)}°",
            "cloudiness": f"{weather_data['clouds']['all']}%",
            "sunrise": weather_data['sys']['sunrise'],
            "sunset": weather_data['sys']['sunset'],
            "timezone": weather_data['timezone'],
            "coord": {
                "lat": weather_data['coord']['lat'],
                "lon": weather_data['coord']['lon']
            }
        }

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"位置: {destination}, {country}\n天气信息: {json.dumps(current_weather, ensure_ascii=False, indent=2)}",
                ),
            ],
        )

    except requests.exceptions.RequestException as e:
        error_msg = f"天气API请求失败: {str(e)}"
        print(error_msg)

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取天气信息失败: {error_msg}",
                ),
            ],
        )

    except KeyError as e:
        error_msg = f"天气数据解析失败，缺少字段: {str(e)}"
        print(error_msg)

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"天气数据解析失败: {error_msg}",
                ),
            ],
        )

    except Exception as e:
        error_msg = f"获取天气信息时发生未知错误: {str(e)}"
        print(error_msg)

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"获取天气信息失败: {error_msg}",
                ),
            ],
        )
