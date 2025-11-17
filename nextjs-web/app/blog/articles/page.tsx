'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, FileText, Clock, ArrowRight, TrendingUp, Bookmark, Eye, MessageCircle, Calendar } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'AI 工具如何改变创意产业：2024 年度报告',
    excerpt: '深入分析 AI 工具在设计、写作、音乐创作等领域的应用现状，探讨未来发展趋势和机遇。',
    author: { name: '张明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang' },
    date: '2024-03-15',
    readTime: 12,
    views: 2845,
    comments: 34,
    category: '行业洞察',
    tags: ['AI', '创意产业', '趋势分析'],
    featured: true
  },
  {
    id: '2',
    title: 'ChatGPT vs Claude：大语言模型对比评测',
    excerpt: '从功能、性能、使用体验等多个维度对比主流大语言模型，帮助你选择最适合的工具。',
    author: { name: '李华', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li' },
    date: '2024-03-12',
    readTime: 8,
    views: 3421,
    comments: 56,
    category: '工具评测',
    tags: ['ChatGPT', 'Claude', '评测']
  },
  {
    id: '3',
    title: 'Midjourney 6.0 新功能详解：更真实的 AI 绘画',
    excerpt: 'Midjourney 6.0 带来了革命性的更新，图像质量和细节表现力大幅提升，本文详细解析新功能。',
    author: { name: '王芳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang' },
    date: '2024-03-10',
    readTime: 10,
    views: 4123,
    comments: 67,
    category: '产品更新',
    tags: ['Midjourney', 'AI绘画', '新功能']
  },
  {
    id: '4',
    title: '提示词工程：如何写出高质量的 AI 提示词',
    excerpt: '掌握提示词工程的核心技巧，让 AI 更好地理解你的需求，生成更符合预期的内容。',
    author: { name: '陈杰', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen' },
    date: '2024-03-08',
    readTime: 15,
    views: 5234,
    comments: 89,
    category: '技术教程',
    tags: ['提示词', 'AI技巧', '教程']
  },
  {
    id: '5',
    title: 'AI 音乐生成工具横评：Suno vs Udio',
    excerpt: '对比两款热门 AI 音乐生成工具的功能、音质、易用性，找出最适合你的音乐创作助手。',
    author: { name: '刘洋', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu' },
    date: '2024-03-05',
    readTime: 9,
    views: 2987,
    comments: 45,
    category: '工具评测',
    tags: ['AI音乐', 'Suno', 'Udio']
  },
  {
    id: '6',
    title: '开源 AI 模型的崛起：Llama 3 深度解析',
    excerpt: 'Meta 发布的 Llama 3 标志着开源 AI 模型的新里程碑，本文深入分析其技术特点和应用场景。',
    author: { name: '赵敏', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao' },
    date: '2024-03-03',
    readTime: 13,
    views: 3654,
    comments: 72,
    category: '技术深度',
    tags: ['Llama', '开源', 'AI模型']
  }
];

const CATEGORIES = ['全部', '行业洞察', '工具评测', '产品更新', '技术教程', '技术深度'];

export default function BlogArticlesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('全部');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredArticles = React.useMemo(() => {
    if (selectedCategory === '全部') return MOCK_ARTICLES;
    return MOCK_ARTICLES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const featuredArticle = MOCK_ARTICLES.find((a) => a.featured);
  const topArticles = React.useMemo(() => {
    return [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 3);
  }, []);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">博客文章</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">博客文章</h1>
            <p className="text-sm text-muted-foreground mt-1">深度文章、行业洞察、工具评测</p>
          </div>
        </div>
      </section>

      {/* 特色文章 */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-amber-500" />
            <h2 className="text-lg font-semibold">特色文章</h2>
          </div>
          <div className="relative rounded-2xl border bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 sm:p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Badge className="mb-3">{featuredArticle.category}</Badge>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{featuredArticle.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{featuredArticle.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <img src={featuredArticle.author.avatar} alt={featuredArticle.author.name} className="h-6 w-6 rounded-full" />
                  <span>{featuredArticle.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{featuredArticle.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{featuredArticle.readTime} 分钟阅读</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{featuredArticle.views.toLocaleString()} 阅读</span>
                </div>
              </div>
              <Link href={`/blog/articles/${featuredArticle.id}?lang=${locale}`} className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                阅读全文
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 分类筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 文章列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.map((article) => (
              <article key={article.id} className="group rounded-xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition">
                    <Link href={`/blog/articles/${article.id}?lang=${locale}`}>{article.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <img src={article.author.avatar} alt={article.author.name} className="h-5 w-5 rounded-full" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{article.readTime} 分钟</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{article.comments}</span>
                      </div>
                    </div>
                    <Link href={`/blog/articles/${article.id}?lang=${locale}`} className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
                      阅读更多
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 热门文章 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                热门文章
              </h3>
              <div className="space-y-4">
                {topArticles.map((article, idx) => (
                  <div key={article.id} className="flex gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/blog/articles/${article.id}?lang=${locale}`} className="text-sm font-medium hover:text-primary transition line-clamp-2">
                        {article.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 标签云 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', '创意产业', 'ChatGPT', 'Midjourney', '提示词', '评测', '教程', '开源'].map((tag) => (
                  <Link key={tag} href={`/blog/articles?tag=${tag}&lang=${locale}`} className="px-3 py-1 rounded-md bg-muted/50 hover:bg-muted text-xs font-medium transition">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* 订阅 */}
            <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-5">
              <h3 className="text-sm font-semibold mb-2">订阅博客</h3>
              <p className="text-xs text-muted-foreground mb-4">获取最新文章和行业洞察</p>
              <input type="email" placeholder="输入邮箱地址" className="w-full px-3 py-2 rounded-lg border bg-background text-sm mb-3" />
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">订阅</button>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
