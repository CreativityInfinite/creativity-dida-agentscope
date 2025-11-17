'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';

import type { Tool } from '@/types/tool';
import { Home, Zap, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

export default function NewLaunchesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const newLaunches = React.useMemo(() => {
    return [...ALL_TOOLS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 18);
  }, []);

  const byCategory = React.useMemo(() => {
    const cats: Record<string, Tool[]> = {};
    newLaunches.forEach((tool) => {
      const cat = tool.primaryCategory || 'Others';
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(tool);
    });
    return Object.entries(cats).map(([cat, tools]) => ({ cat, tools }));
  }, [newLaunches]);

  const features = [
    { icon: '🚀', title: '创新功能', desc: '采用最新技术，功能创新突出' },
    { icon: '⚡', title: '高效体验', desc: '性能优异，响应迅速' },
    { icon: '🎯', title: '精准定位', desc: '针对特定需求，解决方案完整' },
    { icon: '🔄', title: '持续更新', desc: '定期迭代，功能不断完善' }
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">新品发布</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">新品发布</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">探索最新发布的创新 AI 工具和功能，抢先体验行业前沿的解决方案。</p>
        </div>
      </section>

      {/* 新品特性 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">新品特性</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-semibold text-sm mb-1">{title}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 按分类展示 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">最新发布</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            {newLaunches.length} 个工具
          </Badge>
        </div>

        <div className="space-y-6">
          {byCategory.map(({ cat, tools }) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-sm">{cat}</h3>
                <Badge variant="secondary" className="text-xs">
                  {tools.length}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.key || tool.name} tool={tool} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 发布说明 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            发布说明
          </h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>
              • <span className="font-semibold">新品工具</span>：指最近发布或重大更新的 AI 工具
            </li>
            <li>
              • <span className="font-semibold">创新功能</span>：采用最新技术，提供独特的解决方案
            </li>
            <li>
              • <span className="font-semibold">持续更新</span>：我们定期更新此列表，确保您了解最新动态
            </li>
            <li>
              • <span className="font-semibold">试用建议</span>：建议先试用免费版本，体验后再决定是否付费
            </li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
