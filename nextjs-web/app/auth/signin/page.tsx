import { LoginForm } from '@component/LoginForm';
import { GradientBackground } from '@component/shared/GradientBackground';
import { cookies } from 'next/headers';
import { SimpleHeader } from '@component/SimpleHeader';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh-CN';
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      {/* 全局背景，与首页一致 */}
      <GradientBackground type="index" />
      {/* 顶部栏：左侧 Logo + 右侧语言切换 */}
      <SimpleHeader locale={locale} />
      {/* 居中登录卡片 */}
      <div className="relative z-10 w-full max-w-sm">
        <LoginForm locale={locale} />
      </div>
    </div>
  );
}
