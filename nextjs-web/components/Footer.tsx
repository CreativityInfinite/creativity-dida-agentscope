import { Logo, LogoImage, LogoText } from '@component/Logo';
import { defaultLogo, getFooterContent } from '@constant/base.constant';

type LinkItem = { text: string; url: string };
type MenuSection = { title: string; links: LinkItem[] };

interface FooterProps {
  locale?: string;
  logo?: { src: string; alt: string; title: string; url: string };
  tagline?: string;
  menuItems?: MenuSection[];
  copyright?: string;
  bottomLinks?: LinkItem[];
}

const Footer = ({ locale = 'zh-CN', logo = defaultLogo, tagline, menuItems, copyright, bottomLinks }: FooterProps) => {
  const content = getFooterContent(locale);
  const finalLogo = logo || content.logo;
  const finalTagline = typeof tagline === 'string' ? tagline : content.tagline;
  const finalMenuItems: MenuSection[] = Array.isArray(menuItems) ? menuItems : content.menuItems || [];
  const finalCopyright = typeof copyright === 'string' ? copyright : content.copyright;
  const finalBottomLinks: LinkItem[] = Array.isArray(bottomLinks) ? bottomLinks : content.bottomLinks || [];
  return (
    <section className="py-0">
      <div className="container max-w-7xl mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={finalLogo.url}>
                  <LogoImage src={finalLogo.src} alt={finalLogo.alt} title={finalLogo.title} className="h-10" />
                  <LogoText className="text-xl">{finalLogo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 font-bold leading-snug">{finalTagline}</p>
            </div>

            {finalMenuItems.map((section: MenuSection, sectionIdx: number) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold leading-tight">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 leading-tight">
                  {section.links.map((link: LinkItem, linkIdx: number) => (
                    <li key={linkIdx} className="hover:text-primary font-medium leading-tight">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-muted-foreground/70 mt-15 flex flex-col justify-between gap-4 pt-8 text-sm font-medium leading-tight md:flex-row md:items-center">
            <p>{finalCopyright}</p>
            {/* <ul className="flex gap-4">
              {finalBottomLinks.map((link: LinkItem, linkIdx: number) => (
                <li key={linkIdx} className="hover:text-primary underline leading-tight">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul> */}
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
