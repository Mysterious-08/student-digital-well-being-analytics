import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskBadgeProps {
  level: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const config = {
    Low: {
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      icon: ShieldCheck,
      text: 'Low Risk',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    },
    Moderate: {
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      icon: AlertTriangle,
      text: 'Moderate Risk',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    },
    High: {
      bg: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      icon: ShieldAlert,
      text: 'High Risk',
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]',
    },
    Severe: {
      bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      icon: AlertOctagon,
      text: 'Severe Risk',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
    },
  };

  const current = config[level] || config.Low;
  const Icon = current.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${current.bg} ${current.glow}`}>
      <Icon className="w-3.5 h-3.5 animate-pulse" />
      <span>{current.text}</span>
    </div>
  );
};
