'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@component/lib/utils';
import { Link, Copy, Check, WrapText, Maximize2, Minimize2, List } from 'lucide-react';
import { getLanguageIcon, getLanguageDisplayName } from '@/src/constants/code.constant';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@component/shared/GradientBackground';

interface MarkdownProps {
  children: string;
  className?: string;
}

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

interface MarkdownTocProps {
  markdown: string;
  className?: string;
}

// Tailwind 缩进映射，避免动态类名被裁剪
const tocIndentClass = (level: number) => {
  switch (level) {
    case 1:
    default:
      return 'ml-0';
    case 2:
      return 'ml-3';
    case 3:
      return 'ml-6';
    case 4:
      return 'ml-9';
    case 5:
      return 'ml-12';
    case 6:
      return 'ml-12';
  }
};

// 目录大纲组件
export function MarkdownToc({ markdown, className }: MarkdownTocProps) {
  // 生成锚点ID的函数
  const slugify = (text: string) =>
    String(text)
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const toc = React.useMemo(() => {
    const lines = markdown.split('\n').filter((l) => /^#{1,6}\s+/.test(l));
    return lines.map((l) => {
      const level = (l.match(/^#{1,6}/) as RegExpMatchArray)[0].length;
      const text = l.replace(/^#{1,6}\s+/, '').trim();
      const slug = slugify(text);
      return { level, text, slug };
    });
  }, [markdown, slugify]);

  // 移动端展开控制与外部点击关闭
  const [open, setOpen] = React.useState(false);
  const tocContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tocContainerRef.current && !tocContainerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (toc.length === 0) return null;

  return (
    <div ref={tocContainerRef} className={cn('absolute top-2 left-0 group z-10', className)}>
      <div
        className="flex items-center rounded-md justify-center w-8 h-8 bg-background/80 border border-border/40 cursor-pointer hover:bg-background transition-colors shadow-lg"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label="展开/收起目录"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <List className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
      </div>

      {/* 悬浮显示的大纲内容 - 移动端适配 */}
      <div
        className={cn(
          'absolute top-0 left-10 w-56 sm:w-64 transition-all duration-200 z-20',
          open ? 'opacity-100 visible' : 'opacity-0 invisible',
          // 桌面端使用 hover 展示
          'md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible'
        )}
      >
        <div className="relative rounded-lg border border-border/40 backdrop-blur-sm p-3 shadow-lg overflow-hidden">
          <GradientBackground type="index" />
          <div className="relative z-10">
            <div className="text-xs text-muted-foreground mb-2 font-medium">内容大纲</div>
            <ul className="space-y-1 text-sm max-h-48 sm:max-h-64 overflow-y-auto">
              {toc.map((i: TocItem) => (
                <li key={i.slug} className={tocIndentClass(i.level)}>
                  <a className="hover:underline hover:text-primary transition-colors block py-0.5 text-xs sm:text-sm" href={`#${i.slug}`} onClick={() => setOpen(false)}>
                    {i.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 增强的代码块组件
const EnhancedCodeBlock = ({ language, children, isDark }: { language: string; children: string; isDark: boolean }) => {
  const [copied, setCopied] = React.useState(false);
  const [wordWrap, setWordWrap] = React.useState(true); // 默认启用换行
  const [isExpanded, setIsExpanded] = React.useState(false);

  const codeString = String(children).replace(/\n$/, '');
  const lineCount = codeString.split('\n').length;
  const isLongCode = lineCount > 10;

  // 复制功能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group mb-4 rounded-lg border-2 border-border/30 dark:border-border/10 bg-slate-50/80 dark:bg-muted/10 overflow-hidden">
      {/* 代码块头部 */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100/60 dark:bg-muted/5 border-b border-border/30 dark:border-b-border/10">
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-xs font-medium text-slate-600 dark:text-muted-foreground bg-slate-200/60 dark:bg-muted/20 px-2 py-1 rounded flex items-center gap-1.5">
              {getLanguageIcon(language)}
              {getLanguageDisplayName(language)}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {lineCount} {lineCount === 1 ? '行' : '行'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* 换行切换 */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            onClick={() => setWordWrap(!wordWrap)}
            title={wordWrap ? '取消换行' : '启用换行'}
          >
            <WrapText className={`h-3 w-3 ${wordWrap ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>

          {/* 展开/收起 */}
          {isLongCode && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? '收起代码' : '展开代码'}
            >
              {isExpanded ? <Minimize2 className="h-3 w-3 text-muted-foreground" /> : <Maximize2 className="h-3 w-3 text-muted-foreground" />}
            </Button>
          )}

          {/* 复制按钮 */}
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" onClick={handleCopy} title="复制代码">
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
          </Button>
        </div>
      </div>

      {/* 代码内容 */}
      <div className={`relative ${isLongCode && !isExpanded ? 'max-h-80 overflow-hidden' : ''}`}>
        <SyntaxHighlighter
          style={isDark ? oneDark : oneLight}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '16px',
            fontSize: '13px',
            lineHeight: '1.5',
            background: isDark ? 'transparent' : '#f8fafc',
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
            wordBreak: wordWrap ? 'break-word' : 'normal',
            overflowWrap: wordWrap ? 'break-word' : 'normal',
            borderRadius: '0'
          }}
          codeTagProps={{
            style: {
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: wordWrap ? 'break-word' : 'normal'
            }
          }}
          showLineNumbers={lineCount > 5}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: isDark ? '#6b7280' : '#64748b',
            fontSize: '12px',
            backgroundColor: isDark ? 'transparent' : '#e2e8f0',
            borderRight: isDark ? 'none' : '1px solid #cbd5e1'
          }}
        >
          {codeString}
        </SyntaxHighlighter>

        {/* 展开渐变遮罩 */}
        {isLongCode && !isExpanded && <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 dark:from-muted/30 to-transparent pointer-events-none" />}
      </div>

      {/* 展开按钮 */}
      {isLongCode && !isExpanded && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <Button variant="outline" size="sm" className="h-6 text-xs bg-white dark:bg-background/95 backdrop-blur-sm border-slate-300 dark:border-border/30" onClick={() => setIsExpanded(true)}>
            展开完整代码 ({lineCount} 行)
          </Button>
        </div>
      )}
    </div>
  );
};

export function Markdown({ children, className }: MarkdownProps) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // 客户端检测暗色模式
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // 监听主题变化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // 生成锚点ID的函数
  const slugify = (text: string) =>
    String(text)
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

  // 获取文本内容的函数
  const getNodeText = (node: React.ReactNode): string => {
    if (node === null || node === undefined || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join('');
    if (React.isValidElement(node)) return getNodeText((node as any).props?.children);
    return '';
  };

  // 创建带锚点的标题组件
  const createHeadingComponent = (level: number, className: string) => {
    return ({ children, ...props }: any) => {
      const text = getNodeText(children);
      const id = slugify(text);
      const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

      return React.createElement(
        HeadingTag,
        {
          id,
          className: `group relative ${className}`,
          ...props
        },
        <>
          <a
            href={`#${id}`}
            className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-5 h-full"
            aria-label={`Link to ${text}`}
          >
            <Link className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </a>
          {children}
        </>
      );
    };
  };

  // 自定义 ReactMarkdown 组件配置
  const markdownComponents = {
    h1: createHeadingComponent(1, 'text-xl font-bold text-foreground mt-6 mb-3 first:mt-0 scroll-mt-20'),
    h2: createHeadingComponent(2, 'text-lg font-semibold text-foreground mt-5 mb-2 scroll-mt-20'),
    h3: createHeadingComponent(3, 'text-base font-semibold text-foreground mt-4 mb-2 scroll-mt-20'),
    h4: createHeadingComponent(4, 'text-sm font-medium text-foreground mt-3 mb-1 scroll-mt-20'),
    h5: createHeadingComponent(5, 'text-sm font-medium text-foreground mt-3 mb-1 scroll-mt-20'),
    h6: createHeadingComponent(6, 'text-xs font-medium text-foreground mt-2 mb-1 scroll-mt-20'),
    p: ({ children, ...props }: any) => (
      <p className="text-sm text-foreground mb-3 leading-6" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-inside mb-3 space-y-1 ml-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside mb-3 space-y-1 ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-sm text-foreground leading-6" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-3 border-primary/30 pl-3 italic text-muted-foreground mb-3 bg-muted/30 py-2 rounded-r-md" {...props}>
        {children}
      </blockquote>
    ),
    a: ({ children, ...props }: any) => (
      <a className="text-primary underline hover:text-primary/80 text-sm" {...props}>
        {children}
      </a>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-foreground" {...props}>
        {children}
      </em>
    ),
    hr: ({ ...props }: any) => <hr className="border-border my-6" {...props} />,
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-border rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-border px-3 py-2 bg-muted font-semibold text-left text-sm" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-border px-3 py-2 text-sm" {...props}>
        {children}
      </td>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';

      // 如果是行内代码或没有语言标识，使用简单样式
      if (inline || !language) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground" {...props}>
            {children || ''}
          </code>
        );
      }

      // 使用增强的代码块组件
      return (
        <EnhancedCodeBlock language={language} isDark={isDark}>
          {children || ''}
        </EnhancedCodeBlock>
      );
    },
    pre: ({ children, ...props }: any) => (
      <pre className=" rounded-lg overflow-x-auto mb-3 text-sm border border-border/10" {...props}>
        {children || ''}
      </pre>
    )
  };

  return (
    <div className={cn('text-foreground max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
