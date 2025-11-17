# DIDA AI Agent Platform Makefile
# 道旅集团DIDA一站式API转Agent平台开发工具

.PHONY: help install dev test clean lint format run run-agent run-web build docker-build docker-run deploy backup check-env

# 默认目标
.DEFAULT_GOAL := help

# 项目配置
PROJECT_NAME := dida-agent-platform
PYTHON := python3
PIP := pip3
PORT := 8090
DOCKER_IMAGE := $(PROJECT_NAME):latest

# 颜色定义
RED := \033[31m
GREEN := \033[32m
YELLOW := \033[33m
BLUE := \033[34m
RESET := \033[0m

help: ## 显示帮助信息
	@echo "$(BLUE)DIDA AI Agent Platform - 开发工具$(RESET)"
	@echo "$(BLUE)=====================================$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)环境要求:$(RESET)"
	@echo "  - Python 3.8+"
	@echo "  - pip"
	@echo "  - 配置好的 .env 文件"

check-env: ## 检查环境配置
	@echo "$(BLUE)检查环境配置...$(RESET)"
	@if [ ! -f .env ]; then \
		echo "$(RED)错误: .env 文件不存在$(RESET)"; \
		echo "$(YELLOW)请复制 .env.example 为 .env 并配置相关参数$(RESET)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✓ .env 文件存在$(RESET)"
	@$(PYTHON) --version || (echo "$(RED)错误: Python 未安装$(RESET)" && exit 1)
	@echo "$(GREEN)✓ Python 环境正常$(RESET)"

install: check-env ## 安装项目依赖
	@echo "$(BLUE)安装项目依赖...$(RESET)"
	@$(PIP) install -r requirements.txt
	@echo "$(GREEN)✓ 依赖安装完成$(RESET)"

dev: install ## 安装开发依赖
	@echo "$(BLUE)安装开发依赖...$(RESET)"
	@$(PIP) install -r requirements-dev.txt 2>/dev/null || echo "$(YELLOW)注意: requirements-dev.txt 不存在，跳过开发依赖安装$(RESET)"
	@echo "$(GREEN)✓ 开发环境准备完成$(RESET)"

run: check-env ## 启动Web服务 (默认端口8090)
	@echo "$(BLUE)启动DIDA Agent Web服务...$(RESET)"
	@echo "$(YELLOW)服务地址: http://localhost:$(PORT)$(RESET)"
	@$(PYTHON) app.py

run-agent: check-env ## 启动命令行Agent
	@echo "$(BLUE)启动DIDA Agent命令行模式...$(RESET)"
	@$(PYTHON) agent.py

run-web: run ## 启动Web服务 (别名)

test: ## 运行测试
	@echo "$(BLUE)运行项目测试...$(RESET)"
	@if [ -f test_weather.py ]; then \
		echo "$(YELLOW)运行天气工具测试...$(RESET)"; \
		$(PYTHON) test_weather.py; \
	fi
	@if [ -f request-dida.py ]; then \
		echo "$(YELLOW)运行DIDA API测试...$(RESET)"; \
		$(PYTHON) request-dida.py; \
	fi
	@echo "$(YELLOW)测试和风天气工具...$(RESET)"
	@$(PYTHON) -c "from tools.otherapi.search_qweather_city_code import search_qweather_city_code; print('✓ QWeather工具导入成功')" 2>/dev/null || echo "$(RED)✗ QWeather工具导入失败$(RESET)"
	@echo "$(GREEN)✓ 测试完成$(RESET)"

lint: ## 代码质量检查
	@echo "$(BLUE)运行代码质量检查...$(RESET)"
	@if command -v flake8 >/dev/null 2>&1; then \
		echo "$(YELLOW)运行 flake8...$(RESET)"; \
		flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics || true; \
	else \
		echo "$(YELLOW)flake8 未安装，跳过检查$(RESET)"; \
	fi
	@if command -v pylint >/dev/null 2>&1; then \
		echo "$(YELLOW)运行 pylint...$(RESET)"; \
		pylint **/*.py --errors-only || true; \
	else \
		echo "$(YELLOW)pylint 未安装，跳过检查$(RESET)"; \
	fi
	@echo "$(GREEN)✓ 代码检查完成$(RESET)"

format: ## 代码格式化
	@echo "$(BLUE)格式化代码...$(RESET)"
	@if command -v black >/dev/null 2>&1; then \
		echo "$(YELLOW)使用 black 格式化...$(RESET)"; \
		black . --line-length 200; \
	else \
		echo "$(YELLOW)black 未安装，跳过格式化$(RESET)"; \
	fi
	@if command -v isort >/dev/null 2>&1; then \
		echo "$(YELLOW)使用 isort 整理导入...$(RESET)"; \
		isort .; \
	else \
		echo "$(YELLOW)isort 未安装，跳过导入整理$(RESET)"; \
	fi
	@echo "$(GREEN)✓ 代码格式化完成$(RESET)"

clean: ## 清理缓存和临时文件
	@echo "$(BLUE)清理项目文件...$(RESET)"
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@find . -type f -name "*.pyo" -delete 2>/dev/null || true
	@find . -type f -name "*.pyd" -delete 2>/dev/null || true
	@find . -type f -name ".coverage" -delete 2>/dev/null || true
	@find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	@rm -rf build/ dist/ .pytest_cache/ 2>/dev/null || true
	@rm -f agent_messages_*.json 2>/dev/null || true
	@echo "$(GREEN)✓ 清理完成$(RESET)"

requirements: ## 生成或更新requirements.txt
	@echo "$(BLUE)更新requirements.txt...$(RESET)"
	@$(PIP) freeze > requirements.txt
	@echo "$(GREEN)✓ requirements.txt 已更新$(RESET)"

docker-build: ## 构建Docker镜像
	@echo "$(BLUE)构建Docker镜像...$(RESET)"
	@docker build -t $(DOCKER_IMAGE) .
	@echo "$(GREEN)✓ Docker镜像构建完成: $(DOCKER_IMAGE)$(RESET)"

docker-run: ## 运行Docker容器
	@echo "$(BLUE)启动Docker容器...$(RESET)"
	@docker run -d \
		--name $(PROJECT_NAME) \
		-p $(PORT):$(PORT) \
		--env-file .env \
		$(DOCKER_IMAGE)
	@echo "$(GREEN)✓ Docker容器已启动: http://localhost:$(PORT)$(RESET)"

docker-stop: ## 停止Docker容器
	@echo "$(BLUE)停止Docker容器...$(RESET)"
	@docker stop $(PROJECT_NAME) 2>/dev/null || true
	@docker rm $(PROJECT_NAME) 2>/dev/null || true
	@echo "$(GREEN)✓ Docker容器已停止$(RESET)"

logs: ## 查看应用日志
	@echo "$(BLUE)显示应用日志...$(RESET)"
	@if [ -d logs ]; then \
		tail -f logs/*.log 2>/dev/null || echo "$(YELLOW)暂无日志文件$(RESET)"; \
	else \
		echo "$(YELLOW)logs目录不存在$(RESET)"; \
	fi

backup: ## 备份项目配置
	@echo "$(BLUE)备份项目配置...$(RESET)"
	@mkdir -p backup
	@cp .env backup/.env.backup.$(shell date +%Y%m%d_%H%M%S) 2>/dev/null || echo "$(YELLOW).env文件不存在$(RESET)"
	@cp -r tools backup/tools.backup.$(shell date +%Y%m%d_%H%M%S) 2>/dev/null || true
	@echo "$(GREEN)✓ 配置备份完成$(RESET)"

status: ## 显示项目状态
	@echo "$(BLUE)DIDA AI Agent Platform 状态$(RESET)"
	@echo "$(BLUE)================================$(RESET)"
	@echo "项目名称: $(PROJECT_NAME)"
	@echo "Python版本: $(shell $(PYTHON) --version 2>&1)"
	@echo "工作目录: $(shell pwd)"
	@echo ""
	@echo "$(YELLOW)工具统计:$(RESET)"
	@echo "内容API工具: $(shell find tools/contentapi -name '*.py' | wc -l | tr -d ' ') 个"
	@echo "预订API工具: $(shell find tools/bookingapi -name '*.py' | wc -l | tr -d ' ') 个"
	@echo "第三方API工具: $(shell find tools/otherapi -name '*.py' | wc -l | tr -d ' ') 个"
	@echo ""
	@echo "$(YELLOW)环境配置:$(RESET)"
	@if [ -f .env ]; then \
		echo "✓ .env 文件存在"; \
	else \
		echo "✗ .env 文件缺失"; \
	fi
	@if [ -f requirements.txt ]; then \
		echo "✓ requirements.txt 存在"; \
	else \
		echo "✗ requirements.txt 缺失"; \
	fi

init: ## 初始化项目环境
	@echo "$(BLUE)初始化DIDA AI Agent Platform...$(RESET)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)创建 .env 文件...$(RESET)"; \
		cp .env.example .env 2>/dev/null || echo "$(RED)请手动创建 .env 文件$(RESET)"; \
	fi
	@make install
	@echo "$(GREEN)✓ 项目初始化完成$(RESET)"
	@echo ""
	@echo "$(YELLOW)下一步:$(RESET)"
	@echo "1. 编辑 .env 文件，配置API密钥"
	@echo "2. 运行 'make run' 启动服务"
	@echo "3. 访问 http://localhost:$(PORT) 开始使用"

deploy: ## 部署检查清单
	@echo "$(BLUE)DIDA AI Agent Platform 部署检查$(RESET)"
	@echo "$(BLUE)====================================$(RESET)"
	@echo ""
	@echo "$(YELLOW)环境检查:$(RESET)"
	@make check-env
	@echo ""
	@echo "$(YELLOW)代码检查:$(RESET)"
	@make lint
	@echo ""
	@echo "$(YELLOW)测试检查:$(RESET)"
	@make test
	@echo ""
	@echo "$(GREEN)✓ 部署检查完成$(RESET)"
	@echo ""
	@echo "$(YELLOW)部署命令建议:$(RESET)"
	@echo "  生产环境: gunicorn -w 4 -b 0.0.0.0:$(PORT) app:app"
	@echo "  Docker: make docker-build && make docker-run"

install-dev-tools: ## 安装开发工具
	@echo "$(BLUE)安装开发工具...$(RESET)"
	@$(PIP) install black isort flake8 pylint pytest
	@echo "$(GREEN)✓ 开发工具安装完成$(RESET)"

qweather-test: ## 测试和风天气工具
	@echo "$(BLUE)测试和风天气工具集成...$(RESET)"
	@$(PYTHON) -c "import sys; sys.path.append('.'); \
	from tools.otherapi.search_qweather_city_code import search_qweather_city_code; print('✓ 城市搜索工具'); \
	from tools.otherapi.get_qweather_forecast import get_qweather_forecast; print('✓ 实时天气工具'); \
	from tools.otherapi.get_qweather_daily_forecast import get_qweather_daily_forecast; print('✓ 多日预报工具'); \
	from tools.otherapi.get_qweather_air_quality import get_qweather_air_quality; print('✓ 空气质量工具'); \
	print('$(GREEN)✓ 所有QWeather工具导入成功$(RESET)')" || echo "$(RED)✗ QWeather工具导入失败$(RESET)"

dida-test: ## 测试DIDA API工具
	@echo "$(BLUE)测试DIDA API工具集成...$(RESET)"
	@$(PYTHON) -c "import sys; sys.path.append('.'); \
	from tools.contentapi.get_countries import get_countries; print('✓ 国家列表工具'); \
	from tools.contentapi.get_destinations import get_destinations; print('✓ 目的地查询工具'); \
	from tools.bookingapi.get_lowest_price import get_lowest_price; print('✓ 价格查询工具'); \
	print('$(GREEN)✓ 所有DIDA工具导入成功$(RESET)')" || echo "$(RED)✗ DIDA工具导入失败$(RESET)"

all-tests: dida-test qweather-test test ## 运行所有测试

# 开发快捷命令
dev-setup: init install-dev-tools ## 完整开发环境设置
	@echo "$(GREEN)🎉 开发环境设置完成！$(RESET)"
	@echo "$(YELLOW)快速开始:$(RESET)"
	@echo "  make run     # 启动Web服务"
	@echo "  make test    # 运行测试"
	@echo "  make format  # 格式化代码"