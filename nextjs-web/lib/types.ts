export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage?: string;
  website: string;
  github?: string;
  tags: string[];
  platforms: string[];
  pricing: 'free' | 'freemium' | 'paid';
  rating: number;
  languages: string[];
  useCases: string[];
  features: string[];
  lastUpdated: string;
  isOpenSource: boolean;
  category: string;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface SceneEntry {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompt: string;
  tags: string[];
  color: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: Tool[];
}
