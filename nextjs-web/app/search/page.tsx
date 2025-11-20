'use client';

import * as React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Bot, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GradientBackground } from '@component/shared/GradientBackground';
import { SiteNavigation } from '@component/SiteNavigation';
import { ChatMessage } from '@/components/search/ChatMessage';
import { ToolCallDisplay } from '@/components/search/ToolCallDisplay';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

interface ToolCall {
  id: string;
  name: string;
  arguments: string;
  output?: string;
  status?: 'pending' | 'completed' | 'error';
}

interface SSEMessage {
  sequence_number: number;
  object: 'response' | 'message' | 'content';
  status: 'created' | 'in_progress' | 'completed';
  error: any;
  id: string;
  type?: 'plugin_call' | 'plugin_call_output' | 'message';
  role?: 'assistant';
  content?: any[];
  text?: string;
  delta?: boolean;
  msg_id?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const initialQuery = searchParams?.get('q') || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolCallsByMessage, setToolCallsByMessage] = useState<Record<string, ToolCall[]>>({});
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const assistantBufferRef = useRef<string>('');
  const pendingToolsByMessageRef = useRef<Record<string, number>>({});
  const responseCompletedRef = useRef<boolean>(false);

  // 打字机效果控制
  const typingTimerRef = useRef<number | null>(null);
  const typingIndexRef = useRef<number>(0);
  const typingMessageIdRef = useRef<string | null>(null);

  // 防止重复发送初始查询
  const hasProcessedInitialQueryRef = useRef<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
  }, [messages, toolCallsByMessage]);

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQueryRef.current) {
      hasProcessedInitialQueryRef.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (query?: string) => {
    const messageText = query || currentInput.trim();
    if (!messageText || isStreaming) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput('');
    setIsStreaming(true);
    setError(null);

    const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', timestamp: Date.now(), isStreaming: true };
    setMessages((prev) => [...prev, assistantMessage]);

    assistantBufferRef.current = '';
    responseCompletedRef.current = false;
    pendingToolsByMessageRef.current[assistantMessage.id] = 0;
    setToolCallsByMessage((prev) => ({ ...prev, [assistantMessage.id]: [] }));

    try {
      console.log('process.env --->', process.env.NEXT_PUBLIC_AGENTSCOPE_API_URL);
      abortControllerRef.current = new AbortController();
      const response = await fetch(process.env.NEXT_PUBLIC_AGENTSCOPE_API_URL || 'http://localhost:8090/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: [{ role: 'user', content: [{ type: 'text', text: messageText }] }] }),
        signal: abortControllerRef.current.signal
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No response body reader available');

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data: SSEMessage = JSON.parse(line.slice(6));
              await processSSEMessage(data, assistantMessage.id);
            } catch (e) {
              console.error('Error parsing SSE message:', e);
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error in SSE stream:', err);
        setError(err.message || '发生未知错误');
      }
    } finally {
      setIsStreaming(false);
      // 停止打字机效果
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      // 确保最终内容正确显示
      const finalContent = assistantBufferRef.current;
      setMessages((prev) => prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: finalContent, isStreaming: false } : msg)));
      abortControllerRef.current = null;
    }
  };

  const processSSEMessage = async (data: SSEMessage, messageId: string) => {
    const startTypewriter = () => {
      // 停止现有的打字机效果
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      // 重置打字机状态
      typingIndexRef.current = 0;
      typingMessageIdRef.current = messageId;

      const step = 2; // 每次输出字符数
      const intervalMs = 18; // 输出间隔

      typingTimerRef.current = window.setInterval(() => {
        const currentFullText = assistantBufferRef.current;
        
        // 如果已经显示完所有内容，停止打字机
        if (typingIndexRef.current >= currentFullText.length) {
          if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
          }
          return;
        }

        const nextIndex = Math.min(typingIndexRef.current + step, currentFullText.length);
        const displayContent = currentFullText.slice(0, nextIndex);

        // 直接设置完整内容，而不是追加
        setMessages((prev) => prev.map((msg) => 
          msg.id === messageId ? { ...msg, content: displayContent } : msg
        ));

        typingIndexRef.current = nextIndex;
      }, intervalMs);
    };

    const flushIfReady = () => {
      const pending = pendingToolsByMessageRef.current[messageId] || 0;
      if (responseCompletedRef.current && pending === 0) startTypewriter();
    };

    switch (data.object) {
      case 'message':
        if (data.type === 'plugin_call' && data.content?.[0]?.data) {
          const toolData = data.content[0].data;
          pendingToolsByMessageRef.current[messageId] = (pendingToolsByMessageRef.current[messageId] || 0) + 1;
          const newToolCall: ToolCall = { id: toolData.call_id, name: toolData.name, arguments: toolData.arguments, status: 'pending' };
          setToolCallsByMessage((prev) => ({ ...prev, [messageId]: [...(prev[messageId] || []), newToolCall] }));
        } else if (data.type === 'plugin_call_output' && data.content?.[0]?.data) {
          const outputData = data.content[0].data;
          setToolCallsByMessage((prev) => ({
            ...prev,
            [messageId]: (prev[messageId] || []).map((call) => (call.id === outputData.call_id ? { ...call, output: outputData.output, status: 'completed' } : call))
          }));
          const curr = pendingToolsByMessageRef.current[messageId] || 0;
          pendingToolsByMessageRef.current[messageId] = curr > 0 ? curr - 1 : 0;
          flushIfReady();
        }
        break;
      case 'content':
        if (data.text && data.delta) {
          assistantBufferRef.current += data.text;
          // 只在没有打字机运行时启动新的打字机
          if (!typingTimerRef.current) {
            startTypewriter();
          }
        }
        break;
      case 'response':
        if (data.status === 'completed') {
          responseCompletedRef.current = true;
          flushIfReady();
          setIsStreaming(false);
        }
        break;
    }
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsStreaming(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      <div className="relative z-10 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {messages.length === 0 && (
              <div className="text-center py-20">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">开始您的旅行规划</h2>
                <p className="text-muted-foreground">告诉我您想去哪里，我会为您提供天气、酒店、景点等全方位的旅行建议</p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'user' && <ChatMessage message={message} />}
                {message.role === 'assistant' && (
                  <div className="space-y-2">
                    {toolCallsByMessage[message.id]?.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-start">
                        {toolCallsByMessage[message.id].map((toolCall) => (
                          <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
                        ))}
                        {(pendingToolsByMessageRef.current[message.id] || 0) > 0 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            工具执行中...
                          </div>
                        )}
                      </div>
                    )}
                    <ChatMessage message={message} />
                  </div>
                )}
              </div>
            ))}

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="text-destructive">{error}</span>
                <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto">
                  ×
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 固定底部 */}
        <div className="shrink-0 fixed bottom-0 left-0 right-0 backdrop-filter backdrop-blur-sm z-20">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="请输入您的旅行需求..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) handleSendMessage();
                  }}
                  disabled={isStreaming}
                  className="pr-12"
                />
                {isStreaming && (
                  <Button variant="ghost" size="sm" onClick={stopStreaming} className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </Button>
                )}
              </div>
              <Button onClick={() => handleSendMessage()} disabled={!currentInput.trim() || isStreaming} size="icon">
                {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
