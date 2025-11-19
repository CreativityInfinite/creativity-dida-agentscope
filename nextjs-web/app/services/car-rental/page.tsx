'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Users, Settings, MapPin, Clock, Star, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const carTypes = [
  {
    category: '经济型',
    cars: [
      {
        name: '大众Polo或同级',
        image: '/images/cars/polo.jpg',
        passengers: 4,
        luggage: 2,
        transmission: '手动',
        fuel: '汽油',
        price: '¥158',
        features: ['免费Wi-Fi', 'GPS导航', '24小时道路救援']
      },
      {
        name: '日产阳光或同级',
        image: '/images/cars/sunny.jpg',
        passengers: 5,
        luggage: 3,
        transmission: '自动',
        fuel: '汽油',
        price: '¥198',
        features: ['免费Wi-Fi', 'GPS导航', '24小时道路救援', '蓝牙音响']
      }
    ]
  },
  {
    category: '舒适型',
    cars: [
      {
        name: '大众帕萨特或同级',
        image: '/images/cars/passat.jpg',
        passengers: 5,
        luggage: 4,
        transmission: '自动',
        fuel: '汽油',
        price: '¥298',
        features: ['免费Wi-Fi', 'GPS导航', '24小时道路救援', '蓝牙音响', '真皮座椅']
      },
      {
        name: '奥迪A4或同级',
        image: '/images/cars/a4.jpg',
        passengers: 5,
        luggage: 4,
        transmission: '自动',
        fuel: '汽油',
        price: '¥498',
        features: ['免费Wi-Fi', 'GPS导航', '24小时道路救援', '蓝牙音响', '真皮座椅', '全景天窗']
      }
    ]
  },
  {
    category: 'SUV',
    cars: [
      {
        name: '本田CR-V或同级',
        image: '/images/cars/crv.jpg',
        passengers: 5,
        luggage: 5,
        transmission: '自动',
        fuel: '汽油',
        price: '¥398',
        features: ['免费Wi-Fi', 'GPS导航', '24小时道路救援', '蓝牙音响', '全景天窗']
      }
    ]
  }
];

const rentalLocations = [
  { city: '北京', airports: ['首都机场', '大兴机场'], branches: 15 },
  { city: '上海', airports: ['浦东机场', '虹桥机场'], branches: 12 },
  { city: '广州', airports: ['白云机场'], branches: 8 },
  { city: '深圳', airports: ['宝安机场'], branches: 10 },
  { city: '成都', airports: ['双流机场', '天府机场'], branches: 6 },
  { city: '杭州', airports: ['萧山机场'], branches: 5 }
];

const rentalFeatures = [
  {
    icon: Clock,
    title: '24小时取还车',
    description: '机场、市区多个网点，24小时灵活取还车服务'
  },
  {
    icon: Settings,
    title: '免费升级',
    description: '车辆不足时免费升级到更高级别车型'
  },
  {
    icon: MapPin,
    title: '异地还车',
    description: '支持全国异地还车，让您的行程更加灵活'
  },
  {
    icon: Star,
    title: '品质保证',
    description: '所有车辆定期保养，确保安全可靠的驾驶体验'
  }
];

export default function CarRentalPage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">租车服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">租车服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">全球租车预订服务，提供多样化的车型选择和灵活的租车方案，让您的旅行更加自由便捷。</p>
        </div>

        {/* 快速预订 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>快速预订</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="pickup-location">取车地点</Label>
                <Input id="pickup-location" placeholder="选择取车地点" />
              </div>
              <div>
                <Label htmlFor="pickup-date">取车日期</Label>
                <Input id="pickup-date" type="date" />
              </div>
              <div>
                <Label htmlFor="return-date">还车日期</Label>
                <Input id="return-date" type="date" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">搜索车辆</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 服务特色 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {rentalFeatures.map((feature, index) => {
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

        {/* 车型选择 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">车型选择</h2>
          {carTypes.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.cars.map((car, carIndex) => (
                  <Card key={carIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{car.name}</CardTitle>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {car.passengers}人
                            </span>
                            <span className="flex items-center gap-1">
                              <Car className="h-4 w-4" />
                              {car.luggage}件行李
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{car.price}</div>
                          <div className="text-sm text-muted-foreground">/天</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-4 text-sm">
                        <Badge variant="outline">{car.transmission}</Badge>
                        <Badge variant="outline">{car.fuel}</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        {car.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">立即预订</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 服务网点 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务网点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rentalLocations.map((location, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {location.city}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">机场网点：</span>
                      <span className="text-muted-foreground">{location.airports.join('、')}</span>
                    </div>
                    <div>
                      <span className="font-medium">市区网点：</span>
                      <span className="text-muted-foreground">{location.branches}个</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 租车须知 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>租车须知</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">租车条件</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 年满21周岁，持有效驾驶证</li>
                  <li>• 驾龄满1年以上</li>
                  <li>• 提供有效身份证件</li>
                  <li>• 信用卡预授权</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">注意事项</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 请按时取还车辆</li>
                  <li>• 保持车辆清洁</li>
                  <li>• 遵守交通规则</li>
                  <li>• 如有事故及时联系客服</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">需要租车帮助？</h2>
            <p className="text-muted-foreground mb-6">我们的客服团队24小时为您提供专业的租车咨询和服务支持。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Car className="h-4 w-4" />
                立即租车
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
