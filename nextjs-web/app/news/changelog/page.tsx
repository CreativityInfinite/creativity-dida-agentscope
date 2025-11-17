'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Calendar, CheckCircle2, AlertCircle, Info, Zap } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

interface ChangelogEntry {
  date: string;
  version: string;
  changes: {
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking';
    description: string;
  }[];
}

const MOCK_CHANGELOG: ChangelogEntry[] = [
  {
    date: '2024-01-15',
    version: 'v2.5.0',
    changes: [
      { type: 'feature', description: '新增AI工具对比功能' },
      { type: 'feature', description: '支持多语言切换' },
      { type: 'improvement', description: '优化搜索性能' },
      { type: 'bugfix', description: '修复移动端显示问题' }
    ]
  },
  {
    date: '2024-01-10',
    version: 'v2.4.0',
    changes: [
      { type: 'feature', description: '新增用户收藏功能' },
      { type: 'improvement', description: '改进页面加载速度' },
      { type: 'bugfix', description: '修复筛选器bug' }
    ]
  },
  {
    date: '2024-01-05',
    version: 'v2.3.0',
    changes: [
      { type: 'feature', description: '新增工具评分系统' },
      { type: 'breaking', description: 'API v1已废弃，请升级到v2' },
      { type: 'improvement', description: '优化数据库查询' }
    ]
  }
];

export default function NewsChangelogPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Zap className="h-4 w-4 text-green-500" />;
      case 'improvement':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'bugfix':
        return <Info className="h-4 w-4 text-orange-500" />;
      case 'breaking':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getChangeBadge = (type: string) => {
    const config = {
      feature: { label: '新功能', className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
      improvement: { label: '改进', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
      bugfix: { label: '修复', className: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
      breaking: { label: '破坏性变更', className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' }
    };
    const { label, className } = config[type as keyof typeof config] || config.improvement;
    return <Badge className={`${className} text-xs`}>{label}</Badge>;
  };

  return (
    <div className="relative min-h-screen">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">更新日志</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">跟踪AI工具行业的重要变更和发展历程</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {MOCK_CHANGELOG.map((entry) => (
              <div key={entry.version} className="relative pl-16">
                {/* 时间点 */}
                <div className="absolute left-6 top-2 h-5 w-5 rounded-full bg-primary border-4 border-background" />

                <div className="rounded-xl border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold">{entry.version}</h3>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {entry.date}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {entry.changes.map((change, changeIdx) => (
                      <div key={changeIdx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        {getChangeIcon(change.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">{getChangeBadge(change.type)}</div>
                          <p className="text-sm">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多历史</button>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
