'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Search, Phone, MessageCircle, Mail, HelpCircle, Clock, Users, Star, Home, CreditCard, RefreshCw, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const helpCategories = [
  {
    title: '预订相关',
    icon: BookOpen,
    articles: [
      { title: '如何进行在线预订？', views: 1250 },
      { title: '预订后如何查看订单？', views: 980 },
      { title: '可以修改预订信息吗？', views: 756 },
      { title: '预订确认需要多长时间？', views: 623 },
      { title: '团体预订有什么优惠？', views: 489 }
    ]
  },
  {
    title: '支付相关',
    icon: CreditCard,
    articles: [
      { title: '支持哪些支付方式？', views: 1156 },
      { title: '支付安全如何保障？', views: 892 },
      { title: '可以分期付款吗？', views: 634 },
      { title: '发票如何开具？', views: 578 },
      { title: '退款多久能到账？', views: 445 }
    ]
  },
  {
    title: '取消退款',
    icon: RefreshCw,
    articles: [
      { title: '取消政策是什么？', views: 1423 },
      { title: '如何申请退款？', views: 1089 },
      { title: '退款手续费如何计算？', views: 767 },
      { title: '部分退款如何处理？', views: 534 },
      { title: '特殊情况退款政策', views: 423 }
    ]
  },
  {
    title: '服务相关',
    icon: Users,
    articles: [
      { title: '服务质量如何保障？', views: 945 },
      { title: '如何联系客服？', views: 823 },
      { title: '投诉建议如何处理？', views: 612 },
      { title: '服务评价如何提交？', views: 456 },
      { title: '会员权益有哪些？', views: 389 }
    ]
  }
];

const faqData = [
  {
    question: '如何进行在线预订？',
    answer: '您可以通过我们的官网或手机APP进行预订。选择您需要的服务类型，填写相关信息，选择支付方式完成支付即可。整个过程简单快捷，通常只需要几分钟。'
  },
  {
    question: '预订后可以取消吗？',
    answer: '可以取消，但需要根据不同服务的取消政策执行。一般来说，提前24小时以上取消可以全额退款，提前12-24小时取消收取50%手续费，12小时内取消不予退款。具体政策请查看各服务的详细说明。'
  },
  {
    question: '支持哪些支付方式？',
    answer: '我们支持多种支付方式，包括：支付宝、微信支付、银联卡、信用卡（Visa、MasterCard）、Apple Pay等。您可以选择最便捷的支付方式完成付款。'
  },
  {
    question: '如何联系客服？',
    answer: '您可以通过以下方式联系我们：1）拨打客服热线400-888-0000；2）使用网站右下角的在线客服；3）发送邮件至service@company.com；4）关注微信公众号进行咨询。我们的客服团队7×24小时为您服务。'
  },
  {
    question: '退款需要多长时间？',
    answer: '退款时间取决于您的支付方式：支付宝和微信支付通常1-3个工作日到账；银行卡退款一般需要3-7个工作日；信用卡退款可能需要7-15个工作日。我们会在处理完成后及时通知您。'
  },
  {
    question: '服务质量如何保障？',
    answer: '我们有完善的服务质量保障体系：1）严格的服务商筛选标准；2）定期的服务质量检查；3）客户满意度调查；4）7×24小时客服支持；5）不满意全额退款政策。我们致力于为每位客户提供优质的服务体验。'
  }
];

const contactChannels = [
  {
    icon: Phone,
    title: '电话客服',
    description: '7×24小时专业客服热线',
    contact: '400-888-0000',
    availability: '全天候服务'
  },
  {
    icon: MessageCircle,
    title: '在线客服',
    description: '网站在线客服实时沟通',
    contact: '点击右下角客服图标',
    availability: '全天候服务'
  },
  {
    icon: Mail,
    title: '邮件支持',
    description: '详细问题邮件咨询',
    contact: 'service@company.com',
    availability: '24小时内回复'
  },
  {
    icon: MessageSquare,
    title: '微信客服',
    description: '微信公众号客服咨询',
    contact: '搜索"公司名称"',
    availability: '工作时间回复'
  }
];

export default function HelpPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [searchQuery, setSearchQuery] = React.useState('');

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">帮助中心</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">帮助中心</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">常见问题和使用指南，帮助您更好地使用我们的服务。如果您没有找到答案，请联系我们的客服团队。</p>
        </div>

        {/* 搜索框 */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="搜索您需要的帮助..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Button>搜索</Button>
            </div>
          </CardContent>
        </Card>

        {/* 帮助分类 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">帮助分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CategoryIcon className="h-6 w-6 text-primary" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.articles.map((article, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md cursor-pointer">
                          <span className="text-sm">{article.title}</span>
                          <Badge variant="secondary" className="text-xs">
                            {article.views}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      查看更多
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">常见问题</h2>
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* 联系方式 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => {
              const ChannelIcon = channel.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <ChannelIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{channel.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                    <div className="text-sm font-medium text-primary mb-2">{channel.contact}</div>
                    <Badge variant="outline" className="text-xs">
                      {channel.availability}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 服务时间 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              服务时间
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">电话客服</h4>
                <p className="text-sm text-muted-foreground">7×24小时全天候服务</p>
                <p className="text-sm text-muted-foreground">包括节假日</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">在线客服</h4>
                <p className="text-sm text-muted-foreground">7×24小时在线服务</p>
                <p className="text-sm text-muted-foreground">即时回复</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">邮件客服</h4>
                <p className="text-sm text-muted-foreground">工作日：24小时内回复</p>
                <p className="text-sm text-muted-foreground">节假日：48小时内回复</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 服务承诺 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="font-semibold mb-2">专业服务</h3>
              <p className="text-sm text-muted-foreground">专业的客服团队，为您提供准确的解答</p>
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
              <p className="text-sm text-muted-foreground">以客户为中心，提供贴心周到的服务</p>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">还有其他问题？</h2>
            <p className="text-muted-foreground mb-6">如果您没有找到需要的帮助信息，请随时联系我们的客服团队，我们将竭诚为您服务。</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                联系客服
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
