import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Markdown } from 'components/Markdown';
import { SimpleHeader } from '@component/SimpleHeader';
import { BackButton } from '@component/shared/BackButton';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
  title: '服务条款 - Creativity Hunt',
  description: 'Creativity Hunt 服务条款和使用协议'
};

const md = `# 服务条款

最后更新时间：2025年10月10日

## 1. 接受条款
欢迎使用 Creativity Hunt（"我们"、"我们的"或"服务"）。通过访问或使用我们的网站和服务，您（"用户"或"您"）同意受本服务条款（"条款"）的约束。
如果您不同意这些条款，请不要使用我们的服务。

## 2. 服务描述
Creativity Hunt 是一个发现和分享 AI 工具的平台。我们提供：
- AI 工具的发现和浏览功能
- 工具评价和评论系统
- 用户账户和个人资料管理
- 社区讨论和分享功能

## 3. 用户账户
为了使用某些功能，您需要创建一个账户。您同意：
- 提供准确、完整的注册信息
- 维护账户信息的准确性
- 保护您的账户密码安全
- 对您账户下的所有活动负责

## 4. 用户行为准则
使用我们的服务时，您不得：
- 发布虚假、误导性或恶意内容
- 侵犯他人的知识产权
- 进行垃圾邮件或滥用行为
- 尝试未经授权访问系统或数据
- 干扰服务的正常运行

## 5. 内容和知识产权
您保留对您提交内容的所有权，但授予我们使用、展示和分发该内容的许可。
我们的服务和所有相关知识产权归 Creativity Hunt 所有。

## 6. 隐私
您的隐私对我们很重要。请查看我们的 [隐私政策](/legal/privacy) 了解我们如何收集、使用和保护您的信息。

## 7. 免责声明
我们的服务按 "现状" 提供，不提供任何明示或暗示的保证。我们不保证服务的可用性、准确性或可靠性。

## 8. 责任限制
在法律允许的最大范围内，Creativity Hunt 不对任何间接、偶然、特殊或后果性损害承担责任。

## 9. 服务终止
我们保留随时暂停或终止您的账户和访问权限的权利，特别是在违反这些条款的情况下。

## 10. 条款变更
我们可能会不时更新这些条款。重大变更将通过电子邮件或服务通知您。继续使用服务即表示接受修订后的条款。

## 11. 联系我们
如果您对这些条款有任何疑问，请通过以下方式联系我们：
- 邮箱：support@creativityinfinite.com
- 地址：中国广东省深圳市
`;

export default async function TermsOfServicePage() {
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
