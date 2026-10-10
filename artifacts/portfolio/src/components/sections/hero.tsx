import { Button } from '@/components/ui/button';
import { ArrowUpRight, Download, Globe2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { usePortfolioSettings, type RoleMode } from '@/i18n';

const roleModes: { id: RoleMode; label: string }[] = [
  { id: 'generalist', label: 'Generalist' },
  { id: 'ai-data', label: 'AI / ML & Data Science' },
  { id: 'software', label: 'SDE / Full Stack' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'management', label: 'Project / Management' },
];

const Hero = () => {
  const heroStats = siteConfig.stats;
  const { locale, setLocale, mode, setMode, t } = usePortfolioSettings();

  return (
    <section id="home" className="hero-section relative flex min-h-[88svh] items-center overflow-hidden py-16 md:py-20">
      <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 border-2 border-foreground bg-card px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[.14em] text-foreground shadow-[3px_3px_0_hsl(var(--foreground))]">
            <span className="h-2.5 w-2.5 bg-primary" aria-hidden="true" />
            {t(siteConfig.role.badge)}
          </p>
          <h1 className="font-headline text-5xl font-black tracking-tight text-foreground md:text-7xl">
            {siteConfig.name}<span className="text-primary">.</span>
          </h1>
          <h2 className="mt-4 max-w-2xl font-body text-xl font-semibold leading-snug text-foreground md:text-3xl">
            {t(siteConfig.tagline)}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(siteConfig.bio)}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-none border-2 border-foreground bg-primary font-bold text-primary-foreground shadow-[4px_4px_0_hsl(var(--foreground))] transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_hsl(var(--foreground))]">
              <a href={siteConfig.links.resume}>
                <Download aria-hidden="true" />
                {t('Resume')}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-2 border-foreground bg-card font-bold text-foreground shadow-[4px_4px_0_hsl(var(--foreground))] transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-secondary">
              <a href="#contact">
                {t('Connect')}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mt-9 border-t-2 border-foreground/15 pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">{t('Target focus')}</p>
              <label className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Globe2 size={14} aria-hidden="true" />
                <span className="sr-only">{t('Language')}</span>
                <select
                  value={locale}
                  onChange={(event) => setLocale(event.target.value as typeof locale)}
                  className="rounded-none border border-foreground/30 bg-card px-2 py-1.5 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={t('Language')}
                >
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="fr">Français</option>
                </select>
              </label>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label={t('Target focus')}>
              {roleModes.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={mode === id}
                  onClick={() => setMode(id)}
                  className={`border px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-sm ${
                    mode === id
                      ? 'border-foreground bg-foreground text-background shadow-[2px_2px_0_hsl(var(--primary))]'
                      : 'border-foreground/25 bg-card/80 text-foreground hover:border-foreground hover:bg-secondary'
                  }`}
                >
                  {t(label)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary pl-3">
                <p className="font-headline text-2xl font-black text-foreground md:text-3xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-art relative mx-auto w-full max-w-[510px]" aria-hidden="true">
          <div className="hero-art-card relative border-2 border-foreground bg-card p-5 shadow-[8px_8px_0_hsl(var(--foreground))] md:p-7">
            <div className="flex items-center justify-between border-b border-foreground/20 pb-4 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">
              <span>{t('Field Notes / 01').toUpperCase()}</span>
              <span className="text-primary">DATA → DECISIONS</span>
            </div>
            <div className="relative mt-6 h-[230px] overflow-hidden border border-foreground/15 bg-secondary/60 p-4">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)/.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              <div className="relative flex h-full items-end justify-center gap-3 border-b border-l border-foreground/30 px-5 pb-0 pt-8">
                {[38, 62, 49, 82, 68, 96, 78].map((height, index) => (
                  <div key={index} className="relative flex h-full w-7 items-end">
                    <div className={`w-full border-2 border-foreground ${index === 5 ? 'bg-primary' : 'bg-card'}`} style={{ height: `${height}%` }} />
                  </div>
                ))}
                <div className="absolute left-[18%] top-[18%] rotate-[-4deg] border-2 border-foreground bg-[#fff2a6] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-foreground shadow-[3px_3px_0_hsl(var(--foreground))]">
                  {t('Insight found')}
                </div>
                <div className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center border-2 border-foreground bg-primary text-xl font-black text-primary-foreground shadow-[3px_3px_0_hsl(var(--foreground))]">
                  ↗
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="max-w-[220px] font-headline text-lg font-extrabold leading-tight text-foreground md:text-xl">{t('Curious by nature.')}<br />{t('Grounded in data.')}</p>
              <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-foreground bg-[#fff2a6] text-2xl font-black text-foreground">✳</div>
            </div>
          </div>
          <span className="absolute -right-2 -top-4 h-8 w-8 border-2 border-foreground bg-primary shadow-[3px_3px_0_hsl(var(--foreground))]" />
          <span className="absolute -bottom-4 -left-3 h-6 w-6 border-2 border-foreground bg-[#fff2a6] shadow-[3px_3px_0_hsl(var(--foreground))]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
