import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { FeatureCard } from '../components/FeatureCard';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { PageTransition } from '../components/PageTransition';
import { SectionTitle } from '../components/SectionTitle';
import { GlassCard } from '../components/GlassCard';
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  Users, 
  Layers, 
  TrendingUp, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Predict Addiction',
      description: 'Analyze digital behaviors, platform triggers, and usage habits using customized ML models to calculate Screen Dependency indices.',
      iconName: 'ShieldCheck' as const,
    },
    {
      title: 'Interactive Analytics',
      description: 'Explore the delicate relationships between daily sleep debt, academic standings, family friction, and screen engagement vectors.',
      iconName: 'Activity' as const,
    },
    {
      title: 'Explainable AI',
      description: 'Receive transparent significance evaluations explaining exactly why a behavioral vector impact triggers a specific risk warning.',
      iconName: 'Brain' as const,
    },
    {
      title: 'Personalized Recommendations',
      description: 'Obtain custom-tailored behavioral prescriptions and digital sleep sanitization guides optimized for students and schools.',
      iconName: 'Sparkles' as const,
    },
  ];

  return (
    <PageTransition>
      <div id="landing-page" className="relative py-12 md:py-20 space-y-24">
        
        {/* Decorative background orbs */}
        <div className="absolute top-10 left-1/4 -z-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 -z-10 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <section id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Tagline / Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold tracking-wide text-purple-300 uppercase"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            Hackathon Live Prototype
          </motion.div>

          {/* Large Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6.5xl font-display font-black tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Student <span className="text-gradient">Digital Well-being</span> Analytics
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Predict, Analyze and Improve Digital Well-being using Explainable AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              id="hero-primary-cta"
              variant="primary"
              size="lg"
              onClick={() => navigate('/predict')}
              className="group w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              id="hero-secondary-cta"
              variant="secondary"
              size="lg"
              onClick={() => navigate('/about')}
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </motion.div>

        </section>

        {/* Features Grid */}
        <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Intelligent Diagnostic Suite"
            subtitle="Explore how our system combines student demographics, behavioral indicators, and environmental friction to reconstruct attention health."
            badge="Features"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <FeatureCard
                key={feat.title}
                title={feat.title}
                description={feat.description}
                iconName={feat.iconName}
                delay={idx * 0.12}
                id={`feature-card-${idx}`}
              />
            ))}
          </div>
        </section>

        {/* Statistics Banner */}
        <section id="statistics" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-10 md:p-14 border border-white/5 bg-slate-900/40" hoverEffect={false}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:divide-x md:divide-slate-800">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  <AnimatedCounter value={12038} suffix="+" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Students Modeled
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center space-y-2 md:pl-6">
                <div className="p-3 rounded-full bg-teal-500/10 text-teal-400 mb-2">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                  Interactive
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Dashboard Ecosystem
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center space-y-2 md:pl-6">
                <div className="p-3 rounded-full bg-fuchsia-500/10 text-fuchsia-400 mb-2">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                  AI Powered
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Explainable Core
                </span>
              </div>

            </div>
          </GlassCard>
        </section>

      </div>
    </PageTransition>
  );
};
