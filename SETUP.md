# 项目设置说明

## 问题解决方案

使用 `pyproject.toml` 配置文件来解决模块导入路径问题，这是现代Python项目的标准做法。

## 快速开始

### 方法1：自动安装（推荐）

运行安装脚本：

```bash
python install_dev.py
```

### 方法2：手动安装

在项目根目录运行：

```bash
# 以开发模式安装项目
pip install -e .
```

## 安装后的优势

1. **解决导入问题**：可以从任何位置正确导入项目模块
2. **开发友好**：修改代码无需重新安装
3. **标准化**：符合Python项目最佳实践
4. **可扩展**：便于添加新的包和模块

## 项目结构

```
creativity-agentscope/
├── pyproject.toml          # 项目配置文件
├── utils/
│   ├── __init__.py
│   └── agentstudio.py
├── workflow/
│   ├── __init__.py
│   └── workflow_conversation.py
├── tools/
│   ├── __init__.py
│   └── ...
└── ...
```

## 验证安装

运行以下命令验证安装是否成功：

```bash
python -c "from utils.agentstudio import init_agentstudio; print('导入成功！')"
```

## 运行项目

现在可以正常运行你的脚本：

```bash
python workflow/workflow_conversation.py
```

## 依赖管理

项目依赖在 `pyproject.toml` 中管理，包括：

- 生产依赖：agentscope, dashscope 等
- 开发依赖：pytest, black, flake8 等

安装额外的开发依赖：

```bash
pip install -e ".[dev]"
```