'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plane, Car, Users, Clock, MapPin, Shield, Star, Phone, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const transferServices = [
  {
    type: '机场接送',
    icon: Plane,
    description: '专业机场接送服务，准时可靠',
    services: [
      {
        name: '经济型轿车',
        passengers: '1-3人',
        luggage: '2-3件',
        price: '¥120',
        features: ['准时接送', '司机等候', '免费Wi-Fi']
      },
      {
        name: '商务型轿车',
        passengers: '1-3人',
        luggage: '3-4件',
        price: '¥180',
        features: ['准时接送', '司机等候', '免费Wi-Fi', '矿泉水', '充电线']
      },
      {
        name: '豪华型轿车',
        passengers: '1-3人',
        luggage: '3-4件',
        price: '¥280',
        features: ['准时接送', '司机等候', '免费Wi-Fi', '矿泉水', '充电线', '真皮座椅']
      }
    ]
  },
  {
    type: '城际专车',
    icon: Car,
    description: '城市间长途专车服务，舒适安全',
    services: [
      {
        name: '标准专车',
        passengers: '1-4人',
        luggage: '4-5件',
        price: '¥2.8',
        unit: '/公里',
        features: ['专业司机', '全程服务', '保险保障']
      },
      {
        name: '商务专车',
        passengers: '1-4人',
        luggage: '4-5件',
        price: '¥3.8',
        unit: '/公里',
        features: ['专业司机', '全程服务', '保险保障', '商务座椅', '免费Wi-Fi']
      }
    ]
  },
  {
    type: '包车服务',
    icon: Users,
    description: '灵活的包车服务，适合团体出行',
    services: [
      {
        name: '7座商务车',
        passengers: '1-7人',
        luggage: '6-8件',
        price: '¥800',
        unit: '/天',
        features: ['专业司机', '全天服务', '灵活路线', '保险保障']
      },
      {
        name: '15座中巴',
        passengers: '8-15人',
        luggage: '10-15件',
        price: '¥1200',
        unit: '/天',
        features: ['专业司机', '全天服务', '灵活路线', '保险保障', '导游服务']
      }
    ]
  }
];

const serviceFeatures = [
  {
    icon: Clock,
    title: '准时可靠',
    description: '提前安排，准时到达，让您的行程无忧'
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '专业司机，车辆保险，全程安全保障'
  },
  {
    icon: Star,
    title: '优质服务',
    description: '礼貌服务，舒适体验，超出您的期待'
  },
  {
    icon: Phone,
    title: '24小时客服',
    description: '24小时客服支持，随时为您解决问题'
  }
];

const bookingSteps = [
  { step: '01', title: '选择服务', description: '根据需求选择合适的接送服务' },
  { step: '02', title: '填写信息', description: '填写行程时间和接送地点信息' },
  { step: '03', title: '确认预订', description: '确认订单信息并完成支付' },
  { step: '04', title: '司机联系', description: '司机提前联系确认接送详情' },
  { step: '05', title: '准时服务', description: '司机准时到达提供优质服务' }
];

export default function TransfersPage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">接送服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">接送服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的机场接送和专车服务，为您提供安全、舒适、准时的出行体验。覆盖全国主要城市和机场。</p>
        </div>

        {/* 快速预订 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>快速预订接送服务</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <Label htmlFor="service-type">服务类型</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>机场接送</option>
                  <option>城际专车</option>
                  <option>包车服务</option>
                </select>
              </div>
              <div>
                <Label htmlFor="pickup-location">出发地点</Label>
                <Input id="pickup-location" placeholder="输入出发地址" />
              </div>
              <div>
                <Label htmlFor="destination">目的地</Label>
                <Input id="destination" placeholder="输入目的地址" />
              </div>
              <div>
                <Label htmlFor="pickup-time">接送时间</Label>
                <Input id="pickup-time" type="datetime-local" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">立即预订</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 服务特色 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {serviceFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <IconComponent className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 服务类型 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务类型</h2>
          {transferServices.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{category.type}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {service.passengers}
                              </span>
                              <span>{service.luggage}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {service.price}
                            </div>
                          </div>
                        </div>
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
                        <Button className="w-full">选择此服务</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 预订流程 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">预订流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {bookingSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < bookingSteps.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8" />}
              </div>
            ))}
          </div>
        </div>

        {/* 服务承诺 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>服务承诺</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">准时保障</h4>
                <p className="text-sm text-muted-foreground">司机提前到达指定地点等候，确保您的行程准时开始。如因我方原因导致延误，将给予相应补偿。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">安全保障</h4>
                <p className="text-sm text-muted-foreground">所有司机经过严格筛选和培训，车辆定期保养检查，全程购买保险，确保您的出行安全。</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">服务保障</h4>
                <p className="text-sm text-muted-foreground">提供优质的服务体验，如对服务不满意，我们将全额退款并改进服务质量。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">需要接送服务？</h2>
            <p className="text-muted-foreground mb-6">我们的客服团队24小时为您提供专业的接送服务咨询和预订支持。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                立即预订
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
