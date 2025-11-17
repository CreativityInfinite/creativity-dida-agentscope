'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Avatar, AvatarImage, AvatarFallback } from '@component/ui/avatar';
import { Button } from '@component/ui/button';
import { Input } from '@component/ui/input';
import { Textarea } from '@component/ui/textarea';
import { Badge } from '@component/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@component/ui/breadcrumb';
import { BackToTop } from '@component/BackToTop';
import { Home, User, Mail, Calendar, MapPin, Link2, Twitter, Github, Linkedin, Edit2, Save, X, Shield, Award, Star, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [locale, setLocale] = React.useState('zh-CN');
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  React.useEffect(() => {
    if (status === 'unauthenticated') router.push(`/auth/signin?callbackUrl=/profile&lang=${locale}`);
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

  const user = session.user;
  const displayName = user.name || user.email || '未命名用户';
  const displayEmail = user.email || '';
  const displayImage = (user as any)?.image || (user as any)?.picture || '/avatars/default.png';

  // 模拟用户数据
  const [profileData, setProfileData] = React.useState({
    name: displayName,
    email: displayEmail,
    bio: '热爱探索 AI 工具的创意工作者，致力于发现和分享最优秀的 AI 应用。',
    location: '中国 · 北京',
    website: 'https://example.com',
    twitter: '@username',
    github: 'username',
    linkedin: 'username',
    joinedAt: (user as any).createdAt || '2024-01-15'
  });

  const handleSave = () => {
    // TODO: 保存到后端
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 重置数据
    setProfileData({
      name: displayName,
      email: displayEmail,
      bio: '热爱探索 AI 工具的创意工作者，致力于发现和分享最优秀的 AI 应用。',
      location: '中国 · 北京',
      website: 'https://example.com',
      twitter: '@username',
      github: 'username',
      linkedin: 'username',
      joinedAt: (user as any).createdAt || '2024-01-15'
    });
  };

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">个人资料</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 左侧：个人信息卡片 */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border bg-card text-card-foreground p-6 sticky top-20">
              {/* 头像和基本信息 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src={displayImage} alt={displayName} />
                    <AvatarFallback className="text-2xl">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-semibold">{profileData.name}</h2>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>加入于 {new Date(profileData.joinedAt).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>

              {/* 统计数据 */}
              <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">42</div>
                  <div className="text-xs text-muted-foreground mt-1">收藏</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">18</div>
                  <div className="text-xs text-muted-foreground mt-1">评论</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-xs text-muted-foreground mt-1">点赞</div>
                </div>
              </div>

              {/* 徽章 */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  成就徽章
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    早期用户
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    活跃贡献者
                  </Badge>
                </div>
              </div>

              {/* 快捷操作 */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <Link href={`/profile/security?lang=${locale}`} className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    安全设置
                  </Button>
                </Link>
                <Link href={`/settings?lang=${locale}`} className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    系统设置
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 右侧：详细信息编辑 */}
          <div className="lg:col-span-8 space-y-6">
            {/* 编辑控制 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">个人资料</h1>
                <p className="text-sm text-muted-foreground mt-1">管理您的个人信息和公开资料</p>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  编辑资料
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    保存
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    取消
                  </Button>
                </div>
              )}
            </div>

            {/* 基本信息 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <h3 className="text-lg font-semibold mb-4">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">姓名</label>
                  {isEditing ? (
                    <Input value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} placeholder="输入您的姓名" />
                  ) : (
                    <div className="text-sm text-foreground/80">{profileData.name}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">邮箱</label>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {profileData.email}
                    <Badge variant="secondary" className="text-xs">
                      已验证
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">个人简介</label>
                  {isEditing ? (
                    <Textarea value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} placeholder="介绍一下您自己..." rows={4} />
                  ) : (
                    <div className="text-sm text-foreground/80">{profileData.bio}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">位置</label>
                  {isEditing ? (
                    <Input value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} placeholder="城市 · 国家" />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {profileData.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 社交链接 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <h3 className="text-lg font-semibold mb-4">社交链接</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Link2 className="h-4 w-4" />
                    个人网站
                  </label>
                  {isEditing ? (
                    <Input value={profileData.website} onChange={(e) => setProfileData({ ...profileData, website: e.target.value })} placeholder="https://example.com" />
                  ) : (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      {profileData.website}
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </label>
                    {isEditing ? (
                      <Input value={profileData.twitter} onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })} placeholder="@username" />
                    ) : (
                      <div className="text-sm text-foreground/80">{profileData.twitter}</div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </label>
                    {isEditing ? (
                      <Input value={profileData.github} onChange={(e) => setProfileData({ ...profileData, github: e.target.value })} placeholder="username" />
                    ) : (
                      <div className="text-sm text-foreground/80">{profileData.github}</div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </label>
                    {isEditing ? (
                      <Input value={profileData.linkedin} onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })} placeholder="username" />
                    ) : (
                      <div className="text-sm text-foreground/80">{profileData.linkedin}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 隐私设置 */}
            <div className="rounded-xl border bg-card text-card-foreground p-6">
              <h3 className="text-lg font-semibold mb-4">隐私设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">公开个人资料</div>
                    <div className="text-xs text-muted-foreground mt-1">允许其他用户查看您的个人资料</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">显示活动状态</div>
                    <div className="text-xs text-muted-foreground mt-1">让其他人知道您何时在线</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">显示邮箱地址</div>
                    <div className="text-xs text-muted-foreground mt-1">在个人资料中显示您的邮箱</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </button>
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
