'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';

import { Home, TrendingUp, Zap, Clock } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TrendingNowPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const trendingNow = React.useMemo(() => {
    return [...ALL_TOOLS]
      .sort((a, b) => {
        // 使用稳定的排序避免水合错误
        const scoreA = (b.rating ?? 0) * 0.6 + ((b.key?.length || 0) % 100) * 0.004;
        const scoreB = (a.rating ?? 0) * 0.6 + ((a.key?.length || 0) % 100) * 0.004;
        return scoreB - scoreA;
      })
      .slice(0, 12);
  }, []);

  const stats = React.useMemo(() => {
    const avgRating = (trendingNow.reduce((sum, t) => sum + (t.rating ?? 0), 0) / trendingNow.length).toFixed(1);
    const categories = new Set(trendingNow.map((t) => t.primaryCategory)).size;
    return { avgRating, categories, total: trendingNow.length };
  }, [trendingNow]);

  const topThree = trendingNow.slice(0, 3);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">当前热门</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">当前热门</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">发现当前最受欢迎和讨论最多的 AI 工具，实时更新热度排行。</p>
        </div>
      </section>

      {/* 热度指标 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-xs text-muted-foreground mb-1">热门工具</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">{stats.total}</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="text-xs text-muted-foreground mb-1">平均评分</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">{stats.avgRating}</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-muted-foreground mb-1">分类覆盖</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{stats.categories}</div>
          </div>
        </div>
      </section>

      {/* 热度 Top 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">热度 Top 3</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((tool, idx) => (
            <div key={tool.key || tool.name} className="group relative">
              <div className="absolute -top-3 -left-3 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-600'}`}>
                  #{idx + 1}
                </div>
              </div>
              <div className="pt-2 p-4 rounded-lg border border-muted/50 hover:border-primary/30 transition">
                <div className="flex gap-3 mb-3">
                  <img src={tool.logo} alt={tool.name} className="h-12 w-12 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">⭐ {(tool.rating ?? 0).toFixed(1)}</span>
                  <Link href={`/tools/${(tool as any).key || encodeURIComponent(tool.name)}?lang=${locale}`}>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      查看
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 完整热门列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">热门工具排行</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            实时更新
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {trendingNow.map((tool, idx) => (
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
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
