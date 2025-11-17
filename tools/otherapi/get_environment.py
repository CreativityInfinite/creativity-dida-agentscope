import os
import sys
import platform
import psutil
import json
from datetime import datetime, timezone
from typing import Any

from agentscope.message import TextBlock
from agentscope.tool import ToolResponse

# {
#   "type": "function",
#   "function": {
#     "name": "get_environment",
#     "description": "获取当前系统的环境信息，包括时间、日期、系统运行状态、硬件信息、Python环境等详细数据。",
#     "parameters": {
#       "properties": {
#         "include_system_info": {
#           "description": "是否包含系统信息（操作系统、CPU、内存等），默认为true",
#           "type": "boolean"
#         },
#         "include_process_info": {
#           "description": "是否包含进程信息（CPU使用率、内存使用等），默认为true",
#           "type": "boolean"
#         },
#         "include_python_info": {
#           "description": "是否包含Python环境信息（版本、路径、包等），默认为true",
#           "type": "boolean"
#         },
#         "timezone": {
#           "description": "时区设置，如：UTC、Asia/Shanghai、America/New_York等，默认为本地时区",
#           "type": "string"
#         }
#       },
#       "required": [],
#       "type": "object"
#     }
#   }
# }


def get_environment(
    include_system_info: bool = True,
    include_process_info: bool = True,
    include_python_info: bool = True,
    timezone_str: str = "local"
) -> ToolResponse:
    """获取当前系统的环境信息，包括时间、日期、系统运行状态、硬件信息、Python环境等详细数据。

    Args:
        include_system_info (bool): 是否包含系统信息（操作系统、CPU、内存等），默认为True
        include_process_info (bool): 是否包含进程信息（CPU使用率、内存使用等），默认为True
        include_python_info (bool): 是否包含Python环境信息（版本、路径、包等），默认为True
        timezone_str (str): 时区设置，默认为"local"（本地时区）
    """

    print("正在收集系统环境信息...")

    try:
        env_info = {}

        # 1. 时间和日期信息
        env_info["datetime"] = _get_datetime_info(timezone_str)
        # 2. 系统基本信息
        # if include_system_info:
        #     env_info["system"] = _get_system_info()
        # # 3. 进程和性能信息
        # if include_process_info:
        #     env_info["process"] = _get_process_info()
        # # 4. Python环境信息
        # if include_python_info:
        #     env_info["python"] = _get_python_info()
        # # 5. 环境变量信息（部分重要的）
        # env_info["environment"] = _get_environment_variables()

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"系统环境信息收集完成:\n{json.dumps(env_info, ensure_ascii=False, indent=2)}",
                ),
            ],
        )

    except Exception as e:
        error_msg = f"获取环境信息时发生错误: {str(e)}"
        print(error_msg)

        return ToolResponse(
            content=[
                TextBlock(
                    type="text",
                    text=f"环境信息获取失败: {error_msg}",
                ),
            ],
        )


def _get_datetime_info(timezone_str: str) -> dict[str, Any]:
    """获取时间和日期信息"""
    now = datetime.now()
    utc_now = datetime.now(timezone.utc)

    return {
        "current_time": {
            "local": now.strftime("%Y-%m-%d %H:%M:%S"),
            "utc": utc_now.strftime("%Y-%m-%d %H:%M:%S UTC"),
            "iso_format": now.isoformat(),
            "timestamp": now.timestamp(),
            "timezone": str(now.astimezone().tzinfo)
        },
        # "date_info": {
        #     "year": now.year,
        #     "month": now.month,
        #     "day": now.day,
        #     "weekday": now.strftime("%A"),
        #     "week_number": now.isocalendar()[1],
        #     "day_of_year": now.timetuple().tm_yday
        # }
    }


