'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';

import { Home, Heart, Users, MessageCircle, Award } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

export default function CommunityFavoritesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const communityFavorites = React.useMemo(() => {
    return [...ALL_TOOLS].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 20);
  }, []);

  const topFive = communityFavorites.slice(0, 5);
  const others = communityFavorites.slice(5);

  const stats = React.useMemo(() => {
    const avgRating = (communityFavorites.reduce((sum, t) => sum + (t.rating ?? 0), 0) / communityFavorites.length).toFixed(1);
    return {
      total: communityFavorites.length,
      avgRating,
      categories: new Set(communityFavorites.map((t) => t.primaryCategory)).size
    };
  }, [communityFavorites]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">社区最爱</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">社区最爱</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">发现社区用户最喜爱的 AI 工具，这些工具获得了广泛的用户认可和好评。</p>
        </div>
      </section>

      {/* 社区统计 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-xs text-muted-foreground mb-1">最爱工具</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-xs text-muted-foreground mt-1">社区推荐</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="text-xs text-muted-foreground mb-1">平均评分</div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">{stats.avgRating}</div>
            <div className="text-xs text-muted-foreground mt-1">用户评价</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-xs text-muted-foreground mb-1">分类覆盖</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">{stats.categories}</div>
            <div className="text-xs text-muted-foreground mt-1">工具分类</div>
          </div>
        </div>
      </section>

      {/* 社区 Top 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">社区 Top 5</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {topFive.map((tool, idx) => (
            <div key={tool.key || tool.name} className="group relative">
              <div className="absolute -top-3 -left-3 z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : idx === 3 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                >
                  #{idx + 1}
                </div>
              </div>
              <div className="pt-2">
                <ToolCard tool={tool} locale={locale} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 其他推荐 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">更多推荐</h2>
          <Badge variant="secondary" className="ml-auto text-xs">
            {others.length} 个工具
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {others.map((tool) => (
            <ToolCard key={tool.key || tool.name} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      {/* 社区反馈 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            社区反馈
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            这些工具都是社区用户通过实际使用和投票选出的最爱。每一款工具都获得了用户的广泛认可，代表了社区的集体智慧。如果您也有喜爱的工具，欢迎在社区中分享您的使用体验和建议。
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
