'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, Heart, Plane, MapPin, Phone, CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const insurancePlans = [
  {
    name: '基础保障',
    price: '¥58',
    duration: '7天',
    coverage: '50万',
    features: ['意外伤害保障', '医疗费用报销', '行李延误补偿', '24小时救援服务'],
    popular: false
  },
  {
    name: '全面保障',
    price: '¥128',
    duration: '7天',
    coverage: '100万',
    features: ['意外伤害保障', '医疗费用报销', '行李延误补偿', '24小时救援服务', '航班延误补偿', '旅行取消保障', '个人责任保险'],
    popular: true
  },
  {
    name: '豪华保障',
    price: '¥298',
    duration: '7天',
    coverage: '200万',
    features: ['意外伤害保障', '医疗费用报销', '行李延误补偿', '24小时救援服务', '航班延误补偿', '旅行取消保障', '个人责任保险', '高风险运动保障', '紧急医疗运送'],
    popular: false
  }
];

const insuranceTypes = [
  {
    icon: Plane,
    title: '境外旅行保险',
    description: '为出境旅行提供全面保障，包括医疗、意外、行李等多项保障',
    coverage: ['医疗费用', '意外伤害', '行李损失', '旅行延误']
  },
  {
    icon: MapPin,
    title: '境内旅行保险',
    description: '国内旅行专属保障，涵盖各种旅行风险和意外情况',
    coverage: ['意外医疗', '住院津贴', '景区责任', '交通意外']
  },
  {
    icon: Heart,
    title: '特殊人群保险',
    description: '为老人、儿童、孕妇等特殊人群定制的旅行保险产品',
    coverage: ['特殊医疗', '紧急救援', '家属探视', '医疗运送']
  },
  {
    icon: Shield,
    title: '高风险运动保险',
    description: '为滑雪、潜水、登山等高风险运动提供专业保障',
    coverage: ['运动意外', '装备损失', '救援费用', '第三方责任']
  }
];

const claimProcess = [
  { step: '01', title: '事故报案', description: '第一时间拨打保险公司报案电话' },
  { step: '02', title: '收集材料', description: '按要求收集相关证明和单据' },
  { step: '03', title: '提交申请', description: '在线或邮寄提交理赔申请' },
  { step: '04', title: '审核处理', description: '保险公司审核材料和案件' },
  { step: '05', title: '赔付到账', description: '审核通过后赔款直接到账' }
];

export default function InsurancePage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">旅行保险</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">旅行保险</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">全面的旅行保障，让您的每一次出行都安心无忧。我们提供多样化的保险产品，覆盖各种旅行风险。</p>
        </div>

        {/* 保险类型 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {insuranceTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.coverage.map((item, idx) => (
                      <Badge key={idx} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 保险套餐 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">保险套餐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insurancePlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">最受欢迎</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    最高保障 <span className="font-semibold">{plan.coverage}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    立即购买
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 理赔流程 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">理赔流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {claimProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{process.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
                {index < claimProcess.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8" />}
              </div>
            ))}
          </div>
        </div>

        {/* 服务保障 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">24小时客服</h3>
              <p className="text-sm text-muted-foreground">全天候客服支持，随时解答您的疑问</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">快速理赔</h3>
              <p className="text-sm text-muted-foreground">简化理赔流程，最快24小时到账</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">品质保障</h3>
              <p className="text-sm text-muted-foreground">与知名保险公司合作，品质有保障</p>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">需要保险咨询？</h2>
            <p className="text-muted-foreground mb-6">我们的保险专家为您提供个性化的保险方案，确保您的旅行万无一失。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                立即咨询
              </Button>
              <Button size="lg" variant="outline">
                在线客服
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
