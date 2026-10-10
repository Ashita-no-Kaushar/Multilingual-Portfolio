import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description?: string;
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Kaushar Halani`;

    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.content ?? '';
    if (description && descEl) descEl.content = description;

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.content ?? '';
    if (ogTitle) ogTitle.content = `${title} | Kaushar Halani`;

    return () => {
      document.title = prevTitle;
      if (description && descEl) descEl.content = prevDesc;
      if (ogTitle) ogTitle.content = prevOgTitle;
    };
  }, [title, description]);

  return null;
}
