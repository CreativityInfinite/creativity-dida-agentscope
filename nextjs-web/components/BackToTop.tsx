'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getScrollY = () => {
      if (typeof window === 'undefined') return 0;
      const a = window.scrollY || 0;
      const b = (document.scrollingElement && document.scrollingElement.scrollTop) || 0;
      const c = (document.documentElement && document.documentElement.scrollTop) || 0;
      const d = (document.body && document.body.scrollTop) || 0;
      return Math.max(a, b, c, d);
    };

    const getViewportH = () => {
      if (typeof window === 'undefined') return 0;
      return window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || 0;
    };

    const toggleVisibility = () => {
      // 更早显示：超过阈值（视口高度的 1/3 或至少 200px；兼容不同滚动根）
      const y = getScrollY();
      const vh = getViewportH();
      const threshold = Math.max(200, Math.floor(vh * 0.33));
      setIsVisible(y > threshold);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // 初始判断一次，避免首次未监听时不显示
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility as any);
  }, []);

  const scrollToTop = () => {
    // 通知 ScrollTrigger 进入程序化滚动阶段，防止误触发向下自动滚动
    window.dispatchEvent(new CustomEvent('backToTop:start'));

    const scroller: any = (document.scrollingElement as any) || window;

    if (typeof scroller.scrollTo === 'function') {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const getScrollY = () => {
      const a = window.scrollY || 0;
      const b = (document.scrollingElement && document.scrollingElement.scrollTop) || 0;
      const c = (document.documentElement && document.documentElement.scrollTop) || 0;
      const d = (document.body && document.body.scrollTop) || 0;
      return Math.max(a, b, c, d);
    };

    // 监听滚动直到到达顶部后结束抑制；同时设置超时兜底
    const watcher = () => {
      if (getScrollY() === 0) {
        window.dispatchEvent(new CustomEvent('backToTop:end'));
        window.removeEventListener('scroll', watcher);
      }
    };
    window.addEventListener('scroll', watcher, { passive: true });

    // 兜底计时器，避免因浏览器特殊情况未触发到 0
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('backToTop:end'));
      window.removeEventListener('scroll', watcher);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ y: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' } }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full border border-border/50 bg-[rgba(34,211,238,0.06)] backdrop-blur text-foreground shadow-md hover:shadow-lg"
            aria-label="回到顶部"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
