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
import { Home, Bell, Mail, Smartphone, MessageSquare, TrendingUp, Star, Calendar, Users, Zap, Volume2, CheckCircle2 } from 'lucide-react';

export default function SettingsNotificationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  React.useEffect(() => {
    if (status === 'unauthenticated') router.push(`/auth/signin?callbackUrl=/settings/notifications&lang=${locale}`);
  }, [status, router, locale]);

  // 通知设置状态
  const [emailNotifications, setEmailNotifications] = React.useState({
    newTools: true,
    weeklyDigest: true,
    comments: true,
    likes: false,
    mentions: true,
    updates: true
  });

  const [pushNotifications, setPushNotifications] = React.useState({
    newTools: false,
    comments: true,
    likes: false,
    mentions: true,
    updates: false
  });

  const [frequency, setFrequency] = React.useState<'instant' | 'daily' | 'weekly'>('daily');

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

  const frequencyOptions = [
    { value: 'instant', label: '即时通知', description: '立即接收所有通知' },
    { value: 'daily', label: '每日摘要', description: '每天汇总一次通知' },
    { value: 'weekly', label: '每周摘要', description: '每周汇总一次通知' }
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
              <BreadcrumbLink asChild>
                <Link href={`/settings?lang=${locale}`} className="text-xs sm:text-sm">
                  系统设置
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">通知设置</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16">
        {/* 页面标题 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            通知设置
          </h1>
          <p className="text-sm text-muted-foreground mt-2">管理您的通知偏好和提醒设置</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 左侧：通知概览 */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border bg-card text-card-foreground p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">通知概览</h3>

              {/* 通知统计 */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">邮件通知</div>
                      <div className="text-xs text-muted-foreground">4 项已启用</div>
                    </div>
                  </div>
                  <Badge variant="secondary">开启</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">推送通知</div>
                      <div className="text-xs text-muted-foreground">2 项已启用</div>
                    </div>
                  </div>
                  <Badge variant="outline">部分开启</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">声音提醒</div>
                      <div className="text-xs text-muted-foreground">已关闭</div>
                    </div>
                  </div>
                  <Badge variant="outline">关闭</Badge>
                </div>
              </div>

              {/* 快捷操作 */}
              <div className="pt-6 border-t space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  全部开启
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  全部关闭
                </Button>
              </div>
            </div>
          </div>

          {/* 右侧：详细设置 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 通知频率 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">通知频率</h3>
              </div>

              <div className="space-y-3">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFrequency(option.value as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${
                      frequency === option.value ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="text-left">
                      <div className={`text-sm font-medium ${frequency === option.value ? 'text-primary' : 'text-foreground/80'}`}>{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                    </div>
                    {frequency === option.value && <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 邮件通知 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">邮件通知</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">新工具发布</div>
                      <div className="text-xs text-muted-foreground mt-1">当有新的 AI 工具发布时通知我</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, newTools: !emailNotifications.newTools })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.newTools ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.newTools ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">每周摘要</div>
                      <div className="text-xs text-muted-foreground mt-1">每周发送一次热门工具和更新摘要</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, weeklyDigest: !emailNotifications.weeklyDigest })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.weeklyDigest ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">评论回复</div>
                      <div className="text-xs text-muted-foreground mt-1">当有人回复我的评论时通知我</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, comments: !emailNotifications.comments })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.comments ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.comments ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">点赞通知</div>
                      <div className="text-xs text-muted-foreground mt-1">当有人点赞我的内容时通知我</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, likes: !emailNotifications.likes })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.likes ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.likes ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">提及通知</div>
                      <div className="text-xs text-muted-foreground mt-1">当有人在评论中提及我时通知我</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, mentions: !emailNotifications.mentions })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.mentions ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.mentions ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">产品更新</div>
                      <div className="text-xs text-muted-foreground mt-1">接收平台功能更新和改进通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications({ ...emailNotifications, updates: !emailNotifications.updates })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${emailNotifications.updates ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications.updates ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 推送通知 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">推送通知</h3>
                </div>
                <Badge variant="outline">需要授权</Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">在浏览器中接收实时推送通知。需要授权浏览器通知权限。</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">新工具发布</div>
                      <div className="text-xs text-muted-foreground mt-1">实时推送新工具发布通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications({ ...pushNotifications, newTools: !pushNotifications.newTools })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${pushNotifications.newTools ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pushNotifications.newTools ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">评论回复</div>
                      <div className="text-xs text-muted-foreground mt-1">实时推送评论回复通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications({ ...pushNotifications, comments: !pushNotifications.comments })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${pushNotifications.comments ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pushNotifications.comments ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">点赞通知</div>
                      <div className="text-xs text-muted-foreground mt-1">实时推送点赞通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications({ ...pushNotifications, likes: !pushNotifications.likes })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${pushNotifications.likes ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pushNotifications.likes ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">提及通知</div>
                      <div className="text-xs text-muted-foreground mt-1">实时推送提及通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications({ ...pushNotifications, mentions: !pushNotifications.mentions })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${pushNotifications.mentions ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pushNotifications.mentions ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">产品更新</div>
                      <div className="text-xs text-muted-foreground mt-1">实时推送产品更新通知</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPushNotifications({ ...pushNotifications, updates: !pushNotifications.updates })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${pushNotifications.updates ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pushNotifications.updates ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  请求浏览器通知权限
                </Button>
              </div>
            </div>

            {/* 免打扰模式 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-3 mb-4">
                <Volume2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">免打扰模式</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">在指定时间段内暂停所有通知</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">启用免打扰</div>
                    <div className="text-xs text-muted-foreground mt-1">暂停所有通知</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 opacity-50">
                  <div>
                    <label className="text-sm font-medium mb-2 block">开始时间</label>
                    <input type="time" value="22:00" disabled className="w-full px-3 py-2 text-sm rounded-lg border bg-muted" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">结束时间</label>
                    <input type="time" value="08:00" disabled className="w-full px-3 py-2 text-sm rounded-lg border bg-muted" />
                  </div>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">更改将自动保存</div>
              <Button size="sm">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                保存设置
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
