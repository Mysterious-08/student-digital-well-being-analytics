import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  animate = true,
  hoverEffect = true,
  onClick,
  id,
}) => {
  const cardClasses = `glass-panel rounded-2xl p-6 relative overflow-hidden ${
    onClick ? 'cursor-pointer' : ''
  } ${className}`;

  if (!animate) {
    return (
      <div id={id} className={`${cardClasses} ${hoverEffect ? 'hover:border-purple-500/30 hover:bg-slate-900/80 transition-all duration-300' : ''}`} onClick={onClick}>
        {/* Subtle inner decorative glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={hoverEffect ? { 
        y: -4, 
        borderColor: 'rgba(168, 85, 247, 0.25)',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        boxShadow: '0 10px 30px -10px rgba(168, 85, 247, 0.15)'
      } : undefined}
      onClick={onClick}
      className={cardClasses}
    >
      {/* Subtle inner decorative glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      {children}
    </motion.div>
  );
};
