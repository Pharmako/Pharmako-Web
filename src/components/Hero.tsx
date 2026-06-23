import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekTimeRef = useRef<number | null>(null);

  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Staggered text fade-up using GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        '#hero-badge',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', delay: 0.2 }
      )
        .fromTo(
          '#hero-title-main',
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)' },
          '-=0.8'
        )
        .fromTo(
          '#hero-title-italic',
          { opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
          '-=0.9'
        )
        .fromTo(
          '#hero-subheadline',
          { opacity: 0, y: 30 },
          { opacity: 0.8, y: 0 },
          '-=0.8'
        )
        .fromTo(
          '#hero-cta',
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          '-=0.7'
        );

      // Scroll indicator fade in later
      setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1500);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse scrubbing handler restricted to Hero Section
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    if (!duration || isNaN(duration)) {
      prevXRef.current = e.clientX;
      return;
    }

    const currentX = e.clientX;
    if (prevXRef.current === null) {
      prevXRef.current = currentX;
      return;
    }

    const delta = currentX - prevXRef.current;
    prevXRef.current = currentX;

    const SENSITIVITY = 0.8;
    const width = window.innerWidth || 1920;
    const timeDelta = (delta / width) * SENSITIVITY * duration;

    let nextTarget = targetTimeRef.current + timeDelta;
    if (nextTarget < 0) nextTarget = 0;
    if (nextTarget > duration) nextTarget = duration;

    targetTimeRef.current = nextTarget;

    if (!isSeekingRef.current) {
      isSeekingRef.current = true;
      video.currentTime = nextTarget;
    } else {
      pendingSeekTimeRef.current = nextTarget;
    }
  };

  const handleMouseLeave = () => {
    prevXRef.current = null;
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (pendingSeekTimeRef.current !== null) {
      const nextTime = pendingSeekTimeRef.current;
      pendingSeekTimeRef.current = null;
      video.currentTime = nextTime;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    targetTimeRef.current = e.currentTarget.currentTime;
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative h-[100dvh] w-full flex flex-col justify-center pt-28 pb-12 md:justify-center md:pt-0 md:pb-0 px-6 sm:px-12 md:px-24 overflow-hidden select-none bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        id="hero-bg-video"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 max-md:object-[75%_20%] object-[75%_center]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Cybernetic Moss-to-Black Gradient Overlay */}
      <div 
        id="hero-gradient-overlay"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none"
      />
      <div 
        id="hero-vignette-overlay"
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"
      />
      <div 
        id="hero-color-glow"
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] z-[1] bg-[#2E4036]/15 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Hero Content pushed to the bottom-left third */}
      <div 
        id="hero-content-box"
        className="max-w-3xl relative z-10 flex flex-col gap-5 sm:gap-6 text-left mt-0 md:mt-20"
      >
        {/* Badge / Label */}
        <div id="hero-badge" className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-ping shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-mono text-matrix/90 font-semibold leading-normal">
            Para Pequenos Negócios, Prestadores & Autônomos
          </span>
        </div>

        {/* H1 Headline */}
        <h1 className="flex flex-col gap-1 sm:gap-2">
          <span 
            id="hero-title-main" 
            className="text-[30px] sm:text-[54px] md:text-[68px] font-display font-extrabold tracking-tight leading-[1.05] text-white"
          >
            Site Profissional.
          </span>
          <span 
            id="hero-title-italic" 
            className="text-[34px] sm:text-[60px] md:text-[76px] font-serif italic text-matrix text-glow leading-[1.1]"
          >
            Preço Acessível.
          </span>
        </h1>

        {/* Sub-headline */}
        <p 
          id="hero-subheadline"
          className="text-[16px] sm:text-[20px] text-white/80 max-w-xl leading-relaxed font-sans font-light"
        >
          Parecer profissional na internet não precisa ser caro. Nós criamos e mantemos o seu site rodando perfeitamente. Você paga uma assinatura simples de <span className="font-semibold text-white">R$ 100 por mês</span>, tem o melhor custo-benefício e foca no seu negócio.
        </p>

        {/* Primary CTA (Magnetic sliding button) */}
        <div id="hero-cta" className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={onCtaClick}
            id="hero-cta-button"
            className="relative overflow-hidden group bg-matrix border border-matrix text-black rounded-full px-8 py-4 font-display font-bold text-sm sm:text-base hover:shadow-[0_0_30px_rgba(0,255,65,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="absolute inset-0 w-0 group-hover:w-full bg-white transition-all duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Quero Meu Site Hoje
              <span className="text-[16px] font-sans">↗</span>
            </span>
          </button>
          <span className="text-xs font-mono text-white/40 pt-2 sm:pt-0 uppercase tracking-widest">
            Primeiro Mês: R$ 150 (Domínio Incluso)
          </span>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#pain-points"
        id="scroll-indicator"
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-700 ${
          showScrollIndicator ? 'opacity-50 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">Descer</span>
        <ArrowDown className="w-4 h-4 text-matrix animate-bounce" />
      </a>
    </section>
  );
}
