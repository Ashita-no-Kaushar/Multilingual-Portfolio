'use client';

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
        404 — Page Not Found
      </p>
      <h1 className="text-7xl md:text-9xl font-bold font-headline text-foreground mb-4 select-none">
        404
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
        This page doesn't exist or may have been moved.
        Head back and explore the portfolio.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/#projects">
            <Search className="mr-2 h-4 w-4" />
            View Projects
          </Link>
        </Button>
      </div>
      <div className="absolute bottom-8 text-xs text-muted-foreground/30 font-mono tracking-widest">
        KAUSHAR HALANI · DATA ANALYST
      </div>
    </div>
  );
}
