'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, MapPin, Camera, Utensils, Music, Star, Phone, Clock, Gift, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const eventTypes = [
  {
    type: '企业年会',
    icon: Users,
    description: '专业的企业年会策划和执行服务',
    features: ['主题策划设计', '场地布置装饰', '节目表演安排', '晚宴酒会服务', '颁奖典礼流程', '摄影摄像记录'],
    priceRange: '¥50,000 - ¥500,000'
  },
  {
    type: '产品发布会',
    icon: Star,
    description: '高规格的产品发布会策划服务',
    features: ['发布会策划', '舞台设计搭建', '媒体邀请管理', '直播技术支持', '嘉宾接待服务', '新闻稿撰写'],
    priceRange: '¥30,000 - ¥300,000'
  },
  {
    type: '商务会议',
    icon: Calendar,
    description: '专业的商务会议组织和管理',
    features: ['会议议程安排', '场地预订管理', '设备技术支持', '同声传译服务', '餐饮茶歇安排', '会议资料制作'],
    priceRange: '¥10,000 - ¥100,000'
  },
  {
    type: '展览展会',
    icon: MapPin,
    description: '展览展会的策划和现场管理',
    features: ['展位设计规划', '展品运输安装', '现场人员管理', '观众引流服务', '媒体宣传推广', '数据统计分析'],
    priceRange: '¥20,000 - ¥200,000'
  }
];

const eventServices = [
  {
    icon: Calendar,
    title: '活动策划',
    description: '从创意构思到详细执行方案的全方位策划服务'
  },
  {
    icon: MapPin,
    title: '场地管理',
    description: '场地选择、预订、布置和现场管理一站式服务'
  },
  {
    icon: Camera,
    title: '视觉设计',
    description: '专业的视觉设计和舞台美术制作服务'
  },
  {
    icon: Music,
    title: '节目演出',
    description: '丰富的演出资源和专业的节目编排服务'
  },
  {
    icon: Utensils,
    title: '餐饮服务',
    description: '高品质的餐饮和茶歇服务，满足各种需求'
  },
  {
    icon: Users,
    title: '现场执行',
    description: '专业的现场团队确保活动顺利进行'
  }
];

const successCases = [
  {
    title: '某科技公司年会',
    type: '企业年会',
    scale: '500人',
    duration: '1天',
    highlights: ['创新科技主题设计', '互动游戏环节', '明星嘉宾表演', '全息投影技术'],
    satisfaction: '98%'
  },
  {
    title: '新产品发布会',
    type: '产品发布',
    scale: '200人',
    duration: '半天',
    highlights: ['沉浸式发布体验', '媒体直播覆盖', '产品互动展示', '行业专家点评'],
    satisfaction: '96%'
  },
  {
    title: '国际商务论坛',
    type: '商务会议',
    scale: '300人',
    duration: '2天',
    highlights: ['多语言同传服务', '高端商务接待', '专业议程安排', '网络直播互动'],
    satisfaction: '97%'
  }
];

const planningProcess = [
  { step: '01', title: '需求分析', description: '深入了解活动目标、预算和具体需求' },
  { step: '02', title: '方案策划', description: '制定创意方案和详细执行计划' },
  { step: '03', title: '资源整合', description: '整合场地、人员、设备等各项资源' },
  { step: '04', title: '现场执行', description: '专业团队现场执行和实时协调' },
  { step: '05', title: '效果评估', description: '活动总结和效果评估报告' }
];

export default function EventsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [formData, setFormData] = React.useState({
    eventType: '',
    eventDate: '',
    attendees: '',
    venue: '',
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">会议活动</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">会议活动</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的会议和活动策划服务，从创意策划到现场执行，为您打造难忘的活动体验。</p>
        </div>

        {/* 快速咨询 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>快速获取活动方案</CardTitle>
            <p className="text-muted-foreground">告诉我们您的活动需求，我们将在24小时内提供专业方案</p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="quick-event-type">活动类型</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">选择活动类型</option>
                  <option value="annual">企业年会</option>
                  <option value="launch">产品发布</option>
                  <option value="meeting">商务会议</option>
                  <option value="exhibition">展览展会</option>
                </select>
              </div>
              <div>
                <Label htmlFor="quick-attendees">参会人数</Label>
                <Input placeholder="如：100人" />
              </div>
              <div>
                <Label htmlFor="quick-budget">预算范围</Label>
                <Input placeholder="如：10万" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">获取方案</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 活动类型 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">活动类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventTypes.map((type, index) => {
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
                        <Badge variant="secondary">{type.priceRange}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold">服务内容</h4>
                      <ul className="space-y-2">
                        {type.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4">咨询方案</Button>
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
            {eventServices.map((service, index) => {
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

        {/* 成功案例 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">成功案例</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successCases.map((case_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{case_.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {case_.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">{case_.satisfaction}</div>
                      <div className="text-xs text-muted-foreground">满意度</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {case_.scale}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {case_.duration}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">活动亮点</h4>
                    <div className="flex flex-wrap gap-1">
                      {case_.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 策划流程 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">策划流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {planningProcess.map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{process.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
                {index < planningProcess.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8" />}
              </div>
            ))}
          </div>
        </div>

        {/* 详细咨询表单 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>活动策划咨询</CardTitle>
            <p className="text-muted-foreground">请填写详细的活动需求，我们的专业策划师将为您制定最适合的活动方案</p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventType">活动类型 *</Label>
                <select id="eventType" name="eventType" value={formData.eventType} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
                  <option value="">选择活动类型</option>
                  <option value="annual">企业年会</option>
                  <option value="launch">产品发布会</option>
                  <option value="meeting">商务会议</option>
                  <option value="exhibition">展览展会</option>
                  <option value="other">其他活动</option>
                </select>
              </div>
              <div>
                <Label htmlFor="eventDate">计划时间</Label>
                <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="attendees">参会人数 *</Label>
                <Input id="attendees" name="attendees" value={formData.attendees} onChange={handleInputChange} placeholder="请输入预计参会人数" required />
              </div>
              <div>
                <Label htmlFor="venue">场地要求</Label>
                <Input id="venue" name="venue" value={formData.venue} onChange={handleInputChange} placeholder="如：五星级酒店、会议中心等" />
              </div>
              <div>
                <Label htmlFor="budget">预算范围</Label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">选择预算范围</option>
                  <option value="10k-50k">1万-5万</option>
                  <option value="50k-100k">5万-10万</option>
                  <option value="100k-300k">10万-30万</option>
                  <option value="300k+">30万以上</option>
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
                <Label htmlFor="requirements">活动需求描述</Label>
                <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="请详细描述您的活动需求、目标、特殊要求等..." rows={4} />
              </div>
              <div className="md:col-span-2 text-center">
                <Button size="lg" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  提交咨询
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 服务保障 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="font-semibold mb-2">专业团队</h3>
              <p className="text-sm text-muted-foreground">10年+活动策划经验，服务过500+企业</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Gift className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">创意策划</h3>
              <p className="text-sm text-muted-foreground">独特创意设计，打造令人印象深刻的活动</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">全程服务</h3>
              <p className="text-sm text-muted-foreground">从策划到执行的一站式服务保障</p>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">让我们为您策划一场成功的活动</h2>
            <p className="text-muted-foreground mb-6">专业的活动策划团队，丰富的执行经验，为您打造完美的活动体验。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                400-666-8888
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                预约咨询
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
