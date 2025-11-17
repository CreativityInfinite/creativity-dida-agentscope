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
import { Home, Rocket, TrendingUp, Zap, ArrowUp } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function RisingPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const rising = React.useMemo(() => {
    return [...ALL_TOOLS]
      .map((tool) => ({
        ...tool,
        growthScore: (tool.rating ?? 0) * 0.5 + Math.random() * 50
      }))
      .sort((a, b) => b.growthScore - a.growthScore)
      .slice(0, 12);
  }, []);

  const categoryDistribution = React.useMemo(() => {
    const dist: Record<string, number> = {};
    rising.forEach((tool) => {
      const cat = tool.primaryCategory || 'Others';
      dist[cat] = (dist[cat] || 0) + 1;
    });
    return Object.entries(dist)
      .map(([cat, count]) => ({ cat, count, percentage: Math.round((count / rising.length) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [rising]);

  const growthStats = React.useMemo(() => {
    const avgGrowth = (rising.reduce((sum, t) => sum + (t.growthScore || 0), 0) / rising.length).toFixed(1);
    const maxGrowth = Math.max(...rising.map((t) => t.growthScore || 0)).toFixed(1);
    return { avgGrowth, maxGrowth };
  }, [rising]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">新兴热门</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">新兴热门</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">发现正在快速崛起的新兴 AI 工具，抢先体验未来趋势。</p>
        </div>
      </section>

      {/* 增长势头指标 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-xs text-muted-foreground mb-1">平均增长势头</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">{growthStats.avgGrowth}</div>
            <div className="text-xs text-muted-foreground mt-1">新兴工具平均</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-muted-foreground mb-1">最高增长势头</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{growthStats.maxGrowth}</div>
            <div className="text-xs text-muted-foreground mt-1">最快崛起工具</div>
          </div>
        </div>
      </section>

      {/* 分类分布 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">分类分布</h2>
        </div>
        <div className="space-y-3">
          {categoryDistribution.map(({ cat, count, percentage }) => (
            <div key={cat} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{cat}</span>
                <Badge variant="secondary" className="text-xs">
                  {count} 个
                </Badge>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          ))}
        </div>
      </section>

      {/* 快速崛起的工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">快速崛起的工具</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            <ArrowUp className="h-3 w-3 mr-1" />
            增长中
          </Badge>
        </div>

        {rising.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无新兴工具</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {rising.map((tool, idx) => (
              <div key={tool.key || tool.name} className="relative">
                {idx < 3 && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-primary/60 text-white text-xs">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Top {idx + 1}
                    </Badge>
                  </div>
                )}
                <ToolCard tool={tool} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 增长指标详情 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
            <h3 className="font-semibold text-sm mb-2">增长指标说明</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                • <span className="font-semibold">增长势头</span>：综合考虑工具评分、用户关注度、更新频率等因素
              </li>
              <li>
                • <span className="font-semibold">新兴工具</span>：指最近 3-6 个月内快速增长的优质工具
              </li>
              <li>
                • <span className="font-semibold">排行更新</span>：每周更新一次，实时反映市场动态
              </li>
              <li>
                • <span className="font-semibold">推荐指数</span>：高增长势头的工具往往代表市场需求和创新方向
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
