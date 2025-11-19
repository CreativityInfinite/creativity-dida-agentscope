'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Users, Clock, Languages, Camera, Phone, MessageCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const guideServices = [
  {
    type: '城市观光导游',
    description: '专业的城市导游服务，深度了解当地文化',
    duration: '半天/全天',
    price: '¥300-600',
    features: ['景点讲解', '历史文化', '拍照服务', '路线规划']
  },
  {
    type: '主题专业导游',
    description: '特定主题的专业导游，如美食、艺术、历史等',
    duration: '2-4小时',
    price: '¥400-800',
    features: ['专业知识', '深度体验', '互动交流', '个性定制']
  },
  {
    type: '户外探险导游',
    description: '户外活动专业导游，确保安全探索自然',
    duration: '全天/多天',
    price: '¥500-1200',
    features: ['安全保障', '装备指导', '路线熟悉', '应急处理']
  },
  {
    type: '商务陪同导游',
    description: '商务活动陪同，提供专业的商务服务',
    duration: '按需安排',
    price: '¥600-1000',
    features: ['商务礼仪', '翻译服务', '行程安排', '文化桥梁']
  }
];

const featuredGuides = [
  {
    id: 1,
    name: '张小明',
    avatar: '/images/guides/guide1.jpg',
    city: '北京',
    languages: ['中文', '英文', '日文'],
    rating: 4.9,
    reviews: 128,
    experience: '8年',
    specialties: ['历史文化', '胡同游', '美食探索'],
    introduction: '资深北京导游，对北京的历史文化有深入了解，擅长胡同游和美食推荐。',
    price: '¥400'
  },
  {
    id: 2,
    name: '李美丽',
    avatar: '/images/guides/guide2.jpg',
    city: '上海',
    languages: ['中文', '英文', '法文'],
    rating: 4.8,
    reviews: 95,
    experience: '6年',
    specialties: ['现代建筑', '时尚购物', '夜景游览'],
    introduction: '上海本地导游，熟悉上海的现代化发展，擅长建筑文化和购物指导。',
    price: '¥450'
  },
  {
    id: 3,
    name: '王大山',
    avatar: '/images/guides/guide3.jpg',
    city: '西安',
    languages: ['中文', '英文'],
    rating: 4.9,
    reviews: 156,
    experience: '10年',
    specialties: ['古代历史', '文物考古', '陕菜文化'],
    introduction: '西安金牌导游，历史学专业背景，对古代文化和文物有专业的见解。',
    price: '¥380'
  },
  {
    id: 4,
    name: '陈海燕',
    avatar: '/images/guides/guide4.jpg',
    city: '成都',
    languages: ['中文', '英文', '韩文'],
    rating: 4.7,
    reviews: 89,
    experience: '5年',
    specialties: ['川菜文化', '熊猫基地', '茶文化'],
    introduction: '成都本地导游，对四川文化和美食有深度了解，熊猫基地专业讲解员。',
    price: '¥350'
  }
];

const serviceFeatures = [
  {
    icon: Users,
    title: '专业认证',
    description: '所有导游均通过专业认证，具备丰富的导游经验'
  },
  {
    icon: Languages,
    title: '多语言服务',
    description: '提供中英日韩等多种语言服务，国际化体验'
  },
  {
    icon: Camera,
    title: '拍照服务',
    description: '专业拍照技巧，为您留下美好的旅行回忆'
  },
  {
    icon: MapPin,
    title: '深度体验',
    description: '带您深入了解当地文化，体验地道的本土生活'
  }
];

export default function GuidesPage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">导游服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">导游服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的导游和向导服务，为您提供深度的文化体验和个性化的旅行指导，让您的旅程更加丰富精彩。</p>
        </div>

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

        {/* 导游服务类型 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guideServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl">{service.type}</h3>
                      <p className="text-muted-foreground mt-1">{service.description}</p>
                    </div>
                    <Badge variant="secondary">{service.price}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">选择此服务</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 推荐导游 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">推荐导游</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={guide.avatar} alt={guide.name} />
                      <AvatarFallback>{guide.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{guide.name}</CardTitle>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">{guide.price}</div>
                          <div className="text-sm text-muted-foreground">/天</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {guide.city}
                        </span>
                        <span>{guide.experience}经验</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{guide.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({guide.reviews}条评价)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{guide.introduction}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="font-medium text-sm">语言能力：</span>
                      <div className="flex gap-1 mt-1">
                        {guide.languages.map((lang, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-sm">专业领域：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {guide.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      预约导游
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageCircle className="h-3 w-3" />
                      咨询
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 预订须知 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>预订须知</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">服务说明</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 建议提前3-7天预订导游服务</li>
                  <li>• 导游服务时间灵活，可根据需求调整</li>
                  <li>• 包含景点讲解、路线指导、拍照服务</li>
                  <li>• 不包含门票、交通、餐饮等费用</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">取消政策</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 提前24小时取消，全额退款</li>
                  <li>• 提前12小时取消，退款50%</li>
                  <li>• 12小时内取消，不予退款</li>
                  <li>• 因天气等不可抗力原因可协商退款</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">需要导游服务？</h2>
            <p className="text-muted-foreground mb-6">我们的专业导游团队为您提供个性化的旅行指导，让您深度体验当地文化。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                立即预约
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                在线咨询
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
