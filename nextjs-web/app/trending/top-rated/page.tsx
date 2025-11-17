'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { getMessages } from '@/src/i18n/index';
import { ALL_TOOLS } from '@/lib/tools';

import type { Tool } from '@/types/tool';
import { Home, Star, Award, BarChart3, Filter } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TopRatedPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));
  const [ratingFilter, setRatingFilter] = React.useState<number>(0);

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const topRated = React.useMemo(() => {
    return [...ALL_TOOLS].filter((t) => (t.rating ?? 0) >= ratingFilter).sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }, [ratingFilter]);

  const ratingStats = React.useMemo(() => {
    const stats = {
      total: ALL_TOOLS.length,
      avg: (ALL_TOOLS.reduce((sum, t) => sum + (t.rating ?? 0), 0) / ALL_TOOLS.length).toFixed(1),
      excellent: ALL_TOOLS.filter((t) => (t.rating ?? 0) >= 4.5).length,
      good: ALL_TOOLS.filter((t) => (t.rating ?? 0) >= 4 && (t.rating ?? 0) < 4.5).length,
      fair: ALL_TOOLS.filter((t) => (t.rating ?? 0) >= 3.5 && (t.rating ?? 0) < 4).length
    };
    return stats;
  }, []);

  const categoryRatings = React.useMemo(() => {
    const categories: Record<string, { total: number; sum: number }> = {};
    ALL_TOOLS.forEach((t) => {
      const cat = t.primaryCategory || 'Others';
      if (!categories[cat]) categories[cat] = { total: 0, sum: 0 };
      categories[cat].total++;
      categories[cat].sum += t.rating ?? 0;
    });
    return Object.entries(categories)
      .map(([cat, { total, sum }]) => ({
        cat,
        avg: (sum / total).toFixed(1),
        count: total
      }))
      .sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));
  }, []);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">评分最高</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-amber-500" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">评分最高</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">探索用户评分最高的优质 AI 工具，精选品质保证。</p>
        </div>
      </section>

      {/* 评分分布 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">评分分布</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 sm:p-4 rounded-lg border border-muted/50 hover:border-primary/30 transition">
            <div className="text-xs text-muted-foreground mb-1">平均评分</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">{ratingStats.avg}</div>
            <div className="text-xs text-muted-foreground mt-1">全部工具</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-muted-foreground mb-1">优秀工具</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{ratingStats.excellent}</div>
            <div className="text-xs text-muted-foreground mt-1">≥ 4.5 分</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <div className="text-xs text-muted-foreground mb-1">优质工具</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-500">{ratingStats.good}</div>
            <div className="text-xs text-muted-foreground mt-1">4.0-4.5 分</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
            <div className="text-xs text-muted-foreground mb-1">总工具数</div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-500">{ratingStats.total}</div>
            <div className="text-xs text-muted-foreground mt-1">全部工具</div>
          </div>
        </div>
      </section>

      {/* 分类评分对比 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">分类评分对比</h2>
        </div>

        <div className="space-y-2">
          {categoryRatings.map(({ cat, avg, count }) => (
            <div key={cat} className="flex items-center gap-3 p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium truncate">{cat}</span>
                  <Badge variant="secondary" className="flex-shrink-0 text-xs">
                    {count} 个
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all" style={{ width: `${(parseFloat(avg) / 5) * 100}%` }} />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-bold text-amber-500">{avg}</div>
                <div className="text-xs text-muted-foreground">⭐</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 评分筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold">按评分筛选</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '全部', value: 0 },
            { label: '4.5+ ⭐⭐⭐⭐⭐', value: 4.5 },
            { label: '4.0+ ⭐⭐⭐⭐', value: 4.0 },
            { label: '3.5+ ⭐⭐⭐', value: 3.5 }
          ].map(({ label, value }) => (
            <Button key={value} variant={ratingFilter === value ? 'default' : 'outline'} size="sm" onClick={() => setRatingFilter(value)} className="text-xs">
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 工具列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold">优质工具排行</h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            {topRated.length} 个工具
          </Badge>
        </div>

        {topRated.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无符合条件的工具</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {topRated.map((tool, idx) => (
              <div key={tool.key || tool.name} className="relative">
                {idx < 3 && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <Badge className={`${idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : 'bg-orange-600 text-white'}`}>#{idx + 1}</Badge>
                  </div>
                )}
                <ToolCard tool={tool} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
