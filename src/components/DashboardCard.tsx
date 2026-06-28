import React from 'react';
import { GlassCard } from './GlassCard';
import * as LucideIcons from 'lucide-react';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof LucideIcons;
  badge?: string;
  badgeColor?: 'teal' | 'purple' | 'amber' | 'rose' | 'slate';
  children?: React.ReactNode;
  placeholderText?: string;
  id?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  iconName,
  badge,
  badgeColor = 'teal',
  children,
  placeholderText,
  id,
}) => {
  const IconComponent = iconName ? (LucideIcons[iconName] as React.ComponentType<{ className?: string }>) : null;

  const badgeColors = {
    teal: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    slate: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <GlassCard id={id} className="h-full flex flex-col justify-between" hoverEffect={false}>
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {IconComponent && (
              <div className="p-2 rounded-lg bg-slate-800 text-teal-400 border border-slate-700/50">
                <IconComponent className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="font-display font-bold text-slate-100 text-base leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {badge && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Content area */}
        <div className="mt-2 flex-grow">
          {children ? (
            children
          ) : (
            placeholderText && (
              <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/40 text-center">
                <LucideIcons.BarChart2 className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-sm text-slate-400 font-medium">{placeholderText}</p>
                <p className="text-xs text-slate-500 mt-1">Pending model configuration</p>
              </div>
            )
          )}
        </div>
      </div>
    </GlassCard>
  );
};
