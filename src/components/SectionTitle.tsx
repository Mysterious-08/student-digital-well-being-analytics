import React from 'react';
import { motion } from 'motion/react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  badge?: string;
  id?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  badge,
  id,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div id={id} className={`flex flex-col mb-12 ${alignmentClasses[align]}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-500/10 border border-teal-500/20 rounded-full mb-4"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-4"
      >
        {title.includes('Digital') || title.includes('AI') ? (
          <>
            {title.split(' ').map((word, i) => {
              const isSpecial = word === 'Digital' || word === 'Well-being' || word === 'AI' || word === 'Analytics' || word === 'Predictive' || word === 'Explainable';
              return (
                <span key={i} className={isSpecial ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400' : 'text-white'}>
                  {word}{' '}
                </span>
              );
            })}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-slate-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
