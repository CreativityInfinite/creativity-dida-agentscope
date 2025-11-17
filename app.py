import agentscope
import os

from dotenv import load_dotenv
from agentscope_runtime.engine import AgentApp
from agentscope_runtime.engine.agents.agentscope_agent import AgentScopeAgent
from agentscope_runtime.sandbox.tools import FunctionTool, MCPTool, SandboxTool, create_function_tool
from agentscope_runtime.engine.deployers import LocalDeployManager
from agentscope.model import DashScopeChatModel
from agentscope.agent import ReActAgent, StudioUserInput, UserAgent
from agentscope.tool import Toolkit, execute_python_code
# "execute_python_code",
# "execute_shell_command",
# "view_text_file",
# "write_text_file",
# "insert_text_file",
# "dashscope_text_to_image",
# "dashscope_text_to_audio",
# "dashscope_image_to_text",
# "openai_text_to_image",
# "openai_text_to_audio",
# "openai_edit_image",
# "openai_create_image_variation",
# "openai_image_to_text",
# "openai_audio_to_text",
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
from tools.otherapi.get_environment import get_environment
from tools.bookingapi.get_lowest_price import get_lowest_price
from tools.bookingapi.price_confirm import price_confirm
from tools.bookingapi.booking_confirm import booking_confirm
from tools.bookingapi.booking_search import booking_search
from tools.bookingapi.booking_pre_cancel import booking_pre_cancel
from tools.bookingapi.booking_cancel_confirm import booking_cancel_confirm

from tools.otherapi.search_qweather_city_code import search_qweather_city_code
from tools.otherapi.get_qweather_indices import get_qweather_indices
from tools.otherapi.get_qweather_forecast import get_qweather_forecast
from tools.otherapi.get_qweather_daily_forecast import get_qweather_daily_forecast
from tools.otherapi.get_qweather_hourly_forecast import get_qweather_hourly_forecast
from tools.otherapi.get_qweather_minutely import get_qweather_minutely
from tools.otherapi.get_qweather_warning import get_qweather_warning
from tools.otherapi.get_qweather_air_quality import get_qweather_air_quality, get_qweather_air_forecast
from tools.otherapi.get_qweather_astronomy import get_qweather_sun_moon, get_qweather_moon_phase
from tools.otherapi.get_qweather_historical import get_qweather_historical_weather, get_qweather_historical_air

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
toolkit.register_tool_function(get_environment)
toolkit.register_tool_function(get_lowest_price)
toolkit.register_tool_function(price_confirm)
toolkit.register_tool_function(booking_confirm)
toolkit.register_tool_function(booking_search)
toolkit.register_tool_function(booking_pre_cancel)
toolkit.register_tool_function(booking_cancel_confirm)

toolkit.register_tool_function(search_qweather_city_code)
toolkit.register_tool_function(get_qweather_indices)
toolkit.register_tool_function(get_qweather_forecast)
toolkit.register_tool_function(get_qweather_daily_forecast)
toolkit.register_tool_function(get_qweather_hourly_forecast)
toolkit.register_tool_function(get_qweather_minutely)
toolkit.register_tool_function(get_qweather_warning)
toolkit.register_tool_function(get_qweather_air_quality)
toolkit.register_tool_function(get_qweather_air_forecast)
toolkit.register_tool_function(get_qweather_sun_moon)
toolkit.register_tool_function(get_qweather_moon_phase)
toolkit.register_tool_function(get_qweather_historical_weather)
toolkit.register_tool_function(get_qweather_historical_air)

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
        'sys_prompt': f"""你是DidaAgent，道旅集团DIDA AI Agent Platform的智能旅游助手。你专门为旅游业务场景设计，能够通过自然语言理解用户需求，并调用专业的旅游API工具来提供精准服务。

## 🎯 核心职责
你是用户的专业旅游顾问和预订助手，主要负责：
- 🌍 提供全球旅游目的地信息查询服务
- 🏨 协助用户完成酒店搜索、比价和预订全流程
- 🌤️ 提供专业的天气信息和生活指数建议
- 📊 提供实时的系统状态和环境信息

## 🛠️ 可用工具类别
### 旅游内容服务工具
- 国家列表查询、目的地信息、酒店列表和详情
- 数据字典服务（用餐类型、床型、窗型、吸烟类型、景观类型）

### 酒店预订服务工具  
- 价格查询、价格确认、预订确认、预订查询
- 预订取消（预取消+确认取消）等完整预订流程

### 天气信息服务工具
- OpenWeatherMap基础天气查询
- 和风天气专业服务：实时天气、多日预报、逐小时预报、分钟级降水
- 空气质量、天文数据、生活指数、天气预警、历史数据

### 系统环境工具
- 时间日期、系统状态、运行环境信息

## 💡 工作原则
1. **并行优化**: 尽可能同时调用多个工具来提升响应速度，特别是相关联的查询
2. **业务导向**: 理解用户的旅游需求，提供专业的建议和完整的服务流程
3. **数据精准**: 使用准确的参数调用API，确保返回数据的可靠性
4. **用户友好**: 用简洁明了的语言解释复杂的旅游信息和预订流程
5. **主动服务**: 根据用户查询主动提供相关的补充信息

## 🔄 典型服务场景
- 用户询问某个国家的旅游信息时，同时提供目的地列表和当地天气
- 用户查询酒店时，同时提供酒店详情、价格信息和当地天气状况
- 用户进行预订流程时，引导完成价格确认→预订确认的标准流程
- 用户询问天气时，根据需要提供实时天气、预报、空气质量等综合信息

记住：
你代表的是道旅集团的专业服务水准，请始终保持专业、高效、贴心的服务态度。
如果能够同时使用多个工具来提升响应速度，请尽量这样做。
当有的工具允许传入多个ID去拉取数据时（比如：get_hotel_details），请尽量这样做。
当需要实时数据（如当前时间、系统状态）时，请调用get_environment工具获取。""",
        'formatter': formatter,
        'memory': memory,
        'toolkit': toolkit,
        'parallel_tool_calls': True,
    },
    agent_builder=ReActAgent,
)


agentscope.init(
    studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
    project="DIDA-AIDA-Project2",
    name="DemoRuntimeApp"
)


# 创建 StudioUserInput 实例
studio_input = StudioUserInput(
    studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
    run_id='fDDiGsBb5u9bRgFRELuzWi'
)
print('studio_input', studio_input)


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


async def main():
    await app.deploy(LocalDeployManager(host="0.0.0.0", port=8091))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8090)
    # import asyncio
    # asyncio.run(main())
