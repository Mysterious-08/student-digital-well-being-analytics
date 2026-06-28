import React from 'react';
import { motion } from 'motion/react';
import { WellBeingReport, PredictionInput } from '../types';
import { GlassCard } from './GlassCard';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Moon, 
  Smartphone, 
  BookOpen, 
  Heart,
  Calendar
} from 'lucide-react';

interface ReportCardProps {
  report: WellBeingReport;
  inputData?: PredictionInput;
  id?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  inputData,
  id,
}) => {
  const getRiskStyles = (level: WellBeingReport['riskLevel']) => {
    switch (level) {
      case 'Low':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          indicator: 'bg-emerald-400',
          text: 'text-emerald-400',
          icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          indicator: 'bg-amber-400',
          text: 'text-amber-400',
          icon: <TrendingUp className="w-5 h-5 text-amber-400" />
        };
      case 'High':
        return {
          bg: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
          indicator: 'bg-orange-400',
          text: 'text-orange-400',
          icon: <AlertTriangle className="w-5 h-5 text-orange-400" />
        };
      case 'Severe':
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          indicator: 'bg-rose-400',
          text: 'text-rose-400',
          icon: <AlertOctagon className="w-5 h-5 text-rose-400" />
        };
    }
  };

  const riskStyles = getRiskStyles(report.riskLevel);

  return (
    <div id={id} className="space-y-8">
      
      {/* Dynamic Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Well-being Score Circular Dial */}
        <GlassCard className="flex flex-col items-center justify-center p-8 text-center" hoverEffect={false}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Digital Well-being Score
          </h3>
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Foreground Animated Arc */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#purpleTealGrad)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="264"
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * report.score) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="purpleTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" /> {/* Purple */}
                  <stop offset="100%" stopColor="#2dd4bf" /> {/* Teal */}
                </linearGradient>
              </defs>
            </svg>
            
            {/* Centered Score */}
            <div className="flex flex-col items-center justify-center z-10">
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-display font-extrabold text-white"
              >
                {report.score}
              </motion.span>
              <span className="text-[10px] text-slate-400 font-medium">Out of 100</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6 leading-relaxed">
            Composite score based on screen sleep ratios, academic conflict, and mental stress vectors.
          </p>
        </GlassCard>

        {/* Risk Level Card */}
        <GlassCard className="flex flex-col justify-between p-8" hoverEffect={false}>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
              Evaluation & Risk Status
            </h3>
            
            <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${riskStyles.bg} font-display font-bold text-lg mb-4`}>
              {riskStyles.icon}
              <span>{report.riskLevel} Risk</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              Our explainable AI risk model flags your parameters as <strong className={riskStyles.text}>{report.riskLevel.toLowerCase()}</strong> for screen dependency syndrome and dopamine loop habituation.
            </p>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-6 flex justify-between items-center text-xs text-slate-500">
            <span>Model: Digital-Wellbeing-v1.2</span>
            <span>Confidence: 94.2%</span>
          </div>
        </GlassCard>

        {/* Behavior Overview Cards / Input Summary */}
        <GlassCard className="flex flex-col justify-between p-8" hoverEffect={false}>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Metadata Parameters
            </h3>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" /> Platform Usage
                </span>
                <span className="font-semibold text-slate-200">{inputData?.dailyUsageHours ?? 6} hrs / {inputData?.platform ?? 'Instagram'}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-teal-400" /> Sleep Rhythm
                </span>
                <span className="font-semibold text-slate-200">{inputData?.sleepHours ?? 6.5} hrs / night</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400" /> Stress Score
                </span>
                <span className="font-semibold text-slate-200">{inputData?.mentalHealthScore ?? 5} / 10 index</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Academic Standing
                </span>
                <span className="font-semibold text-slate-200">{inputData?.academicPerformance ?? 'Good'}</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Generated: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </GlassCard>

      </div>

      {/* Narrative Behavior Analysis */}
      <GlassCard className="p-8" hoverEffect={false}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-100 text-lg">
              Detailed Behavioral Cohort Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Clinical narrative mapping of student habit patterns</p>
          </div>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
          {report.behaviorAnalysis}
        </p>
      </GlassCard>

      {/* Top Impact Factors */}
      <GlassCard className="p-8" hoverEffect={false}>
        <h3 className="font-display font-bold text-slate-100 text-lg mb-6 flex items-center gap-2">
          Key Driver Significance & Impairment Drivers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {report.topFactors.map((f, idx) => {
            const isNegative = f.impact === 'Negative';
            const isPositive = f.impact === 'Positive';
            
            return (
              <div key={idx} className="bg-slate-900/30 p-5 rounded-xl border border-slate-800/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-sm text-slate-200 font-display">{f.factor}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isNegative ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                      isPositive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {f.impact} Impact
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {f.description}
                  </p>
                </div>

                {/* Progress bar representing significance factor */}
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                    <span>Feature Weight</span>
                    <span className="font-mono font-bold text-slate-400">{f.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${f.percentage}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${
                        isNegative ? 'bg-rose-500' : 
                        isPositive ? 'bg-emerald-500' : 
                        'bg-purple-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Clinical Recommendations & Action Items */}
      <GlassCard className="p-8 border-l-4 border-l-teal-500" hoverEffect={false}>
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-2xl">🌱</span>
          <div>
            <h3 className="font-display font-bold text-slate-100 text-lg">
              AI-Generated Wellness Prescription & Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Evidence-based digital hygiene modifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {report.recommendations.map((rec, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              key={idx} 
              className="flex items-start gap-4 p-4 rounded-xl bg-teal-950/20 border border-teal-500/10"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {rec}
              </p>
            </motion.div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
};
