'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Building, Users, Star, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const contactInfo = [
  {
    icon: Phone,
    title: '客服热线',
    content: '400-888-0000',
    subtitle: '7×24小时专业客服',
    description: '我们的客服团队随时为您提供专业的咨询和服务支持'
  },
  {
    icon: Mail,
    title: '邮箱地址',
    content: 'service@company.com',
    subtitle: '24小时内回复',
    description: '详细的问题和建议请发送邮件，我们会尽快回复'
  },
  {
    icon: MapPin,
    title: '公司地址',
    content: '北京市朝阳区xxx大厦28层',
    subtitle: '欢迎来访',
    description: '工作时间内欢迎您到公司进行面对面交流'
  },
  {
    icon: Clock,
    title: '工作时间',
    content: '周一至周日 9:00-18:00',
    subtitle: '节假日正常营业',
    description: '我们致力于为客户提供不间断的优质服务'
  }
];

const officeLocations = [
  {
    city: '北京总部',
    address: '北京市朝阳区建国门外大街1号国贸大厦A座28层',
    phone: '010-85912345',
    email: 'beijing@company.com',
    hours: '周一至周日 9:00-18:00'
  },
  {
    city: '上海分公司',
    address: '上海市浦东新区陆家嘴环路1000号恒生银行大厦15层',
    phone: '021-58901234',
    email: 'shanghai@company.com',
    hours: '周一至周日 9:00-18:00'
  },
  {
    city: '广州分公司',
    address: '广州市天河区珠江新城花城大道85号高德置地广场20层',
    phone: '020-38765432',
    email: 'guangzhou@company.com',
    hours: '周一至周日 9:00-18:00'
  }
];

const contactReasons = [
  { value: 'consultation', label: '服务咨询' },
  { value: 'complaint', label: '投诉建议' },
  { value: 'cooperation', label: '商务合作' },
  { value: 'media', label: '媒体采访' },
  { value: 'recruitment', label: '人才招聘' },
  { value: 'other', label: '其他事务' }
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    reason: '',
    message: ''
  });

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理表单提交
    console.log('Form submitted:', formData);
  };

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">联系我们</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">联系我们</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">我们随时为您提供专业的咨询和服务支持。无论您有任何问题或建议，都欢迎与我们联系。</p>
        </div>

        {/* 联系方式 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const InfoIcon = info.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <InfoIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <div className="text-primary font-medium mb-1">{info.content}</div>
                  <Badge variant="secondary" className="mb-3">
                    {info.subtitle}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 联系表单 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                在线留言
              </CardTitle>
              <p className="text-muted-foreground">请填写以下信息，我们会在24小时内与您联系</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">姓名 *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="请输入您的姓名" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">联系电话 *</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="请输入联系电话" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="请输入邮箱地址" />
                </div>

                <div>
                  <Label htmlFor="company">公司名称</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="请输入公司名称（选填）" />
                </div>

                <div>
                  <Label htmlFor="reason">联系事由 *</Label>
                  <select id="reason" name="reason" value={formData.reason} onChange={handleInputChange} className="w-full p-2 border rounded-md" required>
                    <option value="">请选择联系事由</option>
                    {contactReasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">详细信息 *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="请详细描述您的问题或需求..." rows={5} required />
                </div>

                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  发送消息
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 办公地点 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">办公地点</h2>
            <div className="space-y-6">
              {officeLocations.map((location, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {location.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-primary">{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{location.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{location.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 快速联系 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">快速联系方式</CardTitle>
            <p className="text-center text-muted-foreground">选择最适合您的联系方式，我们将为您提供及时的服务</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">电话咨询</h3>
                  <p className="text-sm text-muted-foreground mb-3">立即获得专业解答</p>
                  <Button className="w-full">400-888-0000</Button>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardContent className="pt-6">
                  <MessageCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h3 className="font-semibold mb-2">在线客服</h3>
                  <p className="text-sm text-muted-foreground mb-3">实时在线交流</p>
                  <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                    开始对话
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <CardContent className="pt-6">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold mb-2">邮件咨询</h3>
                  <p className="text-sm text-muted-foreground mb-3">详细问题邮件沟通</p>
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                    发送邮件
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 服务承诺 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="font-semibold mb-2">专业团队</h3>
              <p className="text-sm text-muted-foreground">经验丰富的专业客服团队为您服务</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">快速响应</h3>
              <p className="text-sm text-muted-foreground">承诺在最短时间内回复您的咨询</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">贴心服务</h3>
              <p className="text-sm text-muted-foreground">以客户为中心，提供个性化服务</p>
            </CardContent>
          </Card>
        </div>

        {/* 地图区域 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>找到我们</CardTitle>
            <p className="text-muted-foreground">我们的办公地点交通便利，欢迎您来访交流</p>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">地图加载中...</p>
                <p className="text-sm text-muted-foreground mt-2">北京市朝阳区建国门外大街1号国贸大厦A座28层</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">我们期待与您的沟通</h2>
            <p className="text-muted-foreground mb-6">无论您有任何问题、建议或合作意向，我们的专业团队都将为您提供最优质的服务。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                立即联系
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
