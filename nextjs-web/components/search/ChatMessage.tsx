'use client';

import React from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" className="rounded-md" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={cn('bg-muted px-1 py-0.5 rounded text-sm', className)} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className={cn('group flex gap-3 mb-6 animate-in fade-in-50 slide-in-from-bottom-2', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div className={cn('flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', isUser ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border')}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 min-w-0', isUser ? 'text-right' : 'text-left')}>
        <div className={cn('inline-block max-w-[85%] rounded-2xl px-4 py-3 relative', isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted border border-border')}>
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-xs max-w-none dark:prose-invert text-sm">
              {message.content ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: CodeBlock,
                    h1: ({ children }) => <h1 className="text-base font-bold mb-1">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-sm font-bold mb-1">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xs font-bold mb-1">{children}</h3>,
                    p: ({ children }) => <p className="mb-1 last:mb-0 text-sm">{children}</p>,
                    ul: ({ children }) => <ul className="mb-1 pl-3 text-sm">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-1 pl-3 text-sm">{children}</ol>,
                    li: ({ children }) => <li className="mb-0.5 text-sm">{children}</li>,
                    blockquote: ({ children }) => <blockquote className="border-l-2 border-muted-foreground/20 pl-2 italic text-sm">{children}</blockquote>,
                    table: ({ children }) => (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-border text-xs">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => <th className="border border-border px-1 py-0.5 bg-muted font-semibold text-left">{children}</th>,
                    td: ({ children }) => <td className="border border-border px-1 py-0.5">{children}</td>
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : message.isStreaming ? (
                <div className="flex items-center gap-1">
                  <div className="flex space-x-0.5">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">AI正在思考...</span>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">暂无回复</p>
              )}
            </div>
          )}

          {/* Copy Button */}
          {!isUser && message.content && (
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          )}
        </div>

        {/* Timestamp */}
        <div className={cn('text-xs text-muted-foreground mt-1', isUser ? 'text-right' : 'text-left')}>
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
