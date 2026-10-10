'use client';
import { experiences } from '@portfolio/app/lib/data';
import { Card, CardTitle, CardDescription, CardContent } from '@portfolio/components/ui/card';
import { Briefcase } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@portfolio/components/ui/accordion";
import { usePortfolioSettings } from '@portfolio/i18n';

const Experience = () => {
  const { t } = usePortfolioSettings();
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('Experience')}</h2>
          <p className="text-lg text-muted-foreground mt-2">
            {t('Hands-on project and freelance experience in analytics, data workflows, and model delivery.')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center timeline line — desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 bg-primary/20 md:block" aria-hidden="true" />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`mb-8 flex w-full items-center justify-start md:${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <Accordion type="single" collapsible>
                  <Card className="flex flex-col transform transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 hover:shadow-2xl h-full">
                    <AccordionItem value={`item-${exp.id}`} className="border-none flex flex-col h-full">
                      <div className="p-4 sm:p-6">
                        <header className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg break-words">{t(exp.role)}</CardTitle>
                            <CardDescription className="text-sm break-words">{t(exp.company)}</CardDescription>
                            <p className="text-xs sm:text-sm text-muted-foreground pt-1">{exp.period}</p>
                          </div>
                          <AccordionTrigger className="p-2 rounded-lg hover:bg-accent/50 flex-shrink-0">
                            <span className="sr-only">{t('Toggle details')}</span>
                          </AccordionTrigger>
                        </header>
                        <CardContent className="space-y-4 pt-4 px-0 pb-0">
                          <p className="text-sm text-muted-foreground">{t(exp.description)}</p>
                        </CardContent>
                      </div>
                      <AccordionContent>
                        <CardContent className="flex-grow space-y-4 pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                          <div>
                            <h4 className="font-semibold text-sm">{t('Key Responsibilities:')}</h4>
                            <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                              {exp.responsibilities.map((resp, i) => <li key={i}>{t(resp)}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{t('Achievements:')}</h4>
                            <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                              {exp.achievements.map((ach, i) => <li key={i}>{t(ach)}</li>)}
                            </ul>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                </Accordion>
              </div>

              {/* Timeline dot — desktop only */}
              <div
                className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border-2 border-primary bg-background p-2 md:block"
                aria-hidden="true"
              >
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
