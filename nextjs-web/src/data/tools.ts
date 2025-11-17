import imageGenerationData from '@data/tools/image-generation.json';
import textWritingData from '@data/tools/text-writing.json';
import chatToolsData from '@data/tools/chat-tools.json';
import codeAssistantData from '@data/tools/code-assistant.json';
import voiceVideoData from '@data/tools/voice-video.json';
import dataInsightsData from '@data/tools/data-insights.json';
import automationData from '@data/tools/automation.json';
import othersData from '@data/tools/others.json';

export const toolsData = [...imageGenerationData, ...textWritingData, ...chatToolsData, ...codeAssistantData, ...voiceVideoData, ...dataInsightsData, ...automationData, ...othersData];
