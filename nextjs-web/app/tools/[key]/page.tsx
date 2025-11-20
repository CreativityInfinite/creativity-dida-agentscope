'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Badge } from '@component/ui/badge';
import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@component/ui/card';
import { Markdown, MarkdownToc } from '@/components/Markdown';
import { BackToTop } from '@/components/BackToTop';
import {
  ExternalLink,
  Star,
  ArrowLeft,
  Heart,
  Users,
  GitFork,
  Download,
  ShieldCheck,
  MessageSquare,
  Folder,
  Globe,
  Copy,
  List,
  Tag,
  CheckCircle,
  GitCompare,
  Clock,
  Zap,
  BookOpen,
  Settings,
  Play,
  Ellipsis,
  Home,
  FileText,
  Link2,
  TrendingUp,
  Layers,
  Eye,
  EyeOff
} from 'lucide-react';
import { getMessages } from '@/src/i18n/index';
import { Tool } from '@/types/tool';
import { CATEGORY_ICONS, getCategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';

// 导入所有工具数据
import { toolsData } from '@/src/data/tools';
import { content } from './content';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

// 汇总所有工具数据
const ALL_TOOLS: Tool[] = toolsData;

// 默认显示设置
const DEFAULT_MODULES_VISIBILITY: Record<string, boolean> = {
  useCases: true,
  basicInfo: true,
  alternatives: true,
  changelog: true,
  quickStart: true,
  templates: true,
  moreActions: true,
  blog: false,
  news: false,
  discussion: false
};

// 模块配置（统一控制桌面端和移动端的显示）
const MODULE_LABELS: Record<string, { label: string; mobileLabel: string; icon: any; available: (tool: any, highlights: any[], changelog: any[]) => boolean }> = {
  useCases: { label: '适用场景', mobileLabel: '场景', icon: Tag, available: (tool) => (tool.tags ?? []).length > 0 },
  basicInfo: { label: '功能清单', mobileLabel: '功能', icon: CheckCircle, available: (tool, highlights) => highlights.length > 0 },
  quickStart: { label: '快速上手', mobileLabel: '上手', icon: Zap, available: () => true },
  discussion: { label: '社区讨论', mobileLabel: '讨论', icon: MessageSquare, available: () => true },
  news: { label: '最新资讯', mobileLabel: '资讯', icon: TrendingUp, available: () => true },
  blog: { label: '相关博客', mobileLabel: '博客', icon: FileText, available: () => true },
  changelog: { label: '更新日志', mobileLabel: '日志', icon: Clock, available: (tool, highlights, changelog) => changelog.length > 0 },
  alternatives: { label: '对比替代', mobileLabel: '对比', icon: GitCompare, available: () => true },
  templates: { label: '推荐模板', mobileLabel: '模板', icon: BookOpen, available: () => true },
  moreActions: { label: '更多操作', mobileLabel: '操作', icon: List, available: () => true }
};

// 模块显示顺序（按此顺序显示模块）
const MODULE_DISPLAY_ORDER = ['useCases', 'basicInfo', 'quickStart', 'discussion', 'news', 'blog', 'changelog', 'alternatives', 'templates', 'moreActions'];

export default function ToolDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));
  const [activeTab, setActiveTab] = React.useState<'overview' | 'guide' | 'integration'>('overview');
  const [isStarred, setIsStarred] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = React.useState('useCases');
  const [moduleDisplayCollapsed, setModuleDisplayCollapsed] = React.useState(true);

  // 模块显示控制状态
  const [sidebarModulesVisibility, setSidebarModulesVisibility] = React.useState(DEFAULT_MODULES_VISIBILITY);

  // 从 URL 参数获取语言
  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  // 持久化模块显示设置
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedVisibility = localStorage.getItem('sidebar-modules-visibility');
    if (savedVisibility) {
      try {
        const parsed = JSON.parse(savedVisibility);
        setSidebarModulesVisibility({ ...DEFAULT_MODULES_VISIBILITY, ...parsed });
      } catch (error) {
        console.warn('Failed to parse saved visibility settings:', error);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('sidebar-modules-visibility', JSON.stringify(sidebarModulesVisibility));
  }, [sidebarModulesVisibility]);

  // 切换所有模块显示状态的函数
  const toggleAllModules = React.useCallback(() => {
    const allVisible = Object.values(sidebarModulesVisibility).every((v) => v);
    const newVisibility = Object.keys(sidebarModulesVisibility).reduce((acc: any, key) => {
      acc[key] = !allVisible;
      return acc;
    }, {});
    setSidebarModulesVisibility(newVisibility);
  }, [sidebarModulesVisibility]);

  // 切换单个模块显示状态的函数
  const toggleModuleVisibility = React.useCallback((moduleKey: string) => {
    setSidebarModulesVisibility((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  }, []);

  // 根据key查找工具
  const tool = ALL_TOOLS.find((t: any) => (t as any).key === (params as any).key) as any;

  if (!tool) {
    return (
      <div className="relative min-h-screen">
        <GradientBackground type="index" />
        <SiteNavigation locale={locale} fixed />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">工具未找到</h1>
          <p className="text-muted-foreground mb-8">抱歉，您访问的工具不存在。</p>
          <Link href={`/explore?lang=${locale}`}>
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回探索页面
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = CATEGORY_ICONS[tool.primaryCategory as PrimaryCategoryKey] || Star;
  const categoryDisplayName = getCategoryDisplayName(tool.primaryCategory as PrimaryCategoryKey, messages);

  // 新增可选字段读取与默认值 - 使用确定性算法避免SSR不一致
  const getSeededRandom = (seed: string, max: number) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % max;
  };

  const toolSeed = tool.key || tool.name || 'default';
  const basePopularity = Math.round((tool.rating ?? 4.0) * 1000);
  const likes = tool.likes ?? basePopularity + getSeededRandom(toolSeed + 'likes', 500);
  const followers = tool.followers ?? Math.round(likes * 0.3 + getSeededRandom(toolSeed + 'followers', 200));
  const starCount = tool.starCount ?? Math.round(likes * 0.6 + getSeededRandom(toolSeed + 'stars', 300));
  const downloadsLastMonth = tool.downloadsLastMonth ?? Math.round(likes * 15 + getSeededRandom(toolSeed + 'downloads', 5000) + 2000);
  const license = tool.license ?? 'Apache-2.0';
  const publisher = tool.publisher ?? 'Midjourney Inc.';
  const languages: string[] = tool.languages ?? ['English', 'Chinese'];
  const tasks: string[] = tool.tasks ?? tool.tags ?? [];
  const providers: string[] = tool.inferenceProviders ?? tool.providers ?? ['DALL-E', 'Midjourney', 'Stable Diffusion'];
  const website = tool.link ?? 'https://midjourney.com';
  const repo = tool.repo ?? 'https://github.com/midjourney-inc/midjourney';
  const demoUrl = tool.demoUrl ?? 'https://midjourney.com';
  const announcements = tool.announcements ?? [
    { text: '🎉 新功能上线：支持多模态输入', href: `${website}#updates` },
    { text: '📈 性能提升 30%，响应更快', href: `${website}#performance` },
    { text: '🔥 欢迎体验最新版本', href: website }
  ];
  const highlights: string[] = tool.highlights ?? ['高质量图像生成', '多种艺术风格', '快速渲染'];
  const changelog: Array<{ version: string; date?: string; notes?: string[] }> = tool.changelog ?? [
    { version: '2.1.0', date: '2024/3/19', notes: ['新增多模态支持', '修复已知问题', '用户体验提升'] },
    { version: '2.0.5', date: '2024/4/14', notes: ['性能优化', '界面改进', '稳定性增强'] },
    { version: '2.0.0', date: '2024/5/19', notes: ['重大版本更新', '全新用户界面', '功能重构'] }
  ];
  const overviewMarkdown: string = (tool as any).overviewMarkdown ?? content;

  const RenderModuleDisplay = (type: 'normal' | 'mobile' = 'normal', module: string) => {
    const baseClasses = type === 'normal' ? 'rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-4 animate-in fade-in-50 duration-300' : 'animate-in fade-in-50 duration-300';

    switch (module) {
      case 'moduleDisplay':
        return (
          <div className={baseClasses}>
            <button
              type="button"
              className="w-full flex items-center justify-between mb-2 group"
              onClick={() => setModuleDisplayCollapsed((v) => !v)}
              aria-expanded={!moduleDisplayCollapsed}
              aria-controls="module-display-panel"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-semibold">自定义显示</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{moduleDisplayCollapsed ? '展开' : '收起'}</span>
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${moduleDisplayCollapsed ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.086l3.71-3.855a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
            </button>

            {!moduleDisplayCollapsed && (
              <div id="module-display-panel" className="space-y-3">
                <div className="flex items-center justify-end">
                  <Button variant="ghost" size="sm" className="h-6 px-2" onClick={toggleAllModules}>
                    {Object.values(sidebarModulesVisibility).every((v) => v) ? (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        隐藏全部
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        显示全部
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(sidebarModulesVisibility)
                    .filter(([key]) => MODULE_LABELS[key])
                    .map(([key, visible]) => (
                      <button
                        key={key}
                        onClick={() => toggleModuleVisibility(key)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 hover:scale-105 ${
                          visible ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted/50 text-muted-foreground hover:bg-muted/70'
                        }`}
                      >
                        {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        <span className="text-xs font-medium">{MODULE_LABELS[key].label}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'useCases':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold">适用场景</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(tool.tags ?? []).map((t: string) => (
                <Badge key={t} variant="secondary" className="rounded-full text-xs px-2 py-1">
                  {type === 'mobile' ? t : `#${t}`}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 'basicInfo':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-semibold">功能清单</h3>
            </div>
            <div className="space-y-2">
              {highlights.map((h: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{h}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quickStart':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-semibold">快速上手</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                <div className="text-xs text-muted-foreground mb-2">示例提示词</div>
                <code className="text-xs block overflow-x-auto">{`使用 ${tool.name ?? '该工具'} 完成：请总结本页要点并输出 5 条行动项。`}</code>
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                    onClick={() => navigator.clipboard?.writeText(`使用 ${tool.name ?? '该工具'} 完成：请总结本页要点并输出 5 条行动项。`)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    复制
                  </Button>
                </div>
              </div>
              <Button asChild size="sm" className="w-full">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-2" />
                  立即试用
                </a>
              </Button>
            </div>
          </div>
        );

      case 'discussion':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-violet-500" />
              <h3 className="text-sm font-semibold">社区讨论</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">U</div>
                  <span className="text-xs font-medium">用户体验分享</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">分享使用 {tool.name} 的心得和技巧</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">12 回复</span>
                  <span className="text-xs text-muted-foreground">1小时前</span>
                </div>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-xs font-medium">D</div>
                  <span className="text-xs font-medium">功能建议讨论</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">希望 {tool.name} 能够增加的新功能</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">8 回复</span>
                  <span className="text-xs text-muted-foreground">3小时前</span>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href={`/discussion/tools?lang=${locale}`}>查看更多讨论</a>
              </Button>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h3 className="text-sm font-semibold">最新资讯</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-medium">{tool.name} 获得新一轮融资</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">公司宣布完成B轮融资，将用于产品研发</div>
                <span className="text-xs text-muted-foreground">2天前</span>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium">AI工具市场趋势报告发布</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">2024年AI工具使用情况和发展趋势分析</div>
                <span className="text-xs text-muted-foreground">5天前</span>
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-cyan-500" />
              <h3 className="text-sm font-semibold">相关博客</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="text-xs font-medium mb-1">如何高效使用 {tool.name}</div>
                <div className="text-xs text-muted-foreground mb-2">详细介绍工具的核心功能和最佳实践</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">3天前</span>
                  <Button variant="ghost" size="sm" className="h-5 px-2 text-xs">
                    阅读
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="text-xs font-medium mb-1">{tool.name} 与其他工具的对比分析</div>
                <div className="text-xs text-muted-foreground mb-2">深入分析同类工具的优劣势对比</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">1周前</span>
                  <Button variant="ghost" size="sm" className="h-5 px-2 text-xs">
                    阅读
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'changelog':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold">更新日志</h3>
            </div>
            <div className="space-y-3">
              {changelog.slice(0, 3).map((c, i) => (
                <div key={i} className="relative pl-4">
                  <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-orange-500" />
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="rounded-full text-xs px-2 py-0.5">
                      v{c.version}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                  <div className="space-y-1">
                    {(c.notes ?? []).slice(0, 2).map((n, j) => (
                      <div key={j} className="text-xs text-muted-foreground">
                        • {n}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'alternatives':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <GitCompare className="h-4 w-4 text-purple-500" />
              <h3 className="text-sm font-semibold">对比与替代</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">同类替代与搭配建议：可在"集成与链接"标签查看可用提供商与关联任务，结合你的工作栈选择最合适的组合。</p>
          </div>
        );

      case 'templates':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-semibold">推荐模板</h3>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="text-xs font-medium mb-1">会议速记 → 行动项</div>
                <div className="text-xs text-muted-foreground">自动提取要点，生成待办并分配责任人</div>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-3">
                <div className="text-xs font-medium mb-1">邮件分类 → 数据入库</div>
                <div className="text-xs text-muted-foreground">按主题识别类型，抽取关键字段入库</div>
              </div>
            </div>
          </div>
        );

      case 'moreActions':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-3">
              <List className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-semibold">更多操作</h3>
            </div>
            <div className="space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start">
                <a href={`/discussion/tools?lang=${locale}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  讨论区发帖
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start">
                <a href={repo} target="_blank" rel="noopener noreferrer">
                  <GitFork className="h-4 w-4 mr-2" />
                  查看仓库
                </a>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} fixed />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6">
        {/* 面包屑导航 */}
        <Breadcrumb className="mb-4 sm:mb-6 mt-2">
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
                <Link href={`/explore?lang=${locale}`}>探索工具</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 头部卡片：名称/描述/操作 */}
        <Card className="my-6 sm:pb-6 bg-transparent border-0 shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">{tool.name}</CardTitle>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {publisher}
                </Badge>
              </div>
              <CardDescription className="text-sm sm:text-base">{tool.description}</CardDescription>
            </div>
            {/* 按钮组 - 桌面端右侧，移动端下方 */}
            <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
              <Button size="sm" onClick={() => setIsStarred((v) => !v)} variant={isStarred ? 'default' : 'outline'} aria-label="Star" className="flex-1 sm:flex-none lg:flex-initial min-w-0">
                <Star className={`h-4 w-4 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                <span className="ml-1 hidden xs:inline">{starCount.toLocaleString()}</span>
              </Button>
              <Button size="sm" onClick={() => setIsFavorited((v) => !v)} variant={isFavorited ? 'default' : 'outline'} aria-label="收藏" className="flex-1 sm:flex-none lg:flex-initial min-w-0">
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="ml-1 hidden xs:inline">{likes.toLocaleString()}</span>
              </Button>
              <Button size="sm" onClick={() => setIsFollowed((v) => !v)} variant={isFollowed ? 'default' : 'outline'} aria-label="关注" className="flex-1 sm:flex-none lg:flex-initial min-w-0">
                <Users className={`h-4 w-4 ${isFollowed ? 'fill-blue-500 text-blue-500' : ''}`} />
                <span className="ml-1 hidden xs:inline">{followers.toLocaleString()}</span>
              </Button>
              <Button asChild size="sm" className="flex-1 sm:flex-none lg:flex-initial min-w-0">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="ml-1">访问</span>
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* 主体两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* 左侧：工具卡主体 */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* 丰富的标签切换 */}
            <div className="flex items-center gap-1 border-b border-border/30 mb-4 lg:mb-6  ">
              {[
                {
                  key: 'overview',
                  label: '概览',
                  icon: FileText,
                  count: `${Math.ceil(overviewMarkdown.length / 100)}k 字符`,
                  description: '详细介绍与功能说明'
                },
                {
                  key: 'guide',
                  label: '使用指南',
                  icon: Folder,
                  count: '3 步骤',
                  description: '快速上手教程'
                },
                {
                  key: 'integration',
                  label: '集成与链接',
                  icon: Link2,
                  count: `${(providers?.length ?? 0) + (languages?.length ?? 0)} 项`,
                  description: '生态系统与连接'
                }
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`group relative px-3 sm:px-4 py-2 sm:py-3 text-sm border-b-2 -mb-px whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    activeTab === t.key ? 'border-foreground font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <t.icon className={`h-4 w-4 ${activeTab === t.key ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                    <span className="text-xs sm:text-sm">{t.label}</span>
                    <Badge variant="secondary" className="rounded-full text-xs px-1.5 sm:px-2 py-0.5 ml-0.5 sm:ml-1 hidden sm:inline-flex">
                      {t.count}
                    </Badge>
                  </div>
                  {/* 悬浮提示 - 仅桌面端显示 */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 whitespace-nowrap">
                    {t.description}
                  </div>
                </button>
              ))}

              {/* 右侧统计信息 - 仅桌面端显示 */}
              <div className="ml-auto hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>活跃度 {Math.round((tool.rating ?? 4) * 20)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  <span>复杂度 中等</span>
                </div>
              </div>
            </div>

            {/* 概览 */}
            {activeTab === 'overview' && (
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="prose dark:prose-invert max-w-none px-0">
                  {/* 顶部提示/外链 */}
                  {announcements.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {(announcements as Array<{ text: string; href?: string }>).map((a, idx) => (
                        <div key={idx} className="text-sm">
                          <span>📣 </span>
                          {a.href ? (
                            <a className="underline" href={a.href} target="_blank" rel="noopener noreferrer">
                              {a.text}
                            </a>
                          ) : (
                            <span>{a.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 居中的工具介绍模块 - 移除卡片样式 */}
                  <div className="relative flex flex-col items-center text-center py-4 sm:py-6 my-4 sm:my-6">
                    {/* 内容大纲 - 移动端优化 */}
                    <MarkdownToc markdown={overviewMarkdown} />

                    {/* 工具Logo */}
                    <div className="mb-3 sm:mb-4">
                      <img src={tool.logo} alt={`${tool.name} logo`} className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl shadow-md mx-auto" />
                    </div>

                    {/* 工具名称和描述 */}
                    <div className="mb-3 sm:mb-4 max-w-2xl px-4 sm:px-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{tool.name}</h2>
                      <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">{tool.description}</p>
                    </div>

                    {/* 关键信息 - 移动端优化布局 */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm px-4 sm:px-0">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{(tool.rating ?? 4).toFixed(1)}</span>
                      </div>
                      <span className="text-muted-foreground hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                        <span className="hidden sm:inline">{downloadsLastMonth.toLocaleString()} 月访问</span>
                        <span className="sm:hidden">{Math.round(downloadsLastMonth / 1000)}k</span>
                      </div>
                      <span className="text-muted-foreground hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
                        <span className="hidden sm:inline">{likes.toLocaleString()} 喜欢</span>
                        <span className="sm:hidden">{Math.round(likes / 1000)}k</span>
                      </div>
                      <span className="text-muted-foreground hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        <span className="hidden sm:inline">{followers.toLocaleString()} 关注</span>
                        <span className="sm:hidden">{Math.round(followers / 1000)}k</span>
                      </div>
                      <span className="text-muted-foreground hidden lg:inline">•</span>
                      <div className="flex items-center gap-1 hidden lg:flex">
                        <Icon className="h-4 w-4 text-purple-500" />
                        <span>{categoryDisplayName}</span>
                      </div>
                      <span className="text-muted-foreground hidden lg:inline">•</span>
                      <div className="flex items-center gap-1 hidden lg:flex">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>{license}</span>
                      </div>
                    </div>
                  </div>

                  {/* Markdown 正文 */}
                  <div className="mt-4">
                    <Markdown>{overviewMarkdown}</Markdown>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 使用指南 */}
            {activeTab === 'guide' && (
              <Card className="bg-transparent border-0 shadow-none">
                <div className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Folder className="h-4 w-4" /> 使用指南
                  </CardTitle>
                  <CardDescription>按照以下步骤快速上手。</CardDescription>
                </div>
                <CardContent className="py-4">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>打开官网并登录（或注册）。</li>
                    <li>选择一个模板或创建新项目。</li>
                    <li>将下方示例提示复制到工具中运行。</li>
                  </ol>
                  <div className="mt-3 rounded-lg border border-border/40 p-3">
                    <div className="text-xs text-muted-foreground mb-1">示例提示</div>
                    <pre className="text-sm overflow-x-auto">{`用 ${tool.name ?? '该工具'} 自动整理我的工作流，并输出执行清单。`}</pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 集成与链接 */}
            {activeTab === 'integration' && (
              <Card className="bg-transparent border-0 shadow-none">
                <div className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> 集成与链接
                  </CardTitle>
                  <CardDescription>连接你的日常工具与资源。</CardDescription>
                </div>
                <CardContent className="py-4 space-y-4">
                  {providers?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">可用提供商</div>
                      <div className="flex flex-wrap gap-2">
                        {providers.map((p: string) => (
                          <Badge key={p} variant="outline" className="rounded-full">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {languages?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">支持语言</div>
                      <div className="flex flex-wrap gap-1">
                        {languages.map((l: string) => (
                          <Badge key={l} variant="secondary" className="rounded-full">
                            {l}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {tasks?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">常见任务</div>
                      <div className="flex flex-wrap gap-1">
                        {tasks.map((t: string) => (
                          <Badge key={t} variant="outline" className="rounded-full">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <a href={website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" /> 官网
                      </a>
                    </Button>
                    {repo && (
                      <Button asChild size="sm" variant="outline">
                        <a href={repo} target="_blank" rel="noopener noreferrer">
                          <GitFork className="h-4 w-4 mr-2" /> 仓库
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 右侧：信息侧边栏 */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            {/* 桌面端：所有模块垂直排列 */}
            <div className="hidden lg:block space-y-3">
              {/* 模块显示控制 */}
              {RenderModuleDisplay('normal', 'moduleDisplay')}
              {/* 适用场景 */}
              {sidebarModulesVisibility.useCases && (tool.tags ?? []).length > 0 && RenderModuleDisplay('normal', 'useCases')}
              {/* 功能清单 */}
              {sidebarModulesVisibility.basicInfo && highlights.length > 0 && RenderModuleDisplay('normal', 'basicInfo')}
              {/* 快速上手 */}
              {sidebarModulesVisibility.quickStart && RenderModuleDisplay('normal', 'quickStart')}
              {/* 社区讨论 */}
              {sidebarModulesVisibility.discussion && RenderModuleDisplay('normal', 'discussion')}
              {/* 最新资讯 */}
              {sidebarModulesVisibility.news && RenderModuleDisplay('normal', 'news')}
              {/* 相关博客 */}
              {sidebarModulesVisibility.blog && RenderModuleDisplay('normal', 'blog')}
              {/* 更新日志 */}
              {sidebarModulesVisibility.changelog && changelog.length > 0 && RenderModuleDisplay('normal', 'changelog')}
              {/* 对比与替代 */}
              {sidebarModulesVisibility.alternatives && RenderModuleDisplay('normal', 'alternatives')}
              {/* 推荐模板 */}
              {sidebarModulesVisibility.templates && RenderModuleDisplay('normal', 'templates')}
              {/* 更多操作 */}
              {sidebarModulesVisibility.moreActions && RenderModuleDisplay('normal', 'moreActions')}
            </div>

            {/* 移动端 Tab 切换 */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center gap-1 border-b border-border/30 overflow-x-auto overflow-y-hidden">
                {MODULE_DISPLAY_ORDER.filter((key) => MODULE_LABELS[key].available(tool, highlights, changelog)).map((key) => {
                  const config = MODULE_LABELS[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveSidebarTab(key as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs border-b-2 -mb-px whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                        activeSidebarTab === key ? 'border-foreground font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <config.icon className="h-3 w-3" />
                      <span>{config.mobileLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 移动端：内容区域 */}
            <div className="lg:hidden">
              <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-4 transition-all duration-300 ease-in-out">
                {/* 适用场景 */}
                {activeSidebarTab === 'useCases' && (tool.tags ?? []).length > 0 && RenderModuleDisplay('mobile', 'useCases')}
                {/* 功能清单 */}
                {activeSidebarTab === 'basicInfo' && highlights.length > 0 && RenderModuleDisplay('mobile', 'basicInfo')}
                {/* 对比与替代 */}
                {activeSidebarTab === 'alternatives' && RenderModuleDisplay('mobile', 'alternatives')}
                {/* 更新日志 */}
                {activeSidebarTab === 'changelog' && changelog.length > 0 && RenderModuleDisplay('mobile', 'changelog')}
                {/* 快速上手 */}
                {activeSidebarTab === 'quickStart' && RenderModuleDisplay('mobile', 'quickStart')}
                {/* 推荐模板 */}
                {activeSidebarTab === 'templates' && RenderModuleDisplay('mobile', 'templates')}
                {/* 相关博客 */}
                {activeSidebarTab === 'blog' && RenderModuleDisplay('mobile', 'blog')}
                {/* 最新资讯 */}
                {activeSidebarTab === 'news' && RenderModuleDisplay('mobile', 'news')}
                {/* 社区讨论 */}
                {activeSidebarTab === 'discussion' && RenderModuleDisplay('mobile', 'discussion')}
                {/* 更多操作 */}
                {activeSidebarTab === 'moreActions' && RenderModuleDisplay('mobile', 'moreActions')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Footer locale={locale} />
      </section>

      <BackToTop />
    </div>
  );
}
