import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Heart, Github, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/40 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-teal-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-slate-950 text-teal-400">
                  <BrainCircuit className="h-4 w-4" />
                </div>
              </div>
              <span className="font-display text-sm font-extrabold tracking-tight text-white uppercase">
                Student Well-being Analytics
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering students and educational institutions with diagnostic analytics and explainable AI insights to understand and restore balance in digital lifestyles.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Core Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Interactive Dashboard
                </Link>
              </li>
              <li>
                <Link to="/predict" className="text-slate-400 hover:text-teal-400 transition-colors">
                  AI Risk Prediction
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Diagnosis Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Context / Hackathon */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-teal-400 transition-colors">
                  About Project
                </Link>
              </li>
              <li>
                <a href="#about-dataset" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Dataset Specifications
                </a>
              </li>
              <li>
                <a href="#about-tech" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Technical Stack
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Student Digital Well-being Analytics.</span>
            <span>Designed for Hackathon Excellence.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-purple-500 fill-purple-500 animate-pulse" /> for well-being
            </span>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2.5">
              <a href="#" className="hover:text-slate-300 transition-colors" aria-label="Github Repo">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors" aria-label="Web">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
