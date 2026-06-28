import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { SectionTitle } from '../components/SectionTitle';
import { GlassCard } from '../components/GlassCard';
import { AIPredictionForm } from '../components/prediction/AIPredictionForm';
import { AnalysisPanel } from '../components/prediction/AnalysisPanel';
import { PredictionProgress } from '../components/prediction/PredictionProgress';
import { PredictionInput } from '../types';
import { calculateWellBeingReport } from '../utils/predictEngine';
import { Cpu } from 'lucide-react';
import axios from "axios";

interface PredictionResult {
  wellBeingScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  addictionScore: number;
  topFactors: string[];
  recommendations: string[];
}

export const Predict: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const getApiBaseUrl = () => {
    const configuredUrl = import.meta.env.VITE_API_URL?.trim();
    if (configuredUrl) {
      return configuredUrl.replace(/\/+$/, '');
    }

    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      return 'http://127.0.0.1:8000';
    }

    if (window.location.protocol === 'https:') {
      return null;
    }

    return `http://${host}:8000`;
  };

  const runLocalPrediction = (data: PredictionInput): PredictionResult => {
    const report = calculateWellBeingReport(data);
    const negativeFactors = report.topFactors
      .filter((factor) => factor.impact === 'Negative')
      .map((factor) => factor.factor);

    return {
      wellBeingScore: report.score,
      riskLevel: report.riskLevel,
      addictionScore: Number(((100 - report.score) / 10).toFixed(2)),
      topFactors: negativeFactors.length > 0
        ? negativeFactors.slice(0, 3)
        : report.topFactors.slice(0, 3).map((factor) => factor.factor),
      recommendations: report.recommendations,
    };
  };

const handlePredictSubmit = async (data: PredictionInput) => {
  setIsAnalyzing(true);
  setResult(null);

  try {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      setResult(runLocalPrediction(data));
      return;
    }

    const response = await axios.post(
      `${apiBaseUrl}/predict`,
      {
        age: data.age,
        gender: data.gender,
        academicLevel: data.academicLevel,
        dailyUsageHours: data.dailyUsageHours,
        platform: data.platform,
        sleepHours: data.sleepHours,
        mentalHealthScore: data.mentalHealthScore,
        academicPerformance: data.academicPerformance,
        conflictLevel: data.conflictLevel,
      }
    );

    setResult({
  wellBeingScore: Number(response.data.wellbeing_score),

  riskLevel: response.data.risk_level,

  addictionScore: Number(response.data.prediction.toFixed(2)),

  topFactors: [
    "Daily Usage Hours",
    "Sleep Duration",
    "Mental Health Score"
  ],

  recommendations: response.data.recommendations
});

  } catch (error) {
    console.warn('Backend prediction failed. Falling back to local prediction.', error);
    setResult(runLocalPrediction(data));
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <PageTransition>
      <div id="predict-page" className="py-8 space-y-10">
        
        {/* Header Section */}
        <SectionTitle
          title="Predictive AI Addiction Engine"
          subtitle="Submit custom behavioral parameters to run an explainable AI diagnostic assessment."
          badge="Predictor"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT: Prediction Form Column */}
          <div className="flex flex-col h-full">
            <GlassCard className="p-6 md:p-8 flex-1 flex flex-col justify-between" hoverEffect={false}>
              <div className="w-full">
                <h3 className="text-base font-display font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-400" /> Behavioral Parameter Diagnostic Form
                </h3>
                
                {isAnalyzing ? (
                  <div className="flex items-center justify-center py-16 w-full">
                    <PredictionProgress duration={2000} />
                  </div>
                ) : (
                  <AIPredictionForm onPredict={handlePredictSubmit} isLoading={isAnalyzing} />
                )}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT: Live Analysis Panel Column */}
          <div className="flex flex-col h-full">
            <GlassCard className="p-6 md:p-8 flex-1 flex flex-col bg-slate-900/40 border border-slate-800/80" hoverEffect={false}>
              <AnalysisPanel result={result} isAnalyzing={isAnalyzing} />
            </GlassCard>
          </div>

        </div>

        {result && (
          <div className="text-center text-[11px] text-slate-500 italic leading-relaxed max-w-2xl mx-auto">
            <p>
              This assessment is AI-assisted and intended for educational purposes only. It is not a medical diagnosis.
            </p>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
