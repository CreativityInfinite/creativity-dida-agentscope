import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { cn } from '@component/lib/utils';
import { ThemeProvider } from '@component/ThemeProvider';
import ClientSessionProvider from '@component/ClientSessionProvider';

import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Creativity Hunt',
  description: 'AI 工具导航'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh-CN';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ClientSessionProvider>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
