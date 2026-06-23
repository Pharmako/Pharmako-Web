import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background scroll effect
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Fade up columns
      gsap.fromTo(
        '#manifesto-left',
        { opacity: 0, x: -50 },
        {
          opacity: 0.5,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '#manifesto-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative h-[80vh] sm:h-screen w-full flex items-center overflow-hidden z-20 bg-charcoal"
    >
      {/* Parallax Background Image with Heavy Green-Black overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] bg-cover bg-center z-0 filter brightness-[0.22] contrast-[1.1] saturate-[0.6]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09')",
        }}
      />
      
      {/* Dark overlays to blend into sections above/below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[1] pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-black to-transparent z-[1] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          
          {/* Left Block - Traditional view */}
          <div 
            id="manifesto-left" 
            className="flex flex-col gap-4 text-left border-l border-white/10 pl-6 md:pl-10"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
              O Modelo Antigo
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-medium text-white/60">
              A agência tradicional pergunta:
            </h3>
            <p className="text-[28px] sm:text-[38px] font-serif italic text-white/40 leading-tight">
              "Quanto você tem de orçamento para criar um site?"
            </p>
          </div>

          {/* Right Block - WaaS view */}
          <div 
            id="manifesto-right" 
            className="flex flex-col gap-4 text-left border-l-2 border-matrix pl-6 md:pl-10"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-matrix font-semibold">
              Nosso Manifesto
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Nós da Pharmako WEB perguntamos:
            </h3>
            <p className="text-[32px] sm:text-[44px] font-serif italic text-matrix text-glow leading-tight">
              "Quão rápido podemos colocar a sua empresa no ar?"
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-md mt-2">
              Não cobramos pelo código; cobramos pelo seu funcionamento constante. Eliminamos as barreiras financeiras e a burocracia para que sua marca tenha a autoridade digital que merece imediatamente.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
