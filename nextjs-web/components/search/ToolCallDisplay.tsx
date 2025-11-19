'use client';

import React, { useState } from 'react';
import { Settings, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronRight, Cloud, MapPin, Hotel, Calendar, Thermometer, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ToolCall {
  id: string;
  name: string;
  arguments: string;
  output?: string;
  status?: 'pending' | 'completed' | 'error';
}

interface ToolCallDisplayProps {
  toolCall: ToolCall;
}

const getToolIcon = (toolName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    get_countries: MapPin,
    search_qweather_city_code: MapPin,
    get_destinations: MapPin,
    get_qweather_forecast: Thermometer,
    get_qweather_daily_forecast: Calendar,
    get_qweather_indices: Wind,
    get_hotel_list: Hotel,
    get_hotel_details: Hotel,
    get_lowest_price: Hotel,
    get_environment: Clock
  };

  return iconMap[toolName] || Settings;
};

const getToolDisplayName = (toolName: string) => {
  const nameMap: Record<string, string> = {
    get_countries: '获取国家信息',
    search_qweather_city_code: '搜索城市代码',
    get_destinations: '获取目的地信息',
    get_qweather_forecast: '获取实时天气',
    get_qweather_daily_forecast: '获取天气预报',
    get_qweather_indices: '获取生活指数',
    get_hotel_list: '搜索酒店列表',
    get_hotel_details: '获取酒店详情',
    get_lowest_price: '查询最低价格',
    get_environment: '获取环境信息'
  };

  return nameMap[toolName] || toolName;
};

const formatArguments = (args: string) => {
  try {
    const parsed = JSON.parse(args);
    return Object.entries(parsed).map(([key, value]) => (
      <div key={key} className="flex gap-2">
        <span className="font-medium text-muted-foreground">{key}:</span>
        <span className="font-mono text-sm">{JSON.stringify(value)}</span>
      </div>
    ));
  } catch {
    return <span className="font-mono text-sm">{args}</span>;
  }
};

const formatOutput = (output: string) => {
  try {
    const parsed = JSON.parse(output);
    if (Array.isArray(parsed) && parsed[0]?.type === 'text') {
      return (
        <div className="space-y-2">
          {parsed.map((item: any, index: number) => (
            <div key={index} className="text-sm">
              {item.text}
            </div>
          ))}
        </div>
      );
    }
    return <pre className="text-xs bg-muted/50 p-3 rounded-md overflow-x-auto whitespace-pre-wrap">{JSON.stringify(parsed, null, 2)}</pre>;
  } catch {
    return <div className="text-sm whitespace-pre-wrap">{output}</div>;
  }
};

export function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = getToolIcon(toolCall.name);

  const getStatusIcon = () => {
    switch (toolCall.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4 text-yellow-600 animate-pulse" />;
    }
  };

  const getStatusBadge = () => {
    switch (toolCall.status) {
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            完成
          </Badge>
        );
      case 'error':
        return <Badge variant="destructive">错误</Badge>;
      case 'pending':
      default:
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            执行中
          </Badge>
        );
    }
  };

  return (
    <div className="border border-border/50 rounded-md bg-muted/30 backdrop-blur-sm mb-2 inline-block align-top max-w-[min(100%,24rem)]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="justify-between px-3 py-2 h-auto hover:bg-muted/50 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-medium text-[11px] leading-4">{getToolDisplayName(toolCall.name)}</span>
                {getStatusBadge()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {toolCall.status === 'pending' && (
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                </div>
              )}
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-3 pb-3 space-y-2 border-t border-border/30 text-xs">
            {/* Arguments */}
            <div>
              <h4 className="text-[11px] font-medium mb-1 text-muted-foreground">调用参数</h4>
              <div className="bg-muted/50 p-2 rounded-md space-y-1">{formatArguments(toolCall.arguments)}</div>
            </div>

            {/* Output */}
            {toolCall.status === 'pending' && !toolCall.output && (
              <div>
                <h4 className="text-[11px] font-medium mb-1 text-muted-foreground">执行结果</h4>
                <div className="bg-background/50 p-2 rounded-md border border-border/30">
                  <div className="animate-pulse space-y-2">
                    <div className="h-2 bg-muted rounded w-11/12"></div>
                    <div className="h-2 bg-muted rounded w-10/12"></div>
                    <div className="h-2 bg-muted rounded w-8/12"></div>
                  </div>
                </div>
              </div>
            )}
            {toolCall.output && (
              <div>
                <h4 className="text-[11px] font-medium mb-1 text-muted-foreground">执行结果</h4>
                <div className="bg-background/50 p-2 rounded-md border border-border/30">{formatOutput(toolCall.output)}</div>
              </div>
            )}

            {/* Tool Call ID */}
            <div className="text-xs text-muted-foreground/70 font-mono">ID: {toolCall.id}</div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
