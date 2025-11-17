'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Newspaper, ThumbsUp, MessageCircle, Eye, Calendar, User, Award } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Opinion {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  avatar: string;
  category: string;
  readTime: number;
  likes: number;
  comments: number;
  views: number;
  date: string;
  featured?: boolean;
}

const MOCK_OPINIONS: Opinion[] = [
  {
    id: '1',
    title: 'AI不会取代人类，但会重新定义工作',
    excerpt: '随着AI技术的快速发展，很多人担心AI会取代人类工作。但从历史来看，每一次技术革命都创造了更多新的工作机会。AI的真正价值在于解放人类的创造力...',
    author: '张教授',
    authorTitle: 'AI研究专家',
    avatar: '/avatars/expert1.jpg',
    category: 'AI未来',
    readTime: 8,
    likes: 1234,
    comments: 156,
    views: 12345,
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: '开源AI模型：机遇与挑战并存',
    excerpt: '开源AI模型的兴起为AI技术的普及带来了巨大机遇，但同时也带来了安全、伦理等方面的挑战。如何在开放与安全之间找到平衡，是行业需要思考的问题...',
    author: '李博士',
    authorTitle: '开源社区领袖',
    avatar: '/avatars/expert2.jpg',
    category: '开源生态',
    readTime: 10,
    likes: 987,
    comments: 134,
    views: 9876,
    date: '2024-01-14',
    featured: true
  },
  {
    id: '3',
    title: 'AIGC时代的版权问题亟待解决',
    excerpt: 'AI生成内容的版权归属问题正在成为行业关注的焦点。是归属于AI开发者、使用者，还是AI本身？这个问题需要法律、技术、伦理多方面的探讨...',
    author: '王律师',
    authorTitle: '知识产权专家',
    avatar: '/avatars/expert3.jpg',
    category: '法律伦理',
    readTime: 12,
    likes: 876,
    comments: 112,
    views: 8765,
    date: '2024-01-13'
  },
  {
    id: '4',
    title: '多模态AI：下一个技术突破口',
    excerpt: '从单一模态到多模态，AI正在向更加自然的交互方式演进。多模态AI不仅能理解文本，还能理解图像、音频、视频，这将为AI应用带来无限可能...',
    author: '陈研究员',
    authorTitle: 'AI技术专家',
    avatar: '/avatars/expert4.jpg',
    category: 'AI技术',
    readTime: 9,
    likes: 765,
    comments: 98,
    views: 7654,
    date: '2024-01-12'
  },
  {
    id: '5',
    title: 'AI安全：不容忽视的重要议题',
    excerpt: 'AI技术的快速发展也带来了安全隐患。从数据泄露到模型攻击，AI安全问题需要引起足够重视。建立完善的AI安全体系刻不容缓...',
    author: '赵专家',
    authorTitle: '网络安全专家',
    avatar: '/avatars/expert5.jpg',
    category: 'AI安全',
    readTime: 11,
    likes: 654,
    comments: 87,
    views: 6543,
    date: '2024-01-11'
  }
];

const TOP_AUTHORS = [
  { name: '张教授', title: 'AI研究专家', articles: 45, avatar: '/avatars/expert1.jpg' },
  { name: '李博士', title: '开源社区领袖', articles: 38, avatar: '/avatars/expert2.jpg' },
  { name: '王律师', title: '知识产权专家', articles: 32, avatar: '/avatars/expert3.jpg' },
  { name: '陈研究员', title: 'AI技术专家', articles: 28, avatar: '/avatars/expert4.jpg' }
];

const CATEGORIES = ['全部', 'AI未来', '开源生态', '法律伦理', 'AI技术', 'AI安全', '商业应用'];

export default function NewsOpinionPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('全部');
  const [sortBy, setSortBy] = React.useState<'latest' | 'popular' | 'trending'>('latest');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredOpinions = React.useMemo(() => {
    let opinions = selectedCategory === '全部' ? MOCK_OPINIONS : MOCK_OPINIONS.filter((o) => o.category === selectedCategory);

    if (sortBy === 'popular') opinions = [...opinions].sort((a, b) => b.likes - a.likes);
    else if (sortBy === 'trending') opinions = [...opinions].sort((a, b) => b.views - a.views);

    return opinions;
  }, [selectedCategory, sortBy]);

  const featuredOpinions = React.useMemo(() => {
    return MOCK_OPINIONS.filter((o) => o.featured);
  }, []);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">观点评论</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">观点评论</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">阅读专家对AI工具和技术发展的深度观点，获取行业洞察</p>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Newspaper className="h-4 w-4" />
              <span className="text-xs font-medium">文章总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">234</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <User className="h-4 w-4" />
              <span className="text-xs font-medium">专家作者</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">45</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">总阅读量</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">456K</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">总点赞数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">12.3K</div>
          </div>
        </div>
      </section>

      {/* 精选观点 */}
      {featuredOpinions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            精选观点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOpinions.map((opinion) => (
              <Link key={opinion.id} href={`/news/opinion/${opinion.id}?lang=${locale}`} className="group rounded-xl border bg-card p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={opinion.avatar} alt={opinion.author} />
                    <AvatarFallback>{opinion.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{opinion.author}</div>
                    <div className="text-xs text-muted-foreground">{opinion.authorTitle}</div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">精选</Badge>
                </div>

                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition">{opinion.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{opinion.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {opinion.category}
                    </Badge>
                    <span>{opinion.readTime} 分钟阅读</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {opinion.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {opinion.comments}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧主内容 */}
          <div className="lg:col-span-8">
            {/* 筛选和排序 */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition ${selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">排序：</span>
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最新发布
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'popular' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最受欢迎
                </button>
                <button
                  onClick={() => setSortBy('trending')}
                  className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'trending' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  热门浏览
                </button>
              </div>
            </div>

            {/* 观点列表 */}
            <div className="space-y-4">
              {filteredOpinions.map((opinion) => (
                <Link key={opinion.id} href={`/news/opinion/${opinion.id}?lang=${locale}`} className="block p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={opinion.avatar} alt={opinion.author} />
                      <AvatarFallback>{opinion.author[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-base font-semibold group-hover:text-primary transition line-clamp-1 mb-1">{opinion.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/80">{opinion.author}</span>
                            <span>·</span>
                            <span>{opinion.authorTitle}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{opinion.excerpt}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {opinion.category}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {opinion.date}
                        </span>
                        <span>{opinion.readTime} 分钟阅读</span>
                        <span className="ml-auto flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {opinion.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {opinion.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {opinion.views.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多观点</button>
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 热门作者 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                热门作者
              </h3>
              <div className="space-y-4">
                {TOP_AUTHORS.map((author, idx) => (
                  <div key={author.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{idx + 1}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={author.avatar} alt={author.name} />
                      <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{author.name}</div>
                      <div className="text-xs text-muted-foreground">{author.title}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{author.articles} 篇</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 投稿指南 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-3">✍️ 成为专栏作者</h3>
              <p className="text-sm text-muted-foreground mb-4">分享您的专业见解，影响更多人</p>
              <ul className="space-y-2 text-sm text-foreground/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>具备AI领域专业背景</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>提供原创深度内容</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>保持定期更新</span>
                </li>
              </ul>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">申请成为作者</button>
            </div>

            {/* 订阅提醒 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🔔 订阅观点更新</h3>
              <p className="text-sm text-muted-foreground mb-4">订阅后将第一时间收到新观点通知</p>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">立即订阅</button>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
