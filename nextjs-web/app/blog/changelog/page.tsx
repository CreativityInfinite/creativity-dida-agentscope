'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Activity, Search, Plus, Zap, Bug, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';

const MOCK_CHANGELOG = [
  {
    date: '2024-03-15',
    entries: [
      { type: 'added', text: '新增 AI 工具智能推荐功能' },
      { type: 'added', text: '支持用户自定义工具收藏夹' },
      { type: 'improved', text: '优化搜索算法，提升搜索准确度' },
      { type: 'improved', text: '改进移动端响应式布局' },
      { type: 'fixed', text: '修复深色模式下部分组件显示异常' },
      { type: 'fixed', text: '修复工具详情页加载缓慢问题' }
    ]
  },
  {
    date: '2024-03-10',
    entries: [
      { type: 'added', text: '新增 MCP 工具分类页面' },
      { type: 'added', text: '支持工具对比功能' },
      { type: 'improved', text: '优化页面加载性能，减少 30% 加载时间' },
      { type: 'fixed', text: '修复用户登录状态异常问题' }
    ]
  },
  {
    date: '2024-03-05',
    entries: [
      { type: 'added', text: '新增讨论区话题标签功能' },
      { type: 'added', text: '支持用户关注和粉丝系统' },
      { type: 'improved', text: '优化评论系统，支持富文本编辑' },
      { type: 'improved', text: '改进通知推送机制' },
      { type: 'fixed', text: '修复图片上传失败问题' },
      { type: 'fixed', text: '修复部分浏览器兼容性问题' }
    ]
  },
  {
    date: '2024-03-01',
    entries: [
      { type: 'added', text: '新增博客文章发布功能' },
      { type: 'added', text: '支持 Markdown 编辑器' },
      { type: 'improved', text: '优化用户资料页面布局' },
      { type: 'fixed', text: '修复邮件通知发送失败问题' }
    ]
  },
  {
    date: '2024-02-25',
    entries: [
      { type: 'added', text: '新增教程中心' },
      { type: 'added', text: '支持视频教程播放' },
      { type: 'improved', text: '优化工具卡片展示效果' },
      { type: 'improved', text: '改进搜索结果排序算法' },
      { type: 'fixed', text: '修复分页组件显示错误' }
    ]
  },
  {
    date: '2024-02-20',
    entries: [
      { type: 'added', text: '新增案例研究展示页面' },
      { type: 'improved', text: '优化深色模式配色方案' },
      { type: 'improved', text: '改进表单验证逻辑' },
      { type: 'fixed', text: '修复移动端菜单显示问题' },
      { type: 'fixed', text: '修复工具评分计算错误' }
    ]
  }
];

const TYPE_CONFIG = {
  added: { label: '新增', color: 'text-green-600 bg-green-50 dark:bg-green-950/30', icon: Plus },
  improved: { label: '优化', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', icon: Zap },
  fixed: { label: '修复', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/30', icon: Bug },
  deprecated: { label: '废弃', color: 'text-red-600 bg-red-50 dark:bg-red-950/30', icon: AlertCircle },
  security: { label: '安全', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30', icon: CheckCircle2 }
};

export default function BlogChangelogPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredChangelog = React.useMemo(() => {
    return MOCK_CHANGELOG.map((day) => {
      let entries = day.entries;
      if (selectedType !== 'all') entries = entries.filter((e) => e.type === selectedType);
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        entries = entries.filter((e) => e.text.toLowerCase().includes(query));
      }
      return { ...day, entries };
    }).filter((day) => day.entries.length > 0);
  }, [searchQuery, selectedType]);

  const stats = React.useMemo(() => {
    const allEntries = MOCK_CHANGELOG.flatMap((d) => d.entries);
    return {
      total: allEntries.length,
      added: allEntries.filter((e) => e.type === 'added').length,
      improved: allEntries.filter((e) => e.type === 'improved').length,
      fixed: allEntries.filter((e) => e.type === 'fixed').length
    };
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">变更记录</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">变更记录</h1>
            <p className="text-sm text-muted-foreground mt-1">详细的平台功能变更和版本历史记录</p>
          </div>
        </div>
      </section>

      {/* 统计 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border bg-card text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
            <div className="text-xs text-muted-foreground">总变更数</div>
          </div>
          <div className="p-4 rounded-xl border bg-card text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.added}</div>
            <div className="text-xs text-muted-foreground">新增功能</div>
          </div>
          <div className="p-4 rounded-xl border bg-card text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.improved}</div>
            <div className="text-xs text-muted-foreground">功能优化</div>
          </div>
          <div className="p-4 rounded-xl border bg-card text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.fixed}</div>
            <div className="text-xs text-muted-foreground">问题修复</div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索变更记录..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                selectedType === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
              }`}
            >
              全部
            </button>
            {Object.entries(TYPE_CONFIG).map(([key, config]) => {
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
        </div>
      </section>

      {/* 变更列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-8">
          {filteredChangelog.map((day) => (
            <div key={day.date} className="rounded-xl border bg-card overflow-hidden">
              <div className="px-6 py-4 bg-muted/30 border-b">
                <h2 className="text-lg font-bold">{day.date}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {day.entries.map((entry, idx) => {
                    const config = TYPE_CONFIG[entry.type as keyof typeof TYPE_CONFIG];
                    const Icon = config.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium flex-shrink-0 ${config.color}`}>
                          <Icon className="h-3 w-3" />
                          {config.label}
                        </span>
                        <span className="text-sm">{entry.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 图例说明 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6">
          <h3 className="text-sm font-semibold mb-4">变更类型说明</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(TYPE_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-start gap-2">
                  <Icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${config.color.split(' ')[0]}`} />
                  <div>
                    <div className="text-sm font-medium mb-0.5">{config.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {key === 'added' && '新增的功能或特性'}
                      {key === 'improved' && '现有功能的优化改进'}
                      {key === 'fixed' && '修复的问题或 Bug'}
                      {key === 'deprecated' && '即将废弃的功能'}
                      {key === 'security' && '安全相关的更新'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
