'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, BookOpen, ArrowRight, Star, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

const MOCK_GUIDES = [
  {
    id: '1',
    title: 'ChatGPT 完全使用指南：从入门到精通',
    description: '全面掌握 ChatGPT 的使用技巧，包括基础对话、高级提示词、API 调用等内容。',
    difficulty: 'beginner',
    duration: 45,
    steps: 8,
    author: { name: '李明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liming' },
    category: '对话工具',
    tags: ['ChatGPT', '入门', '提示词'],
    completions: 3245,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Midjourney 图像生成完整教程',
    description: '从零开始学习 Midjourney，掌握参数设置、风格控制、高级技巧等核心知识。',
    difficulty: 'intermediate',
    duration: 60,
    steps: 12,
    author: { name: '王芳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangfang' },
    category: '图像生成',
    tags: ['Midjourney', 'AI绘画', '参数'],
    completions: 2876,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Stable Diffusion 本地部署指南',
    description: '详细讲解如何在本地部署 Stable Diffusion，包括环境配置、模型选择、优化技巧。',
    difficulty: 'advanced',
    duration: 90,
    steps: 15,
    author: { name: '张伟', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangwei' },
    category: '技术部署',
    tags: ['Stable Diffusion', '本地部署', '技术'],
    completions: 1543,
    rating: 4.7
  },
  {
    id: '4',
    title: 'AI 音乐创作入门：Suno 使用指南',
    description: '学习使用 Suno 创作音乐，了解歌词编写、风格选择、音乐编辑等技巧。',
    difficulty: 'beginner',
    duration: 30,
    steps: 6,
    author: { name: '刘洋', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang' },
    category: '音乐创作',
    tags: ['Suno', 'AI音乐', '创作'],
    completions: 2134,
    rating: 4.6
  },
  {
    id: '5',
    title: 'Claude 高级应用：代码助手与文档分析',
    description: '深入探索 Claude 的高级功能，包括代码生成、文档分析、长文本处理等。',
    difficulty: 'intermediate',
    duration: 50,
    steps: 10,
    author: { name: '陈杰', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chenjie' },
    category: '对话工具',
    tags: ['Claude', '代码', '文档'],
    completions: 1876,
    rating: 4.8
  },
  {
    id: '6',
    title: 'ComfyUI 工作流搭建完全指南',
    description: '学习使用 ComfyUI 搭建自定义 AI 图像生成工作流，提升创作效率。',
    difficulty: 'advanced',
    duration: 120,
    steps: 20,
    author: { name: '赵敏', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaomin' },
    category: '工作流',
    tags: ['ComfyUI', '工作流', '高级'],
    completions: 987,
    rating: 4.9
  }
];

const DIFFICULTY_CONFIG = {
  beginner: { label: '入门', color: 'text-green-600 bg-green-50 dark:bg-green-950/30', icon: CheckCircle2 },
  intermediate: { label: '进阶', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', icon: AlertCircle },
  advanced: { label: '高级', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30', icon: Zap }
};

export default function BlogGuidesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredGuides = React.useMemo(() => {
    if (selectedDifficulty === 'all') return MOCK_GUIDES;
    return MOCK_GUIDES.filter((g) => g.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const popularGuides = React.useMemo(() => {
    return [...MOCK_GUIDES].sort((a, b) => b.completions - a.completions).slice(0, 3);
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">使用指南</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">使用指南</h1>
            <p className="text-sm text-muted-foreground mt-1">详细的 AI 工具使用指南和最佳实践</p>
          </div>
        </div>
      </section>

      {/* 难度筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-muted-foreground">难度等级：</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedDifficulty === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
              }`}
            >
              全部
            </button>
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 ${
                    selectedDifficulty === key ? `${config.color} shadow-sm` : 'bg-muted/50 hover:bg-muted text-foreground/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 指南列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {filteredGuides.map((guide) => {
              const diffConfig = DIFFICULTY_CONFIG[guide.difficulty as keyof typeof DIFFICULTY_CONFIG];
              const DiffIcon = diffConfig.icon;
              return (
                <div key={guide.id} className="group rounded-xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{guide.category}</Badge>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${diffConfig.color}`}>
                          <DiffIcon className="h-3 w-3" />
                          {diffConfig.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition">
                      <Link href={`/blog/guides/${guide.id}?lang=${locale}`}>{guide.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>

                    {/* 指南信息 */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-muted/30">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">时长</div>
                        <div className="text-sm font-semibold">{guide.duration} 分钟</div>
                      </div>
                      <div className="text-center border-x">
                        <div className="text-xs text-muted-foreground mb-1">步骤</div>
                        <div className="text-sm font-semibold">{guide.steps} 步</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">完成人数</div>
                        <div className="text-sm font-semibold">{guide.completions.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <img src={guide.author.avatar} alt={guide.author.name} className="h-6 w-6 rounded-full" />
                        <span className="text-xs text-muted-foreground">{guide.author.name}</span>
                      </div>
                      <Link href={`/blog/guides/${guide.id}?lang=${locale}`} className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
                        开始学习
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 热门指南 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                热门指南
              </h3>
              <div className="space-y-4">
                {popularGuides.map((guide, idx) => {
                  const diffConfig = DIFFICULTY_CONFIG[guide.difficulty as keyof typeof DIFFICULTY_CONFIG];
                  return (
                    <div key={guide.id} className="flex gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/blog/guides/${guide.id}?lang=${locale}`} className="text-sm font-medium hover:text-primary transition line-clamp-2 mb-1">
                          {guide.title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className={diffConfig.color.split(' ')[0]}>{diffConfig.label}</span>
                          <span>·</span>
                          <span>{guide.completions.toLocaleString()} 人完成</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 学习路径 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold mb-4">推荐学习路径</h3>
              <div className="space-y-3">
                {[
                  { title: 'AI 对话工具入门', guides: 3, duration: 120 },
                  { title: 'AI 图像生成进阶', guides: 5, duration: 240 },
                  { title: 'AI 音乐创作实战', guides: 4, duration: 180 }
                ].map((path, idx) => (
                  <Link key={idx} href={`/blog/guides?path=${idx}&lang=${locale}`} className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition">
                    <div className="text-sm font-medium mb-1">{path.title}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{path.guides} 个指南</span>
                      <span>·</span>
                      <span>{path.duration} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 难度说明 */}
            <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-5">
              <h3 className="text-sm font-semibold mb-3">难度等级说明</h3>
              <div className="space-y-2 text-xs">
                {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div key={key} className="flex items-start gap-2">
                      <Icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${config.color.split(' ')[0]}`} />
                      <div>
                        <div className="font-medium mb-0.5">{config.label}</div>
                        <div className="text-muted-foreground">
                          {key === 'beginner' && '适合初学者，无需基础知识'}
                          {key === 'intermediate' && '需要一定基础，适合进阶学习'}
                          {key === 'advanced' && '需要扎实基础，深入技术细节'}
                        </div>
                      </div>
                    </div>
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
