'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Video, Calendar, Users, Clock, Play } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerTitle: string;
  avatar: string;
  date: string;
  time: string;
  duration: number;
  attendees: number;
  category: string;
  status: 'upcoming' | 'live' | 'recorded';
}

const MOCK_WEBINARS: Webinar[] = [
  {
    id: '1',
    title: 'ChatGPT高级应用技巧',
    description: '深入讲解ChatGPT的高级使用技巧和最佳实践',
    speaker: '张教授',
    speakerTitle: 'AI应用专家',
    avatar: '/avatars/speaker1.jpg',
    date: '2024-02-10',
    time: '19:00',
    duration: 90,
    attendees: 5000,
    category: 'AI对话',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Midjourney创作实战',
    description: '从零开始学习Midjourney图像生成技巧',
    speaker: '李老师',
    speakerTitle: '数字艺术家',
    avatar: '/avatars/speaker2.jpg',
    date: '2024-02-15',
    time: '20:00',
    duration: 120,
    attendees: 3000,
    category: '图像生成',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'AI代码助手最佳实践',
    description: '如何高效使用AI代码助手提升开发效率',
    speaker: '王工程师',
    speakerTitle: '资深开发者',
    avatar: '/avatars/speaker3.jpg',
    date: '2024-01-20',
    time: '19:00',
    duration: 60,
    attendees: 2500,
    category: '代码助手',
    status: 'recorded'
  }
];

export default function NewsWebinarsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'upcoming' | 'recorded'>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredWebinars = React.useMemo(() => {
    return filterStatus === 'all' ? MOCK_WEBINARS : MOCK_WEBINARS.filter((w) => w.status === filterStatus);
  }, [filterStatus]);

  const getStatusBadge = (status: string) => {
    const config = {
      upcoming: { label: '即将开始', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
      live: { label: '直播中', className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
      recorded: { label: '回放', className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' }
    };
    const { label, className } = config[status as keyof typeof config];
    return <Badge className={`${className} text-xs`}>{label}</Badge>;
  };

  return (
    <div className="relative min-h-screen">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">在线研讨会</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">在线研讨会</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">参加AI工具相关的在线研讨会和培训</p>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            全部
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'upcoming' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            即将开始
          </button>
          <button
            onClick={() => setFilterStatus('recorded')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'recorded' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            观看回放
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar) => (
            <div key={webinar.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                <Video className="h-16 w-16 text-primary/40" />
                <div className="absolute top-3 right-3">{getStatusBadge(webinar.status)}</div>
              </div>

              <div className="p-5">
                <Badge variant="secondary" className="text-xs mb-3">
                  {webinar.category}
                </Badge>

                <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{webinar.description}</p>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={webinar.avatar} alt={webinar.speaker} />
                    <AvatarFallback>{webinar.speaker[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{webinar.speaker}</div>
                    <div className="text-xs text-muted-foreground">{webinar.speakerTitle}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {webinar.date} {webinar.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{webinar.duration} 分钟</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{webinar.attendees.toLocaleString()} 人参与</span>
                  </div>
                </div>

                <Link
                  href={`/news/webinars/${webinar.id}?lang=${locale}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                >
                  {webinar.status === 'recorded' ? (
                    <>
                      <Play className="h-4 w-4" />
                      观看回放
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      立即报名
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
