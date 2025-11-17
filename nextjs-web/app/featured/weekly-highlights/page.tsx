'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';

import { Home, Bell, Calendar, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

export default function WeeklyHighlightsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const weeklyHighlights = React.useMemo(() => {
    return [...ALL_TOOLS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 12);
  }, []);

  const highlights = [
    {
      type: '🚀 新功能',
      title: '多个工具发布重大更新',
      desc: '本周多款热门工具发布了重大功能更新，包括 AI 增强、性能优化等'
    },
    {
      type: '⭐ 用户评价',
      title: '用户满意度持续提升',
      desc: '社区用户对多款工具的评价持续上升，平均评分达到 4.3 分'
    },
    {
      type: '🎯 行业动态',
      title: 'AI 工具市场持续火热',
      desc: '本周新增多款创新工具，市场竞争日趋激烈，用户选择更加丰富'
    },
    {
      type: '💡 编辑推荐',
      title: '本周最值得关注的工具',
      desc: '编辑团队精选了本周最具创新性和实用性的工具，值得一试'
    }
  ];

  const updates = [
    { tool: '工具 A', update: '发布 v2.0 版本，新增 AI 增强功能', date: '2024-10-22' },
    { tool: '工具 B', update: '性能优化，响应速度提升 50%', date: '2024-10-21' },
    { tool: '工具 C', update: '新增中文支持，完善本地化体验', date: '2024-10-20' },
    { tool: '工具 D', update: '推出企业版本，支持团队协作', date: '2024-10-19' }
  ];

  return (
    <div className="relative">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">每周亮点</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">每周亮点</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">每周精选的 AI 工具亮点和重要更新，帮助您快速了解行业动态和工具发展。</p>
        </div>
      </section>

      {/* 本周亮点 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">本周亮点</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map(({ type, title, desc }) => (
            <div key={title} className="p-4 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="text-sm font-semibold mb-1">{type}</div>
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 重要更新 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">重要更新</h2>
        </div>

        <div className="space-y-2">
          {updates.map(({ tool, update, date }) => (
            <div key={tool} className="flex items-start gap-3 p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{tool}</span>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {date}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{update}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 本周推荐工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">本周推荐工具</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            {weeklyHighlights.length} 个
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {weeklyHighlights.map((tool, idx) => (
            <div key={tool.key || tool.name} className="relative">
              {idx === 0 && (
                <div className="absolute -top-2 -left-2 z-10">
                  <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs">本周之星</Badge>
                </div>
              )}
              <ToolCard tool={tool} locale={locale} />
            </div>
          ))}
        </div>
      </section>

      {/* 编辑观点 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            编辑观点
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            本周 AI 工具市场继续保持活跃，多款工具发布了重要更新。我们看到越来越多的工具开始关注用户体验和本地化支持，这是一个积极的信号。同时，企业级功能的推出也表明 AI
            工具正在从个人应用向企业应用扩展。我们建议用户关注这些新功能，选择最适合自己的工具。
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
