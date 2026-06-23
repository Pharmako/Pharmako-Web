import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Server, Flame, Shield, Activity, Fingerprint } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stacking-card') as HTMLElement[];
      
      cards.forEach((card, index) => {
        // We only animate the card underneath, so we stop before the last card
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];

        // Animate card down as next one covers it
        gsap.fromTo(
          card,
          { scale: 1, filter: 'blur(0px)', opacity: 1 },
          {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(20px)',
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 95%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      });

      // Stagger elements in each card on entry
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('.card-reveal'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="protocol-stack"
      className="relative bg-black z-20 pb-[10vh]"
    >
      {/* Section Introduction (Sticky Header for stack) */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 pt-24 pb-12 text-left">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-matrix font-semibold mb-3">
          MÉTODO EXPRESSO
        </div>
        <h2 className="text-[32px] sm:text-[44px] font-display font-extrabold text-white leading-tight max-w-2xl">
          Como Lançar a Sua Marca Para a Internet em Apenas 3 Passos Essenciais:
        </h2>
      </div>

      {/* Stacking Cards Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24 flex flex-col gap-24 relative">
        
        {/* CARD 1: Seleção da Propriedade Intelectual */}
        <div className="stacking-card w-full rounded-[2.5rem] bg-charcoal border border-charcoal-border p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-matrix/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-6 md:max-w-[50%] text-left">
            <div className="card-reveal flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-matrix/10 border border-matrix/30 flex items-center justify-center text-xs font-mono text-matrix font-bold">
                01
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                ETAPA INICIAL
              </span>
            </div>
            
            <h3 className="card-reveal text-2xl sm:text-3.5xl font-display font-extrabold text-white leading-tight">
              Seleção da Propriedade Intelectual (Pesquisa do Nome)
            </h3>
            
            <p className="card-reveal text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Escolhemos e garantimos o registro do seu nome oficial (o seu <span className="text-matrix font-mono">.com.br</span>) perante os órgãos de registro do Governo brasileiro. Verificamos a disponibilidade e blindamos a sua marca na rede.
            </p>
            
            <div className="card-reveal flex items-center gap-3 text-xs font-mono text-matrix/80">
              <Network className="w-4 h-4" />
              <span>Verificação de WHOIS em tempo real.</span>
            </div>
          </div>

          {/* Animation: Rotating technical gear / DNS Network */}
          <div className="w-full md:w-[40%] flex justify-center items-center h-64 relative">
            <svg className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
              {/* Outer dotted track */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(0, 255, 65, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
              
              {/* Middle Node Track */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(0, 255, 65, 0.25)" strokeWidth="1.5" />
              
              {/* Rotating gear spikes */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="30"
                    x2="100"
                    y2="40"
                    stroke="#00FF41"
                    strokeWidth="2"
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Connecting Nodes */}
              <circle cx="100" cy="40" r="4" fill="#00FF41" />
              <circle cx="100" cy="160" r="4" fill="#00FF41" />
              <circle cx="40" cy="100" r="4" fill="#00FF41" />
              <circle cx="160" cy="100" r="4" fill="#00FF41" />

              {/* Central Logo Symbol */}
              <circle cx="100" cy="100" r="25" fill="#0A0A0A" stroke="#00FF41" strokeWidth="2" />
              <text x="100" y="106" fill="#00FF41" fontSize="18" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
                ✳︎
              </text>
            </svg>
          </div>
        </div>

        {/* CARD 2: Validação do Investimento de Lançamento */}
        <div className="stacking-card w-full rounded-[2.5rem] bg-charcoal border border-charcoal-border p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-matrix/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-6 md:max-w-[50%] text-left">
            <div className="card-reveal flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-matrix/10 border border-matrix/30 flex items-center justify-center text-xs font-mono text-matrix font-bold">
                02
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                ETAPA FINANCEIRA
              </span>
            </div>
            
            <h3 className="card-reveal text-2xl sm:text-3.5xl font-display font-extrabold text-white leading-tight">
              Validação do Investimento de Lançamento
            </h3>
            
            <p className="card-reveal text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Ativação da infraestrutura global por apenas <span className="text-matrix font-bold">R$ 150,00</span> (primeiro mês, com o custo do registro de domínio incluso). Hospedagem ultra-rápida, SSL blindado e configuração de e-mails profissionais integrados.
            </p>
            
            <div className="card-reveal flex items-center gap-3 text-xs font-mono text-matrix/80">
              <Server className="w-4 h-4" />
              <span>Provisionamento de servidor e SSL em nuvem.</span>
            </div>
          </div>

          {/* Animation: Scanning laser grid over node clusters */}
          <div className="w-full md:w-[40%] flex justify-center items-center h-64 relative">
            <div className="relative w-48 h-48 border border-white/10 rounded-xl overflow-hidden bg-black/60 shadow-[0_0_30px_rgba(0,255,65,0.05)]">
              {/* Static Grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border-b border-r border-white/30" />
                ))}
              </div>
              
              {/* Nodes */}
              <div className="absolute inset-0 flex flex-wrap justify-around items-center p-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-matrix/20 border border-matrix/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix animate-ping" />
                  </div>
                ))}
              </div>

              {/* Green Laser Sweep Line */}
              <div className="absolute left-0 w-full h-[2px] bg-matrix border-glow animate-[sweep_3s_ease-in-out_infinite]" />
            </div>
            
            {/* Custom keyframes for laser animation injected directly */}
            <style>{`
              @keyframes sweep {
                0%, 100% { top: 0%; opacity: 0.2; }
                50% { top: 100%; opacity: 1; }
              }
            `}</style>
          </div>
        </div>

        {/* CARD 3: Organização Expressa de Conteúdos */}
        <div className="stacking-card w-full rounded-[2.5rem] bg-charcoal border border-charcoal-border p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-matrix/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-6 md:max-w-[50%] text-left">
            <div className="card-reveal flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-matrix/10 border border-matrix/30 flex items-center justify-center text-xs font-mono text-matrix font-bold">
                03
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                LANÇAMENTO FINAL
              </span>
            </div>
            
            <h3 className="card-reveal text-2xl sm:text-3.5xl font-display font-extrabold text-white leading-tight">
              Organização Expressa de Conteúdos
            </h3>
            
            <p className="card-reveal text-sm sm:text-base text-white/60 leading-relaxed font-light">
              Envio rápido das fotos, textos básicos e contatos pelo WhatsApp. Nossa equipe traduz seus materiais em um layout moderno, persuasivo e focado em converter visitantes em orçamentos diretos. Colocamos você no ar em tempo recorde.
            </p>
            
            <div className="card-reveal flex items-center gap-3 text-xs font-mono text-matrix/80">
              <Activity className="w-4 h-4" />
              <span>Pipeline ativo: pronto para tráfego pago.</span>
            </div>
          </div>

          {/* Animation: Pulsing EKG/Data Waveform */}
          <div className="w-full md:w-[40%] flex justify-center items-center h-64 relative">
            <svg className="w-full max-w-[240px] h-32" viewBox="0 0 200 100">
              {/* EKG / Data stream track */}
              <path
                d="M 10,50 L 50,50 L 60,30 L 70,70 L 80,50 L 110,50 L 115,10 L 125,90 L 135,50 L 190,50"
                fill="none"
                stroke="rgba(0, 255, 65, 0.1)"
                strokeWidth="2"
              />
              
              {/* Animated glowing path */}
              <path
                id="ekg-pulse"
                d="M 10,50 L 50,50 L 60,30 L 70,70 L 80,50 L 110,50 L 115,10 L 125,90 L 135,50 L 190,50"
                fill="none"
                stroke="#00FF41"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="300"
                className="animate-[pulse-path_2.5s_linear_infinite]"
              />
            </svg>
            
            <style>{`
              @keyframes pulse-path {
                0% { stroke-dashoffset: 300; }
                100% { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
        </div>

      </div>
    </div>
  );
}
