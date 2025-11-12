import requests
import json


def get_countries():
    """获取国家列表的API请求"""

    # API端点
    url = "https://static-api.didatravel.com/api/v1/region/countries"

    # 请求参数
    params = {
        "language": "en-US"
    }

    # 请求头
    headers = {
        "accept": "application/json",
        "Authorization": "Basic RGlkYUFwaVRlc3RJRDpUZXN0S2V5"
    }

    try:
        # 发送GET请求
        response = requests.get(url, params=params, headers=headers)

        # 检查响应状态码
        response.raise_for_status()  # 如果状态码不是2xx，会抛出异常

        # 解析JSON响应
        data = response.json()

        print(f"状态码: {response.status_code}")
        print(f"响应头: {dict(response.headers)}")
        print(f"响应数据: {json.dumps(data, indent=2, ensure_ascii=False)}")

        return data

    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None


# 调用函数
if __name__ == "__main__":
    countries = get_countries()
