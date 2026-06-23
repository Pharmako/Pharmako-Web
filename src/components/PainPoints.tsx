import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, TrendingDown, EyeOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PainPoints() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate SVG graphic lines and warnings
      gsap.fromTo(
        '#chart-path',
        { strokeDashoffset: 500, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '#pain-badge-container > div',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Slide and reveal text contents
      gsap.fromTo(
        '#pain-text-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pain-points"
      className="relative bg-black py-24 sm:py-32 border-t border-white/5 overflow-hidden z-20"
    >
      {/* Dark organic glow behind background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#cc5833]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Cybernetic Visual Dashboard (SVG Chart & Lock) */}
          <div 
            id="pain-visual-container"
            className="relative flex justify-center items-center rounded-[2rem] border border-white/10 bg-charcoal/50 p-6 sm:p-10 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-matrix/5 to-transparent rounded-[2rem] pointer-events-none" />
            
            {/* The Phone Mockup */}
            <div className="relative w-full max-w-[280px] aspect-[9/18] rounded-[2.5rem] border-4 border-white/15 bg-black overflow-hidden shadow-2xl flex flex-col justify-between p-4">
              {/* Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-1 bg-black rounded-full" />
              </div>

              {/* Header Telemetry */}
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30 pt-4">
                <span>SYS_CRITICAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>

              {/* Center Content Graph and Alerts */}
              <div className="my-auto flex flex-col gap-5 py-4">
                
                {/* Fall Chart */}
                <div className="relative h-28 border-b border-l border-white/10 px-2 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 80">
                    {/* Grid Lines */}
                    <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.05)" />
                    
                    {/* Path representing falling stats */}
                    <path
                      id="chart-path"
                      d="M 5,10 C 25,12 40,48 55,52 C 70,55 85,75 95,78"
                      fill="none"
                      stroke="#cc5833"
                      strokeWidth="3"
                      strokeDasharray="500"
                    />
                  </svg>
                  
                  {/* Floating Telemetry Box */}
                  <div className="absolute top-2 right-2 border border-[#cc5833]/30 bg-black/80 px-2 py-1 rounded text-[8px] font-mono text-[#cc5833]">
                    RETENÇÃO: -84%
                  </div>
                </div>

                {/* Lock warning badge list */}
                <div id="pain-badge-container" className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 border border-white/5 bg-white/5 rounded-lg p-2.5">
                    <ShieldAlert className="w-4 h-4 text-[#cc5833] shrink-0" />
                    <span className="text-[10px] font-mono text-white/70 leading-none">
                      Conta Bloqueada / Algoritmo Reduzido
                    </span>
                  </div>

                  <div className="flex items-center gap-2 border border-white/5 bg-white/5 rounded-lg p-2.5">
                    <EyeOff className="w-4 h-4 text-white/40 shrink-0" />
                    <span className="text-[10px] font-mono text-white/70 leading-none">
                      Alcance Orgânico Limitado
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Mockup */}
              <div className="text-center text-[8px] font-mono text-white/20 pb-2 uppercase tracking-widest">
                Termos do Terreno Alugado
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/20 select-none hidden sm:block">
              // TELEMETRY_01
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-white/20 select-none hidden sm:block">
              STATUS: INSTÁVEL
            </div>
          </div>

          {/* Right Column - Text Copy */}
          <div 
            id="pain-text-content"
            className="flex flex-col gap-6 text-left"
          >
            {/* Title / Badge */}
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-matrix font-semibold">
              PARE DE DEPENDER DE TERCEIROS
            </div>

            {/* H2 Heading */}
            <h2 
              className="text-[28px] sm:text-[38px] md:text-[44px] font-display font-extrabold text-white leading-tight tracking-tight"
            >
              O Instagram não é seu. O seu site, <span className="text-matrix font-serif italic text-glow">sim</span>.
            </h2>

            {/* Body copy */}
            <p 
              className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed font-light"
            >
              Construir sua marca apenas nas redes sociais é arriscado. Se o algoritmo muda ou sua conta sofre um bloqueio, o seu negócio some da internet da noite para o dia.
            </p>
            <p 
              className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed font-light"
            >
              Ter um site próprio é ter a sua casa: você dita as regras, passa muito mais credibilidade e garante que o seu cliente sempre te encontre. É a <span className="font-semibold text-white border-b border-matrix/50">independência</span> da sua marca.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
