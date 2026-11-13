import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  status: 'live' | 'in-development' | 'agency' | 'solidified' | 'active' | 'in-progress' | 'roadmap';
  label: string;
  className?: string;
  theme?: 'dark' | 'light';
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  label,
  className,
  theme = 'light',
}) => {
  const isLight = theme === 'light';

  const getStatusStyles = () => {
    switch (status) {
      case 'live':
        return {
          container: isLight
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-500',
          ping: true,
        };
      case 'in-development':
      case 'in-progress':
        return {
          container: isLight
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          dot: 'bg-amber-500',
          ping: false,
        };
      case 'agency':
      case 'active':
        return {
          container: isLight
            ? 'bg-purple-50 text-brand border-purple-200'
            : 'bg-brand/10 text-brand-tint border-brand/20',
          dot: 'bg-brand-tint',
          ping: false,
        };
      case 'solidified':
        return {
          container: isLight
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          dot: 'bg-blue-500',
          ping: false,
        };
      case 'roadmap':
      default:
        return {
          container: isLight
            ? 'bg-slate-100 text-slate-600 border-slate-200'
            : 'bg-slate-800 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          ping: false,
        };
    }
  };

  const current = getStatusStyles();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border tracking-wider uppercase',
        current.container,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {current.ping && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              current.dot
            )}
          />
        )}
        <span
          className={cn('relative inline-flex rounded-full h-2 w-2', current.dot)}
        />
      </span>
      <span>{label}</span>
    </span>
  );
};

