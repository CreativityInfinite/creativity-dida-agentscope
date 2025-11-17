'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline' | 'hybrid';
  attendees: number;
  category: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'AI工具开发者大会 2024',
    description: '汇聚全球AI工具开发者，分享最新技术和实践经验',
    date: '2024-02-15',
    time: '09:00 - 18:00',
    location: '北京国际会议中心',
    type: 'hybrid',
    attendees: 5000,
    category: '技术大会',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'AIGC创新应用论坛',
    description: '探讨AIGC在各行业的创新应用和商业化路径',
    date: '2024-02-20',
    time: '14:00 - 17:00',
    location: '线上直播',
    type: 'online',
    attendees: 10000,
    category: '行业论坛',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'AI安全与伦理研讨会',
    description: '讨论AI技术发展中的安全和伦理问题',
    date: '2024-03-01',
    time: '10:00 - 16:00',
    location: '上海科技馆',
    type: 'offline',
    attendees: 500,
    category: '学术研讨',
    status: 'upcoming'
  }
];

export default function NewsEventsPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'upcoming' | 'past'>('all');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredEvents = React.useMemo(() => {
    return filterStatus === 'all' ? MOCK_EVENTS : MOCK_EVENTS.filter((e) => e.status === filterStatus);
  }, [filterStatus]);

  const getTypeBadge = (type: string) => {
    const config = {
      online: { label: '线上', className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
      offline: { label: '线下', className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
      hybrid: { label: '混合', className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' }
    };
    const { label, className } = config[type as keyof typeof config];
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">行业活动</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">行业活动</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">了解AI工具相关的会议、活动和重要事件</p>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            全部活动
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'upcoming' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            即将举行
          </button>
          <button
            onClick={() => setFilterStatus('past')}
            className={`px-4 py-2 text-sm rounded-lg transition ${filterStatus === 'past' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
          >
            往期回顾
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="rounded-xl border bg-card p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  {event.category}
                </Badge>
                {getTypeBadge(event.type)}
              </div>

              <h3 className="text-lg font-semibold mb-3">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees.toLocaleString()} 人参与</span>
                </div>
              </div>

              <Link href={`/news/events/${event.id}?lang=${locale}`} className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                查看详情
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
