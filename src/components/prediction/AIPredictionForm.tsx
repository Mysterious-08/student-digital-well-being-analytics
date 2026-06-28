import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Users, 
  GraduationCap, 
  Clock, 
  Smartphone, 
  Moon, 
  Smile, 
  FileText, 
  AlertTriangle,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../Button';
import { PredictionInput } from '../../types';

interface AIPredictionFormProps {
  onPredict: (data: PredictionInput) => void;
  isLoading: boolean;
}

export const AIPredictionForm: React.FC<AIPredictionFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<PredictionInput>({
    age: 20,
    gender: 'Male',
    academicLevel: 'Undergraduate',
    dailyUsageHours: 4,
    platform: 'Instagram',
    sleepHours: 7,
    mentalHealthScore: 6,
    academicPerformance: 'Good',
    conflictLevel: 'Medium',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PredictionInput, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PredictionInput, string>> = {};
    
    if (!formData.age || formData.age < 12 || formData.age > 40) {
      newErrors.age = 'Age must be between 12 and 40';
    }
    if (formData.dailyUsageHours === undefined || formData.dailyUsageHours < 0 || formData.dailyUsageHours > 24) {
      newErrors.dailyUsageHours = 'Daily usage must be between 0 and 24 hours';
    }
    if (formData.sleepHours === undefined || formData.sleepHours < 0 || formData.sleepHours > 24) {
      newErrors.sleepHours = 'Sleep hours must be between 0 and 24 hours';
    }
    if (formData.mentalHealthScore === undefined || formData.mentalHealthScore < 1 || formData.mentalHealthScore > 10) {
      newErrors.mentalHealthScore = 'Mental health score must be on a scale of 1 to 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (validate()) {
      onPredict(formData);
    }
  };

  const handleChange = (name: keyof PredictionInput, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form id="ai-prediction-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Age Field */}
        <div className="relative">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <User className="w-3.5 h-3.5 text-teal-400" /> Age
          </label>
          <input
            id="ai-form-age"
            type="number"
            min="12"
            max="40"
            disabled={isLoading}
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
            className={`w-full px-4 py-2.5 bg-slate-950/60 border rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 focus:outline-none transition-all duration-200 text-slate-100 placeholder-slate-600 text-sm ${
              errors.age ? 'border-rose-500/50' : 'border-slate-800/80 hover:border-slate-700'
            }`}
            placeholder="e.g. 20"
          />
          <p className="text-[10px] text-slate-500 mt-1">Standard academic demographic (12 - 40 years)</p>
          {errors.age && (
            <motion.p initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} className="text-rose-400 text-[11px] mt-1">
              {errors.age}
            </motion.p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Users className="w-3.5 h-3.5 text-teal-400" /> Gender
          </label>
          <select
            id="ai-form-gender"
            disabled={isLoading}
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none text-slate-100 text-sm"
          >
            <option value="Male" className="bg-slate-950 text-slate-100">Male</option>
            <option value="Female" className="bg-slate-950 text-slate-100">Female</option>
            <option value="Other" className="bg-slate-950 text-slate-100">Other</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-1">Demographic profile segmentation</p>
        </div>

        {/* Academic Level Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" /> Academic Level
          </label>
          <select
            id="ai-form-academic-level"
            disabled={isLoading}
            value={formData.academicLevel}
            onChange={(e) => handleChange('academicLevel', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none text-slate-100 text-sm"
          >
            <option value="High School" className="bg-slate-950 text-slate-100">High School</option>
            <option value="Undergraduate" className="bg-slate-950 text-slate-100">Undergraduate</option>
            <option value="Postgraduate" className="bg-slate-950 text-slate-100">Postgraduate</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-1">Educational workload structure</p>
        </div>

        {/* Platform Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <Smartphone className="w-3.5 h-3.5 text-teal-400" /> Most Used Platform
          </label>
          <select
            id="ai-form-platform"
            disabled={isLoading}
            value={formData.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none text-slate-100 text-sm"
          >
            <option value="Instagram" className="bg-slate-950 text-slate-100">Instagram</option>
            <option value="TikTok" className="bg-slate-950 text-slate-100">TikTok</option>
            <option value="YouTube" className="bg-slate-950 text-slate-100">YouTube</option>
            <option value="Reddit" className="bg-slate-950 text-slate-100">Reddit</option>
            <option value="Snapchat" className="bg-slate-950 text-slate-100">Snapchat</option>
            <option value="Twitter/X" className="bg-slate-950 text-slate-100">Twitter / X</option>
            <option value="Other" className="bg-slate-950 text-slate-100">Other</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-1">Predominant interactive environment</p>
        </div>

        {/* Average Daily Usage Hours Field */}
        <div className="sm:col-span-2 bg-slate-900/10 p-4 rounded-xl border border-slate-800/60 space-y-2">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Clock className="w-3.5 h-3.5 text-teal-400" /> Average Daily Usage Hours
            </label>
            <span className="text-xs font-mono font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              {formData.dailyUsageHours} Hours / Day
            </span>
          </div>
          <input
            id="ai-form-usage"
            type="range"
            min="0"
            max="18"
            step="0.5"
            disabled={isLoading}
            value={formData.dailyUsageHours}
            onChange={(e) => handleChange('dailyUsageHours', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400 disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0 hrs</span>
            <span>4 hrs (Avg)</span>
            <span>8 hrs (High)</span>
            <span>12+ hrs (Severe)</span>
          </div>
          <p className="text-[10px] text-slate-500">Cumulative digital screentime index</p>
        </div>

        {/* Sleep Hours Field */}
        <div className="bg-slate-900/10 p-4 rounded-xl border border-slate-800/60 space-y-2">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Moon className="w-3.5 h-3.5 text-teal-400" /> Sleep Hours Per Night
            </label>
            <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
              {formData.sleepHours} Hours / Night
            </span>
          </div>
          <input
            id="ai-form-sleep"
            type="range"
            min="3"
            max="12"
            step="0.5"
            disabled={isLoading}
            value={formData.sleepHours}
            onChange={(e) => handleChange('sleepHours', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 disabled:opacity-50"
          />
          <p className="text-[10px] text-slate-500">Circadian recovery factor</p>
        </div>

        {/* Mental Health Score Field */}
        <div className="bg-slate-900/10 p-4 rounded-xl border border-slate-800/60 space-y-2">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Smile className="w-3.5 h-3.5 text-teal-400" /> Mental Health Score
            </label>
            <span className="text-xs font-mono font-bold text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
              {formData.mentalHealthScore} / 10
            </span>
          </div>
          <input
            id="ai-form-mental"
            type="range"
            min="1"
            max="10"
            step="1"
            disabled={isLoading}
            value={formData.mentalHealthScore}
            onChange={(e) => handleChange('mentalHealthScore', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400 disabled:opacity-50"
          />
          <p className="text-[10px] text-slate-500">1 (Extreme Distress) to 10 (Thriving)</p>
        </div>

        {/* Academic Performance Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <FileText className="w-3.5 h-3.5 text-teal-400" /> Academic Performance
          </label>
          <select
            id="ai-form-academic-perf"
            disabled={isLoading}
            value={formData.academicPerformance}
            onChange={(e) => handleChange('academicPerformance', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none text-slate-100 text-sm"
          >
            <option value="Excellent" className="bg-slate-950 text-slate-100">Excellent</option>
            <option value="Good" className="bg-slate-950 text-slate-100">Good</option>
            <option value="Average" className="bg-slate-950 text-slate-100">Average</option>
            <option value="Below Average" className="bg-slate-950 text-slate-100">Below Average</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-1">Subjective grade standard</p>
        </div>

        {/* Conflicts Over Social Media Field */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-teal-400" /> Conflicts Over Social Media
          </label>
          <select
            id="ai-form-conflict"
            disabled={isLoading}
            value={formData.conflictLevel}
            onChange={(e) => handleChange('conflictLevel', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl focus:border-purple-500 focus:outline-none text-slate-100 text-sm"
          >
            <option value="Low" className="bg-slate-950 text-slate-100">Low</option>
            <option value="Medium" className="bg-slate-950 text-slate-100">Medium</option>
            <option value="High" className="bg-slate-950 text-slate-100">High</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-1">Relationship strain ratio</p>
        </div>

      </div>

      {/* Button with gradient, hover/tap animations */}
      <div className="pt-4">
        <motion.div
          whileHover={isLoading ? {} : { scale: 1.02 }}
          whileTap={isLoading ? {} : { scale: 0.98 }}
          className="w-full rounded-xl overflow-hidden shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300"
        >
          <Button
            id="ai-predict-submit"
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="relative py-4 text-sm font-extrabold uppercase tracking-wider overflow-hidden bg-gradient-to-r from-teal-500 via-purple-600 to-teal-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white select-none shrink-0"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Digital Behaviour...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-300" />
                Analyze Student Profile
              </span>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-teal-500/5 border border-teal-500/10 text-[10px] text-slate-400">
        <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <span>
          <strong>Safe & Compliant Protocol:</strong> AI evaluation is carried out locally with total privacy. All data models comply strictly with research-level GDPR & FERPA metadata schemas.
        </span>
      </div>
    </form>
  );
};
