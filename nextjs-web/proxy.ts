import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en'];
const DEFAULT_LOCALE = 'zh-CN';

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const lang = url.searchParams.get('lang');
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;

  // 如果 URL 上存在 ?lang 并且有效，则写入 NEXT_LOCALE cookie
  if (lang && SUPPORTED_LOCALES.includes(lang)) {
    const res = NextResponse.next();
    res.cookies.set('NEXT_LOCALE', lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  }

  // 如果没有 lang 参数，需要自动设置
  if (!lang) {
    // 确定要使用的语言
    let targetLocale = DEFAULT_LOCALE;

    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
      targetLocale = cookieLocale;
    }

    // 在 URL 中添加 lang 参数并重定向
    url.searchParams.set('lang', targetLocale);

    const res = NextResponse.redirect(url);
    res.cookies.set('NEXT_LOCALE', targetLocale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  }

  // 如果 lang 参数存在但无效，重定向到有效语言
  if (lang && !SUPPORTED_LOCALES.includes(lang)) {
    const targetLocale = cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
    url.searchParams.set('lang', targetLocale);

    const res = NextResponse.redirect(url);
    res.cookies.set('NEXT_LOCALE', targetLocale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // 匹配所有应用路径（不再依赖路径前缀），可按需调整排除静态资源
  matcher: ['/:path*']
};
