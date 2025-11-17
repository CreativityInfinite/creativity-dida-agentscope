import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import en from './locales/en.json';

type LocaleKey = 'zh-CN' | 'zh-TW' | 'en';
type Messages = typeof zhCN;

const map: Record<LocaleKey, Messages> = {
  'zh-CN': zhCN as Messages,
  'zh-TW': zhTW as Messages,
  en: en as Messages
};

export function getMessages(locale: string): Messages {
  const msg = map[locale as LocaleKey] ?? map['zh-CN'];
  const year = new Date().getFullYear().toString();
  const footer = (msg.footerCopyright as string)?.replace('YEAR', year);
  return { ...msg, footer } as Messages;
}
