'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { Zap, Shield, Users, Headphones, Code, BarChart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'api',
    title: 'API 服务',
    description: '强大的 AI 工具 API 接口，支持开发者集成',
    icon: Code,
    href: '/services/api',
    features: ['RESTful API', '实时响应', '完整文档', '技术支持'],
    price: '按调用计费',
    popular: false
  },
  {
    id: 'enterprise',
    title: '企业解决方案',
    description: '为企业提供定制化的 AI 工具解决方案',
    icon: Users,
    href: '/services/enterprise',
    features: ['私有部署', '定制开发', '专属支持', '数据安全'],
    price: '联系咨询',
    popular: true
  },
  {
    id: 'analytics',
    title: '数据分析服务',
    description: '深度分析工具使用数据，提供业务洞察',
    icon: BarChart,
    href: '/services/analytics',
    features: ['使用统计', '性能分析', '用户画像', '趋势预测'],
    price: '¥299/月起',
    popular: false
  },
  {
    id: 'support',
    title: '技术支持',
    description: '专业的技术支持团队，7x24 小时服务',
    icon: Headphones,
    href: '/services/support',
    features: ['在线客服', '技术咨询', '问题排查', '使用培训'],
    price: '免费',
    popular: false
  },
  {
    id: 'security',
    title: '安全服务',
    description: '全方位的数据安全和隐私保护服务',
    icon: Shield,
    href: '/services/security',
    features: ['数据加密', '访问控制', '安全审计', '合规认证'],
    price: '按需定价',
    popular: false
  },
  {
    id: 'consulting',
    title: 'AI 咨询服务',
    description: '专业的 AI 应用咨询和实施指导',
    icon: Zap,
    href: '/services/consulting',
    features: ['方案设计', '实施指导', '效果评估', '持续优化'],
    price: '¥1999/天起',
    popular: false
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <GradientBackground type="other" className="opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight mb-4">专业服务</h1>
              <p className="text-lg text-muted-foreground mb-6">为个人开发者和企业用户提供全方位的 AI 工具服务支持，助力您的业务发展</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">API 集成</Badge>
                <Badge variant="secondary">企业定制</Badge>
                <Badge variant="secondary">技术支持</Badge>
                <Badge variant="secondary">数据安全</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className={`relative transition-all duration-200 hover:shadow-lg ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                  {service.popular && <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">热门推荐</Badge>}

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">核心功能</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">价格</p>
                          <p className="font-medium">{service.price}</p>
                        </div>
                        <Button asChild size="sm">
                          <Link href={service.href}>
                            了解详情
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">需要定制化服务？</h2>
              <p className="text-muted-foreground mb-6">我们的专业团队可以为您提供量身定制的 AI 工具解决方案</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/services/enterprise">企业咨询</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/services/support">联系支持</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
