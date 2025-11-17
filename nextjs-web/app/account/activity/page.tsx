'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Activity, Bookmark, MessageCircle, Heart, Eye, Search, Calendar, Filter, TrendingUp, Clock, User, FileText, Image as ImageIcon } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

// 活动类型配置
const ACTIVITY_TYPES = {
  collection: { label: '收藏', icon: Bookmark, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
  comment: { label: '评论', icon: MessageCircle, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30' },
  like: { label: '点赞', icon: Heart, color: 'text-red-500 bg-red-50 dark:bg-red-950/30' },
  view: { label: '浏览', icon: Eye, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' },
  post: { label: '发布', icon: FileText, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30' },
  share: { label: '分享', icon: TrendingUp, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' }
};

// 模拟活动数据
const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'collection',
    title: '收藏了工具',
    target: 'ChatGPT',
    targetType: 'tool',
    description: '将 ChatGPT 添加到收藏夹',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metadata: { category: '对话工具', rating: 4.9 }
  },
  {
    id: '2',
    type: 'comment',
    title: '评论了文章',
    target: 'AI 绘画工具对比',
    targetType: 'article',
    description: '发表了一条评论：这篇文章写得很详细，对我选择工具很有帮助！',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    metadata: { likes: 12 }
  },
  {
    id: '3',
    type: 'like',
    title: '点赞了教程',
    target: 'Midjourney 使用指南',
    targetType: 'tutorial',
    description: '觉得这个教程很有用',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { author: '李明' }
  },
  {
    id: '4',
    type: 'view',
    title: '浏览了工具',
    target: 'Stable Diffusion',
    targetType: 'tool',
    description: '查看了工具详情页',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { duration: '5 分钟' }
  },
  {
    id: '5',
    type: 'post',
    title: '发布了讨论',
    target: '如何选择合适的 AI 绘画工具？',
    targetType: 'discussion',
    description: '在社区发起了一个新的讨论话题',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { replies: 23, views: 156 }
  },
  {
    id: '6',
    type: 'share',
    title: '分享了案例',
    target: '使用 AI 工具提升设计效率',
    targetType: 'case-study',
    description: '分享到社交媒体',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { platform: 'Twitter' }
  },
  {
    id: '7',
    type: 'collection',
    title: '收藏了文章',
    target: 'Claude 代码助手使用技巧',
    targetType: 'article',
    description: '保存以便稍后阅读',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { readTime: '8 分钟' }
  },
  {
    id: '8',
    type: 'comment',
    title: '评论了工具',
    target: 'Suno AI',
    targetType: 'tool',
    description: '发表了使用体验：音乐生成质量很高，非常推荐！',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: { rating: 5 }
  }
];

export default function AccountActivityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [locale, setLocale] = React.useState('zh-CN');
  const { data: session, status } = useSession();
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateRange, setDateRange] = React.useState<string>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  // 如果未登录，重定向到登录页
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?lang=${locale}&callbackUrl=/account/activity`);
    }
  }, [status, locale, router]);

  if (status === 'loading') {
    return (
      <div className="relative min-h-screen">
        <GradientBackground type="index" />
        <SiteNavigation locale={locale} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  // 筛选活动
  const filteredActivities = React.useMemo(() => {
    let result = MOCK_ACTIVITIES;

    // 类型筛选
    if (selectedType !== 'all') {
      result = result.filter((a) => a.type === selectedType);
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((a) => a.title.toLowerCase().includes(query) || a.target.toLowerCase().includes(query) || a.description.toLowerCase().includes(query));
    }

    // 日期筛选
    if (dateRange !== 'all') {
      const now = Date.now();
      const ranges: Record<string, number> = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      const range = ranges[dateRange];
      if (range) {
        result = result.filter((a) => now - new Date(a.timestamp).getTime() <= range);
      }
    }

    return result;
  }, [selectedType, searchQuery, dateRange]);

  // 统计数据
  const stats = React.useMemo(() => {
    return {
      total: MOCK_ACTIVITIES.length,
      collections: MOCK_ACTIVITIES.filter((a) => a.type === 'collection').length,
      comments: MOCK_ACTIVITIES.filter((a) => a.type === 'comment').length,
      likes: MOCK_ACTIVITIES.filter((a) => a.type === 'like').length
    };
  }, []);

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const now = Date.now();
    const time = new Date(timestamp).getTime();
    const diff = now - time;

    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    if (days < 7) return `${days} 天前`;
    return new Date(timestamp).toLocaleDateString('zh-CN');
  };

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
              <BreadcrumbLink asChild>
                <Link href={`/account?lang=${locale}`}>账户</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">活动记录</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">活动记录</h1>
            <p className="text-sm text-muted-foreground mt-1">查看您的账户活动历史和使用统计</p>
          </div>
        </div>
      </section>

      {/* 统计卡片 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
            <div className="text-xs text-muted-foreground">总活动数</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.collections}</div>
            <div className="text-xs text-muted-foreground">收藏次数</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.comments}</div>
            <div className="text-xs text-muted-foreground">评论次数</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{stats.likes}</div>
            <div className="text-xs text-muted-foreground">点赞次数</div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 搜索框 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索活动..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 类型筛选 */}
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                selectedType === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
              }`}
            >
              全部
            </button>
            {Object.entries(ACTIVITY_TYPES).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 whitespace-nowrap ${
                    selectedType === key ? `${config.color} shadow-sm` : 'bg-muted/50 hover:bg-muted text-foreground/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </button>
              );
            })}
          </div>

          {/* 日期筛选 */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: '全部' },
              { value: 'today', label: '今天' },
              { value: 'week', label: '本周' },
              { value: 'month', label: '本月' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDateRange(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  dateRange === value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 活动列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-xl border bg-card overflow-hidden">
          {filteredActivities.length === 0 ? (
            <div className="p-12 text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">暂无活动记录</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredActivities.map((activity) => {
                const config = ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES];
                const Icon = config.icon;
                return (
                  <div key={activity.id} className="p-6 hover:bg-muted/30 transition">
                    <div className="flex items-start gap-4">
                      {/* 图标 */}
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${config.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium mb-1">{activity.title}</h3>
                            <p className="text-sm text-primary font-medium mb-1">{activity.target}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {config.label}
                          </Badge>
                        </div>

                        {/* 元数据 */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(activity.timestamp)}</span>
                          </div>
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
