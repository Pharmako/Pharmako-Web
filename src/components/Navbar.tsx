import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onCtaClick: () => void;
}

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="floating-island-navbar"
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full transition-all duration-500 ease-out px-4 py-2 sm:px-8 sm:py-3 flex justify-between items-center ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-md border border-matrix/20 shadow-[0_4px_30px_rgba(0,255,65,0.15)] py-2 sm:py-3'
          : 'bg-transparent border border-transparent py-3 sm:py-4'
      }`}
    >
      {/* Brand Logo & Symbol */}
      <div 
        id="navbar-brand" 
        className="flex items-center gap-1.5 sm:gap-2 select-none cursor-pointer whitespace-nowrap shrink-0"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span 
          className={`text-[15px] sm:text-[22px] font-display font-semibold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-matrix' : 'text-white'
          }`}
        >
          Pharmako WEB
        </span>
        <span className="text-[16px] sm:text-[20px] text-matrix animate-pulse-slow">✳︎</span>
      </div>

      {/* Center Links (Desktop only) */}
      <div 
        id="navbar-links" 
        className="hidden md:flex items-center gap-8 text-[14px] font-medium tracking-wide uppercase"
      >
        <a 
          href="#hero-section" 
          className="text-white/60 hover:text-matrix transition-colors duration-200"
        >
          Início
        </a>
        <a 
          href="#pain-points" 
          className="text-white/60 hover:text-matrix transition-colors duration-200"
        >
          Independência
        </a>
        <a 
          href="#protocol-stack" 
          className="text-white/60 hover:text-matrix transition-colors duration-200"
        >
          Etapas
        </a>
      </div>

      {/* Sliding Background Magnetic Button (Right) */}
      <div id="navbar-cta-wrapper" className="shrink-0">
        <button
          onClick={onCtaClick}
          id="navbar-cta-button"
          className={`relative overflow-hidden group rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-3 py-1.5 sm:px-6 sm:py-2.5 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border cursor-pointer ${
            isScrolled
              ? 'bg-matrix border-matrix text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]'
              : 'bg-white/10 hover:bg-white border-white/20 hover:border-white text-white hover:text-black'
          }`}
        >
          {/* Sliding color transition layer */}
          <span 
            className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-out z-0 ${
              isScrolled ? 'bg-white' : 'bg-matrix'
            }`}
          />
          <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
            Assinar Agora
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
        </button>
      </div>
    </nav>
  );
}
