import agentscope
import os

from dotenv import load_dotenv

# 请在根目录执行python脚本，不然会读取不到.env文件
load_dotenv('.env')


def init_agentstudio(project: str = "DIDA-AIDA-Project2", name: str = "DemoRuntimeApp"):
    agentscope.init(
        studio_url=os.environ["AGENTSCOPE_STUDIO_URL"],
        project=project,
        name=name,
    )
