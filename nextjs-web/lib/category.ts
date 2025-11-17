import imageGenerationData from '@/src/data/tools/image-generation.json';
import textWritingData from '@/src/data/tools/text-writing.json';
import chatToolsData from '@/src/data/tools/chat-tools.json';
import codeAssistantData from '@/src/data/tools/code-assistant.json';
import voiceVideoData from '@/src/data/tools/voice-video.json';
import dataInsightsData from '@/src/data/tools/data-insights.json';
import automationData from '@/src/data/tools/automation.json';

import type { Tool } from '@/types/tool';
import type { PrimaryCategoryKey } from '@/src/constants/category.constant';

export const ROUTE_TO_PRIMARY: Record<string, PrimaryCategoryKey> = {
  'image-generation': 'ImageGeneration',
  'text-writing': 'TextWriting',
  'chat-tools': 'ChatTools',
  'code-assistant': 'CodeAssistant',
  'audio-voice': 'VoiceVideo',
  'voice-video': 'VoiceVideo',
  'data-insights': 'DataInsights',
  automation: 'Automation',
  writing: 'TextWriting'
};

export const DATA_BY_PRIMARY: Record<PrimaryCategoryKey, Tool[]> = {
  ImageGeneration: imageGenerationData as unknown as Tool[],
  TextWriting: textWritingData as unknown as Tool[],
  ChatTools: chatToolsData as unknown as Tool[],
  CodeAssistant: codeAssistantData as unknown as Tool[],
  VoiceVideo: voiceVideoData as unknown as Tool[],
  DataInsights: dataInsightsData as unknown as Tool[],
  Automation: automationData as unknown as Tool[],
  Others: []
};

export const getToolsByPrimaryCategory = (key: string): Tool[] => {
  const primary: PrimaryCategoryKey = ROUTE_TO_PRIMARY[key] || 'ImageGeneration';
  return DATA_BY_PRIMARY[primary] || [];
};
