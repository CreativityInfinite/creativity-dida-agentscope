'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, MessageSquare, CheckCircle2, Clock, AlertCircle, Lightbulb, Bug, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Feedback {
  id: string;
  type: 'feature' | 'bug' | 'improvement';
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'reviewing' | 'planned' | 'completed';
  votes: number;
  date: string;
}

const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: '1',
    type: 'feature',
    title: '希望增加AI工具对比功能',
    description: '可以同时对比多个AI工具的功能、价格、性能等',
    author: '用户A',
    status: 'planned',
    votes: 234,
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'improvement',
    title: '优化移动端浏览体验',
    description: '移动端页面加载速度可以更快一些',
    author: '用户B',
    status: 'reviewing',
    votes: 156,
    date: '2024-01-14'
  },
  {
    id: '3',
    type: 'bug',
    title: '搜索功能偶尔无响应',
    description: '在搜索某些关键词时页面会卡住',
    author: '用户C',
    status: 'completed',
    votes: 89,
    date: '2024-01-13'
  },
  {
    id: '4',
    type: 'feature',
    title: '添加工具收藏夹功能',
    description: '希望能够收藏喜欢的工具，方便下次查找',
    author: '用户D',
    status: 'planned',
    votes: 178,
    date: '2024-01-12'
  },
  {
    id: '5',
    type: 'improvement',
    title: '增加更多筛选条件',
    description: '可以按价格区间、支持语言等条件筛选',
    author: '用户E',
    status: 'reviewing',
    votes: 123,
    date: '2024-01-11'
  }
];

const ROADMAP_ITEMS = [
  {
    quarter: 'Q1 2024',
    items: [
      { title: 'AI工具对比功能', status: 'in-progress' },
      { title: '用户收藏系统', status: 'in-progress' },
      { title: '移动端优化', status: 'planned' }
    ]
  },
  {
    quarter: 'Q2 2024',
    items: [
      { title: '高级筛选功能', status: 'planned' },
      { title: '工具评分系统', status: 'planned' },
      { title: '社区互动功能', status: 'planned' }
    ]
  }
];

export default function DiscussionFeedbackPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [filterType, setFilterType] = React.useState<'all' | 'feature' | 'bug' | 'improvement'>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredFeedbacks = React.useMemo(() => {
    return MOCK_FEEDBACKS.filter((f) => {
      if (filterType !== 'all' && f.type !== filterType) return false;
      return true;
    }).sort((a, b) => b.votes - a.votes);
  }, [filterType]);

  const getTypeIcon = (type: string) => {
    if (type === 'feature') return <Sparkles className="h-4 w-4" />;
    if (type === 'bug') return <Bug className="h-4 w-4" />;
    return <Lightbulb className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: '待审核', variant: 'secondary' as const, icon: Clock },
      reviewing: { label: '审核中', variant: 'default' as const, icon: AlertCircle },
      planned: { label: '已计划', variant: 'outline' as const, icon: Calendar },
      completed: { label: '已完成', variant: 'default' as const, icon: CheckCircle2 }
    };
    const { label, variant, icon: Icon } = config[status as keyof typeof config] || config.pending;
    return (
      <Badge variant={variant} className="text-xs">
        <Icon className="h-3 w-3 mr-1" />
        {label}
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">反馈建议</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">反馈建议</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">分享您对AI工具的使用反馈和改进建议，帮助我们打造更好的产品</p>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">总反馈数</div>
            <div className="text-xl sm:text-2xl font-bold">1,234</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="text-xs text-green-600 dark:text-green-400 mb-1">已完成</div>
            <div className="text-xl sm:text-2xl font-bold">456</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">进行中</div>
            <div className="text-xl sm:text-2xl font-bold">89</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">本周新增</div>
            <div className="text-xl sm:text-2xl font-bold">+23</div>
          </div>
        </div>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧 - 反馈表单 */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border bg-card p-5 sm:p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                提交反馈
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">反馈类型</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button type="button" className="px-3 py-2 text-xs rounded-lg border bg-muted/50 hover:bg-muted transition flex items-center justify-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      新功能
                    </button>
                    <button type="button" className="px-3 py-2 text-xs rounded-lg border bg-muted/50 hover:bg-muted transition flex items-center justify-center gap-1.5">
                      <Bug className="h-3.5 w-3.5" />
                      Bug
                    </button>
                    <button type="button" className="px-3 py-2 text-xs rounded-lg border bg-muted/50 hover:bg-muted transition flex items-center justify-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5" />
                      改进
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">标题</label>
                  <Input placeholder="简要描述您的反馈..." className="text-sm" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">详细描述</label>
                  <Textarea placeholder="请详细描述您的反馈内容..." rows={6} className="text-sm resize-none" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">联系方式（可选）</label>
                  <Input placeholder="邮箱或其他联系方式" className="text-sm" />
                </div>

                <button type="submit" className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                  提交反馈
                </button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold mb-3">💡 提交建议</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>清晰描述问题或建议</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>提供具体的使用场景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>附上截图或示例更佳</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 右侧 - 反馈列表和路线图 */}
          <div className="lg:col-span-7 space-y-6">
            {/* 筛选 */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">类型：</span>
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterType === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  全部
                </button>
                <button
                  onClick={() => setFilterType('feature')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterType === 'feature' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  新功能
                </button>
                <button
                  onClick={() => setFilterType('bug')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterType === 'bug' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  Bug
                </button>
                <button
                  onClick={() => setFilterType('improvement')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterType === 'improvement' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  改进
                </button>
              </div>
            </div>

            {/* 反馈列表 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">最新反馈</h2>
              <div className="space-y-3">
                {filteredFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">{getTypeIcon(feedback.type)}</div>
                        <h3 className="text-sm font-semibold">{feedback.title}</h3>
                      </div>
                      {getStatusBadge(feedback.status)}
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{feedback.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>{feedback.author}</span>
                        <span>·</span>
                        <span>{feedback.date}</span>
                      </div>
                      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted transition">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="font-medium">{feedback.votes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 开发路线图 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                开发路线图
              </h2>

              <div className="space-y-6">
                {ROADMAP_ITEMS.map((roadmap) => (
                  <div key={roadmap.quarter}>
                    <h3 className="text-sm font-semibold mb-3 text-primary">{roadmap.quarter}</h3>
                    <div className="space-y-2">
                      {roadmap.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <div className={`h-2 w-2 rounded-full ${item.status === 'in-progress' ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                          <span className={item.status === 'in-progress' ? 'font-medium' : 'text-muted-foreground'}>{item.title}</span>
                          {item.status === 'in-progress' && (
                            <Badge variant="secondary" className="text-xs ml-auto">
                              进行中
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
