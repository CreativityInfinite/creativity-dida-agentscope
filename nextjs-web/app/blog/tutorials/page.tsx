'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Book, User, ArrowRight, Play, FileText, Video, Star, TrendingUp } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

const MOCK_TUTORIALS = [
  {
    id: '1',
    title: '30 分钟学会 ChatGPT 提示词工程',
    description: '通过实战案例学习如何编写高质量的提示词，让 AI 更好地理解你的需求。',
    type: 'video',
    duration: 32,
    lessons: 8,
    author: { name: '李明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming' },
    category: '对话工具',
    level: '入门',
    students: 5432,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop'
  },
  {
    id: '2',
    title: 'Midjourney 从零到一：AI 绘画实战',
    description: '系统学习 Midjourney 的使用方法，从基础操作到高级技巧，创作出惊艳的 AI 艺术作品。',
    type: 'video',
    duration: 45,
    lessons: 12,
    author: { name: '王芳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang' },
    category: '图像生成',
    level: '入门',
    students: 4321,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1686191128892-c0557e5e7d27?w=400&h=225&fit=crop'
  },
  {
    id: '3',
    title: 'Stable Diffusion 高级技巧：ControlNet 完全指南',
    description: '深入学习 ControlNet 的使用方法，精确控制 AI 图像生成的构图、姿态和细节。',
    type: 'text',
    duration: 60,
    lessons: 15,
    author: { name: '张伟', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei' },
    category: '图像生成',
    level: '高级',
    students: 2876,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=400&h=225&fit=crop'
  },
  {
    id: '4',
    title: 'AI 音乐创作实战：用 Suno 制作完整歌曲',
    description: '从歌词创作到音乐生成，学习如何使用 Suno 创作一首完整的原创歌曲。',
    type: 'video',
    duration: 38,
    lessons: 10,
    author: { name: '刘洋', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang' },
    category: '音乐创作',
    level: '进阶',
    students: 3654,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop'
  },
  {
    id: '5',
    title: 'Claude 代码助手：提升编程效率 10 倍',
    description: '学习如何使用 Claude 辅助编程，包括代码生成、调试、重构和文档编写。',
    type: 'text',
    duration: 50,
    lessons: 11,
    author: { name: '陈杰', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenjie' },
    category: '代码助手',
    level: '进阶',
    students: 4123,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop'
  },
  {
    id: '6',
    title: 'ComfyUI 工作流实战：打造专属 AI 绘画流程',
    description: '学习搭建 ComfyUI 自定义工作流，实现批量生成、风格迁移等高级功能。',
    type: 'video',
    duration: 75,
    lessons: 18,
    author: { name: '赵敏', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaomin' },
    category: '工作流',
    level: '高级',
    students: 1987,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop'
  }
];

export default function BlogTutorialsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredTutorials = React.useMemo(() => {
    let result = MOCK_TUTORIALS;
    if (selectedType !== 'all') result = result.filter((t) => t.type === selectedType);
    if (selectedLevel !== 'all') result = result.filter((t) => t.level === selectedLevel);
    return result;
  }, [selectedType, selectedLevel]);

  const popularTutorials = React.useMemo(() => {
    return [...MOCK_TUTORIALS].sort((a, b) => b.students - a.students).slice(0, 3);
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">教程</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Book className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">教程</h1>
            <p className="text-sm text-muted-foreground mt-1">学习如何有效使用各种 AI 工具的详细教程</p>
          </div>
        </div>
      </section>

      {/* 筛选器 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">类型：</span>
            <div className="flex gap-2">
              {[
                { value: 'all', label: '全部' },
                { value: 'video', label: '视频教程', icon: Video },
                { value: 'text', label: '图文教程', icon: FileText }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedType(value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 ${
                    selectedType === value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">难度：</span>
            <div className="flex gap-2">
              {['all', '入门', '进阶', '高级'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedLevel === level ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
                  }`}
                >
                  {level === 'all' ? '全部' : level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 教程列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="group rounded-xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* 缩略图 */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {tutorial.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-primary ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/50 backdrop-blur-sm">{tutorial.type === 'video' ? '视频' : '图文'}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 text-white text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">{tutorial.duration} 分钟</div>
                  </div>

                  {/* 内容 */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{tutorial.category}</Badge>
                      <span className="text-xs text-muted-foreground">{tutorial.level}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-primary transition">
                      <Link href={`/blog/tutorials/${tutorial.id}?lang=${locale}`}>{tutorial.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tutorial.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>{tutorial.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                          <span>{tutorial.rating}</span>
                        </div>
                      </div>
                      <Link href={`/blog/tutorials/${tutorial.id}?lang=${locale}`} className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
                        开始学习
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 热门教程 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                热门教程
              </h3>
              <div className="space-y-4">
                {popularTutorials.map((tutorial, idx) => (
                  <div key={tutorial.id} className="flex gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/blog/tutorials/${tutorial.id}?lang=${locale}`} className="text-sm font-medium hover:text-primary transition line-clamp-2 mb-1">
                        {tutorial.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{tutorial.students.toLocaleString()} 学员</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 text-amber-500 fill-current" />
                          {tutorial.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 学习统计 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">学习统计</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">总教程数</span>
                  <span className="text-lg font-bold">{MOCK_TUTORIALS.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">总学员数</span>
                  <span className="text-lg font-bold">{MOCK_TUTORIALS.reduce((sum, t) => sum + t.students, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">平均评分</span>
                  <span className="text-lg font-bold flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    {(MOCK_TUTORIALS.reduce((sum, t) => sum + t.rating, 0) / MOCK_TUTORIALS.length).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* 分类浏览 */}
            <div className="rounded-xl border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-5">
              <h3 className="text-sm font-semibold mb-3">分类浏览</h3>
              <div className="space-y-2">
                {['对话工具', '图像生成', '音乐创作', '代码助手', '工作流'].map((cat) => {
                  const count = MOCK_TUTORIALS.filter((t) => t.category === cat).length;
                  return (
                    <Link
                      key={cat}
                      href={`/blog/tutorials?category=${cat}&lang=${locale}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition text-sm"
                    >
                      <span>{cat}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
