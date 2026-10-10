'use client';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, Download } from 'lucide-react';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { usePortfolioSettings } from '@/i18n';

const reportSections = [
  { id: 'project-summary', title: 'Project Summary' },
  { id: 'project-environment', title: 'Project Environment' },
  { id: 'project-goal', title: 'Goal' },
  { id: 'project-process', title: 'Process' },
  { id: 'project-insights', title: 'Insights' },
  { id: 'project-results', title: 'Results' },
] as const;

export default function ProjectReportPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((item) => item.id.toString() === id);
  const [openSection, setOpenSection] = useState<string | undefined>(undefined);
  const { t } = usePortfolioSettings();

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!reportSections.some((section) => section.id === hash)) return;
      setOpenSection(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground">{t('Project not found.')}</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/#projects"><ArrowLeft className="mr-2" /> {t('Back to Projects')}</Link>
        </Button>
      </div>
    );
  }

  const projectSectionCopy = (source: string) =>
    project.id === 4 ? t('Detailed project notes have not been added yet.') : t(source);
  const toolBadges = (() => {
    const tool = project.tool.trim();
    const matched = tool.match(/^([^()]+)\(([^()]+)\)$/);
    if (!matched) return tool.split(',').map((item) => item.trim()).filter(Boolean);
    return [matched[1].trim(), ...matched[2].split(',').map((item) => item.trim()).filter(Boolean)];
  })();
  const projectLink = project.link && !/your-username|your-name/i.test(project.link) ? project.link : undefined;
  const documentedResults = project.id === 4
    ? []
    : project.results.filter((result) => !result.title.includes('Question/Statement/Finding'));
  const sectionText = (sectionId: string) => {
    switch (sectionId) {
      case 'project-summary':
        return t(project.description);
      case 'project-environment':
        return [
          `${t('Tool')}: ${project.tool}`,
          `${t('Project Types')}: ${project.projectTypes.map(t).join(', ')}`,
          `${t('Data Files')}: ${project.dataFiles?.map((file) => file.name).join(', ') || t('Not provided')}`,
          `${t('Link')}: ${projectLink ?? t('Not provided')}`,
        ].join('\n');
      case 'project-goal':
        return projectSectionCopy(project.goal);
      case 'project-process':
        return projectSectionCopy(project.process);
      case 'project-insights':
        return projectSectionCopy(project.insights);
      case 'project-results':
        return documentedResults.length
          ? documentedResults.map((result) => `${t(result.title)}\n${t(result.description)}`).join('\n\n')
          : t('Detailed project notes have not been added yet.');
      default:
        return '';
    }
  };

  const downloadTextFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const handleDocsDownload = () => {
    const docsContent = [
      `${t('Project')}: ${t(project.title)}`,
      `${t('Description')}: ${t(project.description)}`,
      `${t('Tool')}: ${project.tool}`,
      `${t('Project Types')}: ${project.projectTypes.map(t).join(', ')}`,
      `${t('Link')}: ${projectLink ?? t('Not provided')}`,
      `${t('Data Files')}: ${project.dataFiles?.map((file) => file.name).join(', ') ?? 'N/A'}`,
      '',
      `${t('Goal')}\n${projectSectionCopy(project.goal)}`,
      '',
      `${t('Process')}\n${projectSectionCopy(project.process)}`,
      '',
      `${t('Insights')}\n${projectSectionCopy(project.insights)}`,
      '',
      `${t('Results')}\n${sectionText('project-results')}`,
    ].join('\n');

    downloadTextFile(`${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-project-docs.txt`, docsContent);
  };

  const handleDetailedReportDownload = () => {
    const reportContent = [
      `${t(project.title)} — ${t('Project Detailed Report')}`,
      '',
      t('Table of Contents'),
      ...reportSections.map((section, index) => `${index + 1}. ${t(section.title)}`),
      '',
      ...reportSections.flatMap((section) => [
        t(section.title),
        sectionText(section.id),
        '',
      ]),
    ].join('\n');

    downloadTextFile(`${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-detailed-report.txt`, reportContent);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex justify-start">
            <Button asChild variant="outline">
              <Link href={`/projects/${id}`}>
                <ArrowLeft className="mr-2" />
                {t('Back to Project')}
              </Link>
            </Button>
          </div>

          <article className="mx-auto max-w-5xl space-y-8">
            <header className="space-y-3 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">{t('Project Detailed Report')}</p>
              <h1 className="font-headline text-4xl font-bold md:text-5xl">{t(project.title)}</h1>
              <p className="text-lg text-muted-foreground">{t(project.description)}</p>
            </header>

            <Card id="table-of-contents" className="border-2 border-foreground/20 shadow-[4px_4px_0_hsl(var(--foreground)/.14)]">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{t('Table of Contents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid list-decimal grid-cols-1 gap-2 pl-5 text-muted-foreground sm:grid-cols-2">
                  {reportSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setOpenSection(section.id);
                          window.history.replaceState(null, '', `#${section.id}`);
                          requestAnimationFrame(() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                        }}
                        className="hover:text-primary hover:underline"
                      >
                        {t(section.title)}
                      </a>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Accordion
              type="single"
              collapsible
              value={openSection}
              onValueChange={(value) => setOpenSection(value || undefined)}
              className="space-y-3"
            >
              {reportSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-none border-2 border-foreground/20 bg-card px-5 shadow-[3px_3px_0_hsl(var(--foreground)/.12)] md:px-7"
                >
                  <AccordionTrigger className="py-5 text-left font-headline text-xl font-bold hover:no-underline">
                    {t(section.title)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    {section.id === 'project-environment' ? (
                      <div className="space-y-5">
                        <div>
                          <h3 className="mb-2 font-semibold">{t('Tool')}</h3>
                          <div className="flex flex-wrap gap-2">
                            {toolBadges.map((tool) => <Badge key={tool} variant="secondary">{tool}</Badge>)}
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2 font-semibold">{t('Project Types')}</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.projectTypes.map((type) => <Badge key={type} variant="secondary">{t(type)}</Badge>)}
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2 font-semibold">{t('Data Files')}</h3>
                          {project.dataFiles?.length ? (
                            <ul className="space-y-1">
                              {project.dataFiles.map((file) => (
                                <li key={file.url}>
                                  <a href={file.url} download className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                    {file.name}<Download className="h-3.5 w-3.5" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">{t('Not provided')}</p>
                          )}
                        </div>
                        {projectLink && (
                          <div>
                            <h3 className="mb-2 font-semibold">{t('Link')}</h3>
                            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {project.linkLabel ?? projectLink}
                            </a>
                          </div>
                        )}
                      </div>
                    ) : section.id === 'project-results' ? (
                      documentedResults.length ? (
                        <div className="space-y-5">
                          {documentedResults.map((result, index) => (
                            <div key={`${result.title}-${index}`}>
                              <h3 className="font-semibold">{t(result.title)}</h3>
                              <p className="mt-1 leading-relaxed text-muted-foreground">{t(result.description)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="leading-relaxed text-muted-foreground">{t('Detailed project notes have not been added yet.')}</p>
                      )
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{sectionText(section.id)}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button onClick={handleDocsDownload} variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                {t('Download Project Docs')}
              </Button>
              <Button onClick={handleDetailedReportDownload} size="lg">
                <Download className="mr-2 h-4 w-4" />
                {t('Download Detailed Report')}
              </Button>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
