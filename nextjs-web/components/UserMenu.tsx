'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useSession, signOut } from 'next-auth/react';
import { getMessages } from '@i18n/index';

export function UserMenu({ locale }: { locale: string }) {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const displayName = session?.user?.name || session?.user?.email || 'User';
  const avatar = (session?.user as any)?.picture || '/avatars/default.png';
  const messages = getMessages(locale);
  const userMenuMsgs: Record<string, string> = messages?.userMenu || {};

  const tran = (key: string) => {
    const raw = userMenuMsgs[key] ?? '';
    return key === 'signedInAs' ? raw.replace('{name}', displayName) : raw;
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Link href={`/auth/signin`} className="sm:hidden">
            <Button size="sm">{tran('signIn')}</Button>
          </Link>
          <Link href={`/auth/signin`} className="hidden sm:block">
            <Button size="sm">{tran('signIn')}</Button>
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatar} alt={displayName} />
                <AvatarFallback>{(displayName || 'U').slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur rounded-md border border-border/50 shadow-md">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">{tran('signedInAs')}</div>
            <DropdownMenuItem asChild>
              <Link href={`/profile`}>{tran('profile')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/settings`}>{tran('settings')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/account/activity`}>{tran('activity')}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>{tran('signOut')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
