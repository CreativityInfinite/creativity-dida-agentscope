'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Zap, Calendar, Star, ExternalLink, TrendingUp } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

interface Release {
  id: string;
  product: string;
  version: string;
  title: string;
  description: string;
  category: string;
  releaseDate: string;
  highlights: string[];
  tags: string[];
  isNew?: boolean;
}

const MOCK_RELEASES: Release[] = [
  {
    id: '1',
    product: 'ChatGPT',
    version: 'GPT-4 Turbo',
    title: 'ChatGPT发布GPT-4 Turbo版本',
    description: 'OpenAI发布GPT-4 Turbo，支持更长的上下文窗口（128K tokens），性能提升，价格降低。',
    category: 'AI对话',
    releaseDate: '2024-01-15',
    highlights: ['128K上下文窗口', '性能提升40%', '价格降低50%', '支持JSON模式'],
    tags: ['ChatGPT', 'GPT-4', '重大更新'],
    isNew: true
  },
  {
    id: '2',
    product: 'Midjourney',
    version: 'V6',
    title: 'Midjourney V6正式发布',
    description: 'Midjourney V6带来了革命性的图像生成质量提升，更好的文本渲染和细节处理能力。',
    category: '图像生成',
    releaseDate: '2024-01-14',
    highlights: ['图像质量大幅提升', '更准确的文本渲染', '更好的细节处理', '新增风格参数'],
    tags: ['Midjourney', '图像生成', '重大更新'],
    isNew: true
  },
  {
    id: '3',
    product: 'GitHub Copilot',
    version: 'Enterprise',
    title: 'GitHub Copilot企业版上线',
    description: 'GitHub推出Copilot企业版，提供更强大的代码补全、安全性和团队协作功能。',
    category: '代码助手',
    releaseDate: '2024-01-13',
    highlights: ['企业级安全', '团队协作功能', '自定义模型训练', '代码审查集成'],
    tags: ['GitHub', 'Copilot', '企业版']
  },
  {
    id: '4',
    product: 'Runway',
    version: 'Gen-2',
    title: 'Runway Gen-2视频生成升级',
    description: 'Runway Gen-2带来更流畅的视频生成效果，支持更长的视频时长和更高的分辨率。',
    category: '视频生成',
    releaseDate: '2024-01-12',
    highlights: ['支持4K分辨率', '视频时长提升至30秒', '更流畅的动作', '新增风格预设'],
    tags: ['Runway', '视频生成', '功能更新']
  },
  {
    id: '5',
    product: 'Notion AI',
    version: '2.0',
    title: 'Notion AI 2.0重大更新',
    description: 'Notion AI 2.0带来更智能的写作辅助、数据分析和自动化功能。',
    category: '效率工具',
    releaseDate: '2024-01-11',
    highlights: ['智能写作助手', '数据分析功能', '工作流自动化', 'API开放'],
    tags: ['Notion', 'AI助手', '功能更新']
  }
];

const CATEGORIES = ['全部', 'AI对话', '图像生成', '代码助手', '视频生成', '效率工具', '音频工具'];

export default function NewsReleasesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('全部');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredReleases = React.useMemo(() => {
    return selectedCategory === '全部' ? MOCK_RELEASES : MOCK_RELEASES.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen">
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">产品发布</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">产品发布</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">了解最新的AI工具产品发布和重要更新</p>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-medium">发布总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">234</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">本月新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">23</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Star className="h-4 w-4" />
              <span className="text-xs font-medium">重大更新</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">45</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">本周发布</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">5</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
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

            <div className="space-y-6">
              {filteredReleases.map((release) => (
                <div key={release.id} className="p-6 rounded-xl border bg-card hover:shadow-lg transition">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{release.product}</h3>
                        <Badge variant="outline" className="text-xs">
                          {release.version}
                        </Badge>
                        {release.isNew && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            最新
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-foreground/90 mb-2">{release.title}</h4>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{release.description}</p>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      核心亮点
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {release.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {release.category}
                      </Badge>
                      {release.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {release.releaseDate}
                      </span>
                      <Link href={`/news/releases/${release.id}?lang=${locale}`} className="flex items-center gap-1 text-primary hover:underline">
                        查看详情
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多发布</button>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-3">📅 即将发布</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-card border">
                  <div className="font-medium mb-1">Claude 3.5 Sonnet</div>
                  <div className="text-xs text-muted-foreground">预计 2024-02-01</div>
                </div>
                <div className="p-3 rounded-lg bg-card border">
                  <div className="font-medium mb-1">DALL-E 4</div>
                  <div className="text-xs text-muted-foreground">预计 2024-02-15</div>
                </div>
                <div className="p-3 rounded-lg bg-card border">
                  <div className="font-medium mb-1">Suno AI V4</div>
                  <div className="text-xs text-muted-foreground">预计 2024-03-01</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🔔 订阅发布通知</h3>
              <p className="text-sm text-muted-foreground mb-4">第一时间获取产品发布信息</p>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">立即订阅</button>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
