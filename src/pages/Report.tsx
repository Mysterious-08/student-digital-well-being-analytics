import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { SectionTitle } from '../components/SectionTitle';
import { ReportCard } from '../components/ReportCard';
import { Button } from '../components/Button';
import { WellBeingReport, PredictionInput } from '../types';
import { Sparkles, RefreshCw, AlertCircle, FileSpreadsheet } from 'lucide-react';

// Beautiful sample report matching severe-moderate risk criteria for demonstration
const SAMPLE_INPUT: PredictionInput = {
  age: 21,
  gender: 'Female',
  academicLevel: 'Undergraduate',
  dailyUsageHours: 7.5,
  platform: 'TikTok',
  sleepHours: 5.5,
  mentalHealthScore: 4,
  academicPerformance: 'Average',
  conflictLevel: 'High'
};

const SAMPLE_REPORT: WellBeingReport = {
  score: 48,
  riskLevel: 'High',
  behaviorAnalysis: "The patient displays significant social screen dependency, spending over 7 hours daily on TikTok. This high rate of visual stimuli engagement displaces critical biological recovery, leading to a sleep debt of 2.5 hours per night. Cognitive performance is significantly degraded, causing mid-level academic friction. Severe household friction is reported due to screen disputes. The system flags this profile for active behavioral intervention.",
  topFactors: [
    {
      factor: 'Screen-to-Sleep Displacement',
      impact: 'Negative',
      description: 'Social screen interactions of 7.5h displace restorative deep sleep cycles (current rest: 5.5h).',
      percentage: 42,
    },
    {
      factor: 'Subjective Anxiety Vectors',
      impact: 'Negative',
      description: 'Reported anxiety / subjective mental standing is evaluated at 4/10 due to attention residue.',
      percentage: 33,
    },
    {
      factor: 'Academic Cognitive Overhead',
      impact: 'Negative',
      description: 'Slight concentration issues during study segments causing C-grade average GPA.',
      percentage: 20,
    },
    {
      factor: 'Family Friction Coefficient',
      impact: 'Negative',
      description: 'High frequency of heated arguments over excessive social device screen habits.',
      percentage: 15,
    }
  ],
  recommendations: [
    "Decrease active TikTok daily limits to 1.5 hours maximum. Use screen restriction blockers.",
    "Introduce a strict 'Digital Sunset': Lock all electronics inside a separate room 60 minutes before going to bed.",
    "Designate screen-free kitchen and family zones to encourage verbal discussion and decrease friction.",
    "Restore academic focus by keeping the phone out of reach during class sessions.",
    "Log daily subjective mood cycles in a physical journal to ground cognitive awareness."
  ]
};

export const Report: React.FC = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState<WellBeingReport | null>(null);
  const [inputData, setInputData] = useState<PredictionInput | null>(null);
  const [isSample, setIsSample] = useState(false);

  useEffect(() => {
    // Read stored prediction details
    const storedInput = sessionStorage.getItem('last_prediction_input');
    const storedReport = sessionStorage.getItem('last_prediction_report');

    if (storedInput && storedReport) {
      try {
        setInputData(JSON.parse(storedInput));
        setReport(JSON.parse(storedReport));
        setIsSample(false);
      } catch (err) {
        // Fallback to sample on error
        setInputData(SAMPLE_INPUT);
        setReport(SAMPLE_REPORT);
        setIsSample(true);
      }
    } else {
      // No data yet - Show sample report
      setInputData(SAMPLE_INPUT);
      setReport(SAMPLE_REPORT);
      setIsSample(true);
    }
  }, []);

  const handleClearReport = () => {
    sessionStorage.removeItem('last_prediction_input');
    sessionStorage.removeItem('last_prediction_report');
    setInputData(SAMPLE_INPUT);
    setReport(SAMPLE_REPORT);
    setIsSample(true);
  };

  return (
    <PageTransition>
      <div id="report-page" className="py-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-8">
          <SectionTitle
            title="AI Diagnostic Well-being Report"
            subtitle="Clinical evaluation matrix explaining behavioral risk ratios and wellness recommendations."
            align="left"
            badge="Diagnostic Report"
          />
          
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            {!isSample ? (
              <Button
                id="re-evaluate-btn"
                variant="outline"
                size="sm"
                onClick={handleClearReport}
                className="flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Report
              </Button>
            ) : (
              <Button
                id="run-predictor-btn"
                variant="primary"
                size="sm"
                onClick={() => navigate('/predict')}
                className="flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300" /> Run Your Predictor
              </Button>
            )}
          </div>
        </div>

        {/* Notice about Sample Report */}
        {isSample && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-purple-500/5 border border-purple-500/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-sm font-bold text-slate-100 font-display">Demonstration Sample Mode Active</p>
                <p className="text-xs text-slate-400 mt-0.5">There are no active prediction variables in your session. Showing a pre-computed sample profile for demonstration purposes.</p>
              </div>
            </div>
            <Button
              id="evaluate-now-btn"
              variant="outline"
              size="sm"
              onClick={() => navigate('/predict')}
              className="shrink-0 w-full sm:w-auto"
            >
              Evaluate Your Well-being Now
            </Button>
          </div>
        )}

        {/* Main Report Card Presentation */}
        {report && (
          <ReportCard report={report} inputData={inputData || undefined} />
        )}

        {/* Export / Sharing Action placeholders */}
        <div className="flex justify-center pt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Soon to be implemented</span>
            <div className="flex gap-3">
              <Button id="pdf-export-placeholder" variant="secondary" size="sm" disabled className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Export as PDF
              </Button>
              <Button id="csv-export-placeholder" variant="secondary" size="sm" disabled className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Export raw CSV data
              </Button>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};
