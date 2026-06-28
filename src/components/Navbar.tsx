import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BrainCircuit, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Predict', path: '/predict' },
    { name: 'Report', path: '/report' },
    { name: 'About', path: '/about' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo on Left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 text-white focus:outline-none">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-teal-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-teal-400">
                  <BrainCircuit className="h-5.5 w-5.5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-extrabold tracking-tight text-white uppercase sm:text-base">
                  Digital Well-being
                </span>
                <span className="text-[10px] text-teal-400 font-mono tracking-wider font-semibold uppercase -mt-1 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 animate-pulse" /> Explainable AI
                </span>
              </div>
            </Link>
          </div>

          {/* Links on Right - Desktop */}
          <nav className="hidden md:flex items-center gap-1.5">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-slate-300 hover:text-white"
                >
                  {/* Background highlight for active link */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-lg bg-white/5 border border-white/5"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-teal-400 font-semibold' : ''}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Hamburger Menu - Mobile */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="space-y-1.5 px-4 py-4">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-teal-500/20 text-teal-400' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
