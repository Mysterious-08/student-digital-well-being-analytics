import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { SectionTitle } from '../components/SectionTitle';
import { GlassCard } from '../components/GlassCard';
import { 
  Target, 
  Database, 
  Cpu, 
  HeartHandshake, 
  CheckCircle2, 
  Bookmark,
  Users,
  Code
} from 'lucide-react';

export const About: React.FC = () => {
  const objectives = [
    {
      title: 'Diagnose Screen Dependency Indicators',
      text: 'Leverage statistical correlation pipelines to identify risk indicators signaling digital addiction, compulsive usage cycles, or high attention depletion.'
    },
    {
      title: 'De-mystify Model Predictions',
      text: 'Provide explainable contribution metrics showing why a specific usage or sleep pattern triggers risk recommendations, avoiding black-box algorithms.'
    },
    {
      title: 'Support Circadian Hygiene',
      text: 'Analyze sleep displacement ratios and relational family friction caused by social media screen usage, restoring biological and emotional baselines.'
    },
    {
      title: 'Deliver Pragmatic Interventions',
      text: 'Translate aggregate data into clear behavioral prescriptions, custom study blocks, and sleep-sanitization schedules tailored for modern students.'
    }
  ];

  const techStack = [
    { category: 'Frontend framework', tech: 'React 19 (Vite SPA)' },
    { category: 'Aesthetic Styling', tech: 'Tailwind CSS v4' },
    { category: 'Interactive Animation', tech: 'Framer Motion' },
    { category: 'Data Visualizations', tech: 'SVG & Chart Skeletons' },
    { category: 'Iconography Suite', tech: 'Lucide Icons' },
    { category: 'Algorithmic Core', tech: 'Explainable Contribution Matrix' }
  ];

  return (
    <PageTransition>
      <div id="about-page" className="py-8 space-y-12">
        
        {/* Header */}
        <SectionTitle
          title="About The Project"
          subtitle="Explore the academic background, clinical objectives, dataset parameters, and technical architecture of our platform."
          badge="Specifications"
        />

        {/* Column Grid: Core Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Description (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description card */}
            <GlassCard className="p-8" hoverEffect={false}>
              <h3 className="text-xl font-display font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-400" /> Executive Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                In the modern hyper-connected era, students struggle with an invisible epidemic: digital dopamine addiction. Standard social platforms utilize highly optimized feedback loops designed to maximize user engagement. This persistent interaction frequently displaces critical student activities, including biological sleep cycles, focused academic blocks, and direct family communications.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                The <strong>Student Digital Well-being Analytics</strong> platform represents a clinical-academic approach to diagnosing this friction. By compiling demographic factors, subjectively reported stress markers, and objective usage metrics, we offer an interactive portal designed to predict screen dependency, explain driver impacts, and prescribe healthy behavioral modifications.
              </p>
            </GlassCard>

            {/* Objectives */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-slate-100 px-1 flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-400" /> Platform Objectives
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {objectives.map((obj, idx) => (
                  <GlassCard key={idx} className="p-6 flex flex-col justify-between" hoverEffect>
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-semibold text-slate-200 text-sm mb-2">{obj.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{obj.text}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Specifications (Right 1 col) */}
          <div className="space-y-6">
            
            {/* Dataset Card */}
            <GlassCard id="about-dataset" className="p-6" hoverEffect={false}>
              <h3 className="font-display font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" /> Dataset & Model
              </h3>
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                  <span className="text-slate-500">Dataset</span>
                  <span className="font-semibold text-slate-200">Egypt Social Media Addiction Dataset</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                  <span className="text-slate-500">Records</span>
                  <span className="font-semibold text-slate-200">12,038 Students</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                  <span className="text-slate-500">Machine Learning</span>
                  <span className="font-semibold text-slate-200">Random Forest Regressor</span>
                </div>
                <div className="space-y-2 pt-2">
                  <span className="text-slate-500">Model Performance</span>
                  <div className="grid gap-1 text-slate-300">
                    <span className="font-semibold">R² : 0.89</span>
                    <span className="font-semibold">RMSE : 0.52</span>
                    <span className="font-semibold">MAE : 0.40</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Tech Stack Card */}
            <GlassCard id="about-tech" className="p-6" hoverEffect={false}>
              <h3 className="font-display font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-teal-400" /> Technology Stack
              </h3>
              
              <div className="space-y-3 text-xs">
                {techStack.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/40 last:border-b-0">
                    <span className="text-slate-500">{item.category}</span>
                    <span className="font-semibold text-slate-200 font-mono text-[11px]">{item.tech}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Research partners */}
            <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/10 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Developed for Educational Research Excellence & Hackathons</span>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
};
