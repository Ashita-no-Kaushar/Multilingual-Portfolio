
'use client';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { profileLinks } from '@/app/lib/data';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { usePortfolioSettings } from '@/i18n';


export default function ProfilePage() {
  const { t } = usePortfolioSettings();
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2" />
              {t('Back to Home')}
            </Link>
          </Button>
        </div>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              {t('Online Profiles')}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {t('Verified platforms that showcase my analytics work, learning, and professional presence.')}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {profileLinks.map((category, index) => {
                const Icon = (LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Link) as React.ComponentType<any>;
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-card rounded-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
                    <AccordionTrigger className="text-xl font-headline p-6 hover:no-underline w-full">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                         <span>{t(category.category)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pb-6">
                        {category.links.map((link) => {
                          return (
                            <Card key={link.name} className="bg-background border-border transform transition-all duration-300 hover:scale-105 hover:shadow-primary/10 hover:shadow-md">
                              <CardContent className="p-0">
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 text-foreground p-4"
                                >
                                  <span className="font-medium flex-1">{link.name}</span>
                                </Link>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
