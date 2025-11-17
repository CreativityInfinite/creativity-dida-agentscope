'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, BookOpen, Clock, Users, Star, TrendingUp, Zap, Target, Award } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: string;
  tools: string[];
  students: number;
  rating: number;
  lessons: number;
  date: string;
  featured?: boolean;
}

const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'ChatGPT提示词工程完全指南',
    description: '从零开始学习如何编写高质量的ChatGPT提示词，掌握提示词工程的核心技巧，让AI更好地理解你的需求。',
    author: 'AI导师',
    avatar: '/avatars/user1.jpg',
    difficulty: 'beginner',
    duration: '2小时',
    category: 'AI对话',
    tools: ['ChatGPT'],
    students: 3456,
    rating: 4.8,
    lessons: 12,
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Midjourney图像生成进阶技巧',
    description: '深入学习Midjourney的高级参数和技巧，掌握风格控制、构图优化、细节调整等专业技能。',
    author: '数字艺术家',
    avatar: '/avatars/user2.jpg',
    difficulty: 'intermediate',
    duration: '3小时',
    category: '图像生成',
    tools: ['Midjourney'],
    students: 2890,
    rating: 4.9,
    lessons: 15,
    date: '2024-01-14',
    featured: true
  },
  {
    id: '3',
    title: 'GitHub Copilot实战开发',
    description: '学习如何在实际项目中高效使用GitHub Copilot，提升编码效率，掌握AI辅助编程的最佳实践。',
    author: '资深开发者',
    avatar: '/avatars/user3.jpg',
    difficulty: 'intermediate',
    duration: '4小时',
    category: '代码助手',
    tools: ['GitHub Copilot', 'VSCode'],
    students: 2345,
    rating: 4.7,
    lessons: 18,
    date: '2024-01-13'
  },
  {
    id: '4',
    title: 'AI视频制作从入门到精通',
    description: '全面学习AI视频制作工具，从脚本生成到视频剪辑，打造专业级视频内容。',
    author: '视频制作人',
    avatar: '/avatars/user4.jpg',
    difficulty: 'advanced',
    duration: '5小时',
    category: '视频制作',
    tools: ['Runway', 'CapCut'],
    students: 1987,
    rating: 4.6,
    lessons: 20,
    date: '2024-01-12'
  },
  {
    id: '5',
    title: 'Notion AI高效工作流',
    description: '学习如何用Notion AI构建个人知识管理系统，提升工作效率和信息组织能力。',
    author: '效率专家',
    avatar: '/avatars/user5.jpg',
    difficulty: 'beginner',
    duration: '2.5小时',
    category: '效率工具',
    tools: ['Notion AI'],
    students: 3210,
    rating: 4.8,
    lessons: 10,
    date: '2024-01-11'
  },
  {
    id: '6',
    title: 'AI音乐创作实战',
    description: '探索AI音乐生成的无限可能，学习如何创作专业级音乐作品。',
    author: '音乐制作人',
    avatar: '/avatars/user6.jpg',
    difficulty: 'intermediate',
    duration: '3.5小时',
    category: '音频工具',
    tools: ['Suno AI', 'Logic Pro'],
    students: 1654,
    rating: 4.7,
    lessons: 14,
    date: '2024-01-10'
  }
];

const LEARNING_PATHS = [
  {
    title: 'AI对话工具精通之路',
    description: '从基础到高级，全面掌握AI对话工具',
    courses: 5,
    duration: '12小时',
    level: 'beginner'
  },
  {
    title: 'AI图像创作专业课程',
    description: '成为AI图像生成领域的专家',
    courses: 4,
    duration: '10小时',
    level: 'intermediate'
  },
  {
    title: 'AI辅助编程实战',
    description: '用AI工具提升编程效率10倍',
    courses: 6,
    duration: '15小时',
    level: 'intermediate'
  }
];

