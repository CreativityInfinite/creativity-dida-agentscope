'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { FileText, Clock, CheckCircle, Globe, Phone, Mail, Home } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const visaServices = [
  {
    country: '美国',
    type: 'B1/B2 商务旅游签证',
    duration: '10年多次',
    processingTime: '5-15个工作日',
    price: '¥1,680',
    features: ['面试预约', '材料审核', '全程跟踪', '拒签退款']
  },
  {
    country: '日本',
    type: '个人旅游签证',
    duration: '5年多次',
    processingTime: '7-10个工作日',
    price: '¥680',
    features: ['简化材料', '快速办理', '高通过率', '专业服务']
  },
  {
    country: '欧盟',
    type: '申根签证',
    duration: '90天停留',
    processingTime: '10-15个工作日',
    price: '¥1,280',
    features: ['多国通用', '材料指导', '预约代办', '保险推荐']
  },
  {
    country: '英国',
    type: '标准访问签证',
    duration: '6个月',
    processingTime: '15-20个工作日',
    price: '¥2,180',
    features: ['在线申请', '材料翻译', '面试辅导', '加急服务']
  }
];

const visaProcess = [
  { step: '01', title: '咨询评估', description: '了解您的出行需求，评估签证类型和成功率' },
  { step: '02', title: '材料准备', description: '提供详细材料清单，协助准备申请文件' },
  { step: '03', title: '申请递交', description: '代为递交申请，预约面试时间（如需要）' },
  { step: '04', title: '进度跟踪', description: '实时跟踪申请进度，及时反馈最新状态' },
  { step: '05', title: '签证领取', description: '签证获批后，协助领取并检查签证信息' }
];

export default function VisaServicePage() {
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">签证服务</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">签证服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">专业的签证办理服务，为您的出行保驾护航。我们提供全球主要国家和地区的签证咨询与代办服务。</p>
        </div>

        {/* 服务优势 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">高通过率</h3>
              <p className="text-sm text-muted-foreground">专业团队，98%以上通过率</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">快速办理</h3>
              <p className="text-sm text-muted-foreground">加急服务，最快3天出签</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="font-semibold mb-2">材料简化</h3>
              <p className="text-sm text-muted-foreground">专业指导，简化申请流程</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">全球覆盖</h3>
              <p className="text-sm text-muted-foreground">覆盖180+国家和地区</p>
            </CardContent>
          </Card>
        </div>

        {/* 热门签证服务 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">热门签证服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visaServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {service.country}
                        <Badge variant="secondary">{service.type}</Badge>
                      </CardTitle>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>有效期: {service.duration}</span>
                        <span>办理时间: {service.processingTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-muted-foreground">起</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">立即申请</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 办理流程 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">办理流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {visaProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{process.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">需要签证咨询？</h2>
            <p className="text-muted-foreground mb-6">我们的签证专家团队随时为您提供专业咨询，让您的出行更加顺利。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                电话咨询
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
