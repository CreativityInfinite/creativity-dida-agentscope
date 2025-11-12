# DIDA AI Agent Platform

> 道旅集团DIDA一站式API转Agent平台 - 提供一系列针对API的包装来实现业务的AI化落地

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![AgentScope](https://img.shields.io/badge/AgentScope-Latest-green.svg)](https://github.com/modelscope/agentscope)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 项目概述

DIDA AI Agent Platform 是为道旅集团量身打造的智能代理平台，通过将传统API接口包装为AI Agent工具，实现业务流程的AI化转型。平台基于AgentScope框架构建，提供了完整的API到AI Agent的转换解决方案。

### 核心价值

- 🚀 **快速AI化**: 将现有API快速转换为AI Agent可调用的工具
- 🔧 **灵活集成**: 支持多种API类型和业务场景的集成
- 🤖 **智能交互**: 通过自然语言与业务系统进行交互
- 📈 **业务赋能**: 提升业务效率，降低人工操作成本

## 🏗️ 系统架构

```
DIDA AI Agent Platform
├── 🤖 DidaAgent (核心AI代理)
│   ├── 通义千问大模型 (Qwen-Plus)
│   ├── ReAct推理框架
│   └── 并行工具调用
├── 🛠️ 工具集成层
│   ├── 内容API工具 (contentapi/)
│   ├── 预订API工具 (bookingapi/)
│   └── 第三方API工具 (otherapi/)
├── 🌐 Web服务层
│   ├── SSE流式响应
│   ├── RESTful API接口
│   └── AgentScope Studio集成
└── 🔧 基础设施层
    ├── 环境配置管理
    ├── 请求处理工具
    └── 日志监控系统
```

## ✨ 核心功能

### 🌍 旅游内容服务
- **国家列表查询**: 获取DIDA平台支持的全球国家列表
- **目的地查询**: 根据国家代码获取具体目的地信息
- **酒店信息服务**: 获取酒店列表和详细信息
- **多语言支持**: 支持中文、英文、日文、韩文等多种语言

### 🏨 酒店相关服务
- **酒店列表**: 根据国家代码获取授权访问的酒店ID列表
- **酒店详情**: 获取酒店基本信息、政策、设施等详细数据
- **数据字典**: 提供用餐类型、床型、窗型、吸烟类型、景观类型等标准化数据

### 🌤️ 天气信息服务
- **实时天气**: 基于OpenWeatherMap API的全球天气查询
- **多单位支持**: 摄氏度、华氏度、开尔文度温度单位
- **详细信息**: 温度、湿度、风速、气压、能见度等完整天气数据

### 💻 系统环境服务
- **时间日期**: 获取当前时间、日期、时区、星期等信息
- **系统状态**: CPU使用率、内存使用情况、磁盘空间、网络状态
- **运行环境**: Python版本、系统平台、环境变量、进程信息
- **性能监控**: 系统负载、启动时间、运行时长等监控数据

### 🔄 智能代理能力
- **自然语言理解**: 理解用户的自然语言查询需求
- **并行工具调用**: 同时调用多个API提升响应速度
- **上下文记忆**: 保持对话上下文，支持连续交互
- **错误处理**: 完善的异常处理和用户友好的错误提示

## 🚀 快速开始

### 环境要求

- Python 3.8+
- pip 或 pnpm (推荐使用pnpm)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd creativity-agentscope
```

2. **安装依赖**
```bash
pip install -r requirements.txt
```

3. **配置环境变量**

创建并配置 `.env` 文件：
```env
# 通义千问API配置
DASHSCOPE_API_KEY=your_dashscope_api_key
DASHSCOPE_HTTP_API_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# AgentScope Studio配置
AGENTSCOPE_STUDIO_URL=http://120.55.250.36:3000

# DIDA API配置
DIDA_CLIENT_ID=DidaApiTestID
DIDA_LICENSE_KEY=TestKey

# OpenWeatherMap API配置 (可选)
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

4. **启动服务**

**Web服务模式**:
```bash
python app.py
```
服务将在 `http://localhost:8090` 启动

**命令行模式**:
```bash
python agent.py
```

### 🔧 API密钥获取

#### 通义千问API密钥
1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 注册并创建API密钥
3. 将密钥配置到 `DASHSCOPE_API_KEY`

#### OpenWeatherMap API密钥 (可选)
1. 访问 [OpenWeatherMap](https://openweathermap.org/api)
2. 注册免费账户获取API密钥
3. 将密钥配置到 `OPENWEATHERMAP_API_KEY`

## 📖 使用指南

### Web API接口

**端点**: `POST /process`
**响应格式**: Server-Sent Events (SSE)

**示例请求**:
```bash
curl -X POST http://localhost:8090/process \
  -H "Content-Type: application/json" \
  -d '{"message": "帮我查询一下中国的目的地列表，然后告诉我北京的天气情况"}'
```

### 自然语言交互示例

```
用户: "你好，请帮我获取DIDA支持的国家列表"
DidaAgent: 正在为您查询DIDA平台支持的国家列表...

用户: "帮我查询中国的目的地信息"
DidaAgent: 正在查询中国(CN)的目的地列表...

用户: "我需要查询日本的酒店列表"
DidaAgent: 正在为您查询日本(JP)的酒店列表...

用户: "帮我获取酒店ID为3912的详细信息"
DidaAgent: 正在查询酒店详细信息...

用户: "我想了解一下用餐类型和床型的数据字典"
DidaAgent: 我来为您查询用餐类型和床型的数据字典...

用户: "北京现在的天气怎么样？"
DidaAgent: 正在查询北京的实时天气信息...

用户: "帮我查看一下当前系统的运行状态"
DidaAgent: 正在收集系统环境信息，包括时间、CPU、内存等状态...

用户: "现在是几点？系统运行情况如何？"
DidaAgent: 我来为您查询当前时间和系统运行状态...

用户: "我想了解日本的旅游目的地，顺便看看东京的天气"
DidaAgent: 我来同时为您查询日本的目的地列表和东京的天气情况...
```

## 🛠️ 工具开发指南

### 添加新的API工具

1. **创建工具文件**
```python
# tools/newapi/your_tool.py
from agentscope.message import TextBlock
from agentscope.tool import ToolResponse
from utils.request import Get, Post

def your_api_function(param1: str, param2: str) -> ToolResponse:
    """工具函数描述
    
    Args:
        param1 (str): 参数1描述
        param2 (str): 参数2描述
    """
    
    # API调用逻辑
    result = Get('/api/endpoint', params={"param1": param1, "param2": param2})
    
    return ToolResponse(
        content=[
            TextBlock(
                type="text",
                text=f"查询结果: {result}",
            ),
        ],
    )
```

2. **注册工具**
在 `app.py` 和 `agent.py` 中导入并注册：
```python
from tools.newapi.your_tool import your_api_function

toolkit.register_tool_function(your_api_function)
```

### API请求工具

项目提供了统一的API请求工具 (`utils/request.py`)：

```python
from utils.request import Get, Post

# GET请求
result = Get('/api/endpoint', params={"key": "value"})

# POST请求
result = Post('/api/endpoint', params={"key": "value"}, data={"body": "data"})
```

## 📁 项目结构

```
creativity-agentscope/
├── 📄 README.md                 # 项目说明文档
├── 📄 requirements.txt          # Python依赖
├── 📄 .env                 # 环境配置文件
├── 🐍 app.py                    # Web服务入口
├── 🐍 agent.py                  # 命令行代理入口
├── 🐍 test_weather.py          # 天气工具测试
├── 📁 tools/                   # 工具集合
│   ├── 📁 contentapi/          # 内容API工具
│   │   ├── get_countries.py    # 国家列表查询
│   │   ├── get_destinations.py # 目的地查询
│   │   ├── get_hotel_list.py   # 酒店列表查询
│   │   ├── get_hotel_details.py# 酒店详情查询
│   │   ├── get_meal_types.py   # 用餐类型数据字典
│   │   ├── get_bed_types.py    # 床型数据字典
│   │   ├── get_window_types.py # 窗型数据字典
│   │   ├── get_smoking_types.py# 吸烟类型数据字典
│   │   └── get_view_types.py   # 景观类型数据字典
│   ├── 📁 bookingapi/          # 预订API工具 (待开发)
│   └── 📁 otherapi/            # 第三方API工具
│       ├── get_weather.py      # 天气查询
│       └── get_environment.py  # 系统环境信息
├── 📁 utils/                   # 工具库
│   └── request.py              # API请求工具
├── 📁 agents/                  # 代理配置
├── 📁 apps/                    # 应用模块
├── 📁 examples/                # 示例代码
├── 📁 logs/                    # 日志文件
└── 📁 workflow/                # 工作流配置
```

## 🔍 测试和调试

### 运行测试

```bash
# 测试天气工具
python test_weather.py

# 测试DIDA API
python request-dida.py
```

### 调试模式

启动调试模式可以查看详细的交互日志：

```python
# 在agent.py中启用详细日志
await analyze_llm_interaction()
await export_messages_to_json()
```

### 日志查看

- 应用日志: `logs/` 目录
- Agent消息: 自动导出的JSON文件 (`agent_messages_*.json`)

## 🚀 部署指南

### 本地开发部署

```bash
python app.py
```

### 生产环境部署

1. **使用Gunicorn**:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8090 app:app
```

2. **使用Docker** (可选):
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8090

CMD ["python", "app.py"]
```

### 环境变量配置

生产环境建议使用环境变量而非配置文件：

```bash
export DASHSCOPE_API_KEY="your_production_key"
export AGENTSCOPE_STUDIO_URL="your_production_studio_url"
export DIDA_CLIENT_ID="your_production_client_id"
export DIDA_LICENSE_KEY="your_production_license_key"
```

## 🤝 贡献指南

### 开发规范

1. **代码风格**: 使用项目配置的Prettier格式化
2. **提交规范**: 使用语义化提交信息
3. **测试要求**: 新功能需要包含相应测试
4. **文档更新**: 重要更改需要更新文档

### 贡献流程

1. Fork项目
2. 创建功能分支: `git checkout -b feature/new-api-tool`
3. 提交更改: `git commit -m 'feat: add new API tool'`
4. 推送分支: `git push origin feature/new-api-tool`
5. 创建Pull Request

## 📊 性能特性

- **并行处理**: 支持同时调用多个API工具
- **流式响应**: SSE实现实时响应反馈
- **内存优化**: 高效的对话上下文管理
- **错误恢复**: 完善的异常处理和重试机制

## 🔒 安全特性

- **API密钥管理**: 安全的环境变量配置
- **请求验证**: 完整的输入参数验证
- **错误隐藏**: 生产环境下的敏感信息保护
- **访问控制**: 基于角色的API访问控制

## 📈 扩展计划

### 短期目标
- [ ] 完善预订API工具集成
- [ ] 增加更多第三方服务集成
- [ ] 优化响应速度和准确性
- [ ] 完善错误处理和用户体验

### 长期规划
- [ ] 多租户支持
- [ ] 工具市场和插件系统
- [ ] 可视化配置界面
- [ ] 企业级监控和分析

## 🐛 问题反馈

如果您遇到任何问题或有改进建议，请通过以下方式联系我们：

- 创建 [GitHub Issue](../../issues)
- 发送邮件至项目维护者
- 在项目讨论区参与讨论

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [AgentScope](https://github.com/modelscope/agentscope) - 强大的多智能体框架
- [通义千问](https://dashscope.aliyuncs.com/) - 优秀的大语言模型服务
- [OpenWeatherMap](https://openweathermap.org/) - 可靠的天气数据服务
- 道旅集团技术团队的支持与指导

---

<div align="center">
  <strong>🌟 如果这个项目对您有帮助，请给我们一个星标！</strong>
</div>

<div align="center">
  <p>由道旅集团技术团队精心打造 ❤️</p>
  <p><em>让AI赋能传统业务，创造更大价值</em></p>
</div>