def _get_system_info() -> dict[str, Any]:
    """获取系统信息"""
    try:
        # CPU信息
        cpu_info = {
            "architecture": platform.architecture()[0],
            "processor": platform.processor(),
            "cpu_count_logical": psutil.cpu_count(logical=True),
            "cpu_count_physical": psutil.cpu_count(logical=False),
            "cpu_freq": dict(psutil.cpu_freq()._asdict()) if psutil.cpu_freq() else None,
            "cpu_usage_percent": psutil.cpu_percent(interval=1)
        }

        # 内存信息
        memory = psutil.virtual_memory()
        memory_info = {
            "total_gb": round(memory.total / (1024**3), 2),
            "available_gb": round(memory.available / (1024**3), 2),
            "used_gb": round(memory.used / (1024**3), 2),
            "usage_percent": memory.percent,
            "free_gb": round(memory.free / (1024**3), 2)
        }

        # 磁盘信息
        disk = psutil.disk_usage('/')
        disk_info = {
            "total_gb": round(disk.total / (1024**3), 2),
            "used_gb": round(disk.used / (1024**3), 2),
            "free_gb": round(disk.free / (1024**3), 2),
            "usage_percent": round((disk.used / disk.total) * 100, 2)
        }

        # 网络信息
        network_info = {}
        try:
            network_stats = psutil.net_io_counters()
            network_info = {
                "bytes_sent": network_stats.bytes_sent,
                "bytes_received": network_stats.bytes_recv,
                "packets_sent": network_stats.packets_sent,
                "packets_received": network_stats.packets_recv
            }
        except:
            network_info = {"status": "无法获取网络信息"}

        return {
            "platform": {
                "system": platform.system(),
                "release": platform.release(),
                "version": platform.version(),
                "machine": platform.machine(),
                "node": platform.node()
            },
            "cpu": cpu_info,
            "memory": memory_info,
            "disk": disk_info,
            "network": network_info,
            "boot_time": datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S"),
            "uptime_hours": round((datetime.now().timestamp() - psutil.boot_time()) / 3600, 2)
        }
    except Exception as e:
        return {"error": f"获取系统信息失败: {str(e)}"}


def _get_process_info() -> dict[str, Any]:
    """获取当前进程信息"""
    try:
        current_process = psutil.Process()

        # 进程基本信息
        process_info = {
            "pid": current_process.pid,
            "name": current_process.name(),
            "status": current_process.status(),
            "create_time": datetime.fromtimestamp(current_process.create_time()).strftime("%Y-%m-%d %H:%M:%S"),
            "cpu_percent": current_process.cpu_percent(),
            "memory_info": {
                "rss_mb": round(current_process.memory_info().rss / (1024**2), 2),
                "vms_mb": round(current_process.memory_info().vms / (1024**2), 2),
                "memory_percent": round(current_process.memory_percent(), 2)
            },
            "num_threads": current_process.num_threads(),
            "num_fds": current_process.num_fds() if hasattr(current_process, 'num_fds') else None
        }

        # 系统负载信息
        load_info = {}
        try:
            if hasattr(os, 'getloadavg'):
                load_avg = os.getloadavg()
                load_info = {
                    "load_1min": load_avg[0],
                    "load_5min": load_avg[1],
                    "load_15min": load_avg[2]
                }
        except:
            load_info = {"status": "负载信息不可用"}

        return {
            "current_process": process_info,
            "system_load": load_info,
            "total_processes": len(psutil.pids())
        }
    except Exception as e:
        return {"error": f"获取进程信息失败: {str(e)}"}


def _get_python_info() -> dict[str, Any]:
    """获取Python环境信息"""
    try:
        return {
            "version": {
                "version": sys.version,
                "version_info": {
                    "major": sys.version_info.major,
                    "minor": sys.version_info.minor,
                    "micro": sys.version_info.micro,
                    "releaselevel": sys.version_info.releaselevel,
                    "serial": sys.version_info.serial
                }
            },
            "executable": sys.executable,
            "platform": sys.platform,
            "path": sys.path[:5],  # 只显示前5个路径，避免输出过长
            "modules_count": len(sys.modules),
            "encoding": {
                "default": sys.getdefaultencoding(),
                "filesystem": sys.getfilesystemencoding()
            },
            "max_size": sys.maxsize,
            "recursion_limit": sys.getrecursionlimit()
        }
    except Exception as e:
        return {"error": f"获取Python信息失败: {str(e)}"}


def _get_environment_variables() -> dict[str, Any]:
    """获取重要的环境变量信息"""
    try:
        important_vars = [
            'PATH', 'HOME', 'USER', 'SHELL', 'LANG', 'TZ',
            'PYTHONPATH', 'VIRTUAL_ENV', 'CONDA_DEFAULT_ENV',
            'NODE_ENV', 'NODE_VERSION'
        ]

        env_vars = {}
        for var in important_vars:
            value = os.environ.get(var)
            if value:
                # 对于PATH这种很长的变量，只显示前几个路径
                if var == 'PATH':
                    paths = value.split(os.pathsep)
                    env_vars[var] = {
                        "count": len(paths),
                        "first_few": paths[:3]
                    }
                elif var == 'PYTHONPATH' and len(value) > 200:
                    env_vars[var] = value[:200] + "..."
                else:
                    env_vars[var] = value

        return {
            "important_variables": env_vars,
            "total_env_vars": len(os.environ),
            "current_working_directory": os.getcwd(),
            "user_home": os.path.expanduser("~")
        }
    except Exception as e:
        return {"error": f"获取环境变量失败: {str(e)}"}
