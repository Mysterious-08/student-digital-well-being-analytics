import React from 'react';
import { motion } from 'motion/react';
import { Clock, Moon, ToggleLeft, Calendar, LucideIcon, CheckCircle2 } from 'lucide-react';

interface RecommendationCardProps {
  index: number;
  recommendation: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ index, recommendation }) => {
  // Map icons dynamically based on keywords in recommendation
  const getIcon = (text: string): LucideIcon => {
    const lower = text.toLowerCase();
    if (lower.includes('usage') || lower.includes('minute') || lower.includes('time')) return Clock;
    if (lower.includes('sleep') || lower.includes('night') || lower.includes('hour')) return Moon;
    if (lower.includes('focus') || lower.includes('mode') || lower.includes('device')) return ToggleLeft;
    if (lower.includes('detox') || lower.includes('day') || lower.includes('schedule')) return Calendar;
    return CheckCircle2;
  };

  const Icon = getIcon(recommendation);

  const colors = [
    'from-purple-500/10 to-purple-500/5 text-purple-400 border-purple-500/20',
    'from-teal-500/10 to-teal-500/5 text-teal-400 border-teal-500/20',
    'from-pink-500/10 to-pink-500/5 text-pink-400 border-pink-500/20',
    'from-amber-500/10 to-amber-500/5 text-amber-400 border-amber-500/20',
  ];

  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.5, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`flex items-start gap-3.5 p-3.5 rounded-xl border bg-gradient-to-r ${colorClass} transition-shadow duration-300`}
    >
      <div className="p-2 rounded-lg bg-slate-950/80 border border-white/5 shrink-0">
        <Icon className="w-4 h-4 text-inherit" />
      </div>
      <div className="space-y-0.5">
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Step 0{index + 1}</span>
        <p className="text-xs font-semibold text-slate-200 leading-relaxed">{recommendation}</p>
      </div>
    </motion.div>
  );
};
