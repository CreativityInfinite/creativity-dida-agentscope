import base64
import requests
import json
import os

from typing import Any
from dotenv import load_dotenv


load_dotenv('.env')

# 计算票据
# 凭证 = Base64(DidaApiTestID:TestKey) // RGlkYUFwaVRlc3RJRDpUZXN0S2V5
LicenseKey = os.environ["DIDA_LICENSE_KEY"]
ClientID = os.environ["DIDA_CLIENT_ID"]

credentials = f"{ClientID}:{LicenseKey}"
credentials_base64 = base64.b64encode(credentials.encode()).decode()
print(f"凭证: {credentials} -> {credentials_base64}")


# API端点
url = "https://static-api.didatravel.com"
headers = {
    "accept": "application/json",
    "authorization": f"Basic {credentials_base64}"
}


def Get(path: str, params: dict[str, Any]) -> dict[str, Any] | None:
    try:
        furl = url + path
        response = requests.get(furl, params=params, headers=headers)
        response.raise_for_status()  # 如果状态码不是2xx，会抛出异常
        data = response.json()

        print(f"状态码: {response.status_code}")
        print(f"响应头: {dict(response.headers)}")
        # print(f"响应数据: {json.dumps(data, indent=0, ensure_ascii=False)}")

        return data

    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None


def Post(path: str, params: dict[str, Any], data: dict[str, Any] | None = None) -> dict[str, Any] | None:
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

        print(f"状态码: {response.status_code}")
        print(f"响应头: {dict(response.headers)}")
        print(
            f"响应数据: {json.dumps(response_data, indent=2, ensure_ascii=False)}")

        return response_data

    except requests.exceptions.RequestException as e:
        print(f"POST请求失败: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON解析失败: {e}")
        return None
