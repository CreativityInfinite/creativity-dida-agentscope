'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';

import type { Tool } from '@/types/tool';
import { Home, Bookmark, Star, Users, Lightbulb } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

export default function EditorsPicksPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const editorsPicks = React.useMemo(() => {
    return [...ALL_TOOLS]
      .filter((t) => (t.rating ?? 0) >= 4.2)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 15);
  }, []);

  const categories = React.useMemo(() => {
    const cats: Record<string, Tool[]> = {};
    editorsPicks.forEach((tool) => {
      const cat = tool.primaryCategory || 'Others';
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(tool);
    });
    return Object.entries(cats).map(([cat, tools]) => ({ cat, tools, count: tools.length }));
  }, [editorsPicks]);

  const highlights = [
    { title: '功能完整', desc: '工具功能齐全，满足用户多样化需求' },
    { title: '用户体验', desc: '界面友好，操作简便，学习成本低' },
    { title: '稳定可靠', desc: '服务稳定，更新及时，技术支持完善' },
    { title: '创新突出', desc: '功能创新，技术先进，行业领先' }
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">编辑推荐</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8">
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">编辑推荐</h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-3xl">编辑团队精心挑选的优质 AI 工具，经过严格评估和实际测试，为您推荐最值得使用的工具。</p>
        </div>
      </section>

      {/* 推荐标准 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">编辑推荐标准</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {highlights.map(({ title, desc }) => (
            <div key={title} className="p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
              <div className="font-semibold text-sm mb-1">{title}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 分类推荐 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">分类推荐</h2>
        </div>

        <div className="space-y-6">
          {categories.map(({ cat, tools, count }) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-sm">{cat}</h3>
                <Badge variant="secondary" className="text-xs">
                  {count} 个
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

      {/* 编辑寄语 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            编辑寄语
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            这些工具都是我们团队经过长期使用和评估后精心挑选的。每一款工具都在其领域内表现出色，具有创新性和实用性。我们相信这些工具能够帮助您提高工作效率，激发创意灵感。如果您有任何建议或发现了更好的工具，欢迎与我们分享。
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"></section>
      <BackToTop />
    </div>
  );
}
