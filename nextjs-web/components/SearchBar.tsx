'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@component/lib/utils';
import { motion } from 'framer-motion';

const searchSuggestions = ['生成产品海报的 AI', '视频剪辑工具', '代码自动补全', '语音转文字', '图片背景移除', 'PPT 自动生成'];

export function SearchBar({ placeholder, compact = false, showButton = true }: { placeholder: string; compact?: boolean; showButton?: boolean }) {
  const router = useRouter();
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const submit = (q: string) => {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setShowSuggestions(false);
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setShowSuggestions(v.length > 0);
    setSelectedIndex(-1); // 重置选中索引
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {}, 300);
  };

  const filteredSuggestions = searchSuggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 4);

  // 构建所有可选项列表（包括当前输入值）
  const allSuggestions = React.useMemo(() => {
    const suggestions = [];
    if (value.trim()) {
      suggestions.push({ type: 'search', text: value.trim() });
    }
    filteredSuggestions.forEach((suggestion) => {
      suggestions.push({ type: 'suggestion', text: suggestion });
    });
    return suggestions;
  }, [value, filteredSuggestions]);

  // 键盘导航处理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || allSuggestions.length === 0) {
      if (e.key === 'Enter') {
        submit(value);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < allSuggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allSuggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < allSuggestions.length) {
          submit(allSuggestions[selectedIndex].text);
        } else {
          submit(value);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className={compact ? 'flex items-center gap-2' : 'flex w-full max-w-3xl items-center gap-3'}>
      <div className="relative flex-1">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.length > 0) setShowSuggestions(true);
            setFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
              setSelectedIndex(-1);
            }, 200);
            setTimeout(() => setFocused(false), 150);
          }}
          className="pl-10 sm:pl-12 pr-12 sm:pr-14 lg:pr-16 h-12 sm:h-14 lg:h-16 text-base sm:text-lg rounded-lg sm:rounded-xl bg-background/80 backdrop-blur border border-border/50 focus:ring-2 focus:ring-ring focus:border-ring/50 transition-all"
        />
        <motion.div
          className="absolute right-3 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2"
          animate={focused ? { rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, repeat: focused ? Infinity : 0, ease: 'easeInOut' }}
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.55)]" />
        </motion.div>
        {loading && <Loader2 className="absolute right-3 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />}

        {/* 搜索建议 */}
        {showSuggestions && allSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-tr from-[rgba(34,211,238,0.02)] to-[rgba(34,211,238,0.06)] backdrop-blur border border-border/50 rounded-lg sm:rounded-xl shadow-lg overflow-hidden z-10">
            {allSuggestions.map((item, index) => (
              <div
                key={`${item.type}-${index}`}
                className={cn(
                  'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors text-sm sm:text-base',
                  selectedIndex === index ? 'bg-muted/70 text-foreground' : 'hover:bg-muted/50'
                )}
                onClick={() => submit(item.text)}
              >
                {item.type === 'search' ? (
                  <>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm">
                      搜索 &ldquo;<span className="font-medium">{item.text}</span>&rdquo;
                    </span>
                  </>
                ) : (
                  <>
                    <Search className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-muted-foreground">猜你想搜</span>
                    <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showButton && (
        <Button onClick={() => submit(value)} className="h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl">
          <Search className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden xs:inline">搜索</span>
          <span className="xs:hidden">搜</span>
        </Button>
      )}
    </div>
  );
}
