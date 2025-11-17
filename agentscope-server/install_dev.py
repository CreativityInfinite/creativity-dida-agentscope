#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
开发模式安装脚本

运行此脚本将以开发模式安装当前项目，这样可以：
1. 解决模块导入路径问题
2. 允许直接修改代码而无需重新安装
3. 正确设置Python包结构
"""

import subprocess
import sys
import os

def install_in_dev_mode():
    """以开发模式安装项目"""
    try:
        print("正在以开发模式安装项目...")
        print("这将解决模块导入路径问题")
        
        # 使用 pip install -e . 以开发模式安装
        result = subprocess.run([
            sys.executable, "-m", "pip", "install", "-e", "."
        ], check=True, capture_output=True, text=True)
        
        print("✅ 项目已成功以开发模式安装！")
        print("\n现在你可以从任何地方导入项目模块：")
        print("  from utils.agentstudio import init_agentstudio")
        print("  from workflow.workflow_conversation import run_conversation")
        print("  from tools import *")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ 安装失败: {e}")
        print(f"错误输出: {e.stderr}")
        return False
    except Exception as e:
        print(f"❌ 发生错误: {e}")
        return False

def check_installation():
    """检查安装是否成功"""
    try:
        # 尝试导入项目模块
        import utils.agentstudio
        print("✅ 模块导入测试成功！")
        return True
    except ImportError as e:
        print(f"❌ 模块导入测试失败: {e}")
        return False

if __name__ == "__main__":
    print("=== Creativity AgentScope 开发环境设置 ===\n")
    
    # 确保在项目根目录
    if not os.path.exists("pyproject.toml"):
        print("❌ 错误：请在项目根目录运行此脚本")
        sys.exit(1)
    
    # 安装项目
    if install_in_dev_mode():
        print("\n=== 测试安装 ===")
        if check_installation():
            print("\n🎉 所有设置完成！现在可以正常运行你的脚本了。")
            print("\n运行示例：")
            print("  python workflow/workflow_conversation.py")
        else:
            print("\n⚠️ 安装完成但测试失败，可能需要重启终端或IDE")
    else:
        print("\n❌ 安装失败，请检查错误信息")
        sys.exit(1)