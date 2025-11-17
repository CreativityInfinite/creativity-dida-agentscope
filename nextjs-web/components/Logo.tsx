'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@component/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  className?: string;
  children: React.ReactNode;
}

interface LogoImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  size?: number;
}

interface LogoTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Logo = ({ url = '/', className, children, ...props }: LogoProps) => {
  const router = useRouter();
  const clickable = !!url;

  return (
    <div
      role={clickable ? 'link' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => router.push(url) : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter') router.push(url);
            }
          : undefined
      }
      className={cn('inline-flex items-center gap-2', clickable ? 'cursor-pointer' : '', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const LogoImage = ({ src, alt, className, size = 32, ...props }: LogoImageProps) => <Image src={src} alt={alt} width={size} height={size} className={cn('inline-block', className)} {...props} />;

const LogoImageMobile = ({ src, alt, className, size = 32, ...props }: LogoImageProps) => (
  <Image src={src} alt={alt} width={size} height={size} className={cn('inline-block md:hidden', className)} {...props} />
);

const LogoImageDesktop = ({ src, alt, className, size = 32, ...props }: LogoImageProps) => (
  <Image src={src} alt={alt} width={size} height={size} className={cn('hidden md:inline-block', className)} {...props} />
);

const LogoText = ({ children, className, ...props }: LogoTextProps) => (
  <span className={cn('text-lg font-semibold tracking-tighter', className)} {...props}>
    {children}
  </span>
);

const LogoTextMobile = ({ children, className, ...props }: LogoTextProps) => (
  <span className={cn('text-lg font-semibold tracking-tighter md:hidden', className)} {...props}>
    {children}
  </span>
);

const LogoTextDesktop = ({ children, className, ...props }: LogoTextProps) => (
  <span className={cn('hidden text-lg font-semibold tracking-tighter md:flex', className)} {...props}>
    {children}
  </span>
);

export { Logo, LogoImage, LogoImageDesktop, LogoImageMobile, LogoText, LogoTextDesktop, LogoTextMobile };
