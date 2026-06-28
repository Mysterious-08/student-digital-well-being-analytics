import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, RefreshCw } from 'lucide-react';

interface PredictionProgressProps {
  duration?: number; // duration in ms
}

export const PredictionProgress: React.FC<PredictionProgressProps> = ({ duration = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Initializing profile diagnostics pipeline...',
    'Analyzing daily usage metrics & platform correlation...',
    'Analyzing sleep cycle rhythm disruption indicators...',
    'Cross-referencing psychological & familial friction coefficients...',
    'Synthesizing personalized therapeutic detox plans...',
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      // Determine the step based on progress
      const stepIndex = Math.min(Math.floor((percentage / 100) * steps.length), steps.length - 1);
      setCurrentStep(stepIndex);

      if (elapsed >= duration) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 space-y-6 w-full max-w-md mx-auto">
      {/* Rotating AI/Core Icon */}
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-purple-600 blur-md opacity-75 animate-pulse" />
        <div className="relative bg-slate-950 p-4 rounded-full border border-slate-800 text-teal-400 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-400" />
        </div>
      </div>

      <div className="space-y-2 text-center w-full">
        <h4 className="text-sm font-display font-bold text-slate-100 uppercase tracking-wider flex items-center justify-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          Analyzing Digital Behaviour
        </h4>
        
        {/* Animated step name */}
        <p className="text-xs text-slate-400 font-mono h-10 flex items-center justify-center text-center px-4 leading-relaxed">
          {steps[currentStep]}
        </p>
      </div>

      {/* Modern Gradient Progress Bar */}
      <div className="w-full space-y-2">
        <div className="w-full bg-slate-900 h-3 rounded-full p-0.5 border border-slate-800/80 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-purple-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>AI Engine: Processing</span>
          <span className="text-teal-400 font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
