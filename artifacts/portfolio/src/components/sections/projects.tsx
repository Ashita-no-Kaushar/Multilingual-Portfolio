
'use client';

import { Link } from 'wouter';
import { useState } from 'react';
import { projects } from '@/app/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { usePortfolioSettings } from '@/i18n';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { mode, t } = usePortfolioSettings();

  const projectCategories = ['All', 'Machine Learning', 'NLP', 'Data Analysis', 'Data Visualization'];
  const usableLink = (url?: string) => !!url && !/your-username|your-name/i.test(url);

  const prioritizedProjects = [...projects].sort((a, b) => a.id - b.id);
  const roleProjects = ['generalist', 'ai-data'].includes(mode) ? prioritizedProjects : [];

  const filteredProjects = (activeTab === 'All'
    ? roleProjects
    : roleProjects.filter((project) => project.category === activeTab));

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('Projects')}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">{t('Selected projects with clear problem statements, approach, and measurable outcomes.')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-center mb-8 overflow-x-auto">
                   <TabsList className="inline-flex h-auto items-center gap-1 border-2 border-foreground/20 bg-card p-1">
                      {projectCategories.map((category) => (
                          <TabsTrigger
                              key={category}
                              value={category}
                              className="rounded-none border-0 px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground"
                          >
                              {category === 'All' ? t('All') : t(category)}
                          </TabsTrigger>
                      ))}
                  </TabsList>
                </div>

                <TabsContent value={activeTab}>
                    {filteredProjects.length === 0 ? (
                      <div className="mx-auto mt-8 max-w-xl border-2 border-dashed border-foreground/30 bg-card px-6 py-10 text-center">
                        <p className="font-headline text-xl font-bold text-foreground">{t('No projects have been added for this focus yet. The current portfolio content remains available in Generalist mode.')}</p>
                      </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      {filteredProjects.map((project) => (
                        <Card key={project.id} className="group flex flex-col overflow-hidden border-foreground/25 bg-card shadow-[4px_4px_0_hsl(var(--foreground)/.75)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-[2px_2px_0_hsl(var(--foreground)/.75)]">
                        <CardHeader>
                          {project.id <= 3 && (
                            <div className="mb-3">
                              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[11px] uppercase tracking-wide">{t('Featured Project')}</Badge>
                            </div>
                          )}
                            <div className="aspect-[3/2] relative w-full">
                            <div className="project-placeholder relative flex h-full w-full items-end overflow-hidden border border-foreground/20 bg-secondary p-5" aria-hidden="true">
                              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)/.09) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.09) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                              <div className="relative z-10 flex h-full items-end gap-2 border-b border-l border-foreground/30 px-3">
                                {[34, 55, 43, 78, 62, 94].map((height, index) => <span key={index} className={`w-5 border-2 border-foreground ${index === 5 ? 'bg-primary' : 'bg-card'}`} style={{ height: `${height}px` }} />)}
                              </div>
                              <span className="relative z-10 ml-auto max-w-[65%] border-2 border-foreground bg-card px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-foreground shadow-[3px_3px_0_hsl(var(--foreground))]">{t(project.category)}</span>
                            </div>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                            <CardTitle className="pt-4">{t(project.title)}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                          <p className="text-muted-foreground text-sm min-h-[84px]">{t(project.description)}</p>
                            <div className="flex flex-wrap gap-2">
                            {project.projectTypes.map((type) => (
                                <Badge key={type} variant="secondary">{t(type)}</Badge>
                            ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full justify-center gap-2 flex-wrap">
                                {usableLink(project.githubUrl) && (
                                <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github /> GitHub
                                    </Link>
                                </Button>
                                )}
                                {usableLink(project.link) && (
                                <Button asChild className="flex-1 min-w-[100px] shadow-md shadow-primary/20">
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink /> Live
                                    </Link>
                                </Button>
                                )}
                                <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                                    <Link href={project.docsPath}>
                                    <FileText /> {t('Project Docs')}
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Projects;
