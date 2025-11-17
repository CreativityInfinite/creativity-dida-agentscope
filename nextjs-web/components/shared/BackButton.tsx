'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@component/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@component/lib/utils';

interface BackButtonProps {
  className?: string;
  label?: string;
}

export function BackButton({ className, label = '返回' }: BackButtonProps) {
  const router = useRouter();
  return (
    <div className={cn('pointer-events-auto', className)}>
      <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-1.5" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </Button>
    </div>
  );
}
