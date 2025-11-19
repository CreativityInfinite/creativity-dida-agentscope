'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { getMessages } from '@/src/i18n/index';

import type { Tool } from '@/types/tool';
import { getCategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';
import { ROUTE_TO_PRIMARY, DATA_BY_PRIMARY } from '@/lib/category';
import { Bell, PlusCircle, Shuffle, ArrowRight, Home, Search as SearchIcon, SlidersHorizontal, ArrowUpDown, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';

type SortKey = 'default' | 'rating' | 'name';

export default function CategoryPage({ params }: { params: Promise<{ key: string }> }) {
  const resolvedParams = React.use(params);
  const key = resolvedParams?.key || 'domestic-travel';
  const primary: PrimaryCategoryKey = ROUTE_TO_PRIMARY[key] || 'DomesticTravel';
  const tools = DATA_BY_PRIMARY[primary] || [];

  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const categoryDisplayName = getCategoryDisplayName(primary, messages);
  const spotlight = React.useMemo(() => {
    if (!tools.length) return null as unknown as Tool | null;
    const sorted = [...tools].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sorted[0] ?? tools[0];
  }, [tools]);
  const groupedBySub = React.useMemo(() => {
    const map = new Map<string, Tool[]>();
    tools.forEach((t) => {
      const k = t.subcategory || '其他';
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(t);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], 'zh-CN'));
  }, [tools]);
  const allSubs = React.useMemo(() => groupedBySub.map(([sub]) => sub), [groupedBySub]);

  const rowRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const setRowRef = (sub: string) => (el: HTMLDivElement | null) => {
    rowRefs.current[sub] = el;
  };
  const scrollRow = (sub: string, dir: 'left' | 'right') => {
    const el = rowRefs.current[sub];
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 300);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubs, setSelectedSubs] = React.useState<string[]>([]);
  const [sortKey, setSortKey] = React.useState<SortKey>('default');

  const toggleSub = (sub: string) => {
    setSelectedSubs((prev) => (prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]));
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedSubs([]);
    setSortKey('default');
  };

  const filteredGroupedBySub = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filterByQuery = (t: Tool) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      (t.subcategory ? t.subcategory.toLowerCase().includes(query) : false) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(query));

    const sortList = (list: Tool[]) => {
      const copy = [...list];
      if (sortKey === 'rating') {
        copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      } else if (sortKey === 'name') {
        copy.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
      } else if (sortKey === 'default' && query) {
        const score = (t: Tool) =>
          (t.name.toLowerCase().includes(query) ? 3 : 0) +
          (t.description.toLowerCase().includes(query) ? 2 : 0) +
          ((t.subcategory || '').toLowerCase().includes(query) ? 1 : 0) +
          (t.tags || []).reduce((acc, tag) => acc + (tag.toLowerCase().includes(query) ? 1 : 0), 0);
        copy.sort((a, b) => score(b) - score(a));
      }
      return copy;
    };

    return groupedBySub
      .filter(([sub]) => selectedSubs.length === 0 || selectedSubs.includes(sub))
      .map(([sub, items]) => [sub, sortList(items.filter(filterByQuery))] as [string, Tool[]])
      .filter(([_, items]) => items.length > 0);
  }, [groupedBySub, searchQuery, selectedSubs, sortKey]);

  const [randomToolHref, setRandomToolHref] = React.useState('/explore');
  React.useEffect(() => {
    if (!tools.length) return;
    
    // 使用稳定的随机种子避免水合错误
    const seed = tools.length > 0 ? tools[0]?.key?.length || 0 : 0;
    const idx = seed % tools.length;
    const t = tools[idx] as any;
    const k = t?.key || encodeURIComponent(t?.name || 'service');
    setRandomToolHref(`/tools/${k}?lang=${locale}`);
  }, [tools, locale]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">{categoryDisplayName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">{categoryDisplayName}</h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">探索精选「{categoryDisplayName}」服务，发现优质旅游产品，支持搜索、子分类筛选与排序。</p>
        </div>

        <div className="mt-4 sm:mt-5 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
          <Link
            href={`/subscribe?channel=${key}&lang=${locale}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-foreground/90 hover:text-foreground hover:bg-muted/50 transition"
          >
            <Bell className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">订阅更新</span>
            <span className="sm:hidden">订阅</span>
          </Link>
          <Link href={`/submit?category=${key}&lang=${locale}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-foreground/90 hover:text-foreground hover:bg-muted/50 transition">
            <PlusCircle className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">推荐服务</span>
            <span className="sm:hidden">推荐</span>
          </Link>
          <Link href={randomToolHref} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-foreground/90 hover:text-foreground hover:bg-muted/50 transition">
            <Shuffle className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline">随机探索</span>
            <span className="sm:hidden">随机</span>
          </Link>
        </div>
      </section>

      {/* Spotlight */}
      {spotlight && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-2 flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground">
            <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l1.546 4.64L18 8.5l-4.454 1.86L12 15l-1.546-4.64L6 8.5l4.454-1.86L12 2z" />
            </svg>
            <span>焦点推荐</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img src={spotlight.logo} alt={`${spotlight.name} logo`} className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg flex-shrink-0" />
              <div className="min-w-0">
                <h2 className="text-sm sm:text-lg font-semibold truncate">{spotlight.name}</h2>
                <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2">{spotlight.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <span>评分 {(spotlight.rating ?? 4).toFixed(1)}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{categoryDisplayName}</span>
              <span className="hidden sm:inline">·</span>
              <Link
                href={`/tools/${(spotlight as any).key || encodeURIComponent(spotlight.name)}?lang=${locale}`}
                className="inline-flex items-center gap-1 text-foreground/90 hover:text-foreground text-xs sm:text-sm"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                <span>查看详情</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 搜索 / 筛选 / 排序 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder={messages?.explore?.searchPlaceholder || '搜索旅游服务名称、描述或标签...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedSubs([])}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition whitespace-nowrap ${
                selectedSubs.length === 0 ? 'border-transparent bg-primary text-primary-foreground shadow-sm' : 'border-primary/30 text-foreground/80 hover:border-primary/60 hover:bg-primary/10'
              }`}
              aria-label="全部子分类"
              title="全部子分类"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 flex-shrink-0" />
              全部
            </button>
            {allSubs.map((sub) => {
              const active = selectedSubs.includes(sub);
              return (
                <button
                  key={sub}
                  onClick={() => toggleSub(sub)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition whitespace-nowrap ${
                    active ? 'border-transparent bg-primary text-primary-foreground shadow-sm' : 'border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40'
                  }`}
                  aria-pressed={active}
                >
                  {sub}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortKey((prev) => (prev === 'rating' ? 'name' : prev === 'name' ? 'default' : 'rating'))}
              className="inline-flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs rounded-md border border-emerald-300 bg-emerald-50/60 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 transition-colors whitespace-nowrap"
              aria-label="切换排序"
              title="切换排序（评分 → 名称 → 默认）"
            >
              <ArrowUpDown className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden sm:inline text-xs">{sortKey === 'rating' ? '评分' : sortKey === 'name' ? '名称' : '默认'}</span>
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs rounded-md border border-rose-300 bg-rose-50/60 text-rose-900 hover:bg-rose-100 hover:border-rose-400 transition-colors whitespace-nowrap"
              aria-label="重置"
            >
              <RotateCcw className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden sm:inline text-xs">重置</span>
            </button>
          </div>
        </div>
      </section>

      {/* 子分类分组渲染 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {filteredGroupedBySub.length === 0 && <div className="text-xs sm:text-sm text-muted-foreground py-10">未找到匹配的旅游服务，试试调整搜索或筛选。</div>}

        <div className="space-y-6 sm:space-y-8">
          {filteredGroupedBySub.map(([sub, items], idx) => (
            <div key={sub} className={`${idx > 0 ? 'pt-4 sm:pt-6' : ''}`}>
              <div className="mb-2 sm:mb-3 flex items-center gap-2 flex-wrap">
                <span className="h-4 w-1 rounded-full bg-primary flex-shrink-0" />
                <h3 className="text-sm sm:text-lg font-semibold">{sub}</h3>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary-700 dark:text-primary-300 flex-shrink-0">共 {items.length}</span>
                <span className="mx-1 text-muted-foreground hidden sm:inline">·</span>
                <Link
                  href={`/categories/${key}/all?sub=${encodeURIComponent(sub)}&lang=${locale}`}
                  className="text-[11px] sm:text-[12px] inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition"
                >
                  查看全部
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Link>
                <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => scrollRow(sub, 'left')}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-muted-foreground/30 hover:bg-muted/40 transition"
                    aria-label="向左"
                    title="向左"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollRow(sub, 'right')}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-muted-foreground/30 hover:bg-muted/40 transition"
                    aria-label="向右"
                    title="向右"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div ref={setRowRef(sub)} className="relative flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1">
                {items.map((tool) => (
                  <div key={tool.key || tool.name} className="snap-start shrink-0 w-[160px] sm:w-[280px] lg:w-[320px]">
                    <ToolCard tool={tool} locale={locale} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>

      <BackToTop />
    </div>
  );
}
