'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SiteNavigation } from '@component/SiteNavigation';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Home, Folder, Download, Eye, Star, FileText, Image, Video, Music, Code, Link2, TrendingUp, Filter } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'code' | 'link';
  category: string;
  author: string;
  avatar: string;
  downloads: number;
  views: number;
  rating: number;
  size?: string;
  format?: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'ChatGPT提示词模板库',
    description: '精选100+个ChatGPT提示词模板，涵盖写作、编程、分析等多个场景，开箱即用。',
    type: 'document',
    category: 'AI对话',
    author: 'AI研究员',
    avatar: '/avatars/user1.jpg',
    downloads: 5678,
    views: 12345,
    rating: 4.9,
    size: '2.5 MB',
    format: 'PDF',
    date: '2024-01-15',
    tags: ['提示词', 'ChatGPT', '模板'],
    featured: true
  },
  {
    id: '2',
    title: 'Midjourney风格参考图集',
    description: '500+张高质量Midjourney生成图像，按风格分类，附带完整提示词，是学习和参考的绝佳资源。',
    type: 'image',
    category: '图像生成',
    author: '数字艺术家',
    avatar: '/avatars/user2.jpg',
    downloads: 4321,
    views: 9876,
    rating: 4.8,
    size: '156 MB',
    format: 'ZIP',
    date: '2024-01-14',
    tags: ['Midjourney', '风格', '参考'],
    featured: true
  },
  {
    id: '3',
    title: 'AI工具使用视频教程合集',
    description: '20+个AI工具的详细视频教程，从基础操作到高级技巧，适合各个水平的学习者。',
    type: 'video',
    category: '教程',
    author: '教育工作者',
    avatar: '/avatars/user3.jpg',
    downloads: 3456,
    views: 8765,
    rating: 4.7,
    size: '3.2 GB',
    format: 'MP4',
    date: '2024-01-13',
    tags: ['教程', '视频', '合集']
  },
  {
    id: '4',
    title: 'GitHub Copilot代码片段库',
    description: '常用代码片段和最佳实践，提升AI辅助编程效率。',
    type: 'code',
    category: '代码助手',
    author: '资深开发者',
    avatar: '/avatars/user4.jpg',
    downloads: 2890,
    views: 6543,
    rating: 4.6,
    size: '5.8 MB',
    format: 'ZIP',
    date: '2024-01-12',
    tags: ['代码', 'Copilot', '片段']
  },
  {
    id: '5',
    title: 'AI音乐制作素材包',
    description: '包含音效、循环、采样等多种音乐制作素材，适合AI音乐创作。',
    type: 'audio',
    category: '音频工具',
    author: '音乐制作人',
    avatar: '/avatars/user5.jpg',
    downloads: 2345,
    views: 5432,
    rating: 4.5,
    size: '890 MB',
    format: 'WAV',
    date: '2024-01-11',
    tags: ['音乐', '素材', '音效']
  },
  {
    id: '6',
    title: 'AI工具导航网站精选',
    description: '精选50+个优质AI工具导航网站，快速找到你需要的工具。',
    type: 'link',
    category: '导航',
    author: '资源整理者',
    avatar: '/avatars/user6.jpg',
    downloads: 1987,
    views: 4321,
    rating: 4.8,
    date: '2024-01-10',
    tags: ['导航', '工具', '链接']
  }
];

const RESOURCE_TYPES = [
  { key: 'all', label: '全部资源', icon: Folder },
  { key: 'document', label: '文档', icon: FileText },
  { key: 'image', label: '图像', icon: Image },
  { key: 'video', label: '视频', icon: Video },
  { key: 'audio', label: '音频', icon: Music },
  { key: 'code', label: '代码', icon: Code },
  { key: 'link', label: '链接', icon: Link2 }
];

const POPULAR_TAGS = ['提示词', 'Midjourney', 'ChatGPT', '教程', '模板', '代码', '素材', '工具'];

