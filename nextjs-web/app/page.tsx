import Link from 'next/link';
import { toolsData } from '@data/tools';
import { SearchBar } from '@component/SearchBar';
import { Button } from '@component/ui/button';
import { ToolCard } from '@component/ToolCard';
import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { getMessages } from '@i18n/index';
import { ScrollTrigger } from '@component/ScrollTrigger';
import { BackToTop } from '@component/BackToTop';
import { Search, Upload, TrendingUp, Image, SquarePen, Code, Mic, LineChart, Zap, Compass, MessageCircleMore } from 'lucide-react';
import { Tool } from '@/types/tool';
import { GradientBackground } from '@component/shared/GradientBackground';
import { cookies } from 'next/headers';

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const cookieStore = await cookies();
  const sp = searchParams ? await searchParams : undefined;
  const locale = sp?.lang || cookieStore.get('NEXT_LOCALE')?.value || 'zh-CN';
  const messages = getMessages(locale);
  const topTools = toolsData as Tool[];
  const hotTags = messages?.labels?.hotTagsList ?? [];
  const hotTagColors = ['#1d4ed81a', '#9333ea1a', '#22d3ee1a', '#f59e0b1a', '#ef44441a', '#10b9811a', '#3b82f61a'];

  return (
    <ScrollTrigger locale={locale} triggerDistance={100} autoScrollTarget="hot-tools-section" reverseScrollTarget="top" showIndicator={true}>
      <div className="relative">
        {/* 背景渐变网格 - 覆盖整个顶部区域 */}
        <GradientBackground type="index" />

        {/* 导航 */}
        <SiteNavigation locale={locale} />

        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 lg:pb-50 text-center min-h-screen flex flex-col justify-center">
          {/* 标题 - 响应式字体大小 */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight px-2 sm:px-0">{messages.hero.title}</h1>

          {/* 副标题 - 响应式间距和字体 */}
          <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">{messages.hero.subtitle}</p>

          {/* 搜索框 - 响应式宽度和间距 */}
          <div id="search-section" className="mt-6 sm:mt-8 lg:mt-10 flex justify-center px-4 sm:px-0">
            <div className="relative group w-full max-w-sm sm:max-w-2xl lg:max-w-3xl">
              {/* 柔光氛围：悬停或聚焦时出现的轻微光晕 */}
              <div className="pointer-events-none absolute -inset-3 sm:-inset-6 rounded-2xl sm:rounded-3xl bg-primary/5 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              <SearchBar placeholder={messages.search.placeholder} showButton={false} />
            </div>
          </div>

          {/* 行动按钮 - 移动端优化 */}
          <div className="mt-6 sm:mt-8 lg:mt-10 px-4 sm:px-0">
            {/* 移动端：紧凑的图标按钮 */}
            <div className="sm:hidden flex justify-center gap-4">
              <Link href="/explore">
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-3 py-2 h-auto">
                  <Compass className="h-5 w-5" />
                  <span className="text-xs">{messages.cta.explore}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-3 py-2 h-auto">
                <Upload className="h-5 w-5" />
                <span className="text-xs">{messages.cta.submit}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-3 py-2 h-auto">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">{messages.cta.trends}</span>
              </Button>
            </div>

            {/* 桌面端：原有的横向布局 */}
            <div className="hidden sm:flex flex-row gap-4 lg:gap-5 justify-center items-center">
              <Link href="/explore">
                <Button variant="ghost" size="sm" className="px-8 py-3 text-base">
                  <Compass className="mr-2 h-5 w-5" />
                  {messages.cta.explore}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="px-8 py-3 text-base">
                <Upload className="mr-2 h-5 w-5" />
                {messages.cta.submit}
              </Button>
              <Button variant="ghost" size="sm" className="px-8 py-3 text-base">
                <TrendingUp className="mr-2 h-5 w-5" />
                {messages.cta.trends}
              </Button>
            </div>
          </div>

          {/* 热门标签 - 响应式网格 */}
          <div className="mt-8 sm:mt-10 lg:mt-12 max-w-xs sm:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-0">
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {hotTags.map((tag, index) => {
                const categoryLinks = [
                  '/categories/image-generation',
                  '/categories/writing',
                  '/categories/chat-tools',
                  '/categories/code-assistant',
                  '/categories/audio-voice',
                  '/categories/data-insights',
                  '/categories/automation'
                ];
                const icons = [Image, SquarePen, MessageCircleMore, Code, Mic, LineChart, Zap];
                const Icon = icons[index] || Search;
                const href = categoryLinks[index] || `/search/${encodeURIComponent(tag)}`;
                return (
                  <Link key={tag} href={href}>
                    <div
                      className="group cursor-pointer rounded-xl sm:rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-300 px-3 sm:px-4 lg:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 text-left"
                      style={{ backgroundColor: hotTagColors[index % hotTagColors.length] }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:animate-none animate-pulse shrink-0" />
                      <span className="text-xs sm:text-sm font-medium transition-colors duration-300 truncate">{tag}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 热门工具 - 优化移动端展示 */}
        <section id="hot-tools-section" className="container mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center mb-6 sm:mb-10 lg:mb-12 px-2 sm:px-0">{messages.headings?.hotTools}</h2>
          <div className="grid gap-3 sm:gap-6 lg:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {topTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} locale={locale} />
            ))}
          </div>
        </section>

        {/* Footer - 响应式间距 */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Footer locale={locale} />
        </section>
      </div>

      <BackToTop />
    </ScrollTrigger>
  );
}
