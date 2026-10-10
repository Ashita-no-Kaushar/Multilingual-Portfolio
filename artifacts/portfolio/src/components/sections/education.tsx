
'use client';
import { education } from '@/app/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { usePortfolioSettings } from '@/i18n';

const Education = () => {
  const { t } = usePortfolioSettings();
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('Education')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('Academic foundation and coursework aligned with analytics, data engineering, and data science growth.')}</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 bg-primary/20 md:block" />
          {education.map((edu, index) => (
            <div
              key={edu.id}
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
                    <Card className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl h-full">
                        <AccordionItem value="item-1" className="border-none flex flex-col h-full">
                            <div className="p-4 sm:p-6">
                                <header className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-base sm:text-lg break-words">{t(edu.degree)}</CardTitle>
                                        <CardDescription className="text-sm break-words">{edu.institution}</CardDescription>
                                        <p className="text-xs sm:text-sm text-muted-foreground pt-1">{edu.period}</p>
                                    </div>
                                    <AccordionTrigger className="p-2 rounded-lg hover:bg-accent/50 flex-shrink-0">
                                        <span className="sr-only">{t('Toggle details')}</span>
                                    </AccordionTrigger>
                                </header>
                                <CardContent className="space-y-4 pt-4 px-0 pb-0">
                                    <p className="text-sm text-muted-foreground">{t(edu.description)}</p>
                                </CardContent>
                            </div>
                            <AccordionContent>
                                <CardContent className="flex-grow space-y-4 pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                                    <div>
                                      <h4 className="font-semibold text-sm">{t('Highlights:')}</h4>
                                      <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                                        {edu.details.highlights.map((detail, i) => <li key={i}>{t(detail)}</li>)}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm">{t('Relevant Coursework:')}</h4>
                                      <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                                        {edu.details.coursework.map((detail, i) => <li key={i}>{t(detail)}</li>)}
                                      </ul>
                                    </div>

                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                </Accordion>
              </div>
              <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border-2 border-primary bg-background p-2 md:block">
                <GraduationCap className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
