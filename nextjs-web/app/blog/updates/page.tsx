'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, History, Calendar, Sparkles, Bug, Zap, Plus, ArrowRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

const MOCK_UPDATES = [
  {
    id: '1',
    version: 'v2.5.0',
    date: '2024-03-15',
    title: '全新 AI 工具推荐算法上线',
    type: 'feature',
    highlights: ['基于用户行为的智能推荐', '个性化工具发现', '提升推荐准确度 40%'],
    changes: [
      { type: 'feature', text: '新增智能推荐引擎，基于用户浏览历史和偏好' },
      { type: 'feature', text: '优化搜索算法，提升搜索结果相关性' },
      { type: 'improvement', text: '改进用户界面，提升交互体验' },
      { type: 'fix', text: '修复部分页面加载缓慢的问题' }
    ]
  },
  {
    id: '2',
    version: 'v2.4.0',
    date: '2024-03-01',
    title: 'MCP 工具集成与深色模式优化',
    type: 'feature',
    highlights: ['MCP 工具完整集成', '深色模式体验优化', '性能提升 30%'],
    changes: [
      { type: 'feature', text: '新增 MCP 工具分类和详情页面' },
      { type: 'feature', text: '支持 MCP 工具搜索和筛选' },
      { type: 'improvement', text: '优化深色模式配色方案' },
      { type: 'improvement', text: '提升页面加载速度' },
      { type: 'fix', text: '修复移动端布局问题' }
    ]
  },
  {
    id: '3',
    version: 'v2.3.0',
    date: '2024-02-15',
    title: '社区功能全面升级',
    type: 'feature',
    highlights: ['讨论区功能增强', '用户互动优化', '内容质量提升'],
    changes: [
      { type: 'feature', text: '新增讨论区投票和点赞功能' },
      { type: 'feature', text: '支持话题标签和分类' },
      { type: 'improvement', text: '优化评论系统' },
      { type: 'improvement', text: '改进用户资料页面' },
      { type: 'fix', text: '修复通知推送问题' }
    ]
  },
  {
    id: '4',
    version: 'v2.2.0',
    date: '2024-02-01',
    title: '博客系统与教程中心上线',
    type: 'feature',
    highlights: ['全新博客系统', '教程中心', '知识库建设'],
    changes: [
      { type: 'feature', text: '新增博客文章发布功能' },
      { type: 'feature', text: '上线教程中心，提供详细使用指南' },
      { type: 'feature', text: '支持案例研究展示' },
      { type: 'improvement', text: '优化内容管理系统' }
    ]
  }
];

const TYPE_CONFIG = {
  feature: { label: '新功能', color: 'text-green-600 bg-green-50 dark:bg-green-950/30', icon: Plus },
  improvement: { label: '优化', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', icon: Zap },
  fix: { label: '修复', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/30', icon: Bug }
};

export default function BlogUpdatesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">更新日志</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">更新日志</h1>
            <p className="text-sm text-muted-foreground mt-1">了解平台的最新功能更新和改进</p>
          </div>
        </div>
      </section>

      {/* 时间线 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative">
          {/* 时间线轴 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-12">
            {MOCK_UPDATES.map((update) => (
              <div key={update.id} className="relative pl-20">
                {/* 时间线节点 */}
                <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>

                {/* 内容 */}
                <div className="group rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    {/* 头部 */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="text-base px-3 py-1">{update.version}</Badge>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{update.date}</span>
                          </div>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition">{update.title}</h2>
                      </div>
                    </div>

                    {/* 亮点 */}
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border">
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        核心亮点
                      </h3>
                      <ul className="space-y-2">
                        {update.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold mt-0.5">{idx + 1}</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 详细变更 */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold">详细变更</h3>
                      {update.changes.map((change, idx) => {
                        const config = TYPE_CONFIG[change.type as keyof typeof TYPE_CONFIG];
                        const Icon = config.icon;
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${config.color}`}>
                              <Icon className="h-3 w-3" />
                              {config.label}
                            </span>
                            <span className="text-sm text-muted-foreground">{change.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* 底部 */}
                    <div className="flex items-center justify-end pt-6 border-t mt-6">
                      <Link href={`/blog/updates/${update.id}?lang=${locale}`} className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
                        查看详情
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 订阅更新 */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">订阅更新通知</h2>
          <p className="text-sm text-muted-foreground mb-6">第一时间获取平台最新功能和改进</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input type="email" placeholder="输入邮箱地址" className="flex-1 px-4 py-2.5 rounded-lg border bg-background text-sm" />
            <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition whitespace-nowrap">订阅</button>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
