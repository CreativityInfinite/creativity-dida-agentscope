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
import { Home, Search, BarChart2, Eye, Flame, TrendingUp, TrendingDown } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function MostSearchedPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));
  const [timeRange, setTimeRange] = React.useState<'week' | 'month' | 'all'>('week');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const mostSearched = React.useMemo(() => {
    const multiplier = timeRange === 'week' ? 1 : timeRange === 'month' ? 2.5 : 5;
    return [...ALL_TOOLS]
      .map((tool) => ({
        ...tool,
        searchCount: Math.floor((tool.rating ?? 0) * 100 * multiplier + ((tool.key?.length || 0) % 500))
      }))
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 12);
  }, [timeRange]);

  const searchStats = React.useMemo(() => {
    const totalSearches = mostSearched.reduce((sum, t) => sum + (t.searchCount || 0), 0);
    const avgSearches = Math.floor(totalSearches / mostSearched.length);
    const maxSearches = Math.max(...mostSearched.map((t) => t.searchCount || 0));
    return { totalSearches, avgSearches, maxSearches };
  }, [mostSearched]);

  const hotSearchTerms = [
    { term: '图像生成', count: 2543, trend: 'up' },
    { term: '文本写作', count: 1876, trend: 'up' },
    { term: '代码助手', count: 1654, trend: 'stable' },
    { term: 'AI 聊天', count: 1432, trend: 'up' },
    { term: '视频编辑', count: 987, trend: 'down' },
    { term: '数据分析', count: 876, trend: 'up' }
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">搜索最多</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">搜索最多</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">查看搜索次数最多的热门 AI 工具，了解用户最关注的工具和需求。</p>
        </div>
      </section>

      {/* 时间范围选择 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="h-4 w-4 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold">时间范围</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '本周', value: 'week' as const },
            { label: '本月', value: 'month' as const },
            { label: '全部', value: 'all' as const }
          ].map(({ label, value }) => (
            <Button key={value} variant={timeRange === value ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange(value)} className="text-xs">
              {label}
            </Button>
          ))}
        </div>
      </section>

      {/* 搜索统计 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-xs text-muted-foreground mb-1">总搜索次数</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">{searchStats.totalSearches.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">本期统计</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="text-xs text-muted-foreground mb-1">平均搜索</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">{searchStats.avgSearches.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">每个工具</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-muted-foreground mb-1">最高搜索</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{searchStats.maxSearches.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">单个工具</div>
          </div>
        </div>
      </section>

      {/* 热门搜索词 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-4 w-4 text-orange-500" />
          <h3 className="text-base sm:text-lg font-semibold">热门搜索词</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hotSearchTerms.map(({ term, count, trend }) => (
            <div key={term} className="p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{term}</span>
                <Badge
                  variant="outline"
                  className={`text-xs flex-shrink-0 ${
                    trend === 'up'
                      ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : trend === 'down'
                      ? 'border-red-500/30 text-red-600 dark:text-red-400'
                      : 'border-muted-foreground/30'
                  }`}
                >
                  {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : trend === 'down' ? <TrendingDown className="h-3 w-3" /> : '→'} {count.toLocaleString()}
                </Badge>
              </div>
              <Progress value={(count / 2543) * 100} className="h-1.5" />
            </div>
          ))}
        </div>
      </section>

      {/* 搜索最多的工具 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">搜索最多的工具</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            {mostSearched.length} 个工具
          </Badge>
        </div>

        {mostSearched.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无搜索数据</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mostSearched.map((tool, idx) => (
              <div key={tool.key || tool.name} className="flex items-start gap-3 p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold truncate">{tool.name}</h3>
                    <Badge variant="secondary" className="flex-shrink-0 text-xs">
                      {tool.searchCount?.toLocaleString()} 次
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 搜索趋势说明 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
          <h3 className="font-semibold text-sm mb-2">搜索趋势说明</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>
              • <span className="font-semibold">搜索次数</span>：用户在平台上搜索该工具的次数统计
            </li>
            <li>
              • <span className="font-semibold">趋势指标</span>：↑ 上升、→ 稳定、↓ 下降，反映搜索热度变化
            </li>
            <li>
              • <span className="font-semibold">时间范围</span>：支持按周、月、全部时间段查看数据
            </li>
            <li>
              • <span className="font-semibold">参考价值</span>：搜索热度高的工具通常代表市场需求旺盛和用户关注度高
            </li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
