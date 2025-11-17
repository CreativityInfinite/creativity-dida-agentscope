'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { getMessages } from '@/src/i18n/index';

import { getCategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';
import { ROUTE_TO_PRIMARY, DATA_BY_PRIMARY } from '@/lib/category';
import { Home, ArrowRight, Star, Search as SearchIcon, Tag, Flame, Eye } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function CategoryViewAllPage({ params }: { params: Promise<{ key: string }> }) {
  const resolvedParams = React.use(params);
  const key = resolvedParams?.key || 'image-generation';
  const primary: PrimaryCategoryKey = ROUTE_TO_PRIMARY[key] || 'ImageGeneration';
  const tools = DATA_BY_PRIMARY[primary] || [];

  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));
  const [sub, setSub] = React.useState<string>('');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
    const subFromUrl = searchParams.get('sub') || '';
    setSub(subFromUrl);
  }, [searchParams]);

  const categoryDisplayName = getCategoryDisplayName(primary, messages);

  const list = React.useMemo(() => {
    const items = sub ? tools.filter((t) => (t.subcategory || '') === sub) : tools;
    return [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }, [tools, sub]);

  const [minRating, setMinRating] = React.useState<number>(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const filtered = React.useMemo(() => {
    let result = list.filter((t) => (t.rating ?? 0) >= minRating);
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query) || (t.tags || []).some((tag) => tag.toLowerCase().includes(query)));
    }
    if (selectedTags.length > 0) {
      result = result.filter((t) => selectedTags.some((tag) => (t.tags || []).includes(tag)));
    }
    return result;
  }, [list, minRating, searchQuery, selectedTags]);

  const allTags = React.useMemo(() => {
    const tagMap = new Map<string, number>();
    list.forEach((t) => {
      (t.tags || []).forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [list]);

  const topTools = React.useMemo(() => {
    return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 3);
  }, [list]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

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
              <BreadcrumbLink asChild>
                <Link href={`/categories/${key}?lang=${locale}`} className="text-xs sm:text-sm">
                  {categoryDisplayName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">{sub ? `${sub} - 查看全部` : '查看全部'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">{sub ? `${sub}` : categoryDisplayName}</h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">「{sub || categoryDisplayName}」全部工具列表，支持评分阈值筛选与快速浏览。</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* 搜索栏 */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="搜索工具名称、描述或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* 左侧筛选 */}
          <aside className="lg:col-span-3">
            <div className="rounded-xl border bg-card text-card-foreground p-4 sm:p-5 sticky top-20 space-y-5 sm:space-y-6">
              {/* 评分筛选 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-amber-500" />
                  <h3 className="text-sm font-semibold">评分筛选</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { rating: 0, label: '全部评分' },
                    { rating: 3, label: '⭐ 3.0 及以上' },
                    { rating: 4, label: '⭐⭐ 4.0 及以上' }
                  ].map(({ rating, label }) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-2 text-xs rounded-md border transition text-left font-medium ${
                        minRating === rating
                          ? 'bg-primary text-primary-foreground border-transparent shadow-sm'
                          : 'border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 热门标签 */}
              {allTags.length > 0 && (
                <div className="pt-3 sm:pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-blue-500" />
                    <h3 className="text-sm font-semibold">热门标签</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 text-xs rounded-md border transition ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-primary-foreground border-transparent shadow-sm'
                            : 'border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 热门工具 */}
              {topTools.length > 0 && (
                <div className="pt-3 sm:pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <h3 className="text-sm font-semibold">热门工具</h3>
                  </div>
                  <div className="space-y-2">
                    {topTools.map((tool, idx) => (
                      <Link
                        key={tool.key || tool.name}
                        href={`/tools/${(tool as any).key || encodeURIComponent(tool.name)}?lang=${locale}`}
                        className="block px-3 py-2 text-xs rounded-md border border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40 transition truncate"
                        title={tool.name}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-semibold">#{idx + 1}</span>
                          <span className="truncate">{tool.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 统计信息 */}
              <div className="pt-3 sm:pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-emerald-500" />
                  <h3 className="text-sm font-semibold">统计信息</h3>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>总工具数：</span>
                    <span className="font-semibold text-foreground">{list.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>筛选结果：</span>
                    <span className="font-semibold text-foreground">{filtered.length}</span>
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="flex justify-between">
                      <span>选中标签：</span>
                      <span className="font-semibold text-foreground">{selectedTags.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 快速导航 */}
              <div className="pt-3 sm:pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">快速导航</h3>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs px-3 py-2 h-auto border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40"
                >
                  <Link href={`/categories/${key}?lang=${locale}`}>
                    <ArrowRight className="h-3.5 w-3.5" />
                    返回分类
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* 右侧内容 */}
          <div className="lg:col-span-9">
            {/* 结果头部 */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-foreground">
                  找到 <span className="text-primary">{filtered.length}</span> 个工具
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {minRating > 0 && `评分 ≥ ${minRating}.0 · `}
                  {searchQuery && `搜索: "${searchQuery}" · `}
                  {selectedTags.length > 0 && `标签: ${selectedTags.join(', ')} · `}共 {list.length} 个工具
                </p>
              </div>
            </div>

            {/* 工具网格 */}
            {filtered.length === 0 ? (
              <Empty className="border-dashed border-muted-foreground/30 py-12 sm:py-16 rounded-lg">
                <EmptyMedia variant="icon">
                  <SearchIcon className="h-6 w-6 text-muted-foreground" />
                </EmptyMedia>
                <EmptyContent>
                  <EmptyHeader>
                    <EmptyTitle>暂无符合条件的工具</EmptyTitle>
                    <EmptyDescription>{searchQuery || minRating > 0 || selectedTags.length > 0 ? '试试调整搜索条件或筛选' : '该分类暂无工具'}</EmptyDescription>
                  </EmptyHeader>
                </EmptyContent>
              </Empty>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {filtered.map((tool) => (
                  <div key={tool.key || tool.name} className="w-full">
                    <ToolCard tool={tool} locale={locale} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
