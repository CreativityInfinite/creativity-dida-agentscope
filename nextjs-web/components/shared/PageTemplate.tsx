'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { Badge } from '@component/ui/badge';
import { getMessages } from '@/src/i18n/index';

interface PageTemplateProps {
  title: string;
  description: string;
  category?: string;
  children?: React.ReactNode;
}

export function PageTemplate({ title, description, category, children }: PageTemplateProps) {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));

  // 从 URL 参数获取语言
  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  return (
    <div className="relative min-h-screen">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {category && (
                <Badge variant="secondary" className="rounded-full">
                  {category}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          </div>

          {/* 页面内容 */}
          <Card>
            <CardHeader>
              <CardTitle>页面内容</CardTitle>
              <CardDescription>此页面正在开发中，敬请期待更多功能。</CardDescription>
            </CardHeader>
            <CardContent>
              {children || (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold mb-2">功能开发中</h3>
                  <p className="text-muted-foreground">我们正在努力为您构建这个功能，请稍后再来查看。</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Footer locale={locale} />
      </section>
    </div>
  );
}
