import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: keyof typeof LucideIcons;
  delay?: number;
  id?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  delay = 0,
  id,
}) => {
  // Dynamically resolve lucide icon safely
  const IconComponent = (LucideIcons[iconName] as React.ComponentType<{ className?: string }>) || LucideIcons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <GlassCard id={id} className="h-full flex flex-col items-start hoverEffect" animate={false}>
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-5 relative group-hover:bg-purple-500/20 transition-all duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-slate-100 mb-3 hover:text-white transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
        
        {/* Subtle bottom decorative gradient border on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </GlassCard>
    </motion.div>
  );
};
