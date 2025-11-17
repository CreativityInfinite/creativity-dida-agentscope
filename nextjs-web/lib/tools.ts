import imageGenerationData from '@/src/data/tools/image-generation.json';
import textWritingData from '@/src/data/tools/text-writing.json';
import chatToolsData from '@/src/data/tools/chat-tools.json';
import codeAssistantData from '@/src/data/tools/code-assistant.json';
import voiceVideoData from '@/src/data/tools/voice-video.json';
import dataInsightsData from '@/src/data/tools/data-insights.json';
import automationData from '@/src/data/tools/automation.json';

import type { Tool } from '@/types/tool';

export const ALL_TOOLS: Tool[] = [
  ...(imageGenerationData as unknown as Tool[]),
  ...(textWritingData as unknown as Tool[]),
  ...(chatToolsData as unknown as Tool[]),
  ...(codeAssistantData as unknown as Tool[]),
  ...(voiceVideoData as unknown as Tool[]),
  ...(dataInsightsData as unknown as Tool[]),
  ...(automationData as unknown as Tool[])
];
