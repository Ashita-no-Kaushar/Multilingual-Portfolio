import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComingSoonSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ComingSoonSection({
  title = 'Coming Soon',
  description = 'This section is actively being worked on.',
  className,
}: ComingSoonSectionProps) {
  return (
    <div className={cn('py-20 md:py-32', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center min-h-[180px] gap-5 text-center max-w-xs mx-auto">
          <div className="p-4 rounded-full border border-primary/20 bg-primary/5" aria-hidden="true">
            <Clock className="h-7 w-7 text-primary/50" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] text-primary/60 uppercase tracking-widest font-medium">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}
