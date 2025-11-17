import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Markdown } from 'components/Markdown';
import { SimpleHeader } from '@component/SimpleHeader';
import { BackButton } from '@component/shared/BackButton';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
  title: '隐私政策 - Creativity Hunt',
  description: 'Creativity Hunt 隐私政策和数据保护说明'
};

const md = `# 隐私政策

最后更新时间：2024年10月10日

## 1. 信息收集
我们收集以下类型的信息：

### 个人信息
- 邮箱地址（用于账户创建和通信）
- 用户名和个人资料信息
- 您选择提供的其他信息

### 使用信息
- 浏览历史和使用模式
- 设备信息和技术数据
- IP 地址和位置信息

## 2. 信息使用
我们使用收集的信息来：
- 提供和改进我们的服务
- 处理您的请求和交易
- 发送重要通知和更新
- 个性化您的体验
- 分析使用趋势和改进功能
- 防止欺诈和滥用

## 3. 信息共享
我们不会出售您的个人信息。我们可能在以下情况下共享信息：
- 获得您的明确同意
- 与服务提供商（如托管服务）
- 遵守法律要求
- 保护我们的权利和安全

## 4. 数据安全
我们采取适当的技术和组织措施来保护您的信息：
- 加密传输和存储
- 访问控制和身份验证
- 定期安全审计
- 员工培训和保密协议

## 5. Cookie 和跟踪技术
我们使用 Cookie 和类似技术来：
- 记住您的偏好设置
- 分析网站使用情况
- 提供个性化内容
- 改善用户体验

您可以通过浏览器设置管理 Cookie 偏好。

## 6. 第三方服务
我们的服务可能包含第三方链接或集成：
- GitHub OAuth 登录
- Apple 登录
- 分析服务
- 外部 AI 工具链接

这些第三方服务有自己的隐私政策，我们建议您查看。

## 7. 您的权利
您对您的个人信息享有以下权利：
- 访问和查看您的数据
- 更正不准确的信息
- 删除您的账户和数据
- 限制数据处理
- 数据可携带性
- 撤回同意

## 8. 数据保留
我们保留您的信息时间：
- 账户活跃期间
- 提供服务所需的时间
- 法律要求的保留期
- 解决争议所需的时间

## 9. 儿童隐私
我们的服务不面向13岁以下的儿童。如果我们发现收集了儿童的个人信息，我们将立即删除。

## 10. 国际数据传输
您的信息可能会被传输到您所在国家/地区以外的地方进行处理。我们确保适当的保护措施。

## 11. 政策变更
我们可能会更新此隐私政策。重大变更将通过电子邮件或服务通知您。

## 12. 联系我们
如果您对此隐私政策有任何疑问或想行使您的权利，请联系我们：
- 邮箱：support@creativityinfinite.com
- 地址：中国广东省深圳市
`;

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh-CN';

  return (
    <div className="relative min-h-svh bg-background">
      <GradientBackground type="index" />
      <BackButton className="fixed top-26 left-20 z-30" />
      <SimpleHeader locale={locale} fixed={true} />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Markdown>{md}</Markdown>
        </div>
      </section>
      <BackToTop />
    </div>
  );
}
