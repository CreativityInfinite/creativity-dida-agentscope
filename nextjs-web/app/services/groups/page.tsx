'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, MapPin, Calendar, Camera, Utensils, Car, Plane, Star, Phone, Clock, Home, GraduationCap, Heart } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const groupTourTypes = [
  {
    type: '企业团建',
    icon: Users,
    description: '专为企业团队设计的团建旅游活动',
    minSize: '10人起',
    features: ['团队协作活动', '户外拓展训练', '文化体验项目', '专业团建教练', '活动效果评估'],
    sampleItineraries: ['2天1夜团建套餐', '3天2夜深度团建', '周末团建活动']
  },
  {
    type: '学校研学',
    icon: GraduationCap,
    description: '寓教于乐的学校研学旅行项目',
    minSize: '20人起',
    features: ['教育主题设计', '安全保障措施', '专业研学导师', '互动学习活动', '研学报告制作'],
    sampleItineraries: ['历史文化研学游', '科技创新体验营', '自然生态探索之旅']
  },
  {
    type: '家庭聚会',
    icon: Heart,
    description: '温馨的多家庭聚会旅游安排',
    minSize: '6人起',
    features: ['多代同游设计', '亲子互动活动', '老人关怀服务', '灵活行程安排', '家庭摄影服务'],
    sampleItineraries: ['三代同堂温泉游', '亲子主题乐园行', '田园生活体验游']
  },
  {
    type: '同学聚会',
    icon: Users,
    description: '重温友谊的同学聚会旅游',
    minSize: '8人起',
    features: ['怀旧主题设计', '聚会活动策划', '集体照拍摄', '纪念品定制', '聚餐安排'],
    sampleItineraries: ['母校重游之旅', '青春回忆之旅', '友谊见证之旅']
  }
];

const groupServices = [
  {
    icon: MapPin,
    title: '行程定制',
    description: '根据团队需求量身定制专属行程路线'
  },
  {
    icon: Car,
    title: '交通安排',
    description: '提供舒适安全的团队交通解决方案'
  },
  {
    icon: Utensils,
    title: '餐饮服务',
    description: '安排符合团队口味的特色餐饮'
  },
  {
    icon: Camera,
    title: '摄影跟拍',
    description: '专业摄影师全程跟拍，记录美好时光'
  },
  {
    icon: Star,
    title: '活动策划',
    description: '丰富多彩的团队活动和互动游戏'
  },
  {
    icon: Clock,
    title: '全程陪同',
    description: '专业导游和领队全程贴心服务'
  }
];

const pricingTiers = [
  {
    name: '经济套餐',
    priceRange: '¥300-500',
    unit: '/人/天',
    groupSize: '10-20人',
    includes: ['标准住宿', '团队用餐', '景点门票', '旅游大巴', '导游服务', '旅行保险'],
    popular: false
  },
  {
    name: '舒适套餐',
    priceRange: '¥500-800',
    unit: '/人/天',
    groupSize: '10-30人',
    includes: ['舒适住宿', '特色餐饮', '景点门票', '舒适大巴', '专业导游', '旅行保险', '活动策划', '摄影服务'],
    popular: true
  },
  {
    name: '豪华套餐',
    priceRange: '¥800-1500',
    unit: '/人/天',
    groupSize: '10-50人',
    includes: ['豪华住宿', '高端餐饮', 'VIP门票', '豪华大巴', '金牌导游', '全保险', '定制活动', '专业摄影', '纪念品制作', '专属客服'],
    popular: false
  }
];

const bookingSteps = [
  { step: '01', title: '需求咨询', description: '了解团队规模、时间、预算等需求' },
  { step: '02', title: '方案设计', description: '制定个性化的团队旅游方案' },
  { step: '03', title: '方案确认', description: '确认行程细节和服务内容' },
  { step: '04', title: '签约付款', description: '签署合同并支付定金' },
  { step: '05', title: '出行服务', description: '专业团队提供全程优质服务' }
];

