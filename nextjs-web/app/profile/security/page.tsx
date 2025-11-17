'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Button } from '@component/ui/button';
import { Input } from '@component/ui/input';
import { Badge } from '@component/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@component/ui/breadcrumb';
import { BackToTop } from '@component/BackToTop';
import { Home, Shield, Key, Smartphone, AlertTriangle, CheckCircle2, Clock, MapPin, Monitor, Chrome, Apple } from 'lucide-react';

export default function ProfileSecurityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  React.useEffect(() => {
    if (status === 'unauthenticated') router.push(`/auth/signin?callbackUrl=/profile/security&lang=${locale}`);
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

  // 模拟登录历史数据
  const loginHistory = [
    {
      id: 1,
      device: 'Chrome on macOS',
      icon: Chrome,
      location: '北京, 中国',
      ip: '192.168.1.1',
      time: '2024-10-24 14:30',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      icon: Apple,
      location: '上海, 中国',
      ip: '192.168.1.2',
      time: '2024-10-23 09:15',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      icon: Monitor,
      location: '深圳, 中国',
      ip: '192.168.1.3',
      time: '2024-10-22 18:45',
      current: false
    }
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
                <Link href={`/profile?lang=${locale}`} className="text-xs sm:text-sm">
                  个人资料
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">安全设置</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16">
        {/* 页面标题 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            安全设置
          </h1>
          <p className="text-sm text-muted-foreground mt-2">管理您的账户安全设置和登录活动</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 左侧：安全状态概览 */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border bg-card text-card-foreground p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">安全状态</h3>

              {/* 安全评分 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">安全评分</span>
                  <span className="text-2xl font-bold text-primary">75/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-primary w-3/4 rounded-full"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">您的账户安全性良好，建议启用两步验证以提高安全性。</p>
              </div>

              {/* 安全检查项 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">密码强度</div>
                    <div className="text-xs text-muted-foreground">您的密码强度良好</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">两步验证</div>
                    <div className="text-xs text-muted-foreground">未启用，建议开启</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">邮箱验证</div>
                    <div className="text-xs text-muted-foreground">已验证</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">登录活动</div>
                    <div className="text-xs text-muted-foreground">无异常活动</div>
                  </div>
                </div>
              </div>

              {/* 快速操作 */}
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  查看安全建议
                </Button>
              </div>
            </div>
          </div>

          {/* 右侧：详细设置 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 密码设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">密码设置</h3>
                </div>
                <Badge variant="secondary">已设置</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">当前密码</label>
                  <Input type="password" placeholder="输入当前密码" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">新密码</label>
                  <Input type="password" placeholder="输入新密码" />
                  <p className="text-xs text-muted-foreground mt-1">密码至少 8 个字符，包含大小写字母和数字</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">确认新密码</label>
                  <Input type="password" placeholder="再次输入新密码" />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm">更新密码</Button>
                  <Button variant="outline" size="sm">
                    取消
                  </Button>
                </div>
              </div>
            </div>

            {/* 两步验证 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">两步验证</h3>
                </div>
                <Badge variant="outline">未启用</Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">为您的账户添加额外的安全保护层。启用后，登录时需要输入手机验证码。</p>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-amber-900 dark:text-amber-100">建议启用两步验证</div>
                  <div className="text-amber-800 dark:text-amber-200 mt-1">两步验证可以大大提高您账户的安全性，防止未经授权的访问。</div>
                </div>
              </div>

              <Button size="sm">
                <Smartphone className="h-4 w-4 mr-2" />
                启用两步验证
              </Button>
            </div>

            {/* 登录历史 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">登录历史</h3>
                </div>
                <Button variant="ghost" size="sm">
                  查看全部
                </Button>
              </div>

              <div className="space-y-4">
                {loginHistory.map((login) => {
                  const Icon = login.icon;
                  return (
                    <div key={login.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-sm font-medium">{login.device}</div>
                          {login.current && (
                            <Badge variant="secondary" className="text-xs">
                              当前设备
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {login.location}
                          </div>
                          <span>·</span>
                          <div>{login.ip}</div>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {login.time}
                          </div>
                        </div>
                      </div>

                      {!login.current && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                          撤销
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 危险操作 */}
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">危险操作</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-red-900 dark:text-red-100">注销所有设备</div>
                    <div className="text-xs text-red-800 dark:text-red-200 mt-1">将您从所有设备上登出，需要重新登录</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                    注销全部
                  </Button>
                </div>

                <div className="border-t border-red-200 dark:border-red-900 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-red-900 dark:text-red-100">删除账户</div>
                      <div className="text-xs text-red-800 dark:text-red-200 mt-1">永久删除您的账户和所有数据，此操作不可恢复</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                      删除账户
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
