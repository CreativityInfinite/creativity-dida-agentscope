'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Camera, Heart, Eye, MessageCircle, Sparkles, Image as ImageIcon, Video, Music, Code, Palette } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Showcase {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  image: string;
  category: 'image' | 'video' | 'music' | 'code' | 'design';
  tools: string[];
  likes: number;
  views: number;
  comments: number;
  date: string;
  featured?: boolean;
}

const MOCK_SHOWCASES: Showcase[] = [
  {
    id: '1',
    title: '赛博朋克风格城市场景',
    description: '使用Midjourney V6创作的赛博朋克风格城市场景，结合了霓虹灯、未来建筑和雨夜氛围。经过多次迭代和细节调整，最终呈现出这个充满科幻感的作品。',
    author: '数字艺术家',
    avatar: '/avatars/user1.jpg',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    category: 'image',
    tools: ['Midjourney', 'Photoshop'],
    likes: 1234,
    views: 5678,
    comments: 89,
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'AI生成的产品宣传视频',
    description: '使用Runway Gen-2和CapCut制作的产品宣传视频，AI生成的场景转换流畅自然，大大提升了制作效率。',
    author: '视频创作者',
    avatar: '/avatars/user2.jpg',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
    category: 'video',
    tools: ['Runway', 'CapCut'],
    likes: 987,
    views: 4321,
    comments: 67,
    date: '2024-01-14',
    featured: true
  },
  {
    id: '3',
    title: '环境音乐专辑封面设计',
    description: '为AI生成的环境音乐专辑设计的封面，使用DALL-E 3生成基础图像，再用Figma进行排版设计。',
    author: '平面设计师',
    avatar: '/avatars/user3.jpg',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    category: 'design',
    tools: ['DALL-E 3', 'Figma'],
    likes: 756,
    views: 3210,
    comments: 45,
    date: '2024-01-13'
  },
  {
    id: '4',
    title: '使用GitHub Copilot开发的Web应用',
    description: '完全使用GitHub Copilot辅助开发的全栈Web应用，AI代码建议大大提升了开发效率，代码质量也很高。',
    author: '全栈开发者',
    avatar: '/avatars/user4.jpg',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'code',
    tools: ['GitHub Copilot', 'VSCode'],
    likes: 654,
    views: 2890,
    comments: 56,
    date: '2024-01-12'
  },
  {
    id: '5',
    title: 'AI生成的电影配乐',
    description: '使用Suno AI创作的电影配乐，情感表达丰富，氛围营造到位，完全可以用于实际项目。',
    author: '音乐制作人',
    avatar: '/avatars/user5.jpg',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800',
    category: 'music',
    tools: ['Suno AI', 'Logic Pro'],
    likes: 543,
    views: 2345,
    comments: 34,
    date: '2024-01-11'
  },
  {
    id: '6',
    title: '品牌视觉识别系统',
    description: '使用AI工具快速生成品牌VI系统，包括Logo、配色方案、字体选择等，大大缩短了设计周期。',
    author: '品牌设计师',
    avatar: '/avatars/user6.jpg',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    category: 'design',
    tools: ['Midjourney', 'Adobe Illustrator'],
    likes: 432,
    views: 1987,
    comments: 28,
    date: '2024-01-10'
  }
];

const CATEGORIES = [
  { key: 'all', label: '全部作品', icon: Sparkles },
  { key: 'image', label: '图像', icon: ImageIcon },
  { key: 'video', label: '视频', icon: Video },
  { key: 'music', label: '音乐', icon: Music },
  { key: 'code', label: '代码', icon: Code },
  { key: 'design', label: '设计', icon: Palette }
];

export default function DiscussionShowcasePage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'latest' | 'popular' | 'trending'>('latest');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredShowcases = React.useMemo(() => {
    let showcases = selectedCategory === 'all' ? MOCK_SHOWCASES : MOCK_SHOWCASES.filter((s) => s.category === selectedCategory);

    if (sortBy === 'popular') showcases = [...showcases].sort((a, b) => b.likes - a.likes);
    else if (sortBy === 'trending') showcases = [...showcases].sort((a, b) => b.views - a.views);

    return showcases;
  }, [selectedCategory, sortBy]);

  const featuredShowcases = React.useMemo(() => {
    return MOCK_SHOWCASES.filter((s) => s.featured);
  }, []);

  return (
    <div className="relative min-h-screen">
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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">作品展示</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">作品展示</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">展示使用AI工具创作的精彩作品，分享创作过程和技巧心得</p>
          </div>
          <Link
            href={`/discussion/showcase/new?lang=${locale}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
          >
            <Camera className="h-4 w-4" />
            上传作品
          </Link>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Camera className="h-4 w-4" />
              <span className="text-xs font-medium">作品总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">3,456</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20">
            <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-1">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">总点赞数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">45,678</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">总浏览量</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">123K</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">本周新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+67</div>
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      {featuredShowcases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            精选作品
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredShowcases.map((showcase) => (
              <Link key={showcase.id} href={`/discussion/showcase/${showcase.id}?lang=${locale}`} className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition">
                <div className="relative aspect-video overflow-hidden">
                  <img src={showcase.image} alt={showcase.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      精选
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">{showcase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{showcase.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={showcase.avatar} alt={showcase.author} />
                      <AvatarFallback>{showcase.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{showcase.author}</div>
                      <div className="text-xs text-muted-foreground">{showcase.date}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {showcase.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {showcase.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {showcase.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {showcase.comments}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* 分类和排序 */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 text-sm rounded-lg transition flex items-center gap-2 ${
                    selectedCategory === cat.key ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">排序：</span>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
            >
              最新发布
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'popular' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
            >
              最受欢迎
            </button>
            <button
              onClick={() => setSortBy('trending')}
              className={`px-3 py-1.5 rounded-lg transition ${sortBy === 'trending' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
            >
              热门浏览
            </button>
          </div>
        </div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowcases.map((showcase) => (
            <Link key={showcase.id} href={`/discussion/showcase/${showcase.id}?lang=${locale}`} className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition">
              <div className="relative aspect-video overflow-hidden">
                <img src={showcase.image} alt={showcase.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition line-clamp-1">{showcase.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{showcase.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={showcase.avatar} alt={showcase.author} />
                    <AvatarFallback>{showcase.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground truncate">{showcase.author}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {showcase.tools.slice(0, 2).map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                  {showcase.tools.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{showcase.tools.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {showcase.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {showcase.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {showcase.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多作品</button>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
