'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Button } from '@component/ui/button';
import { Badge } from '@component/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@component/ui/breadcrumb';
import { BackToTop } from '@component/BackToTop';
import { Home, Settings, Globe, Moon, Sun, Monitor, Palette, Type, Zap, Bell, Shield, Database, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [locale, setLocale] = React.useState('zh-CN');
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = React.useState('zh-CN');
  const [fontSize, setFontSize] = React.useState('medium');
  const [autoSave, setAutoSave] = React.useState(true);

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setLanguage(langFromUrl);
  }, [searchParams]);

  React.useEffect(() => {
    if (status === 'unauthenticated') router.push(`/auth/signin?callbackUrl=/settings&lang=${locale}`);
  }, [status, router, locale]);

  if (status === 'loading')
    return (
      <div className="relative min-h-screen">
        <GradientBackground type="index" />
        <SiteNavigation locale={locale} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );

  if (!session?.user) return null;

  const themeOptions = [
    { value: 'light', label: '浅色', icon: Sun },
    { value: 'dark', label: '深色', icon: Moon },
    { value: 'system', label: '跟随系统', icon: Monitor }
  ];

  const languageOptions = [
    { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: '小', size: 'text-sm' },
    { value: 'medium', label: '中', size: 'text-base' },
    { value: 'large', label: '大', size: 'text-lg' }
  ];

  return (
    <div className="relative">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      {/* 面包屑 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumb className="mb-4 sm:mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/account?lang=${locale}`} className="text-xs sm:text-sm">
                  账户
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">系统设置</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16">
        {/* 页面标题 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            系统设置
          </h1>
          <p className="text-sm text-muted-foreground mt-2">自定义您的应用程序设置和偏好</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 左侧：设置导航 */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border bg-card text-card-foreground p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">设置分类</h3>

              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm">
                  <Settings className="h-4 w-4" />
                  常规设置
                </button>

                <Link
                  href={`/settings/notifications?lang=${locale}`}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-foreground/80 hover:text-foreground text-sm transition"
                >
                  <Bell className="h-4 w-4" />
                  通知设置
                </Link>

                <Link
                  href={`/profile/security?lang=${locale}`}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-foreground/80 hover:text-foreground text-sm transition"
                >
                  <Shield className="h-4 w-4" />
                  安全设置
                </Link>

                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-foreground/80 hover:text-foreground text-sm transition">
                  <Database className="h-4 w-4" />
                  数据管理
                </button>
              </nav>

              {/* 快捷操作 */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出数据
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  清除缓存
                </Button>
              </div>
            </div>
          </div>

          {/* 右侧：详细设置 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 外观设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">外观设置</h3>
              </div>

              <div className="space-y-6">
                {/* 主题选择 */}
                <div>
                  <label className="text-sm font-medium mb-3 block">主题模式</label>
                  <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value as any)}
                          className={`relative p-4 rounded-lg border-2 transition ${
                            theme === option.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                          }`}
                        >
                          <Icon className={`h-6 w-6 mx-auto mb-2 ${theme === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className={`text-xs font-medium text-center ${theme === option.value ? 'text-primary' : 'text-foreground/80'}`}>{option.label}</div>
                          {theme === option.value && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 字体大小 */}
                <div>
                  <label className="text-sm font-medium mb-3 block">字体大小</label>
                  <div className="grid grid-cols-3 gap-3">
                    {fontSizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFontSize(option.value)}
                        className={`p-3 rounded-lg border-2 transition ${
                          fontSize === option.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                        }`}
                      >
                        <div className={`${option.size} font-medium text-center ${fontSize === option.value ? 'text-primary' : 'text-foreground/80'}`}>Aa</div>
                        <div className={`text-xs text-center mt-1 ${fontSize === option.value ? 'text-primary' : 'text-muted-foreground'}`}>{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 语言设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">语言设置</h3>
              </div>

              <div className="space-y-3">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLanguage(option.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                      language === option.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.flag}</span>
                      <span className={`text-sm font-medium ${language === option.value ? 'text-primary' : 'text-foreground/80'}`}>{option.label}</span>
                    </div>
                    {language === option.value && <CheckCircle2 className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 性能设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">性能设置</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">自动保存</div>
                    <div className="text-xs text-muted-foreground mt-1">自动保存您的更改和偏好设置</div>
                  </div>
                  <button onClick={() => setAutoSave(!autoSave)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${autoSave ? 'bg-primary' : 'bg-muted'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">动画效果</div>
                    <div className="text-xs text-muted-foreground mt-1">启用界面动画和过渡效果</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">预加载内容</div>
                    <div className="text-xs text-muted-foreground mt-1">提前加载内容以提高浏览速度</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">图片懒加载</div>
                    <div className="text-xs text-muted-foreground mt-1">延迟加载图片以节省流量</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>
              </div>
            </div>

            {/* 显示设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Type className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">显示设置</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">紧凑模式</div>
                    <div className="text-xs text-muted-foreground mt-1">减少界面元素间距，显示更多内容</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">显示工具评分</div>
                    <div className="text-xs text-muted-foreground mt-1">在工具卡片上显示评分信息</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">显示工具标签</div>
                    <div className="text-xs text-muted-foreground mt-1">在工具卡片上显示标签</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">显示工具描述</div>
                    <div className="text-xs text-muted-foreground mt-1">在工具卡片上显示简短描述</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">更改将自动保存</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  重置默认
                </Button>
                <Button size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
