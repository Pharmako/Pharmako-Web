import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-charcoal border-t border-white/5 rounded-t-[4rem] pt-20 pb-10 z-20 relative select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Logo & Manifesto description */}
          <div className="md:col-span-2 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-display font-semibold tracking-tight text-white">
                Pharmako WEB
              </span>
              <span className="text-[20px] text-matrix animate-pulse-slow">✳︎</span>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm">
              Reinventando a presença digital de pequenos negócios através de Website as a Service (WaaS). Design de luxo, velocidade insana e infraestrutura de ponta sob uma assinatura simples de R$ 112,45/mês.
            </p>

            {/* System Status Indicator */}
            <div className="flex items-center gap-2.5 bg-black/40 border border-white/5 w-fit px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-matrix"></span>
              </span>
              <span className="text-[10px] font-mono text-matrix tracking-widest uppercase font-semibold">
                SISTEMA OPERACIONAL ATIVO
              </span>
            </div>
          </div>

          {/* Links Column 1: Navegação */}
          <div className="flex flex-col gap-4 text-left">
            <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider">
              Navegação
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-light text-white/60">
              <a href="#hero-section" className="hover:text-matrix transition-colors duration-200">Início</a>
              <a href="#pain-points" className="hover:text-matrix transition-colors duration-200">Independência</a>
              <a href="#protocol-stack" className="hover:text-matrix transition-colors duration-200">Etapas de Lançamento</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <hr className="border-white/5 my-8" />

        {/* Bottom Bar Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 sm:items-start items-center">
            <span className="text-[10px] font-mono text-white/30 tracking-wider text-center sm:text-left">
              © {new Date().getFullYear()} PHARMAKO WEB. TODOS OS DIREITOS RESERVADOS.
            </span>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/20 uppercase tracking-widest justify-center sm:justify-start">
              <Shield className="w-3 h-3 text-matrix" />
              <span>Conexão Segura e Criptografada SSL</span>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-matrix bg-black/50 hover:bg-matrix/10 text-white hover:text-matrix flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
            title="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
