
'use client';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ExternalLink, Github, FileSpreadsheet } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolioSettings } from '@/i18n';

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id.toString() === id);
  const { t } = usePortfolioSettings();

  if (!project) {
    return (
      <div className="flex flex-col min-h-dvh bg-background items-center justify-center">
        <p className="text-muted-foreground">{t('Project not found.')}</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/#projects"><ArrowLeft className="mr-2" /> {t('Back to Projects')}</Link>
        </Button>
      </div>
    );
  }

  const toolBadges = (() => {
    const tool = project.tool.trim();
    const matched = tool.match(/^([^()]+)\(([^()]+)\)$/);
    if (!matched) return [tool];
    const baseTool = matched[1].trim();
    const extraTools = matched[2].split(',').map((item) => item.trim()).filter(Boolean);
    return [baseTool, ...extraTools];
  })();
  const projectLink = project.link && !/your-username|your-name/i.test(project.link) ? project.link : undefined;
  const projectSectionCopy = (source: string) =>
    project.id === 4 ? t('Detailed project notes have not been added yet.') : t(source);
  const documentedResults = project.id === 4
    ? []
    : project.results.filter((result) => !result.title.includes('Question/Statement/Finding'));

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-start mb-8">
            <Button asChild variant="outline">
              <Link href="/#projects">
                <ArrowLeft className="mr-2" />
                {t('Back to Projects')}
              </Link>
            </Button>
          </div>

          <article className="max-w-4xl mx-auto">
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3">{t(project.title)}</h1>
                  <p className="text-lg text-muted-foreground">{t(project.description)}</p>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground mb-2">{t('Tool')}</dt>
                    <dd className="flex flex-wrap gap-2.5">
                      {toolBadges.map((tool) => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                      <dt className="font-semibold text-foreground mb-2">{t('Project Types')}</dt>
                    <dd className="flex flex-wrap gap-2.5">
                      {project.projectTypes.map((type) => (
                        <Badge key={type} variant="secondary">{t(type)}</Badge>
                      ))}
                    </dd>
                  </div>
                  {projectLink && (
                    <div>
                      <dt className="font-semibold text-foreground mb-2">{t('Link')}</dt>
                      <dd>
                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                        >
                          {project.linkLabel ?? projectLink.replace(/^https?:\/\//, '')}
                          <ExternalLink className="flex-shrink-0 h-3 w-3" />
                        </a>
                      </dd>
                    </div>
                  )}
                  {project.dataFiles && project.dataFiles.length > 0 && (
                    <div>
                      <dt className="font-semibold text-foreground mb-2">{t('Data Files')}</dt>
                      <dd className="text-muted-foreground flex flex-col gap-1">
                        {project.dataFiles.map((file) => (
                          <a
                            key={file.url}
                            href={file.url}
                            download
                            className="inline-flex items-center gap-1.5 text-primary hover:underline"
                          >
                            <FileSpreadsheet className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                            {file.name}
                          </a>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <section className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/60">
                    <h3 className="text-xl font-headline font-semibold mb-3">{t('Goal')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{projectSectionCopy(project.goal)}</p>
                  </section>
                  <section className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/60">
                    <h3 className="text-xl font-headline font-semibold mb-3">{t('Process')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{projectSectionCopy(project.process)}</p>
                  </section>
                  <section className="p-6 md:p-8">
                    <h3 className="text-xl font-headline font-semibold mb-3">{t('Insights')}</h3>
                    <p className="text-muted-foreground leading-relaxed">{projectSectionCopy(project.insights)}</p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {documentedResults.length > 0 && (
              <section className="mb-8">
                <div className="flex flex-col gap-6">
                  {documentedResults.map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">{t(result.title)}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{t(result.description)}</p>
                        {result.imageUrl && !result.imageUrl.includes('picsum.photos') ? (
                          <div className="aspect-[16/9] relative rounded-lg overflow-hidden border border-border/50">
                            <img
                              src={result.imageUrl}
                              alt={t(result.title)}
                              className="object-cover w-full h-full"
                              data-ai-hint={result.imageHint}
                            />
                          </div>
                        ) : (
                          <div className="relative flex aspect-[16/9] items-end gap-2 overflow-hidden rounded-lg border border-foreground/20 bg-secondary p-8">
                            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)/.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                            {[31, 54, 43, 78, 63, 92].map((height, barIndex) => (
                              <span key={barIndex} className={`relative z-10 w-7 border-2 border-foreground ${barIndex === 5 ? 'bg-primary' : 'bg-card'}`} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8 text-center">
              <h2 className="text-2xl font-bold font-headline mb-4">{t('Project Detailed Report')}</h2>
              <p className="text-muted-foreground mb-6">{t('For a deeper dive into methodology, performance, and theory, open the detailed report.')}</p>
              <Button asChild size="lg" className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                <Link href={`/projects/${project.id}/report`}>
                  <BookOpen className="mr-2" />
                  {t('View Detailed Report')}
                </Link>
              </Button>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
