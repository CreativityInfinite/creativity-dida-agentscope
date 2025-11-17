import { Image, SquarePen, MessageCircleMore, Code, Mic, BarChart, Zap, Layers } from 'lucide-react';

// 一级分类键值
export const PRIMARY_CATEGORIES = ['ImageGeneration', 'TextWriting', 'ChatTools', 'CodeAssistant', 'VoiceVideo', 'DataInsights', 'Automation', 'Others'] as const;

export type PrimaryCategoryKey = (typeof PRIMARY_CATEGORIES)[number];

// 分类图标映射
export const CATEGORY_ICONS = {
  ImageGeneration: Image,
  TextWriting: SquarePen,
  ChatTools: MessageCircleMore,
  CodeAssistant: Code,
  VoiceVideo: Mic,
  DataInsights: BarChart,
  Automation: Zap,
  Others: Layers
} as const;

// 分类颜色映射
export const CATEGORY_COLORS = {
  ImageGeneration: '#1d4ed81a',
  TextWriting: '#9333ea1a',
  ChatTools: '#22d3ee1a',
  CodeAssistant: '#f59e0b1a',
  VoiceVideo: '#ef44441a',
  DataInsights: '#10b9811a',
  Automation: '#3b82f61a',
  Others: '#6b72801a'
} as const;

// 二级分类键值（使用英文 Key）
export const SUBCATEGORIES = {
  ImageGeneration: ['CommonImageTools', 'ImageIllustration', 'BackgroundRemoval', 'ObjectRemoval', 'ImageUpscaling', 'ImageEnhancement', 'ProductImages', 'Model3DGeneration'],
  TextWriting: ['LongFormWriting', 'WritingRewriting', 'GrammarCheck', 'NotesDocuments'],
  ChatTools: ['GeneralAssistant', 'OfficeAssistant', 'CharacterChat', 'Companion', 'GeneralChat'],
  CodeAssistant: ['CodeCompletion', 'AIEditor', 'IDEAssistant', 'TeamPrivacy', 'CloudAssistant'],
  VoiceVideo: ['TextToSpeech', 'TextBasedEditing', 'DigitalAvatar', 'AudioEnhancement', 'TextToVideo'],
  DataInsights: ['BusinessIntelligence', 'DataNotebook', 'DataAIPlatform'],
  Automation: ['WorkflowAutomation', 'MeetingNotes', 'TaskDocuments', 'DataAutomation'],
  Others: ['ComprehensivePlatform', 'SearchQA', 'InferenceAPI', 'UIGeneration']
} as const;

export type SubcategoryKey<T extends PrimaryCategoryKey> = (typeof SUBCATEGORIES)[T][number];

// 获取分类显示名称的函数（需要传入 messages 对象）
export function getCategoryDisplayName(key: PrimaryCategoryKey, messages: any): string {
  return messages?.labels?.primaryCategories?.[key] || key;
}

// 获取子分类显示名称的函数（需要传入 messages 对象）
export function getSubcategoryDisplayName<T extends PrimaryCategoryKey>(primaryKey: T, subcategoryKey: SubcategoryKey<T>, messages: any): string {
  return messages?.labels?.subcategories?.[primaryKey]?.[subcategoryKey] || subcategoryKey;
}
