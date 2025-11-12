import agentscope
import os

from dotenv import load_dotenv
from agentscope_runtime.engine import AgentApp
from agentscope_runtime.engine.agents.agentscope_agent import AgentScopeAgent
from agentscope_runtime.sandbox.tools import FunctionTool, MCPTool, SandboxTool, create_function_tool
from agentscope.model import DashScopeChatModel
from agentscope.agent import ReActAgent, StudioUserInput, UserAgent
from agentscope.tool import Toolkit
from agentscope.model import DashScopeChatModel
from agentscope.message import Msg
from agentscope.memory import InMemoryMemory
from agentscope.formatter import DashScopeChatFormatter

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

# 创建FunctionTool实例
# tools = [
#     FunctionTool(get_countries),
#     FunctionTool(get_destinations)
# ]

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

# 创建 Agent
agent = AgentScopeAgent(
    name="DemoApp",
    model=DashScopeChatModel(
        model_name="qwen-plus",
        api_key=os.environ["DASHSCOPE_API_KEY"],
        enable_thinking=False
    ),
    agent_config={
        'name': "DidaAgent",
        'sys_prompt': "你是一个名为 DidaAgent 的有用助手，能够回答用户的问题并使用一系列的工具去执行相关的操作，请尽可能的一次性调用多个工具来加速消息反馈。",
        'formatter': formatter,
        'memory': memory,
        'toolkit': toolkit,
        'parallel_tool_calls': True,
    },
    agent_builder=ReActAgent,
)


agentscope.init(
    studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
    project="DIDA-AIDA-Project",
    name="DemoRuntimeApp"
)

# 创建 StudioUserInput 实例
studio_input = StudioUserInput(
    studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
    run_id="DemoRuntimeApp"  # 使用一个唯一的运行ID
)

# 创建 UserAgent 并设置 StudioUserInput
user_agent = UserAgent(name="用户")
user_agent.override_instance_input_method(studio_input)


async def init_resources(app, **kwargs):
    print("🚀 服务启动中，初始化资源...")


async def cleanup_resources(app, **kwargs):
    print("🛑 服务即将关闭，释放资源...")


# 创建并运行 AgentApp
app = AgentApp(
    agent=agent,
    endpoint_path="/process",
    response_type="sse",
    stream=True,
    before_start=init_resources,
    after_finish=cleanup_resources)

app.run(host="0.0.0.0", port=8090)
