import { aboutMe } from '@portfolio/app/lib/data';
import { Card, CardContent } from '@portfolio/components/ui/card';
import { Button } from '@portfolio/components/ui/button';
import { Link } from '@portfolio/lib/router-shim';
import { FolderOpen, Mail } from 'lucide-react';
import { usePortfolioSettings } from '@portfolio/i18n';

const About = () => {
  const { t } = usePortfolioSettings();
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('About Me')}</h2>
          <p className="text-lg text-muted-foreground mt-2">
            {t('Aspiring Data Analyst with a clear growth path into Data Engineering and Data Science.')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] mx-auto relative">
                    <div
                      className="w-full h-full rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center"
                      role="img"
                      aria-label={t('Kaushar Halani monogram')}
                    >
                      <span className="text-4xl md:text-5xl font-bold font-headline text-primary/40 select-none">
                        KH
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
                    {aboutMe.description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{t(paragraph)}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild size="sm">
                      <Link href="/#projects">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        {t('View Projects')}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/#contact">
                        <Mail className="mr-2 h-4 w-4" />
                        {t('Get in Touch')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
