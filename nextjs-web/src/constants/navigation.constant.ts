import {
  Folder,
  TrendingUp,
  Star,
  FileText,
  BookOpen,
  Bell,
  BarChart,
  Rocket,
  Calendar,
  MessageCircle,
  Wrench,
  Book,
  Image,
  Megaphone,
  LayoutDashboard,
  User,
  Settings,
  LineChart,
  PieChart,
  Trophy,
  Search,
  Bookmark,
  CalendarDays,
  History,
  Activity,
  Zap,
  Clock,
  Newspaper,
  MessageSquare,
  Camera,
  GraduationCap,
  Shield,
  BellRing,
  Images,
  SquarePen,
  Code,
  Mic,
  MessageCircleMore,
  ThumbsUp,
  Gauge,
  Home,
  Server,
  Boxes
} from 'lucide-react';
import { getMessages } from '@/src/i18n'; // i18n helper，与原 getNavSections 相同来源
export const iconMap = {
  home: Home,
  folder: Folder,
  'trending-up': TrendingUp,
  star: Star,
  'file-text': FileText,
  'book-open': BookOpen,
  bell: Bell,
  'bell-ring': BellRing,
  'bar-chart': BarChart,
  rocket: Rocket,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  tool: Wrench,
  book: Book,
  image: Image,
  images: Image,
  megaphone: Megaphone,
  'layout-dashboard': LayoutDashboard,
  user: User,
  settings: Settings,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  trophy: Trophy,
  search: Search,
  bookmark: Bookmark,
  history: History,
  activity: Activity,
  zap: Zap,
  clock: Clock,
  newspaper: Newspaper,
  camera: Camera,
  'graduation-cap': GraduationCap,
  shield: Shield,
  'pen-line': SquarePen,
  code: Code,
  mic: Mic,
  bot: MessageCircleMore,
  'thumbs-up': ThumbsUp,
  gauge: Gauge,
  server: Server,
  boxes: Boxes
};
export type IconKey = keyof typeof iconMap;
export interface NavigationItem {
  title: string;
  href: string;
  icon: IconKey;
}
export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}
export interface NavigationSection {
  trigger: string;
  href?: string;
  groups?: NavigationGroup[];
}