export default function DiscussionResourcesPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<'latest' | 'downloads' | 'rating'>('latest');

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [searchParams]);

  const filteredResources = React.useMemo(() => {
    let resources = selectedType === 'all' ? MOCK_RESOURCES : MOCK_RESOURCES.filter((r) => r.type === selectedType);

    if (selectedTag) resources = resources.filter((r) => r.tags.includes(selectedTag));

    if (sortBy === 'downloads') resources = [...resources].sort((a, b) => b.downloads - a.downloads);
    else if (sortBy === 'rating') resources = [...resources].sort((a, b) => b.rating - a.rating);

    return resources;
  }, [selectedType, selectedTag, sortBy]);

  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      document: FileText,
      image: Image,
      video: Video,
      audio: Music,
      code: Code,
      link: Link2
    };
    const Icon = iconMap[type] || FileText;
    return <Icon className="h-4 w-4" />;
  };

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
              <BreadcrumbPage className="font-medium text-xs sm:text-sm">资源分享</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">资源分享</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">分享有用的AI工具资源和学习材料，助力你的AI之旅</p>
          </div>
          <Link
            href={`/discussion/resources/new?lang=${locale}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
          >
            <Folder className="h-4 w-4" />
            上传资源
          </Link>
        </div>

        {/* 统计 */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Folder className="h-4 w-4" />
              <span className="text-xs font-medium">资源总数</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">2,345</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <Download className="h-4 w-4" />
              <span className="text-xs font-medium">总下载量</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">67,890</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">总浏览量</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">234K</div>
          </div>
          <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">本周新增</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold">+34</div>
          </div>
        </div>
      </section>

      {/* 主内容 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧筛选 */}
          <aside className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-5 sticky top-20 space-y-6">
              {/* 资源类型 */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  资源类型
                </h3>
                <div className="space-y-2">
                  {RESOURCE_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.key}
                        onClick={() => setSelectedType(type.key)}
                        className={`w-full px-3 py-2 text-sm rounded-lg transition flex items-center gap-2 ${
                          selectedType === type.key ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted text-foreground/80'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 热门标签 */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">🏷️ 热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition ${
                        selectedTag === tag ? 'bg-primary text-primary-foreground border-transparent shadow-sm' : 'border-muted-foreground/30 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 上传指南 */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3">📝 上传指南</h3>
                <ul className="space-y-2 text-xs text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>确保资源质量和实用性</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>提供详细的描述和说明</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>标注清晰的分类和标签</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>尊重版权，合法分享</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* 右侧主内容 */}
          <div className="lg:col-span-9">
            {/* 排序 */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                共找到 <span className="font-semibold text-foreground">{filteredResources.length}</span> 个资源
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">排序：</span>
                <button
                  onClick={() => setSortBy('latest')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  最新
                </button>
                <button
                  onClick={() => setSortBy('downloads')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'downloads' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  下载量
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition ${sortBy === 'rating' ? 'text-primary font-medium' : 'text-foreground/60 hover:text-foreground'}`}
                >
                  评分
                </button>
              </div>
            </div>

            {/* 资源列表 */}
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{getTypeIcon(resource.type)}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-semibold group-hover:text-primary transition line-clamp-1">{resource.title}</h3>
                        {resource.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs flex-shrink-0">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            精选
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>

                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={resource.avatar} alt={resource.author} />
                            <AvatarFallback>{resource.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground/80">{resource.author}</span>
                        </div>
                        <span>·</span>
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                        {resource.size && (
                          <>
                            <span>·</span>
                            <span>{resource.size}</span>
                          </>
                        )}
                        {resource.format && (
                          <>
                            <span>·</span>
                            <span>{resource.format}</span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Download className="h-3.5 w-3.5" />
                            {resource.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {resource.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            {resource.rating}
                          </span>
                          <span className="text-muted-foreground/60">{resource.date}</span>
                        </div>
                        <Link
                          href={`/discussion/resources/${resource.id}?lang=${locale}`}
                          className="px-4 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          下载
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition">加载更多资源</button>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
