import React from 'react';
import { motion } from 'motion/react';

interface ScoreRingProps {
  score: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  
  // Custom color based on the score level
  const strokeColor = score >= 80 ? '#10b981' : score >= 60 ? '#f5a623' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Glow Backdrop */}
      <div 
        className="absolute w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000" 
        style={{ backgroundColor: strokeColor }}
      />
      
      <div className="relative w-44 h-44">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-slate-800/60 fill-transparent"
            strokeWidth="10"
          />
          {/* Animated progress ring */}
          <motion.circle
            cx="88"
            cy="88"
            r={radius}
            className="fill-transparent stroke-current"
            style={{ stroke: strokeColor }}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Score content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className="text-4xl font-extrabold tracking-tight text-white font-display"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">
            Well-being Score
          </span>
        </div>
      </div>
    </div>
  );
};
