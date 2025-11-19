'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Clock, Star, Phone, Calendar, Gift, Utensils, Car, Plane, Shield, Home, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const conciergeServices = [
  {
    category: '生活服务',
    icon: Crown,
    services: [
      {
        name: '私人助理',
        description: '24小时专属私人助理服务，处理各类生活事务',
        price: '¥800/天',
        features: ['行程安排', '预约服务', '信息咨询', '紧急协助']
      },
      {
        name: '家政管理',
        description: '高端家政服务，包括家居清洁、衣物护理等',
        price: '¥500/次',
        features: ['专业清洁', '衣物护理', '家居整理', '定期维护']
      },
      {
        name: '购物代办',
        description: '专业购物顾问，代办各类购物需求',
        price: '¥300/小时',
        features: ['商品选购', '价格比较', '配送服务', '售后跟进']
      }
    ]
  },
  {
    category: '商务服务',
    icon: Briefcase,
    services: [
      {
        name: '商务礼宾',
        description: '高端商务活动礼宾服务，提升企业形象',
        price: '¥1200/天',
        features: ['活动策划', '接待服务', '礼仪指导', '现场协调']
      },
      {
        name: '会议服务',
        description: '专业会议组织和管理服务',
        price: '¥800/场',
        features: ['场地预订', '设备准备', '流程管理', '后勤服务']
      },
      {
        name: '翻译陪同',
        description: '专业翻译和商务陪同服务',
        price: '¥600/天',
        features: ['同声传译', '商务陪同', '文件翻译', '文化桥梁']
      }
    ]
  },
  {
    category: '旅行服务',
    icon: Plane,
    services: [
      {
        name: '行程定制',
        description: '个性化旅行行程规划和定制服务',
        price: '¥1000起',
        features: ['路线规划', '酒店预订', '活动安排', '特色体验']
      },
      {
        name: '专车服务',
        description: '豪华专车接送和包车服务',
        price: '¥400/小时',
        features: ['豪华车型', '专业司机', '灵活路线', 'VIP服务']
      },
      {
        name: '机票代订',
        description: '机票预订和升舱服务，享受VIP待遇',
        price: '¥200服务费',
        features: ['优惠价格', '座位选择', '升舱服务', '退改签']
      }
    ]
  }
];

const vipServices = [
  {
    icon: Utensils,
    title: '餐饮预订',
    description: '高端餐厅预订，米其林餐厅优先安排',
    price: '¥100服务费'
  },
  {
    icon: Calendar,
    title: '活动门票',
    description: '演唱会、体育赛事等热门活动门票代购',
    price: '¥150服务费'
  },
  {
    icon: Gift,
    title: '礼品定制',
    description: '高端礼品定制和包装服务',
    price: '¥500起'
  },
  {
    icon: Car,
    title: '豪车租赁',
    description: '豪华车辆租赁，包含司机服务',
    price: '¥1500/天'
  }
];

const membershipTiers = [
  {
    name: '银卡会员',
    price: '¥2,888',
    period: '/年',
    color: 'from-gray-100 to-gray-200',
    benefits: ['95折服务优惠', '优先预约权', '24小时客服热线', '每月1次免费咨询', '生日特别礼品']
  },
  {
    name: '金卡会员',
    price: '¥8,888',
    period: '/年',
    color: 'from-yellow-100 to-yellow-200',
    popular: true,
    benefits: ['9折服务优惠', '最优先预约权', '24小时专属客服', '每月3次免费咨询', '专属礼宾经理', '生日定制礼品', '机场贵宾厅权益']
  },
  {
    name: '钻石会员',
    price: '¥28,888',
    period: '/年',
    color: 'from-purple-100 to-purple-200',
    benefits: ['85折服务优惠', '绝对优先权', '24小时私人助理', '无限免费咨询', '专属团队服务', '定制化礼品服务', '全球贵宾厅权益', '私人定制旅行']
  }
];

const serviceProcess = [
  { step: '01', title: '需求咨询', description: '专业顾问了解您的具体需求' },
  { step: '02', title: '方案制定', description: '制定个性化的服务解决方案' },
  { step: '03', title: '服务执行', description: '专业团队执行服务方案' },
  { step: '04', title: '质量跟踪', description: '全程跟踪服务质量和效果' },
  { step: '05', title: '满意确认', description: '确认服务满意度并持续优化' }
];

export default function ConciergePage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">礼宾服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">礼宾服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">高端礼宾和管家服务，为您提供专业、贴心、全方位的生活服务支持，让您享受尊贵的生活体验。</p>
        </div>

        {/* 会员等级 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">会员服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {tier.popular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">最受欢迎</Badge>}
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                    <Crown className="h-8 w-8 text-gray-600" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {tier.price}
                    <span className="text-sm font-normal text-muted-foreground">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    立即加入
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 服务分类 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务分类</h2>
          {conciergeServices.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge variant="secondary">{service.price}</Badge>
                        </div>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button className="w-full">预约服务</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* VIP特色服务 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">VIP特色服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {vipServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <ServiceIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <Badge variant="outline">{service.price}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 服务流程 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {serviceProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{process.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
                {index < serviceProcess.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8" />}
              </div>
            ))}
          </div>
        </div>

        {/* 服务保障 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">隐私保护</h3>
              <p className="text-sm text-muted-foreground">严格保护客户隐私，签署保密协议</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">24小时服务</h3>
              <p className="text-sm text-muted-foreground">全天候服务支持，随时响应您的需求</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="font-semibold mb-2">品质保证</h3>
              <p className="text-sm text-muted-foreground">专业团队，高品质服务，满意度保障</p>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">体验尊贵礼宾服务</h2>
            <p className="text-muted-foreground mb-6">我们的专业礼宾团队为您提供贴心、专业的高端服务，让您享受尊贵的生活体验。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                立即咨询
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Crown className="h-4 w-4" />
                申请会员
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