// 导航配置
export const staticNavigation = [
  {
    trigger: 'Explore',
    groups: [
      {
        title: 'Categories',
        items: [
          { href: `/categories/chat-tools`, icon: 'bot' as IconKey },
          { href: `/categories/image-generation`, icon: 'images' as IconKey },
          { href: `/categories/writing`, icon: 'pen-line' as IconKey },
          { href: `/categories/code-assistant`, icon: 'code' as IconKey },
          { href: `/categories/audio-voice`, icon: 'mic' as IconKey },
          { href: `/categories/data-insights`, icon: 'line-chart' as IconKey },
          { href: `/categories/automation`, icon: 'zap' as IconKey }
        ]
      },
      {
        title: 'Trending',
        items: [
          { href: `/trending/now`, icon: 'trending-up' as IconKey },
          { href: `/trending/top-rated`, icon: 'trophy' as IconKey },
          { href: `/trending/rising`, icon: 'rocket' as IconKey },
          { href: `/trending/most-searched`, icon: 'search' as IconKey }
        ]
      },
      {
        title: 'Featured',
        items: [
          { href: `/featured/editors-picks`, icon: 'bookmark' as IconKey },
          { href: `/featured/new-launches`, icon: 'calendar-days' as IconKey },
          { href: `/featured/community-favorites`, icon: 'thumbs-up' as IconKey },
          { href: `/featured/weekly-highlights`, icon: 'bell' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'MCP',
    groups: [
      {
        title: 'Categories',
        items: [
          { href: `/mcp/categories/design`, icon: 'images' as IconKey },
          { href: `/mcp/categories/testing`, icon: 'gauge' as IconKey },
          { href: `/mcp/categories/code-analysis`, icon: 'bar-chart' as IconKey },
          { href: `/mcp/categories/ui-components`, icon: 'layout-dashboard' as IconKey },
          { href: `/mcp/categories/scraping`, icon: 'search' as IconKey },
          { href: `/mcp/categories/devtools`, icon: 'tool' as IconKey }
        ]
      },
      {
        title: 'Integrations',
        items: [
          { href: `/mcp/integrations/automation`, icon: 'zap' as IconKey },
          { href: `/mcp/integrations/scraping`, icon: 'camera' as IconKey },
          { href: `/mcp/integrations/design`, icon: 'pen-line' as IconKey }
        ]
      },
      {
        title: 'Guides',
        items: [
          { href: `/blog/guides?tag=mcp`, icon: 'book-open' as IconKey },
          { href: `/discussion/resources?tag=mcp`, icon: 'folder' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Blog',
    groups: [
      {
        title: 'Articles',
        items: [
          { href: `/blog/articles`, icon: 'file-text' as IconKey },
          { href: `/blog/guides`, icon: 'book-open' as IconKey }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { href: `/blog/tutorials`, icon: 'book' as IconKey },
          { href: `/blog/case-studies`, icon: 'pie-chart' as IconKey }
        ]
      },
      {
        title: 'Updates',
        items: [
          { href: `/blog/updates`, icon: 'history' as IconKey },
          { href: `/blog/changelog`, icon: 'activity' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'News',
    groups: [
      {
        title: 'AI Trends',
        items: [
          { href: `/news/trends`, icon: 'bar-chart' as IconKey },
          { href: `/news/opinion`, icon: 'newspaper' as IconKey }
        ]
      },
      {
        title: 'Releases',
        items: [
          { href: `/news/releases`, icon: 'zap' as IconKey },
          { href: `/news/changelog`, icon: 'calendar' as IconKey }
        ]
      },
      {
        title: 'Events',
        items: [
          { href: `/news/events`, icon: 'clock' as IconKey },
          { href: `/news/webinars`, icon: 'megaphone' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Discussion',
    groups: [
      {
        title: 'General Discussion',
        items: [
          { href: `/discussion/general`, icon: 'message-circle' as IconKey },
          { href: `/discussion/feedback`, icon: 'message-square' as IconKey }
        ]
      },
      {
        title: 'Tool Recommendations',
        items: [
          { href: `/discussion/tools`, icon: 'tool' as IconKey },
          { href: `/discussion/showcase`, icon: 'camera' as IconKey }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { href: `/discussion/tutorials`, icon: 'graduation-cap' as IconKey },
          { href: `/discussion/resources`, icon: 'folder' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Account',
    groups: [
      {
        title: 'Dashboard',
        items: [
          { href: `/account`, icon: 'layout-dashboard' as IconKey },
          { href: `/account/activity`, icon: 'gauge' as IconKey }
        ]
      },
      {
        title: 'Profile',
        items: [
          { href: `/profile`, icon: 'user' as IconKey },
          { href: `/profile/security`, icon: 'shield' as IconKey }
        ]
      },
      {
        title: 'Settings',
        items: [
          { href: `/settings`, icon: 'settings' as IconKey },
          { href: `/settings/notifications`, icon: 'bell-ring' as IconKey }
        ]
      }
    ]
  },
  { trigger: 'About', href: `/about` }
];

// 获取图标组件的辅助函数
export const getIconComponent = (iconName: IconKey) => iconMap[iconName] || iconMap.folder;

// NavSection 类型（SiteNavigation 使用）
export interface MenuItem {
  href: string;
  title: string;
  description: string;
  icon: IconKey;
}
export interface MenuGroup {
  title: string;
  items: MenuItem[];
}
export interface NavSection {
  trigger: string;
  href?: string;
  groups: MenuGroup[];
}

// 推断标题
const inferTitleFromHref = (href: string) => {
  try {
    const seg = href.split('?')[0].split('/').filter(Boolean).pop() || 'Item';
    return seg.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  } catch {
    return 'Item';
  }
};

// 从 i18n 构建 NavSection（静态优先，i18n覆盖）
export function getNavSections(locale: string = 'zh-CN'): NavSection[] {
  const messages = getMessages(locale);
  const translatedNav = messages?.navSections || [];
  const staticNav = staticNavigation;
  const base = '/';

  // 保持顺序严格按照 staticNavigation
  const navSections: NavSection[] = staticNav.map((s: any, si: number) => {
    const t = translatedNav[si];

    const trigger = t?.trigger || s?.trigger || '';
    if (!trigger) return { trigger: '', href: base, groups: [] };

    const href = s?.href;
    const sGroups = s?.groups || [];
    const tGroups = t?.groups || [];

    const groups: MenuGroup[] = tGroups.length
      ? tGroups.map((g: any, gi: number) => {
          const sg = sGroups[gi];
          const items = (g.items || []).map((it: any, ii: number) => {
            const siItem = sg?.items?.[ii];
            return {
              href: siItem?.href || base,
              title: it.title || inferTitleFromHref(siItem?.href || ''),
              description: it.description || '',
              icon: (siItem?.icon as IconKey) || ('star' as IconKey)
            };
          });
          return { title: g.title || 'Group', items };
        })
      : sGroups.map((sg: any) => {
          const items = (sg.items || []).map((siItem: any) => ({
            href: siItem.href || base,
            title: inferTitleFromHref(siItem.href || ''),
            description: '',
            icon: siItem.icon
          }));
          return { title: sg.title, items };
        });

    return { trigger, href, groups };
  });

  return navSections;
}
