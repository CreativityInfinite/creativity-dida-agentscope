'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { ALL_TOOLS } from '@/lib/tools';
import { Home, ThumbsUp, TrendingUp, Star, MessageCircle, Award, Filter, ArrowUpDown } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Recommendation {
  id: string;
  tool: (typeof ALL_TOOLS)[0];
  recommender: string;
  avatar: string;
  reason: string;
  votes: number;
  comments: number;
  date: string;
  tags: string[];
}

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    tool: ALL_TOOLS[0],
    recommender: 'AI研究员',
    avatar: '/avatars/user1.jpg',
    reason: 'ChatGPT是目前最强大的AI对话工具，在代码生成、文案创作、问题解答等方面表现出色。特别是GPT-4模型，理解能力和生成质量都达到了业界顶尖水平。',
    votes: 456,
    comments: 89,
    date: '2024-01-15',
    tags: ['AI对话', '代码助手', '文案创作']
  },
  {
    id: '2',
    tool: ALL_TOOLS[1],
    recommender: '设计师小王',
    avatar: '/avatars/user2.jpg',
    reason: 'Midjourney的图像生成质量令人惊艳，V6版本在细节处理和风格控制上有了质的飞跃。对于设计师来说是不可或缺的创意工具。',
    votes: 389,
    comments: 67,
    date: '2024-01-14',
    tags: ['图像生成', '设计工具', '创意']
  },
  {
    id: '3',
    tool: ALL_TOOLS[2],
    recommender: '程序员老李',
    avatar: '/avatars/user3.jpg',
    reason: 'GitHub Copilot极大提升了编码效率，智能代码补全和建议非常准确。配合VSCode使用体验极佳，强烈推荐给所有开发者。',
    votes: 312,
    comments: 54,
    date: '2024-01-13',
    tags: ['代码助手', '效率工具', '开发']
  },
  {
    id: '4',
    tool: ALL_TOOLS[3],
    recommender: '内容创作者',
    avatar: '/avatars/user4.jpg',
    reason: 'Notion AI让笔记管理和内容创作变得更加智能。AI辅助写作功能帮我节省了大量时间，文档整理也更加高效。',
    votes: 278,
    comments: 45,
    date: '2024-01-12',
    tags: ['效率工具', '笔记', '写作']
  }
];

const TOP_RECOMMENDERS = [
  { name: 'AI研究员', recommendations: 45, avatar: '/avatars/user1.jpg' },
  { name: '设计师小王', recommendations: 38, avatar: '/avatars/user2.jpg' },
  { name: '程序员老李', recommendations: 32, avatar: '/avatars/user3.jpg' },
  { name: '内容创作者', recommendations: 28, avatar: '/avatars/user4.jpg' },
  { name: '产品经理', recommendations: 24, avatar: '/avatars/user5.jpg' }
];

export default function DiscussionToolsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [sortBy, setSortBy] = React.useState<'votes' | 'latest' | 'comments'>('votes');
  const [selectedTag, setSelectedTag] = React.useState<string>('全部');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>(['全部']);
    MOCK_RECOMMENDATIONS.forEach((rec) => rec.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredRecommendations = React.useMemo(() => {
    let recs = selectedTag === '全部' ? MOCK_RECOMMENDATIONS : MOCK_RECOMMENDATIONS.filter((r) => r.tags.includes(selectedTag));

    if (sortBy === 'votes') recs = [...recs].sort((a, b) => b.votes - a.votes);
    else if (sortBy === 'latest') recs = [...recs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (sortBy === 'comments') recs = [...recs].sort((a, b) => b.comments - a.comments);

    return recs;
  }, [sortBy, selectedTag]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">工具推荐</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">工具推荐</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">推荐和讨论您喜爱的AI工具，分享使用体验和推荐理由</p>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Award className="h-4 w-4" />
              <span className="text-xs font-medium">推荐工具</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">234</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">总投票数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">12,345</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">讨论数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">1,567</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">本周新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+18</div>
          </div>
        </div>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧主内容 */}
          <div className="lg:col-span-8">
            {/* 筛选和排序 */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">标签筛选：</span>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition ${selectedTag === tag ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">排序：</span>
                <button
                  onClick={() => setSortBy('votes')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'votes' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  最多投票
                </button>
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'latest' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  最新推荐
                </button>
                <button
                  onClick={() => setSortBy('comments')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'comments' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  最多讨论
                </button>
              </div>
            </div>

            {/* 推荐列表 */}
            <div className="space-y-6">
              {filteredRecommendations.map((rec) => (
                <div key={rec.id} className="rounded-xl border bg-card p-5 sm:p-6">
                  {/* 推荐者信息 */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={rec.avatar} alt={rec.recommender} />
                      <AvatarFallback>{rec.recommender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{rec.recommender}</div>
                      <div className="text-xs text-muted-foreground">推荐于 {rec.date}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      推荐
                    </Badge>
                  </div>

                  {/* 工具信息 */}
                  <div className="mb-4">
                    <ToolCard tool={rec.tool} locale={locale} />
                  </div>

                  {/* 推荐理由 */}
                  <div className="mb-4 p-4 rounded-lg bg-muted/30 border-l-4 border-primary">
                    <h4 className="text-sm font-semibold mb-2 text-primary">💡 推荐理由</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{rec.reason}</p>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rec.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 互动数据 */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1.5 hover:text-primary transition">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="font-medium">{rec.votes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-primary transition">
                        <MessageCircle className="h-4 w-4" />
                        <span className="font-medium">{rec.comments}</span>
                      </button>
                    </div>
                    <Link href={`/discussion/tools/${rec.id}?lang=${locale}`} className="text-sm text-primary hover:underline">
                      查看详情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多推荐</button>
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 推荐工具 */}
            <div className="rounded-xl border bg-card p-5">
              <Link
                href={`/discussion/tools/new?lang=${locale}`}
                className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-center text-sm font-medium"
              >
                + 推荐新工具
              </Link>
            </div>

            {/* 热门推荐者 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                热门推荐者
              </h3>
              <div className="space-y-3">
                {TOP_RECOMMENDERS.map((user, idx) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{idx + 1}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.recommendations} 个推荐</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 推荐指南 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-3">📝 推荐指南</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>分享真实使用体验</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>说明工具的优势和特点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>提供具体的使用场景</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>客观评价优缺点</span>
                </li>
              </ul>
            </div>

            {/* 热门标签 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🏷️ 热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['AI对话', '图像生成', '代码助手', '效率工具', '写作', '设计', '开发', '创意'].map((tag) => (
                  <button key={tag} onClick={() => setSelectedTag(tag)} className="px-2.5 py-1 text-xs rounded-md border border-muted-foreground/30 hover:border-primary hover:bg-primary/5 transition">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
