import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@component/shared/GradientBackground';
import Link from 'next/link';

export default function () {
  return (
    <section className="relative min-h-screen w-full overflow-hidden py-32 flex items-center">
      {/* 全局背景，与首页一致 */}
      <GradientBackground type="index" />
    </section>
  );
}
