import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import { MessageSquare, X, Sparkles } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Trigger WhatsApp redirection with toast feedback
  const handleConnectWhatsApp = (messageText: string) => {
    setToastMessage(messageText);
    setShowToast(true);

    // Redirect after 1.5 seconds of simulated high-end secure connection
    setTimeout(() => {
      const phoneNumber = '5531975670641'; // User's phone number
      const encodedText = encodeURIComponent(
        'Olá! Vim pelo site da Pharmako WEB e gostaria de saber mais sobre a assinatura de sites.'
      );
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
      
      // Auto-hide toast after page focus returns/transition completes
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }, 1500);
  };

  const handleNavbarCta = () => {
    handleConnectWhatsApp('Conectando ao consultor de implantação Pharmako...');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-matrix/30 selection:text-matrix">
      {/* Fixed Navigation Bar */}
      <Navbar onCtaClick={handleNavbarCta} />

      {/* Main Sections */}
      <main>
        <Hero onCtaClick={handleNavbarCta} />
        <PainPoints />
        <Philosophy />
        <Protocol />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button (WhatsApp FAB) with interactive bounce */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleConnectWhatsApp('Conectando com o Suporte Comercial...')}
          className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] border border-white/10 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Fale Conosco no WhatsApp"
        >
          {/* Pulsing ring around button */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none group-hover:animate-none" />
          
          <MessageSquare className="w-6 h-6 z-10" />

          {/* Hover tooltips/labels */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-charcoal border border-charcoal-border text-white text-[10px] font-mono uppercase tracking-widest px-3.5 py-2 rounded-xl whitespace-nowrap shadow-2xl transition-all duration-300 origin-right flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            Suporte Online
          </span>
        </button>
      </div>

      {/* Custom High-Fidelity Connection Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:-translate-x-0 z-50 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
          <div className="bg-charcoal border border-matrix/30 shadow-[0_10px_40px_rgba(0,255,65,0.15)] rounded-2xl p-4 flex items-center gap-4 max-w-sm">
            <div className="w-8 h-8 rounded-lg bg-matrix/10 border border-matrix/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-matrix animate-spin" />
            </div>
            
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                Autenticando Conexão
              </span>
              <span className="text-xs text-white/90 font-light truncate max-w-[200px]">
                {toastMessage}
              </span>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CSS Animation Keyframes for Toast */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translate3d(var(--tw-translate-x, 0), 30px, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(var(--tw-translate-x, 0), 0, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
