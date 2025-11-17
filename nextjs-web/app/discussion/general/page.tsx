'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, MessageCircle, TrendingUp, Clock, Users, MessageSquare, ThumbsUp, Eye, Pin } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Topic {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  views: number;
  likes: number;
  lastReply: string;
  isPinned?: boolean;
  isHot?: boolean;
}

const MOCK_TOPICS: Topic[] = [
  {
    id: '1',
    title: 'ChatGPT vs Claude：2024年最强AI对话工具对比',
    author: 'AI探索者',
    avatar: '/avatars/user1.jpg',
    category: 'AI对话',
    replies: 156,
    views: 3420,
    likes: 89,
    lastReply: '2分钟前',
    isPinned: true,
    isHot: true
  },
  {
    id: '2',
    title: 'Midjourney V6 新功能体验分享',
    author: '设计师小王',
    avatar: '/avatars/user2.jpg',
    category: '图像生成',
    replies: 78,
    views: 1890,
    likes: 45,
    lastReply: '15分钟前',
    isHot: true
  },
  {
    id: '3',
    title: '如何用AI工具提升工作效率10倍？',
    author: '效率达人',
    avatar: '/avatars/user3.jpg',
    category: '效率工具',
    replies: 234,
    views: 5670,
    likes: 123,
    lastReply: '1小时前',
    isHot: true
  },
  {
    id: '4',
    title: 'GitHub Copilot 使用技巧分享',
    author: '程序员老李',
    avatar: '/avatars/user4.jpg',
    category: '代码助手',
    replies: 92,
    views: 2340,
    likes: 67,
    lastReply: '2小时前'
  },
  {
    id: '5',
    title: 'AI音乐生成工具横向评测',
    author: '音乐爱好者',
    avatar: '/avatars/user5.jpg',
    category: '音频工具',
    replies: 45,
    views: 1230,
    likes: 34,
    lastReply: '3小时前'
  },
  {
    id: '6',
    title: 'Notion AI 实战应用案例',
    author: '知识管理师',
    avatar: '/avatars/user6.jpg',
    category: '效率工具',
    replies: 67,
    views: 1890,
    likes: 56,
    lastReply: '5小时前'
  }
];

const ACTIVE_USERS = [
  { name: 'AI探索者', posts: 234, avatar: '/avatars/user1.jpg' },
  { name: '设计师小王', posts: 189, avatar: '/avatars/user2.jpg' },
  { name: '效率达人', posts: 156, avatar: '/avatars/user3.jpg' },
  { name: '程序员老李', posts: 134, avatar: '/avatars/user4.jpg' },
  { name: '音乐爱好者', posts: 98, avatar: '/avatars/user5.jpg' }
];

const CATEGORIES = ['全部', 'AI对话', '图像生成', '代码助手', '效率工具', '音频工具', '视频制作'];

export default function DiscussionGeneralPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('全部');
  const [sortBy, setSortBy] = React.useState<'latest' | 'hot' | 'popular'>('latest');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredTopics = React.useMemo(() => {
    let topics = selectedCategory === '全部' ? MOCK_TOPICS : MOCK_TOPICS.filter((t) => t.category === selectedCategory);

    if (sortBy === 'hot') topics = [...topics].sort((a, b) => b.views - a.views);
    else if (sortBy === 'popular') topics = [...topics].sort((a, b) => b.likes - a.likes);

    return topics;
  }, [selectedCategory, sortBy]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">综合讨论</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">综合讨论</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">参与AI工具相关的综合讨论和交流，分享经验、提出问题、获取帮助</p>
          </div>
          <Link
            href={`/discussion/new?lang=${locale}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
          >
            <MessageSquare className="h-4 w-4" />
            发起讨论
          </Link>
        </div>

        {/* 统计数据 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">讨论话题</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">1,234</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">活跃用户</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">5,678</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-medium">回复数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">23,456</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">今日新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+89</div>
          </div>
        </div>
      </section>

      {/* 主内容区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧主内容 */}
          <div className="lg:col-span-8">
            {/* 分类和排序 */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition ${
                      selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-muted-foreground">排序：</span>
                <button onClick={() => setSortBy('latest')} className={`px-2 py-1 rounded ${sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}>
                  <Clock className="h-3.5 w-3.5 inline mr-1" />
                  最新
                </button>
                <button onClick={() => setSortBy('hot')} className={`px-2 py-1 rounded ${sortBy === 'hot' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}>
                  <TrendingUp className="h-3.5 w-3.5 inline mr-1" />
                  最热
                </button>
                <button onClick={() => setSortBy('popular')} className={`px-2 py-1 rounded ${sortBy === 'popular' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}>
                  <ThumbsUp className="h-3.5 w-3.5 inline mr-1" />
                  最赞
                </button>
              </div>
            </div>

            {/* 话题列表 */}
            <div className="space-y-3">
              {filteredTopics.map((topic) => (
                <Link key={topic.id} href={`/discussion/topic/${topic.id}?lang=${locale}`} className="block p-4 sm:p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                      <AvatarImage src={topic.avatar} alt={topic.author} />
                      <AvatarFallback>{topic.author[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        {topic.isPinned && <Pin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />}
                        <h3 className="text-sm sm:text-base font-semibold group-hover:text-primary transition line-clamp-2">{topic.title}</h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground mb-3">
                        <span className="font-medium text-foreground/80">{topic.author}</span>
                        <span>·</span>
                        <Badge variant="secondary" className="text-xs">
                          {topic.category}
                        </Badge>
                        {topic.isHot && (
                          <Badge variant="destructive" className="text-xs">
                            🔥 热门
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {topic.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {topic.likes}
                        </span>
                        <span className="ml-auto flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {topic.lastReply}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多话题</button>
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 活跃用户 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                活跃用户
              </h3>
              <div className="space-y-3">
                {ACTIVE_USERS.map((user, idx) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{idx + 1}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.posts} 条发帖</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 讨论指南 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-3">📖 讨论指南</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>保持友善和尊重，营造良好的讨论氛围</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>发帖前先搜索，避免重复话题</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>提供详细信息，帮助他人更好地理解</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>分享真实体验，避免虚假宣传</span>
                </li>
              </ul>
            </div>

            {/* 快速链接 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🔗 快速链接</h3>
              <div className="space-y-2 text-sm">
                <Link href={`/discussion/feedback?lang=${locale}`} className="block px-3 py-2 rounded-lg hover:bg-accent transition">
                  反馈建议
                </Link>
                <Link href={`/discussion/tools?lang=${locale}`} className="block px-3 py-2 rounded-lg hover:bg-accent transition">
                  工具推荐
                </Link>
                <Link href={`/discussion/showcase?lang=${locale}`} className="block px-3 py-2 rounded-lg hover:bg-accent transition">
                  作品展示
                </Link>
                <Link href={`/discussion/tutorials?lang=${locale}`} className="block px-3 py-2 rounded-lg hover:bg-accent transition">
                  教程分享
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
