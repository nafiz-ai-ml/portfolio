import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  theme = 'light',
  className,
}) => {
  const isLight = theme === 'light';

  return (
    <div className={cn('mb-12 md:mb-16', className)}>
      {/* Small mono label with thin leading line */}
      <div
        className={cn(
          'inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] font-medium mb-4',
          isLight ? 'text-light-muted' : 'text-dark-muted'
        )}
      >
        <span
          className={cn(
            'inline-block w-6 h-[1.5px] rounded-full',
            isLight ? 'bg-light-text/60' : 'bg-brand-tint'
          )}
        />
        <span>{label}</span>
      </div>

      {/* Main Section Headline */}
      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans leading-[1.15]',
          isLight ? 'text-light-text' : 'text-dark-text'
        )}
      >
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg max-w-2xl leading-relaxed',
            isLight ? 'text-light-muted' : 'text-dark-muted'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

