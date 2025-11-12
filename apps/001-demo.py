import agentscope

from agentscope_runtime.engine import AgentApp
from agentscope_runtime.engine.agents.agentscope_agent import AgentScopeAgent
from agentscope.model import DashScopeChatModel
from agentscope.agent import ReActAgent, UserAgent
from agentscope_runtime.engine.deployers import LocalDeployManager

# 密码：Psbc@1234
# Model: qwen-plus
# Key： sk-ea484c09bdb54a38ba3a51a5b7164318
# 文档：https://bailian.console.aliyun.com/?tab=api#/api/?type=model&url=2712576
# 连接LLM：https://dashscope.aliyuncs.com/compatible-mode/v1

# 创建 Agent
agent = AgentScopeAgent(
    name="DemoApp",
    model=DashScopeChatModel(
        model_name="qwen-plus",
        api_key="sk-ea484c09bdb54a38ba3a51a5b7164318",
        base_http_api_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    ),
    agent_config={"sys_prompt": "You are a helpful assistant."},
    agent_builder=UserAgent,
)

agentscope.init(
    studio_url="http://localhost:3000",
    project="DemoProject",
    name="DemoApp"
)


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
