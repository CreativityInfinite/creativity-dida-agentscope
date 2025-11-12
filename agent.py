from tools.contentapi.get_countries import get_countries
from tools.contentapi.get_destinations import get_destinations
from tools.contentapi.get_hotel_list import get_hotel_list
from tools.contentapi.get_hotel_details import get_hotel_details
from tools.contentapi.get_meal_types import get_meal_types
from tools.contentapi.get_bed_types import get_bed_types
from tools.contentapi.get_window_types import get_window_types
from tools.contentapi.get_smoking_types import get_smoking_types
from tools.contentapi.get_view_types import get_view_types
from tools.otherapi.get_weather import get_weather
from tools.otherapi.get_environment import get_environment
from agentscope.tool import Toolkit
from agentscope.model import DashScopeChatModel
from agentscope.message import Msg
from agentscope.memory import InMemoryMemory
from agentscope.formatter import DashScopeChatFormatter
from agentscope.agent import ReActAgent
from dotenv import load_dotenv

import asyncio
import os
import agentscope
import json
from datetime import datetime

# 加载环境变量
load_dotenv('.env')


toolkit = Toolkit()
formatter = DashScopeChatFormatter()
memory = InMemoryMemory()

toolkit.register_tool_function(get_countries)
toolkit.register_tool_function(get_destinations)
toolkit.register_tool_function(get_hotel_list)
toolkit.register_tool_function(get_hotel_details)
toolkit.register_tool_function(get_meal_types)
toolkit.register_tool_function(get_bed_types)
toolkit.register_tool_function(get_window_types)
toolkit.register_tool_function(get_smoking_types)
toolkit.register_tool_function(get_view_types)
toolkit.register_tool_function(get_weather)
toolkit.register_tool_function(get_environment)


didaAgent = ReActAgent(
    name="DidaAgent",
    sys_prompt="你是一个名为 DidaAgent 的有用助手，能够回答用户的问题并使用一系列的工具去执行相关的操作。",
    model=DashScopeChatModel(
        model_name="qwen-plus",
        api_key=os.environ["DASHSCOPE_API_KEY"],
        stream=True,
        enable_thinking=False
    ),
    formatter=formatter,
    memory=memory,
    toolkit=toolkit,
    parallel_tool_calls=True,
)


async def print_agent_messages():
    """打印Agent内存中的所有消息"""
    print("\n" + "="*50)
    print("ReActAgent 内部消息列表:")
    print("="*50)

    messages = await didaAgent.memory.get_memory()
    for i, msg in enumerate(messages):
        print(f"\n消息 {i+1}:")
        print(f"  角色: {msg.role}")
        print(f"  名称: {msg.name}")
        print(f"  内容类型: {type(msg.content)}")

        if isinstance(msg.content, str):
            print(f"  内容: {msg.content}")
        elif isinstance(msg.content, list):
            print(f"  内容块数量: {len(msg.content)}")
            for j, block in enumerate(msg.content):
                print(f"    块 {j+1}: {block}")
        else:
            print(f"  内容: {msg.content}")

        if hasattr(msg, 'timestamp') and msg.timestamp:
            print(f"  时间戳: {msg.timestamp}")

    print("\n" + "="*50)
    print(f"总消息数量: {len(messages)}")
    print("="*50)


async def analyze_llm_interaction():
    """分析与LLM的交互过程"""
    print("\n" + "="*60)
    print("LLM 交互过程分析:")
    print("="*60)

    messages = await didaAgent.memory.get_memory()
    user_msgs = [msg for msg in messages if msg.role == "user"]
    assistant_msgs = [msg for msg in messages if msg.role == "assistant"]
    system_msgs = [msg for msg in messages if msg.role == "system"]
    tool_msgs = [msg for msg in messages if msg.role == "tool"]

    print(f"用户消息数量: {len(user_msgs)}")
    print(f"助手消息数量: {len(assistant_msgs)}")
    print(f"系统消息数量: {len(system_msgs)}")
    print(f"工具消息数量: {len(tool_msgs)}")

    print("\n详细交互流程:")
    for i, msg in enumerate(messages):
        print(f"\n步骤 {i+1} [{msg.role}]:")
        if msg.role == "user":
            print(f"  用户输入: {msg.content}")
        elif msg.role == "assistant":
            if isinstance(msg.content, str):
                print(f"  助手回复: {msg.content}")
            elif isinstance(msg.content, list):
                for j, block in enumerate(msg.content):
                    if isinstance(block, dict):
                        if block.get("type") == "text":
                            print(f"  助手文本: {block.get('text', '')}")
                        elif block.get("type") == "tool_use":
                            print(
                                f"  工具调用: {block.get('name', '')} - {block.get('input', {})}")
                    else:
                        print(f"  助手内容块 {j+1}: {block}")
        elif msg.role == "tool":
            if isinstance(msg.content, list):
                for block in msg.content:
                    if isinstance(block, dict) and block.get("type") == "tool_result":
                        print(f"  工具结果: {block.get('content', '')}")
            else:
                print(f"  工具结果: {msg.content}")
        else:
            print(f"  {msg.role}: {msg.content}")

    print("\n" + "="*60)


async def export_messages_to_json():
    """将消息导出为JSON格式便于分析"""
    messages = await didaAgent.memory.get_memory()
    export_data = []

    for i, msg in enumerate(messages):
        msg_data = {
            "序号": i + 1,
            "角色": msg.role,
            "名称": msg.name,
            "内容": msg.content,
            "时间戳": getattr(msg, 'timestamp', None)
        }
        export_data.append(msg_data)

    filename = f"agent_messages_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2, default=str)

    print(f"\n消息已导出到文件: {filename}")
    return filename


async def run_conversation() -> None:
    """运行 DidaAgent 和用户之间的简单对话。"""

    agentscope.init(
        studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
        project="DIDA-AIDA-Project",
        name="DemoApp"
    )

    task_description = "你好，你谁啊？我的语言是中文，我现在希望获取DIDA目前的国家列表，并找到朝鲜的目的地列表。"
    # task_description = "请帮我获取中国（CN）的目的地列表，使用中文语言。"
    message = await didaAgent(Msg("user", task_description, "user"))
    print('---->', message)

    # 打印对话后的完整消息历史
    # print("\n对话完成后的完整消息历史:")
    # await print_agent_messages()

    didaAgent.register_class_hook

    # 分析LLM交互过程
    await analyze_llm_interaction()

    # 导出消息到JSON文件
    await export_messages_to_json()


if __name__ == "__main__":
    asyncio.run(run_conversation())