export default function GroupsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [formData, setFormData] = React.useState({
    groupType: '',
    groupSize: '',
    destination: '',
    duration: '',
    budget: '',
    contact: '',
    phone: '',
    requirements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">团体旅游</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">团体旅游</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的团体出行解决方案，为企业团建、学校研学、家庭聚会等各类团体提供定制化旅游服务。</p>
        </div>

        {/* 快速报价 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>快速获取报价</CardTitle>
            <p className="text-muted-foreground">填写基本信息，我们将在24小时内为您提供专业的团体旅游方案</p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="quick-group-type">团体类型</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">选择团体类型</option>
                  <option value="corporate">企业团建</option>
                  <option value="school">学校研学</option>
                  <option value="family">家庭聚会</option>
                  <option value="friends">同学聚会</option>
                </select>
              </div>
              <div>
                <Label htmlFor="quick-size">团队人数</Label>
                <Input placeholder="如：20人" />
              </div>
              <div>
                <Label htmlFor="quick-destination">目的地</Label>
                <Input placeholder="如：北京" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">获取报价</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 团体类型 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">团体类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupTourTypes.map((type, index) => {
              const TypeIcon = type.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{type.type}</CardTitle>
                        <Badge variant="secondary">{type.minSize}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">服务特色</h4>
                        <ul className="space-y-1">
                          {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">推荐行程</h4>
                        <div className="flex flex-wrap gap-1">
                          {type.sampleItineraries.map((itinerary, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {itinerary}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">定制方案</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 服务内容 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <ServiceIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 价格套餐 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">价格套餐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {tier.popular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">热门选择</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {tier.priceRange}
                    <span className="text-sm font-normal text-muted-foreground">{tier.unit}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">适用团队：{tier.groupSize}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                    选择套餐
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

        {/* 详细咨询表单 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>详细咨询</CardTitle>
            <p className="text-muted-foreground">请填写详细信息，我们的专业顾问将为您制定最适合的团体旅游方案</p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="groupType">团体类型 *</Label>
                <select id="groupType" name="groupType" value={formData.groupType} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
                  <option value="">选择团体类型</option>
                  <option value="corporate">企业团建</option>
                  <option value="school">学校研学</option>
                  <option value="family">家庭聚会</option>
                  <option value="friends">同学聚会</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <Label htmlFor="groupSize">团队人数 *</Label>
                <Input id="groupSize" name="groupSize" value={formData.groupSize} onChange={handleInputChange} placeholder="请输入具体人数" required />
              </div>
              <div>
                <Label htmlFor="destination">目的地偏好</Label>
                <Input id="destination" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="如：北京、上海、三亚等" />
              </div>
              <div>
                <Label htmlFor="duration">出行天数</Label>
                <select id="duration" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">选择出行天数</option>
                  <option value="1">1天</option>
                  <option value="2">2天</option>
                  <option value="3">3天</option>
                  <option value="4-5">4-5天</option>
                  <option value="6-7">6-7天</option>
                  <option value="7+">7天以上</option>
                </select>
              </div>
              <div>
                <Label htmlFor="budget">预算范围</Label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">选择预算范围</option>
                  <option value="300-500">¥300-500/人</option>
                  <option value="500-800">¥500-800/人</option>
                  <option value="800-1200">¥800-1200/人</option>
                  <option value="1200+">¥1200+/人</option>
                </select>
              </div>
              <div>
                <Label htmlFor="contact">联系人 *</Label>
                <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="请输入联系人姓名" required />
              </div>
              <div>
                <Label htmlFor="phone">联系电话 *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="请输入联系电话" required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="requirements">特殊需求</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="请描述您的特殊需求，如饮食偏好、住宿要求、活动偏好等..."
                  rows={4}
                />
              </div>
              <div className="md:col-span-2 text-center">
                <Button size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  提交咨询
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">专业团体旅游服务</h2>
            <p className="text-muted-foreground mb-6">10年团体旅游经验，服务过1000+团体，专业的团队为您提供贴心的服务。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                400-888-9999
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
