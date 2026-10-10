import { Link } from 'wouter';
import { siteConfig } from '@/config/site';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolioSettings } from '@/i18n';

const footerNav = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/#contact' },
];

const socialIcons = [
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    show: !siteConfig.links.linkedin.includes('your-'),
  },
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
    show: !siteConfig.links.github.includes('your-'),
  },
  {
    name: 'Email',
    href: siteConfig.links.email ? `mailto:${siteConfig.links.email}` : null,
    icon: Mail,
    show: !!siteConfig.links.email,
  },
];

const Footer = () => {
  const { t } = usePortfolioSettings();
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-border bg-background/70"
    >
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-bold font-headline text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              {t(siteConfig.role.current)} — {t('building toward Data Engineering & Data Science.')}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialIcons
                .filter((s) => s.show && s.href)
                .map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-muted-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t('Navigation')}
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {footerNav.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                    >
                      {t(item.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t('Career Path')}
            </p>
            <div className="space-y-1">
              {siteConfig.role.path.split(' → ').map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className={`text-xs ${
                      i === 0
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground/60'
                    }`}
                  >
                    {t(step)}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-muted-foreground/30 text-xs">↓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {siteConfig.name}. {t('All rights reserved.')}
          </p>
          <p className="text-xs text-muted-foreground/40 font-mono tracking-wider">
            {t('DATA ANALYST · DATA ENGINEER · DATA SCIENTIST')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
