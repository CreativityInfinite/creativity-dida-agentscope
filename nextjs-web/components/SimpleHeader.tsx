import { Logo, LogoImage, LogoText } from '@component/Logo';
import { defaultLogo } from '@constant/base.constant';
import { LangSwitcher } from '@component/LangSwitcher';
import { ThemeToggle } from '@component/ThemeToggle';

export function SimpleHeader({ locale, fixed = false }: { locale: string; fixed?: boolean }) {
  return (
    <div className={fixed ? 'fixed inset-x-0 top-0 z-50 backdrop-blur-md px-4 md:px-8 py-6' : 'absolute inset-x-0 top-0 z-20 px-4 md:px-8 py-6'}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Logo url={defaultLogo.url}>
            <LogoImage size={32} src={defaultLogo.src} alt={defaultLogo.alt} title={defaultLogo.title} className="h-10" />
            <LogoText className="text-md">{defaultLogo.title}</LogoText>
          </Logo>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangSwitcher locale={locale} />
        </div>
      </div>
    </div>
  );
}
