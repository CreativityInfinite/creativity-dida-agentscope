'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, TrendingUp, ArrowUp, ArrowDown, Minus, BarChart3, Eye, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

interface Trend {
  id: string;
  title: string;
  description: string;
  category: string;
  change: 'up' | 'down' | 'stable';
  changePercent: number;
  views: number;
  comments: number;
  date: string;
  tags: string[];
}

const MOCK_TRENDS: Trend[] = [
  {
    id: '1',
    title: 'AI代理（AI Agent）成为2024年最热门趋势',
    description: 'AI代理技术正在快速发展，从简单的任务自动化到复杂的决策支持，AI Agent正在改变我们与AI交互的方式。',
    category: 'AI技术',
    change: 'up',
    changePercent: 156,
    views: 12345,
    comments: 234,
    date: '2024-01-15',
    tags: ['AI Agent', '自动化', '趋势']
  },
  {
    id: '2',
    title: '多模态AI模型持续突破',
    description: '从GPT-4V到Gemini，多模态AI模型正在打破文本、图像、音频之间的界限，为用户提供更加自然的交互体验。',
    category: 'AI技术',
    change: 'up',
    changePercent: 89,
    views: 9876,
    comments: 178,
    date: '2024-01-14',
    tags: ['多模态', 'GPT-4V', 'Gemini']
  },
  {
    id: '3',
    title: '开源AI模型生态蓬勃发展',
    description: 'Llama 2、Mistral等开源模型的出现，正在降低AI应用的门槛，推动AI技术的民主化进程。',
    category: 'AI技术',
    change: 'up',
    changePercent: 67,
    views: 8765,
    comments: 156,
    date: '2024-01-13',
    tags: ['开源', 'Llama', 'Mistral']
  },
  {
    id: '4',
    title: 'AI生成内容（AIGC）商业化加速',
    description: 'AIGC正在从实验阶段走向商业化，越来越多的企业开始将AI生成内容应用到实际业务中。',
    category: '商业应用',
    change: 'up',
    changePercent: 45,
    views: 7654,
    comments: 134,
    date: '2024-01-12',
    tags: ['AIGC', '商业化', '内容生成']
  },
  {
    id: '5',
    title: 'AI安全与伦理问题受到更多关注',
    description: '随着AI技术的广泛应用，AI安全、隐私保护、伦理问题成为行业关注的焦点。',
    category: 'AI伦理',
    change: 'stable',
    changePercent: 0,
    views: 6543,
    comments: 112,
    date: '2024-01-11',
    tags: ['AI安全', '伦理', '隐私']
  },
  {
    id: '6',
    title: '边缘AI设备市场增长放缓',
    description: '受市场饱和和技术瓶颈影响，边缘AI设备市场增长速度有所放缓。',
    category: '硬件设备',
    change: 'down',
    changePercent: -12,
    views: 5432,
    comments: 89,
    date: '2024-01-10',
    tags: ['边缘AI', '硬件', '市场']
  }
];

const HOT_TOPICS = [
  { topic: 'AI Agent', heat: 95 },
  { topic: '多模态AI', heat: 88 },
  { topic: '开源模型', heat: 76 },
  { topic: 'AIGC', heat: 72 },
  { topic: 'AI安全', heat: 65 }
];

const CATEGORIES = ['全部', 'AI技术', '商业应用', 'AI伦理', '硬件设备', '政策法规'];

export default function NewsTrendsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('全部');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredTrends = React.useMemo(() => {
    return selectedCategory === '全部' ? MOCK_TRENDS : MOCK_TRENDS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const getChangeBadge = (change: string, percent: number) => {
    if (change === 'up')
      return (
        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
          <ArrowUp className="h-3 w-3 mr-1" />+{percent}%
        </Badge>
      );
    if (change === 'down')
      return (
        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-xs">
          <ArrowDown className="h-3 w-3 mr-1" />
          {percent}%
        </Badge>
      );
    return (
      <Badge variant="secondary" className="text-xs">
        <Minus className="h-3 w-3 mr-1" />
        持平
      </Badge>
    );
  };

  return (
    <div className="relative min-h-screen">
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">AI趋势</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">AI趋势</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">了解AI行业的最新趋势和发展动态，把握技术发展方向</p>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">趋势总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">156</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs font-medium">上升趋势</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">89</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">总浏览量</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">234K</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">本周新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+12</div>
          </div>
        </div>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧主内容 */}
          <div className="lg:col-span-8">
            {/* 分类筛选 */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm rounded-lg transition ${selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 趋势列表 */}
            <div className="space-y-4">
              {filteredTrends.map((trend) => (
                <Link key={trend.id} href={`/news/trends/${trend.id}?lang=${locale}`} className="block p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold group-hover:text-primary transition line-clamp-1">{trend.title}</h3>
                        {getChangeBadge(trend.change, trend.changePercent)}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{trend.description}</p>

                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {trend.category}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {trend.date}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {trend.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {trend.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {trend.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多趋势</button>
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 热门话题 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                热门话题
              </h3>
              <div className="space-y-4">
                {HOT_TOPICS.map((topic) => (
                  <div key={topic.topic}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{topic.topic}</span>
                        <Badge variant="secondary" className="text-xs">
                          {topic.heat}°
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all" style={{ width: `${topic.heat}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 趋势说明 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-3">📊 趋势指标说明</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-600 dark:text-green-400">上升趋势</div>
                    <div className="text-xs text-muted-foreground">关注度持续增长</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowDown className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-red-600 dark:text-red-400">下降趋势</div>
                    <div className="text-xs text-muted-foreground">关注度有所下降</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Minus className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">稳定趋势</div>
                    <div className="text-xs text-muted-foreground">关注度保持稳定</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 订阅提醒 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🔔 订阅趋势更新</h3>
              <p className="text-sm text-muted-foreground mb-4">订阅后将第一时间收到AI趋势更新通知</p>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">立即订阅</button>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
