import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { PredictionInput } from '../types';
import { Sparkles, Brain, Clock, ShieldAlert } from 'lucide-react';

interface PredictionFormProps {
  onPredict: (data: PredictionInput) => void;
  isLoading?: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  onPredict,
  isLoading = false,
}) => {
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
    
    if (formData.age < 12 || formData.age > 40) {
      newErrors.age = 'Age must be between 12 and 40';
    }
    if (formData.dailyUsageHours < 0 || formData.dailyUsageHours > 24) {
      newErrors.dailyUsageHours = 'Usage hours must be between 0 and 24';
    }
    if (formData.sleepHours < 0 || formData.sleepHours > 24) {
      newErrors.sleepHours = 'Sleep hours must be between 0 and 24';
    }
    if (formData.mentalHealthScore < 1 || formData.mentalHealthScore > 10) {
      newErrors.mentalHealthScore = 'Mental health score must be between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
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
    <form id="prediction-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Age Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Age
          </label>
          <input
            id="form-age"
            type="number"
            min="12"
            max="40"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || 20)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100 placeholder-slate-500"
            placeholder="e.g. 20"
          />
          {errors.age && <p className="text-rose-400 text-xs mt-1.5">{errors.age}</p>}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Gender
          </label>
          <select
            id="form-gender"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100"
          >
            <option value="Male" className="bg-slate-950">Male</option>
            <option value="Female" className="bg-slate-950">Female</option>
            <option value="Other" className="bg-slate-950">Other</option>
          </select>
        </div>

        {/* Academic Level Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Academic Level
          </label>
          <select
            id="form-academic-level"
            value={formData.academicLevel}
            onChange={(e) => handleChange('academicLevel', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100"
          >
            <option value="High School" className="bg-slate-950">High School</option>
            <option value="Undergraduate" className="bg-slate-950">Undergraduate (College)</option>
            <option value="Postgraduate" className="bg-slate-950">Postgraduate</option>
          </select>
        </div>

        {/* Platform Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Primary Social Platform
          </label>
          <select
            id="form-platform"
            value={formData.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100"
          >
            <option value="Instagram" className="bg-slate-950">Instagram</option>
            <option value="TikTok" className="bg-slate-950">TikTok</option>
            <option value="YouTube" className="bg-slate-950">YouTube</option>
            <option value="Reddit" className="bg-slate-950">Reddit</option>
            <option value="Snapchat" className="bg-slate-950">Snapchat</option>
            <option value="Twitter/X" className="bg-slate-950">Twitter / X</option>
            <option value="Other" className="bg-slate-950">Other Platforms</option>
          </select>
        </div>

        {/* Daily Usage Hours (Slider) */}
        <div className="md:col-span-2 bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" /> Daily Social Media Usage
            </label>
            <span className="text-sm font-bold text-purple-300 font-mono">
              {formData.dailyUsageHours} Hours / day
            </span>
          </div>
          <input
            id="form-usage-hours"
            type="range"
            min="0"
            max="18"
            step="0.5"
            value={formData.dailyUsageHours}
            onChange={(e) => handleChange('dailyUsageHours', parseFloat(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer py-1"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>0h (None)</span>
            <span>4h (Average)</span>
            <span>8h (High)</span>
            <span>12h+ (Severe)</span>
          </div>
        </div>

        {/* Sleep Hours */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Sleep Duration
            </label>
            <span className="text-sm font-bold text-teal-300 font-mono">
              {formData.sleepHours} Hours / night
            </span>
          </div>
          <input
            id="form-sleep-hours"
            type="range"
            min="3"
            max="12"
            step="0.5"
            value={formData.sleepHours}
            onChange={(e) => handleChange('sleepHours', parseFloat(e.target.value))}
            className="w-full accent-teal-500 bg-slate-800 rounded-lg cursor-pointer py-1"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>3h (Deprived)</span>
            <span>7-8h (Healthy)</span>
            <span>12h</span>
          </div>
        </div>

        {/* Mental Health Score (1 to 10) */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-pink-400" /> Subjective Mental Health
            </label>
            <span className="text-sm font-bold text-pink-300 font-mono">
              {formData.mentalHealthScore} / 10
            </span>
          </div>
          <input
            id="form-mental-score"
            type="range"
            min="1"
            max="10"
            step="1"
            value={formData.mentalHealthScore}
            onChange={(e) => handleChange('mentalHealthScore', parseInt(e.target.value))}
            className="w-full accent-pink-500 bg-slate-800 rounded-lg cursor-pointer py-1"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>1 (Extremely Anxious/Stressed)</span>
            <span>10 (Excellent/Balanced)</span>
          </div>
        </div>

        {/* Academic Performance */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Academic Performance
          </label>
          <select
            id="form-academic-perf"
            value={formData.academicPerformance}
            onChange={(e) => handleChange('academicPerformance', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100"
          >
            <option value="Excellent" className="bg-slate-950">Excellent (A Grade / High GPA)</option>
            <option value="Good" className="bg-slate-950">Good (B Grade / Solid GPA)</option>
            <option value="Average" className="bg-slate-950">Average (C Grade / Mid-level GPA)</option>
            <option value="Below Average" className="bg-slate-950">Below Average (D/F Grade / Struggling)</option>
          </select>
        </div>

        {/* Conflict Level */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Screen-Time Related Conflict Level
          </label>
          <select
            id="form-conflict"
            value={formData.conflictLevel}
            onChange={(e) => handleChange('conflictLevel', e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-200 text-slate-100"
          >
            <option value="Low" className="bg-slate-950">Low (No issue or minor friction)</option>
            <option value="Medium" className="bg-slate-950">Medium (Frequent discussions / family friction)</option>
            <option value="High" className="bg-slate-950">High (Severe arguments / complete relationship strain)</option>
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          id="predict-submit-btn"
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
          className="relative py-4 text-base font-bold overflow-hidden"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing Clinical Metrics via Explainable AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-300" />
              Evaluate Digital Addiction & Mental Health Risk Index
            </span>
          )}
        </Button>
      </div>

      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-teal-500/5 border border-teal-500/10 text-[11px] text-slate-400">
        <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <span>
          <strong>Data Privacy Notice:</strong> Your clinical metrics remain local inside your web container session. Our Explainable AI calculation conforms with global HIPAA-style educational records privacy guidelines.
        </span>
      </div>
    </form>
  );
};
