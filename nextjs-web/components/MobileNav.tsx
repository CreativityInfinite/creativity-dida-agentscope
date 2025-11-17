'use client';

import * as React from 'react';
import Link from 'next/link';
import { UserMenu } from './UserMenu';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Menu, ChevronDown, X } from 'lucide-react';
import { Logo, LogoImage, LogoText } from './Logo';
import { defaultLogo } from '@constant/base.constant';
import { getIconComponent, getNavSections, type IconKey } from '@constant/navigation.constant';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';
import { GradientBackground } from './shared/GradientBackground';
import { cn } from '@component/lib/utils';

interface MobileNavProps {
  locale: string;
}

export function MobileNav({ locale }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const [openSections, setOpenSections] = React.useState<string[]>([]);
  const pathname = usePathname();

  // 直接使用 Nav 常量提供的合并结果
  const navSections = getNavSections(locale);

  const toggleSection = (sectionName: string) => {
    setOpenSections((prev) => (prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName]));
  };

  // 移动端直接使用 items 提供的 icon
  const getItemIcon = (icon: IconKey) => getIconComponent(icon);

  const isCurrentPage = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <div className="md:hidden relative">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">打开菜单</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-0 border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" showClose={false}>
          <SheetTitle className="sr-only">导航菜单</SheetTitle>
          {/* 添加渐变背景 */}
          <GradientBackground type="other" className="opacity-60" />
          <div className="flex h-full flex-col relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <Link href="/" onClick={() => setOpen(false)}>
                <Logo url={defaultLogo.url}>
                  <LogoImage size={32} src={defaultLogo.src} alt={defaultLogo.alt} title={defaultLogo.title} className="h-8" />
                  <LogoText className="text-sm ml-2">{defaultLogo.title}</LogoText>
                </Logo>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 overflow-auto">
              <div className="space-y-2 p-4 pb-6">
                {navSections.map((section) => (
                  <div key={section.trigger}>
                    {section.href ? (
                      // 直接链接项
                      <Link
                        href={section.href}
                        onClick={() => setOpen(false)}
                        className={cn('flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors', isCurrentPage(section.href) ? 'text-primary' : 'hover:bg-accent/50')}
                      >
                        {section.trigger}
                      </Link>
                    ) : (
                      // 可折叠的分组
                      <Collapsible open={openSections.includes(section.trigger)} onOpenChange={() => toggleSection(section.trigger)}>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="w-full justify-between px-3 py-2.5 text-sm font-medium hover:bg-accent/50">
                            <div className="flex items-center gap-3">{section.trigger}</div>
                            <ChevronDown className={cn('h-4 w-4 transition-transform', openSections.includes(section.trigger) && 'rotate-180')} />
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-1">
                          {section.groups?.map((group) => (
                            <div key={group.title} className="ml-6 space-y-1">
                              <h4 className="px-3 py-1 text-xs font-medium text-muted-foreground/80 uppercase tracking-wider">{group.title}</h4>
                              {group.items?.map((item) => {
                                const ItemIcon = getItemIcon(item.icon as IconKey);
                                return (
                                  <Link
                                    key={item.title}
                                    href={item.href || '/'}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      'flex items-center gap-3 px-3 py-2 text-xs rounded-md transition-colors',
                                      isCurrentPage(item.href || '/') ? 'text-primary font-medium' : 'hover:bg-accent/50'
                                    )}
                                  >
                                    <ItemIcon className="h-3.5 w-3.5" />
                                    {item.title}
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LangSwitcher locale={locale} />
                </div>
                <UserMenu locale={locale} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
