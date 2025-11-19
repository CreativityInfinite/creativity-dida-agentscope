'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Users, Plane, Calendar, BarChart, Shield, Clock, Star, Phone, Mail, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const corporateServices = [
  {
    title: '差旅管理',
    icon: Plane,
    description: '全方位企业差旅管理解决方案',
    features: ['在线预订平台', '差旅政策管理', '费用控制系统', '实时报告分析', '24/7客服支持'],
    benefits: ['降低差旅成本20-30%', '提高预订效率', '简化报销流程', '增强合规管理']
  },
  {
    title: '会议活动',
    icon: Calendar,
    description: '专业的企业会议和活动策划服务',
    features: ['场地预订管理', '活动策划执行', '技术设备支持', '餐饮住宿安排', '现场服务团队'],
    benefits: ['专业活动策划', '一站式服务', '成本透明可控', '高质量执行']
  },
  {
    title: '团队建设',
    icon: Users,
    description: '定制化的企业团建和培训活动',
    features: ['团建活动设计', '培训项目定制', '户外拓展训练', '文化体验活动', '效果评估报告'],
    benefits: ['增强团队凝聚力', '提升员工满意度', '促进企业文化', '提高工作效率']
  }
];

const servicePlans = [
  {
    name: '基础版',
    price: '¥5,000',
    period: '/月',
    employees: '50人以下',
    features: ['在线预订平台', '基础报告分析', '邮件客服支持', '差旅政策设置', '月度账单管理'],
    popular: false
  },
  {
    name: '专业版',
    price: '¥12,000',
    period: '/月',
    employees: '50-200人',
    features: ['在线预订平台', '高级报告分析', '专属客服经理', '差旅政策管理', '实时费用控制', '移动端应用', 'API接口集成'],
    popular: true
  },
  {
    name: '企业版',
    price: '定制报价',
    period: '',
    employees: '200人以上',
    features: ['全功能平台', '定制化报告', '专属服务团队', '高级政策引擎', '全球差旅支持', '系统集成服务', 'SLA服务保障', '培训和咨询'],
    popular: false
  }
];

const clientTestimonials = [
  {
    company: '科技有限公司',
    logo: '/images/clients/tech-company.png',
    testimonial: '使用企业差旅管理系统后，我们的差旅成本下降了25%，员工出行体验也大大提升。',
    author: '人力资源总监',
    rating: 5
  },
  {
    company: '制造集团',
    logo: '/images/clients/manufacturing.png',
    testimonial: '专业的会议活动服务让我们的年会非常成功，客户满意度达到98%。',
    author: '市场部经理',
    rating: 5
  },
  {
    company: '金融服务公司',
    logo: '/images/clients/finance.png',
    testimonial: '团队建设活动增强了员工凝聚力，工作效率明显提升，值得推荐。',
    author: '总经理',
    rating: 5
  }
];

const serviceAdvantages = [
  {
    icon: BarChart,
    title: '成本节约',
    description: '通过智能化管理和批量采购，平均为企业节省20-30%的差旅成本'
  },
  {
    icon: Clock,
    title: '效率提升',
    description: '自动化流程和一站式服务，大幅提升企业差旅管理效率'
  },
  {
    icon: Shield,
    title: '合规保障',
    description: '完善的政策管理和审批流程，确保企业差旅合规性'
  },
  {
    icon: Star,
    title: '专业服务',
    description: '专业的服务团队和7×24小时支持，保障服务质量'
  }
];

export default function CorporatePage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [formData, setFormData] = React.useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    employees: '',
    requirements: ''
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">企业服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">企业差旅</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的企业商务旅行管理解决方案，为您的企业提供高效、经济、合规的差旅服务。</p>
        </div>

        {/* 服务优势 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {serviceAdvantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <IconComponent className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 服务内容 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporateServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ServiceIcon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">核心功能</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">服务价值</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 服务套餐 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">服务套餐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">推荐方案</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    {plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
                  </div>
                  <div className="text-sm text-muted-foreground">适用于 {plan.employees}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    {plan.name === '企业版' ? '联系咨询' : '立即开通'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 客户案例 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">客户见证</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientTestimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.company}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.author}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 咨询表单 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">免费咨询</CardTitle>
            <p className="text-center text-muted-foreground">填写您的需求，我们的专业顾问将为您制定最适合的企业差旅解决方案</p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">公司名称 *</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="请输入公司名称" required />
              </div>
              <div>
                <Label htmlFor="contact">联系人 *</Label>
                <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="请输入联系人姓名" required />
              </div>
              <div>
                <Label htmlFor="phone">联系电话 *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="请输入联系电话" required />
              </div>
              <div>
                <Label htmlFor="email">邮箱地址</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="请输入邮箱地址" />
              </div>
              <div>
                <Label htmlFor="employees">员工规模</Label>
                <select id="employees" name="employees" value={formData.employees} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="">请选择员工规模</option>
                  <option value="1-50">1-50人</option>
                  <option value="51-200">51-200人</option>
                  <option value="201-500">201-500人</option>
                  <option value="500+">500人以上</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="requirements">具体需求</Label>
                <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="请描述您的具体需求和期望..." rows={4} />
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
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">专业团队，随时为您服务</h2>
            <p className="text-muted-foreground mb-6">我们的企业服务专家团队拥有丰富的差旅管理经验，为您提供专业的咨询和服务。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                400-800-8888
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                在线咨询
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
