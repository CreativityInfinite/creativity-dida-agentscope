'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, User, Mail, Calendar, Shield, Activity, Settings, Edit, Camera, TrendingUp, Heart, MessageCircle, Bookmark, Clock } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [locale, setLocale] = React.useState('zh-CN');
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  // 如果未登录，重定向到登录页
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?lang=${locale}&callbackUrl=/account`);
    }
  }, [status, locale, router]);

  if (status === 'loading') {
    return (
      <div className="relative min-h-screen">
        <GradientBackground type="index" />
        <SiteNavigation locale={locale} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const displayName = user.name || user.email || '用户';
  const userEmail = user.email || '';
  const avatar = (user as any).picture || (user as any).avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;
  const createdAt = (user as any).createdAt || new Date().toISOString();
  const lastLoginAt = (user as any).lastLoginAt || new Date().toISOString();

  // 模拟用户统计数据
  const stats = {
    collections: 12,
    comments: 45,
    likes: 128,
    views: 1234
  };

  // 最近活动
  const recentActivities = [
    { type: 'collection', text: '收藏了工具 "ChatGPT"', time: '2 小时前', icon: Bookmark },
    { type: 'comment', text: '评论了 "AI 绘画工具对比"', time: '5 小时前', icon: MessageCircle },
    { type: 'like', text: '点赞了文章 "Midjourney 使用指南"', time: '1 天前', icon: Heart },
    { type: 'view', text: '浏览了 "Stable Diffusion 教程"', time: '2 天前', icon: TrendingUp }
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">账户仪表板</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* 用户信息卡片 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* 背景装饰 */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* 用户信息 */}
          <div className="px-6 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                {/* 头像 */}
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={avatar} alt={displayName} />
                    <AvatarFallback className="text-2xl">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                {/* 基本信息 */}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{displayName}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{userEmail}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>加入于 {new Date(createdAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">活跃用户</Badge>
                    <Badge variant="secondary">已验证邮箱</Badge>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Link href={`/profile?lang=${locale}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    查看资料
                  </Button>
                </Link>
                <Link href={`/settings?lang=${locale}`}>
                  <Button size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    编辑资料
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border bg-card p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="h-5 w-5 text-blue-500" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.collections}</div>
            <div className="text-sm text-muted-foreground">收藏工具</div>
          </div>
          <div className="rounded-xl border bg-card p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.comments}</div>
            <div className="text-sm text-muted-foreground">评论数</div>
          </div>
          <div className="rounded-xl border bg-card p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <Heart className="h-5 w-5 text-red-500" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.likes}</div>
            <div className="text-sm text-muted-foreground">获赞数</div>
          </div>
          <div className="rounded-xl border bg-card p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.views}</div>
            <div className="text-sm text-muted-foreground">浏览量</div>
          </div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 最近活动 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  最近活动
                </h2>
                <Link href={`/account/activity?lang=${locale}`} className="text-sm text-primary hover:underline">
                  查看全部
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1">{activity.text}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 账户信息 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                账户信息
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">账户状态</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    正常
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">邮箱验证</span>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                    已验证
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">最后登录</span>
                  <span className="text-xs">{new Date(lastLoginAt).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">账户类型</span>
                  <Badge>免费版</Badge>
                </div>
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">快捷操作</h3>
              <div className="space-y-2">
                <Link href={`/settings?lang=${locale}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition text-sm">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>账户设置</span>
                </Link>
                <Link href={`/account/activity?lang=${locale}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>活动记录</span>
                </Link>
                <Link href={`/profile/security?lang=${locale}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>安全设置</span>
                </Link>
              </div>
            </div>

            {/* 升级提示 */}
            <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-5">
              <h3 className="text-sm font-semibold mb-2">升级到专业版</h3>
              <p className="text-xs text-muted-foreground mb-4">解锁更多功能和特权</p>
              <Button size="sm" className="w-full">
                立即升级
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
