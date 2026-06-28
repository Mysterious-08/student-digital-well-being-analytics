import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScoreRing } from './ScoreRing';
import { RiskBadge } from './RiskBadge';
import { RecommendationCard } from './RecommendationCard';
import { 
  Brain, 
  Sparkles, 
  HelpCircle, 
  Activity, 
  Smartphone, 
  Moon, 
  Smile, 
  ShieldAlert, 
  ChevronRight,
  Sparkle
} from 'lucide-react';

interface PredictionResult {
  wellBeingScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  addictionScore: number;
  topFactors: string[];
  recommendations: string[];
}

interface AnalysisPanelProps {
  result: PredictionResult | null;
  isAnalyzing: boolean;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result, isAnalyzing }) => {
  return (
    <div className="h-full flex flex-col justify-between min-h-[500px] w-full">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          // Analyzing screen placeholder - handled in main page via PredictionProgress, 
          // but we provide a premium loading spinner here in case it's shown.
          <motion.div
            key="analyzing-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 py-16 text-slate-400 space-y-4"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
              <Brain className="w-6 h-6 text-purple-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 animate-pulse">
              Synthesizing behavior profiles...
            </p>
          </motion.div>
        ) : !result ? (
          // "Awaiting Analysis" State
          <motion.div
            key="awaiting-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 text-center p-8 py-16 space-y-6"
          >
            {/* Elegant Premium Standing Vector */}
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Spinning background circles */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-800/80 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-4 rounded-full border border-slate-700/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-xl opacity-60" />
              
              <div className="relative bg-slate-950 p-6 rounded-full border border-slate-800/80 text-slate-600 flex items-center justify-center shadow-2xl">
                <Brain className="w-12 h-12 text-slate-500 animate-pulse" />
              </div>
              
              {/* Little floating elements */}
              <motion.div 
                className="absolute top-2 right-2 text-teal-500/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <motion.div 
                className="absolute bottom-2 left-2 text-purple-500/40"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <Activity className="w-4 h-4" />
              </motion.div>
            </div>

            <div className="max-w-xs space-y-2">
              <h3 className="text-lg font-display font-bold text-slate-200">Awaiting Student Profile</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide student demographics and screentime metrics on the left, then click <strong>Analyze Student</strong> to launch the AI diagnostic suite.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/80">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Real-time local prediction</span>
            </div>
          </motion.div>
        ) : (
          // Result Screen with beautiful animations
          <motion.div
            key="results-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 flex-1 w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  AI Behavioral Analysis
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <Sparkle className="w-3 h-3 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Generated in 2.0s</span>
              </div>
            </div>

            {/* Upper: Circular Score & Badge */}
            <div className="flex flex-col items-center text-center space-y-3">
              <ScoreRing score={result.wellBeingScore} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
              >
                <RiskBadge level={result.riskLevel} />
              </motion.div>
            </div>

            {/* Middle: Prediction Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Predicted Addiction Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl space-y-2 shadow-md hover:border-slate-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Addiction Score</span>
                  <Smartphone className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-display font-extrabold text-white">{result.addictionScore}</span>
                  <span className="text-xs text-slate-500">/ 10</span>
                </div>
                <p className="text-[10px] text-slate-500">Predicted clinical behavioral reliance</p>
              </motion.div>

              {/* Key Contributing Negative Factors Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl space-y-2 shadow-md hover:border-slate-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Top Risk Factors</span>
                  <Activity className="w-4 h-4 text-rose-400" />
                </div>
                
                <div className="space-y-1.5 pt-1">
                  {result.topFactors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 animate-pulse" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Recommendations Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-slate-300">
                  Targeted Clinical Detox Recommendations
                </h4>
              </div>

              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <RecommendationCard key={index} index={index} recommendation={rec} />
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
