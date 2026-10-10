
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Video, ArrowLeft, Eye, Download } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { InlineMessage } from '@/components/ui/inline-message';
import { usePortfolioSettings } from '@/i18n';

const jobRoles = [
  {
    role: 'Data Analyst',
    description: 'Primary target role focused on data visualization, business intelligence, and actionable insights.',
    textResume: {
        previewUrl: '/resumes/data-analyst-resume-preview.pdf',
        downloadUrl: '/resumes/data-analyst-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-analyst-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-analyst-video-resume-download.mp4',
    }
  },
  {
    role: 'Data Engineer',
    description: 'Next target role with focus on scalable data pipelines, ETL workflows, and reliable data infrastructure.',
    textResume: {
        previewUrl: '/resumes/data-engineer-resume-preview.pdf',
        downloadUrl: '/resumes/data-engineer-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-engineer-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-engineer-video-resume-download.mp4',
    }
  },
  {
    role: 'Data Scientist',
    description: 'Long-term target role centered on machine learning, statistical modeling, and data-driven product development.',
    textResume: {
      previewUrl: '/resumes/data-scientist-resume-preview.pdf',
      downloadUrl: '/resumes/data-scientist-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-scientist-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-scientist-video-resume-download.mp4',
    }
  },
];

type ResumeType = 'Text' | 'Video';

interface ResumeDialogProps {
  role: string;
  type: ResumeType;
  previewUrl: string;
  downloadUrl: string;
  isReady?: boolean;
}

const ResumeDialog = ({ role, type, previewUrl, downloadUrl, isReady = false }: ResumeDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { t } = usePortfolioSettings();

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 4000); // Hide message after 4 seconds
  };

  return (
    <Dialog onOpenChange={(open) => !open && setIsDownloading(false)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {type === 'Text' ? <FileText className="mr-2" /> : <Video className="mr-2" />} {t(type)} {t('Resume')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t(role)} - {t(type)} {t('Resume')}</DialogTitle>
          <DialogDescription>
            {t('Choose an option to view or save the resume.')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 sm:gap-2">
            {isReady ? (
              <>
                <Button asChild>
                    <Link href={previewUrl} target="_blank">
                        <Eye className="mr-2" />
                        {t('Preview')}
                    </Link>
                </Button>
                <Button asChild variant="secondary" onClick={handleDownload}>
                    <Link href={downloadUrl} download>
                        <Download className="mr-2" />
                        {t('Download')}
                    </Link>
                </Button>
                 <InlineMessage show={isDownloading}>
                    {t('Downloading')} {t(role)} {t(type)} {t('Resume')}... {t('Check your downloads folder!')}
                </InlineMessage>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href="/#contact">
                    {t('Request Latest Resume')}
                  </Link>
                </Button>
                <InlineMessage>
                  {t('Resume file for')} {t(role)} ({t(type)}) {t('will be attached manually on request.')}
                </InlineMessage>
              </>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default function ResumePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('Choose Your Resume')}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {t('Role-specific resumes aligned with my current target path: Data Analyst to Data Engineer to Data Scientist.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {jobRoles.map((job) => (
              <Card key={job.role} className="flex flex-col text-center transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">{t(job.role)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-muted-foreground">{t(job.description)}</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-center gap-4">
                        <ResumeDialog role={job.role} type="Text" previewUrl={job.textResume.previewUrl} downloadUrl={job.textResume.downloadUrl} isReady={false} />
                        <ResumeDialog role={job.role} type="Video" previewUrl={job.videoResume.previewUrl} downloadUrl={job.videoResume.downloadUrl} isReady={false} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
