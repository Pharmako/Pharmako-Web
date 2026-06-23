import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Terminal, Calendar, Globe, Award, Cloud, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Features() {
  // === Card 1: Diagnostic Shuffler ===
  const shufflerLabels = [
    { title: 'Registro de Domínio .com.br', icon: Globe, detail: 'Seu nome oficial registrado direto nos órgãos nacionais.' },
    { title: 'Hospedagem Dedicada 24/7', icon: Cloud, detail: 'Hospedagem de alta velocidade e blindada contra quedas.' },
    { title: 'Design Exclusivo e Rápido', icon: Cpu, detail: 'Código otimizado para carregar instantaneamente no celular.' }
  ];
  
  const [shufflerIndex, setShufflerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setShufflerIndex((prev) => (prev + 1) % shufflerLabels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  // === Card 2: Telemetry Typewriter ===
  const telemetryMessages = [
    'Inicializando contêiner Docker...',
    'Vinculando domínio dns.pharmakoweb.com.br...',
    'Instalando certificado SSL Let\'s Encrypt...',
    'Habilitando cache global Cloudflare CDN...',
    'Otimizando tempo de resposta do servidor...',
    'Processando compactação de imagens WebP...',
    'Indexando sitemap no Google Search Console...',
    'Sistema Ativo e operacional!'
  ];

  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect for terminal logs
  useEffect(() => {
    if (messageIndex < telemetryMessages.length) {
      const fullText = telemetryMessages[messageIndex];
      if (charIndex < fullText.length) {
        const charTimer = setTimeout(() => {
          setCurrentLine((prev) => prev + fullText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(charTimer);
      } else {
        // Line finished. Add it to visible logs, wait, then type next line
        const delayTimer = setTimeout(() => {
          setVisibleLogs((prev) => [...prev, fullText]);
          setCurrentLine('');
          setCharIndex(0);
          setMessageIndex((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(delayTimer);
      }
    } else {
      // Loop logs back after 4 seconds
      const loopTimer = setTimeout(() => {
        setVisibleLogs([]);
        setCurrentLine('');
        setCharIndex(0);
        setMessageIndex(0);
      }, 4000);
      return () => clearTimeout(loopTimer);
    }
  }, [messageIndex, charIndex]);

  // Scroll to bottom of terminal container without hijacking window scroll
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [visibleLogs, currentLine]);


  // === Card 3: Mock Cursor Protocol Scheduler ===
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const day3Ref = useRef<HTMLButtonElement | null>(null); // Quarta-feira (W)
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!cursorRef.current || !day3Ref.current || !saveBtnRef.current || !containerRef.current) return;

    const cursor = cursorRef.current;
    const dayBtn = day3Ref.current;
    const saveBtn = saveBtnRef.current;

    // Reset loop function
    const runCursorSequence = () => {
      setActiveDay(null);
      setIsSaved(false);
      
      const tl = gsap.timeline({ repeat: -1 });

      // Start position (outside the box or top-left)
      tl.set(cursor, { x: 20, y: 15, opacity: 0 });

      // Fade in cursor
      tl.to(cursor, { opacity: 1, duration: 0.4 });

      // Move to Quarta-feira (W)
      tl.to(cursor, {
        x: () => {
          const rect = dayBtn.getBoundingClientRect();
          const parentRect = containerRef.current!.getBoundingClientRect();
          return rect.left - parentRect.left + rect.width / 2;
        },
        y: () => {
          const rect = dayBtn.getBoundingClientRect();
          const parentRect = containerRef.current!.getBoundingClientRect();
          return rect.top - parentRect.top + rect.height / 2;
        },
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // Hover effect on the button (scale down cursor to click)
      tl.to(cursor, { scale: 0.8, duration: 0.15 })
        .call(() => {
          setActiveDay('Q'); // Set day active
        })
        // Release click
        .to(cursor, { scale: 1, duration: 0.15 });

      // Pause briefly
      tl.to(cursor, {}, '+=0.5');

      // Move to "Salvar / Publicar" button
      tl.to(cursor, {
        x: () => {
          const rect = saveBtn.getBoundingClientRect();
          const parentRect = containerRef.current!.getBoundingClientRect();
          return rect.left - parentRect.left + rect.width / 2;
        },
        y: () => {
          const rect = saveBtn.getBoundingClientRect();
          const parentRect = containerRef.current!.getBoundingClientRect();
          return rect.top - parentRect.top + rect.height / 2;
        },
        duration: 1.0,
        ease: 'power2.inOut',
      });

      // Click the button
      tl.to(cursor, { scale: 0.8, duration: 0.15 })
        .call(() => {
          setIsSaved(true);
        })
        .to(cursor, { scale: 1, duration: 0.15 });

      // Fade out cursor
      tl.to(cursor, { opacity: 0, duration: 0.5, delay: 1.2 });
    };

    // Delay initialization slightly to let layout solve offsets
    const initTimer = setTimeout(() => {
      runCursorSequence();
    }, 800);

    return () => {
      clearTimeout(initTimer);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <section
      id="features-dashboard"
      className="relative bg-[#050505] py-24 sm:py-32 border-t border-white/5 z-20"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        
        {/* Section Header */}
        <div className="text-center flex flex-col gap-4 mb-20">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-matrix font-semibold">
            Instrumentação de Ponta
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-extrabold text-white leading-tight">
            Nossa Infraestrutura Digital Integrada
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-light text-sm sm:text-base">
            Substituímos cartões estáticos por painéis interativos funcionais para que você veja exatamente o nível de excelência que opera no seu site.
          </p>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div 
            id="shuffler-card"
            className="flex flex-col justify-between bg-charcoal border border-charcoal-border rounded-[2rem] p-8 relative overflow-hidden select-none min-h-[380px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-matrix/5 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  01 // MÓDULOS ESSENCIAIS
                </span>
                <Award className="w-5 h-5 text-matrix" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Shuffler de Ativos
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Garantimos os três pilares que transformam visitas em vendas, operando em sincronia total.
              </p>
            </div>

            {/* Overlapping Shuffler Area */}
            <div className="relative h-44 flex items-center justify-center my-6">
              {shufflerLabels.map((item, idx) => {
                // Calculate position relative to shufflerIndex
                const diff = (idx - shufflerIndex + shufflerLabels.length) % shufflerLabels.length;
                
                // Spring scale and translating styles based on stack order
                let translateY = '0px';
                let scale = 1;
                let zIndex = 0;
                let opacity = 0;

                if (diff === 0) {
                  // Active card (front)
                  translateY = '0px';
                  scale = 1.0;
                  zIndex = 20;
                  opacity = 1;
                } else if (diff === 1) {
                  // Middle card (stacked below)
                  translateY = '16px';
                  scale = 0.92;
                  zIndex = 10;
                  opacity = 0.7;
                } else {
                  // Back card (nearly hidden)
                  translateY = '-16px';
                  scale = 0.85;
                  zIndex = 5;
                  opacity = 0.3;
                }

                const IconComponent = item.icon;

                return (
                  <div
                    key={idx}
                    className="absolute w-full max-w-[280px] bg-charcoal-light border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-700"
                    style={{
                      transform: `translateY(${translateY}) scale(${scale})`,
                      zIndex: zIndex,
                      opacity: opacity,
                      transformOrigin: 'center center',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-matrix/10 border border-matrix/20 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-matrix" />
                      </div>
                      <span className="text-xs font-display font-semibold text-white truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-relaxed font-light">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest text-center mt-2">
              atualizando status a cada 3.0s
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div 
            id="telemetry-card"
            className="flex flex-col justify-between bg-charcoal border border-charcoal-border rounded-[2rem] p-8 relative overflow-hidden select-none min-h-[380px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-matrix/5 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  02 // INSTALAÇÃO E LOGS
                </span>
                
                {/* Live pulsing dot */}
                <div className="flex items-center gap-1.5 bg-matrix/10 border border-matrix/20 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-matrix animate-pulse" />
                  <span className="text-[8px] font-mono text-matrix tracking-wider uppercase font-semibold">FEED ATIVO</span>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Painel de Telemetria
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Monitoramento em tempo real do pipeline de implantação da nossa infraestrutura WaaS.
              </p>
            </div>

            {/* Terminal Feed Viewport */}
            <div 
              ref={terminalContainerRef}
              className="my-5 h-44 bg-black border border-white/5 rounded-xl p-4 font-mono text-[10px] text-matrix/90 overflow-y-auto flex flex-col gap-2 shadow-inner"
            >
              {visibleLogs.map((log, idx) => (
                <div key={idx} className="flex gap-1.5">
                  <span className="text-white/30">&gt;</span>
                  <span className="leading-relaxed">{log}</span>
                </div>
              ))}
              
              {/* Typewriter Line */}
              {messageIndex < telemetryMessages.length && (
                <div className="flex gap-1.5">
                  <span className="text-matrix font-bold">&gt;</span>
                  <span className="leading-relaxed">
                    {currentLine}
                    <span className="inline-block w-[4px] h-[1.1em] bg-matrix ml-0.5 animate-cursor-blink" />
                  </span>
                </div>
              )}
            </div>

            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest text-center mt-2 flex items-center justify-center gap-2">
              <Terminal className="w-3 h-3 text-white/30" />
              console.pharmako-waas.log
            </div>
          </div>

          {/* Card 3: Mock Cursor Protocol Scheduler */}
          <div 
            ref={containerRef}
            id="scheduler-card"
            className="flex flex-col justify-between bg-charcoal border border-charcoal-border rounded-[2rem] p-8 relative overflow-hidden select-none min-h-[380px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-matrix/5 blur-3xl rounded-full pointer-events-none" />

            {/* Mock cursor overlay */}
            <div 
              ref={cursorRef}
              className="absolute w-4 h-4 pointer-events-none z-30 select-none opacity-0"
              style={{ transformOrigin: 'top left' }}
            >
              {/* Classic Vector Cursor Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 3V19L9.42 13.58L16.2 21L19.8 17.4L13.12 10.12L19.42 3H4Z" fill="#00FF41" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  03 // AGENDAMENTO MOCK
                </span>
                <Calendar className="w-5 h-5 text-matrix" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Protocolo de Lançamento
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Agendamos o lançamento do seu site com um clique. Simulação do processo automatizado.
              </p>
            </div>

            {/* Calendar Grid & Button */}
            <div className="my-5 flex flex-col gap-4 bg-black/40 border border-white/5 rounded-xl p-4 relative">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/30 border-b border-white/5 pb-2">
                <span>SELECIONE A DATA</span>
                <span>JUNHO 2026</span>
              </div>
              
              {/* Week Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-[8px] font-mono text-white/20 uppercase font-semibold">
                    {day}
                  </div>
                ))}

                {/* Days of Month Mock */}
                {[...Array(7)].map((_, idx) => {
                  const dayNum = idx + 10;
                  const isDay3 = idx === 3; // Let's make "Q" (Wed, June 13) click-target
                  const isSelected = activeDay === 'Q' && isDay3;

                  return (
                    <button
                      ref={isDay3 ? day3Ref : null}
                      key={idx}
                      disabled
                      className={`h-7 rounded-lg text-[10px] font-mono flex items-center justify-center border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-matrix/20 border-matrix text-matrix font-bold scale-95 shadow-[0_0_10px_rgba(0,255,65,0.2)]'
                          : 'bg-charcoal/50 border-white/5 text-white/60'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* Action Button to Click */}
              <button
                ref={saveBtnRef}
                disabled
                className={`w-full py-2.5 rounded-lg text-[10px] font-display font-bold uppercase tracking-wider border transition-all duration-500 mt-2 ${
                  isSaved
                    ? 'bg-matrix border-matrix text-black scale-95 shadow-[0_0_15px_rgba(0,255,65,0.3)]'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                {isSaved ? '✓ Lançamento Agendado' : 'Publicar Site'}
              </button>
            </div>

            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest text-center mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-matrix" />
              fluxo operacional otimizado
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
