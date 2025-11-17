'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Badge } from '@component/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@component/ui/breadcrumb';
import { BackToTop } from '@component/BackToTop';
import { Home, Sparkles, Target, Users, Zap, Globe, Heart, TrendingUp, Search, MessageSquare, Star, Award, Rocket, Shield, Code, Palette, Brain } from 'lucide-react';

export default function AboutPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const features = [
    {
      icon: MessageSquare,
      title: '智能对话推荐',
      description: '通过自然语言对话，获得个性化的 AI 工具推荐，让发现变得简单而智能',
      color: 'text-blue-500'
    },
    {
      icon: Search,
      title: '强大搜索引擎',
      description: '支持关键词搜索、标签筛选、分类浏览，快速找到最适合的工具',
      color: 'text-purple-500'
    },
    {
      icon: Star,
      title: '精选推荐',
      description: '编辑精选、社区最爱、每周亮点，发现最优质的 AI 工具',
      color: 'text-amber-500'
    },
    {
      icon: TrendingUp,
      title: '实时趋势',
      description: '追踪 AI 工具的最新趋势、热门排行、新品发布',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: '社区驱动',
      description: '用户评论、评分、收藏、分享，共同构建 AI 工具生态',
      color: 'text-pink-500'
    },
    {
      icon: Globe,
      title: '多语言支持',
      description: '支持简体中文、繁体中文、英文，服务全球用户',
      color: 'text-cyan-500'
    }
  ];

  const stats = [
    { value: '500+', label: 'AI 工具', icon: Zap },
    { value: '50+', label: '工具分类', icon: Palette },
    { value: '10K+', label: '活跃用户', icon: Users },
    { value: '100K+', label: '月访问量', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Target,
      title: '使命',
      description: '让每个人都能轻松发现和使用最适合的 AI 工具，释放创造力的无限可能'
    },
    {
      icon: Sparkles,
      title: '愿景',
      description: '成为全球最受信赖的 AI 工具发现平台，连接创作者与 AI 技术'
    },
    {
      icon: Heart,
      title: '价值观',
      description: '开放、创新、用户至上、持续学习、追求卓越'
    }
  ];

  const timeline = [
    {
      year: '2024 Q1',
      title: '项目启动',
      description: '确定产品方向，组建核心团队，开始技术选型和架构设计'
    },
    {
      year: '2024 Q2',
      title: '平台上线',
      description: '完成核心功能开发，收录 100+ AI 工具，正式对外发布'
    },
    {
      year: '2024 Q3',
      title: '功能迭代',
      description: '推出智能推荐、社区功能、多语言支持，用户突破 5K'
    },
    {
      year: '2024 Q4',
      title: '生态建设',
      description: '工具数量突破 500+，建立合作伙伴网络，月访问量达 100K+'
    }
  ];

  const techStack = [
    { name: 'Next.js 14', description: 'React 框架', icon: Code },
    { name: 'TypeScript', description: '类型安全', icon: Shield },
    { name: 'Tailwind CSS', description: '样式系统', icon: Palette },
    { name: 'shadcn/ui', description: 'UI 组件库', icon: Sparkles },
    { name: 'Prisma', description: '数据库 ORM', icon: Brain },
    { name: 'NextAuth', description: '用户认证', icon: Shield }
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">关于我们</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero 区域 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Creativity Hunt</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            让 AI 工具发现
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">变得简单而智能</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            Creativity Hunt 是一个以对话为入口的 AI 工具发现平台
            <br className="hidden sm:block" />
            通过智能推荐帮助用户快速找到最适合的 AI 工具与解决方案
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition">
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 使命愿景价值观 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="p-6 sm:p-8 rounded-xl border bg-card hover:shadow-lg transition">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 核心特性 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">核心特性</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">为用户提供最优质的 AI 工具发现体验</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 发展历程 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">发展历程</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">从想法到现实，我们一直在前进</p>
        </div>

        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary/20"></div>

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, index) => (
              <div key={item.year} className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* 时间点 */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>

                {/* 内容 */}
                <div className={`flex-1 ml-16 sm:ml-0 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <Badge variant="secondary" className="mb-2">
                    {item.year}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                {/* 占位 */}
                <div className="hidden sm:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">技术栈</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">使用现代化的技术构建高性能平台</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.name} className="p-4 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-sm font-semibold mb-1">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">我们的团队</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">一群热爱 AI 技术的创造者</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { role: '产品设计', icon: Palette, description: '打造优雅的用户体验' },
            { role: '全栈开发', icon: Code, description: '构建高性能平台' },
            { role: '内容运营', icon: Users, description: '精选优质 AI 工具' },
            { role: '社区管理', icon: Heart, description: '服务用户社区' }
          ].map((member) => {
            const Icon = member.icon;
            return (
              <div key={member.role} className="p-6 rounded-xl border bg-card hover:shadow-lg transition text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{member.role}</h3>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/5 p-8 sm:p-12 text-center">
          <div className="relative z-10">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">开始探索 AI 工具</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">加入我们，发现更多优质的 AI 工具，释放创造力的无限可能</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={`/?lang=${locale}`}>
                <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">开始探索</button>
              </Link>
              <Link href={`/submit?lang=${locale}`}>
                <button className="px-6 py-3 rounded-lg border bg-card hover:bg-muted transition font-medium">提交工具</button>
              </Link>
            </div>
          </div>

          {/* 装饰元素 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-20">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">联系我们</h2>
          <p className="text-muted-foreground mb-8">有任何问题或建议？欢迎与我们联系</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <MessageSquare className="h-5 w-5" />
              <span>support@creativityhunt.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <Users className="h-5 w-5" />
              <span>加入社区讨论</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
              <Award className="h-5 w-5" />
              <span>成为合作伙伴</span>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