export default function DiscussionTutorialsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [filterDifficulty, setFilterDifficulty] = React.useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [sortBy, setSortBy] = React.useState<'latest' | 'popular' | 'rating'>('latest');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredTutorials = React.useMemo(() => {
    let tutorials = filterDifficulty === 'all' ? MOCK_TUTORIALS : MOCK_TUTORIALS.filter((t) => t.difficulty === filterDifficulty);

    if (sortBy === 'popular') tutorials = [...tutorials].sort((a, b) => b.students - a.students);
    else if (sortBy === 'rating') tutorials = [...tutorials].sort((a, b) => b.rating - a.rating);

    return tutorials;
  }, [filterDifficulty, sortBy]);

  const getDifficultyBadge = (difficulty: string) => {
    const config = {
      beginner: { label: '入门', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
      intermediate: { label: '进阶', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
      advanced: { label: '高级', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' }
    };
    const { label, color } = config[difficulty as keyof typeof config] || config.beginner;
    return <Badge className={`${color} border text-xs`}>{label}</Badge>;
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">教程分享</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">教程分享</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">分享和学习AI工具的使用教程和技巧，从入门到精通</p>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">教程总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">456</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">学习人数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">23,456</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">总时长</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">1,234h</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">本周新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+12</div>
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          推荐学习路径
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {LEARNING_PATHS.map((path, idx) => (
            <div key={idx} className="p-5 rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold">{path.title}</h3>
                {getDifficultyBadge(path.level)}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {path.courses} 门课程
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {path.duration}
                </span>
              </div>
              <Link
                href={`/learning-path/${idx + 1}?lang=${locale}`}
                className="block w-full px-4 py-2 text-center text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                开始学习
              </Link>
            </div>
          ))}
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
                <span className="text-sm text-muted-foreground">难度：</span>
                <button
                  onClick={() => setFilterDifficulty('all')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterDifficulty === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  全部
                </button>
                <button
                  onClick={() => setFilterDifficulty('beginner')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterDifficulty === 'beginner' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  入门
                </button>
                <button
                  onClick={() => setFilterDifficulty('intermediate')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterDifficulty === 'intermediate' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  进阶
                </button>
                <button
                  onClick={() => setFilterDifficulty('advanced')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${filterDifficulty === 'advanced' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                >
                  高级
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">排序：</span>
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最新发布
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'popular' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最受欢迎
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'rating' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最高评分
                </button>
              </div>
            </div>

            {/* 教程列表 */}
            <div className="space-y-4">
              {filteredTutorials.map((tutorial) => (
                <Link key={tutorial.id} href={`/discussion/tutorials/${tutorial.id}?lang=${locale}`} className="block p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={tutorial.avatar} alt={tutorial.author} />
                      <AvatarFallback>{tutorial.author[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold group-hover:text-primary transition line-clamp-1">{tutorial.title}</h3>
                        {tutorial.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs flex-shrink-0">
                            <Award className="h-3 w-3 mr-1" />
                            精选
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tutorial.description}</p>

                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/80">{tutorial.author}</span>
                        <span>·</span>
                        {getDifficultyBadge(tutorial.difficulty)}
                        <span>·</span>
                        <Badge variant="secondary" className="text-xs">
                          {tutorial.category}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {tutorial.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {tutorial.lessons} 节课
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {tutorial.students} 人学习
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          {tutorial.rating}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tutorial.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多教程</button>
            </div>
          </div>

          {/* 右侧边栏 */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 分享教程 */}
            <div className="rounded-xl border bg-card p-5">
              <Link
                href={`/discussion/tutorials/new?lang=${locale}`}
                className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-center text-sm font-medium"
              >
                + 分享教程
              </Link>
            </div>

            {/* 学习统计 */}
            <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                学习统计
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">入门教程</span>
                  <span className="font-semibold">156 门</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">进阶教程</span>
                  <span className="font-semibold">234 门</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">高级教程</span>
                  <span className="font-semibold">66 门</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">平均评分</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      4.7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 学习建议 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">💡 学习建议</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>从入门教程开始，循序渐进</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>多动手实践，加深理解</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>参与讨论，与他人交流</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>定期复习，巩固知识</span>
                </li>
              </ul>
            </div>

            {/* 热门分类 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-base font-semibold mb-3">🔥 热门分类</h3>
              <div className="space-y-2 text-sm">
                {['AI对话', '图像生成', '代码助手', '效率工具', '视频制作', '音频工具'].map((cat) => (
                  <Link key={cat} href={`/discussion/tutorials?category=${cat}&lang=${locale}`} className="block px-3 py-2 rounded-lg hover:bg-accent transition">
                    {cat}
                  </Link>
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
