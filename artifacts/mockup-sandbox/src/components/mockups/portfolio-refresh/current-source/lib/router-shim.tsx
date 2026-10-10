import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  href: string;
};

function localHref(href: string) {
  if (href === '/') return '#home';
  if (href.startsWith('/#')) return href.slice(1);
  if (href.startsWith('/projects/')) return '#projects';
  return href;
}

export function Link({ href, ...props }: LinkProps) {
  return <a href={localHref(href)} {...props} />;
}

export function useLocation(): [string, (path: string) => void] {
  return ['/', () => undefined];
}
