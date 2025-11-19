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
  SquarePen,
  Code,
  Mic,
  MessageCircleMore,
  ThumbsUp,
  Gauge,
  Home,
  Server,
  Boxes,
  MapPin,
  Plane,
  Hotel,
  Car,
  Ship,
  Mountain,
  Palmtree,
  Compass,
  Globe,
  Briefcase,
  Heart,
  Users,
  CreditCard,
  Umbrella,
  FileText as PassportIcon,
  Luggage,
  Camera as CameraIcon,
  Utensils,
  Coffee,
  Sparkles,
  Crown,
  Building,
  Waves,
  TreePine,
  Sun,
  Snowflake,
  Gift,
  PartyPopper
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
  boxes: Boxes,
  // 旅游相关图标
  'map-pin': MapPin,
  plane: Plane,
  hotel: Hotel,
  car: Car,
  ship: Ship,
  mountain: Mountain,
  palmtree: Palmtree,
  compass: Compass,
  globe: Globe,
  briefcase: Briefcase,
  heart: Heart,
  users: Users,
  'credit-card': CreditCard,
  umbrella: Umbrella,
  passport: PassportIcon,
  luggage: Luggage,
  'camera-icon': CameraIcon,
  utensils: Utensils,
  coffee: Coffee,
  sparkles: Sparkles,
  crown: Crown,
  building: Building,
  waves: Waves,
  'tree-pine': TreePine,
  sun: Sun,
  snowflake: Snowflake,
  gift: Gift,
  'party-popper': PartyPopper
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
          { href: `/categories/domestic-travel`, icon: 'map-pin' as IconKey },
          { href: `/categories/outbound-travel`, icon: 'globe' as IconKey },
          { href: `/categories/hotels`, icon: 'hotel' as IconKey },
          { href: `/categories/flights`, icon: 'plane' as IconKey },
          { href: `/categories/local-experiences`, icon: 'camera' as IconKey },
          { href: `/categories/cruise-travel`, icon: 'ship' as IconKey },
          { href: `/categories/custom-travel`, icon: 'heart' as IconKey }
        ]
      },
      {
        title: 'Trending',
        items: [
          { href: `/trending/now`, icon: 'trending-up' as IconKey },
          { href: `/trending/top-rated`, icon: 'trophy' as IconKey },
          { href: `/trending/rising`, icon: 'sparkles' as IconKey },
          { href: `/trending/most-searched`, icon: 'search' as IconKey }
        ]
      },
      {
        title: 'Featured',
        items: [
          { href: `/featured/editors-picks`, icon: 'bookmark' as IconKey },
          { href: `/featured/new-launches`, icon: 'compass' as IconKey },
          { href: `/featured/community-favorites`, icon: 'thumbs-up' as IconKey },
          { href: `/featured/weekly-highlights`, icon: 'gift' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Services',
    groups: [
      {
        title: 'Travel Services',
        items: [
          { href: `/services/visa`, icon: 'passport' as IconKey },
          { href: `/services/insurance`, icon: 'umbrella' as IconKey },
          { href: `/services/car-rental`, icon: 'car' as IconKey },
          { href: `/services/transfers`, icon: 'luggage' as IconKey },
          { href: `/services/guides`, icon: 'users' as IconKey },
          { href: `/services/concierge`, icon: 'crown' as IconKey }
        ]
      },
      {
        title: 'Business Solutions',
        items: [
          { href: `/services/corporate`, icon: 'briefcase' as IconKey },
          { href: `/services/groups`, icon: 'users' as IconKey },
          { href: `/services/events`, icon: 'calendar' as IconKey }
        ]
      },
      {
        title: 'Support',
        items: [
          { href: `/services/help`, icon: 'book-open' as IconKey },
          { href: `/services/contact`, icon: 'message-circle' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Blog',
    groups: [
      {
        title: 'Travel Guides',
        items: [
          { href: `/blog/articles`, icon: 'map-pin' as IconKey },
          { href: `/blog/tutorials`, icon: 'book-open' as IconKey },
          { href: `/blog/guides`, icon: 'book-open' as IconKey },
          { href: `/blog/case-studies`, icon: 'book-open' as IconKey }
        ]
      },
      {
        title: 'Experiences',
        items: [
          { href: `/blog/changelog`, icon: 'book' as IconKey },
          { href: `/blog/updates`, icon: 'star' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'News',
    groups: [
      {
        title: 'Travel Trends',
        items: [
          { href: `/news/trends`, icon: 'bar-chart' as IconKey },
          { href: `/news/releases`, icon: 'line-chart' as IconKey },
          { href: `/news/opinion`, icon: 'line-chart' as IconKey }
        ]
      },
      {
        title: 'Industry News',
        items: [
          { href: `/news/events`, icon: 'newspaper' as IconKey },
          { href: `/news/webinars`, icon: 'bell' as IconKey },
          { href: `/news/changelog`, icon: 'bell' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'Community',
    groups: [
      {
        title: 'Discussion',
        items: [
          { href: `/discussion/general`, icon: 'message-circle' as IconKey },
          { href: `/discussion/tools`, icon: 'message-square' as IconKey },
          { href: `/discussion/showcase`, icon: 'message-square' as IconKey },
          { href: `/discussion/feedback`, icon: 'message-square' as IconKey }
        ]
      },
      {
        title: 'Sharing',
        items: [
          { href: `/discussion/tutorials`, icon: 'thumbs-up' as IconKey },
          { href: `/discussion/resources`, icon: 'camera-icon' as IconKey }
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
          { href: `/account/activity`, icon: 'calendar' as IconKey }
        ]
      },
      {
        title: 'Profile',
        items: [
          { href: `/profile`, icon: 'user' as IconKey },
          { href: `/profile/security`, icon: 'heart' as IconKey }
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
