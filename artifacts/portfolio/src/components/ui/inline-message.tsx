
'use client';

import { CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface InlineMessageProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  show?: boolean; // Controlled by parent
}

export function InlineMessage({ children, variant = 'default', show = true }: InlineMessageProps) {
  const Icon = variant === 'destructive' ? AlertTriangle : CheckCircle;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            'flex items-center gap-2 rounded-md p-2 text-sm',
            {
              'bg-green-500/10 text-green-400': variant === 'default',
              'bg-red-500/10 text-red-400': variant === 'destructive',
            }
          )}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span>{children}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
