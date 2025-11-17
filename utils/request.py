import base64
import requests
import json
import os
import time
import jwt

from typing import Any
from dotenv import load_dotenv


load_dotenv('.env')

# 计算票据
# 凭证 = Base64(DidaApiTestID:TestKey) // RGlkYUFwaVRlc3RJRDpUZXN0S2V5
LicenseKey = os.environ["DIDA_LICENSE_KEY"]
ClientID = os.environ["DIDA_CLIENT_ID"]

credentials = f"{ClientID}:{LicenseKey}"
credentials_base64 = base64.b64encode(credentials.encode()).decode()

# API端点
contentUrl = "https://static-api.didatravel.com"
bookingUrl = "https://api.didatravel.com"
qweatherapiUrl = "https://m44gkj23jm.re.qweatherapi.com"
qweather_private_key = os.environ.get("QWEATHER_PRIVATE_KEY", "")
qweather_key_id = os.environ.get("QWEATHER_KEY_ID", "")
qweather_sub_id = os.environ.get("QWEATHER_SUB_ID", "")

headers = {
    "accept": "application/json",
    "authorization": f"Basic {credentials_base64}"
}
qweather_headers = {
    'kid': qweather_key_id
}


def Get(type: str, path: str, params: dict[str, Any]) -> dict[str, Any] | None:
    url = contentUrl if type == "content" else bookingUrl
    try:
        furl = url + path
        response = requests.get(furl, params=params, headers=headers)
        response.raise_for_status()  # 如果状态码不是2xx，会抛出异常
        data = response.json()

        # print(f"状态码: {response.status_code}")
        # print(f"响应头: {dict(response.headers)}")
        # print(f"响应数据: {json.dumps(data, indent=0, ensure_ascii=False)}")

        return data

    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None


def Post(type: str, path: str, params: dict[str, Any], data: dict[str, Any] | None = None) -> dict[str, Any] | None:
    url = contentUrl if type == "content" else bookingUrl
    try:
        furl = url + path
        response = requests.post(
            furl,
            params=params,
            json=data,
            headers=headers
        )
        response.raise_for_status()  # 如果状态码不是2xx，会抛出异常
        response_data = response.json()

        # print(f"状态码: {response.status_code}")
        # print(f"响应头: {dict(response.headers)}")
        # print(f"响应数据: {json.dumps(response_data, indent=2, ensure_ascii=False)}")

        return response_data

    except requests.exceptions.RequestException as e:
        print(f"POST请求失败: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None


def _generate_qweather_token():
    """生成和风天气JWT token"""
    payload = {
        'iat': int(time.time()) - 30,
        'exp': int(time.time()) + 900,
        'sub': qweather_sub_id
    }
    encoded_jwt = jwt.encode(
        payload, qweather_private_key, algorithm='EdDSA', headers=qweather_headers)
    return encoded_jwt


def GetQWeather(endpoint: str, params: dict[str, Any]) -> dict[str, Any] | None:
    """和风天气API请求方法

    Args:
        endpoint (str): API端点路径，例如 '/geo/v2/city/lookup'
        params (dict): 请求参数

    Returns:
        dict: API响应数据或None
    """
    token = _generate_qweather_token()
    qweather_headers_with_auth = {
        'Authorization': f'Bearer {token}'
    }

    try:
        response = requests.get(
            f"{qweatherapiUrl}{endpoint}",
            params=params,
            headers=qweather_headers_with_auth,
            timeout=10
        )

        if response.status_code == 200:
            data = response.json()
            if data['code'] == '200':
                return data
            else:
                print(f"和风天气API返回错误: {data.get('message', '未知错误')}")
                return None
        else:
            print(f"和风天气请求失败，状态码: {response.status_code}")
            return None

    except Exception as e:
        print(f"和风天气请求发生错误: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None
