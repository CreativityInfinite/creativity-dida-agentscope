import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@component/shared/GradientBackground';
import Link from 'next/link';

export default function () {
  return (
    <section className="relative min-h-screen w-full overflow-hidden py-32 flex items-center">
      {/* 全局背景，与首页一致 */}
      <GradientBackground type="index" />

      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="from-primary/60 via-primary to-primary/60 mx-auto max-w-4xl bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold text-transparent lg:text-6xl">
          This page is under construction
        </h1>
        <p className="mt-4 text-center text-lg lg:mt-10">We're building this page. Please check back soon.</p>
        <div className="relative z-10 mt-8 flex justify-center lg:mt-16">
          <Button asChild size="lg">
            <Link href="/" className="inline-flex items-center gap-2">
              Back to Home
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
