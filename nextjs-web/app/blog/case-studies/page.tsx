'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, PieChart, ArrowRight, TrendingUp, Users, DollarSign, Clock, Target, Award } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

const MOCK_CASE_STUDIES = [
  {
    id: '1',
    title: '某电商公司使用 ChatGPT 提升客服效率 300%',
    company: '某知名电商平台',
    industry: '电商零售',
    challenge: '客服人力成本高，响应速度慢，客户满意度低',
    solution: '部署 ChatGPT 智能客服系统，实现 24/7 自动回复和问题解决',
    results: [
      { metric: '响应速度', value: '提升 300%', icon: TrendingUp },
      { metric: '客服成本', value: '降低 60%', icon: DollarSign },
      { metric: '客户满意度', value: '提升 45%', icon: Users },
      { metric: '处理量', value: '增加 5 倍', icon: Target }
    ],
    tools: ['ChatGPT', 'API 集成', '自定义训练'],
    date: '2024-03',
    readTime: 12
  },
  {
    id: '2',
    title: '设计工作室用 Midjourney 将创作效率提升 10 倍',
    company: '某创意设计工作室',
    industry: '创意设计',
    challenge: '设计周期长，人力成本高，难以快速响应客户需求',
    solution: '引入 Midjourney 辅助设计，快速生成创意草图和设计方案',
    results: [
      { metric: '设计速度', value: '提升 10 倍', icon: TrendingUp },
      { metric: '项目交付', value: '缩短 70%', icon: Clock },
      { metric: '客户满意度', value: '提升 80%', icon: Users },
      { metric: '营收增长', value: '增加 150%', icon: DollarSign }
    ],
    tools: ['Midjourney', 'Photoshop', 'Figma'],
    date: '2024-02',
    readTime: 15
  },
  {
    id: '3',
    title: '音乐制作公司用 Suno 革新音乐创作流程',
    company: '某独立音乐制作公司',
    industry: '音乐娱乐',
    challenge: '音乐制作周期长，成本高，难以快速试错和迭代',
    solution: '使用 Suno 快速生成音乐 Demo，加速创作和客户沟通',
    results: [
      { metric: '创作速度', value: '提升 8 倍', icon: TrendingUp },
      { metric: '制作成本', value: '降低 50%', icon: DollarSign },
      { metric: '作品产量', value: '增加 400%', icon: Target },
      { metric: '客户满意度', value: '提升 65%', icon: Users }
    ],
    tools: ['Suno', 'Logic Pro', 'Ableton'],
    date: '2024-01',
    readTime: 10
  },
  {
    id: '4',
    title: '软件公司用 Claude 将开发效率提升 5 倍',
    company: '某 SaaS 软件公司',
    industry: '软件开发',
    challenge: '开发周期长，代码质量参差不齐，文档维护困难',
    solution: '引入 Claude 作为代码助手，辅助开发、测试和文档编写',
    results: [
      { metric: '开发速度', value: '提升 5 倍', icon: TrendingUp },
      { metric: 'Bug 数量', value: '减少 40%', icon: Target },
      { metric: '代码质量', value: '提升 60%', icon: Award },
      { metric: '文档完整度', value: '提升 90%', icon: Users }
    ],
    tools: ['Claude', 'GitHub Copilot', 'VS Code'],
    date: '2023-12',
    readTime: 14
  }
];

const INDUSTRIES = ['全部', '电商零售', '创意设计', '音乐娱乐', '软件开发'];

export default function BlogCaseStudiesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedIndustry, setSelectedIndustry] = React.useState('全部');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredCases = React.useMemo(() => {
    if (selectedIndustry === '全部') return MOCK_CASE_STUDIES;
    return MOCK_CASE_STUDIES.filter((c) => c.industry === selectedIndustry);
  }, [selectedIndustry]);

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">案例研究</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <PieChart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">案例研究</h1>
            <p className="text-sm text-muted-foreground mt-1">深入了解 AI 工具在实际应用中的成功案例</p>
          </div>
        </div>
      </section>

      {/* 行业筛选 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-muted-foreground">行业：</span>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedIndustry === industry ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted text-foreground/80'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 案例列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-8">
          {filteredCases.map((caseStudy) => (
            <article key={caseStudy.id} className="group rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* 头部 */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{caseStudy.industry}</Badge>
                      <span className="text-xs text-muted-foreground">{caseStudy.date}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{caseStudy.readTime} 分钟阅读</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition">{caseStudy.title}</h2>
                    <p className="text-sm text-muted-foreground">{caseStudy.company}</p>
                  </div>
                </div>

                {/* 挑战与解决方案 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30">
                    <h3 className="text-sm font-semibold mb-2 text-red-700 dark:text-red-400">面临挑战</h3>
                    <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30">
                    <h3 className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">解决方案</h3>
                    <p className="text-sm text-muted-foreground">{caseStudy.solution}</p>
                  </div>
                </div>

                {/* 成果指标 */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    关键成果
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {caseStudy.results.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border text-center">
                          <Icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                          <div className="text-xs text-muted-foreground mb-1">{result.metric}</div>
                          <div className="text-lg font-bold text-primary">{result.value}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 使用工具 */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">使用工具：</span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tools.map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href={`/blog/case-studies/${caseStudy.id}?lang=${locale}`} className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
                    阅读完整案例
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 统计概览 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8">
          <h2 className="text-xl font-bold mb-6 text-center">案例统计概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{MOCK_CASE_STUDIES.length}</div>
              <div className="text-sm text-muted-foreground">成功案例</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">覆盖行业</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">300%</div>
              <div className="text-sm text-muted-foreground">平均效率提升</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50%+</div>
              <div className="text-sm text-muted-foreground">平均成本降低</div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
