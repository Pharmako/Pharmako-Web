import React from 'react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const plans = [
    {
      name: 'Essencial',
      price: '79',
      setup: 'R$ 100 Setup',
      desc: 'Ideal para profissionais liberais, autônomos e validação rápida no mercado.',
      features: [
        'Design profissional responsivo',
        '1 Página Completa (Landing Page)',
        'Hospedagem inclusa 24/7',
        'Domínio registrado (.com.br)',
        'Integração direta com WhatsApp',
        'Certificado SSL de Segurança',
      ],
      notIncluded: [
        'Alterações mensais inclusas',
        'Otimização avançada de SEO',
        'Relatório de Performance mensal',
      ],
      pop: false,
      badge: 'Básico',
    },
    {
      name: 'Performance',
      price: '99',
      setup: 'R$ 150 Setup (Domínio Incluso)',
      desc: 'O plano ideal para empresas que desejam dominar o Google e ter suporte ativo mensal.',
      features: [
        'Design profissional responsivo',
        'Até 3 Páginas Estruturadas',
        'Hospedagem ultra-rápida inclusa',
        'Domínio registrado (.com.br ou .com)',
        'Integração WhatsApp + Formulários',
        'Certificado SSL de Segurança',
        '2 alterações de conteúdo por mês',
        'Otimização avançada de SEO local',
        'Monitoramento de estabilidade',
      ],
      notIncluded: [],
      pop: true,
      badge: 'Recomendado',
    },
    {
      name: 'Corporativo',
      price: '199',
      setup: 'Sem taxa de Setup',
      desc: 'Para empresas consolidadas que exigem integrações dinâmicas e portais complexos.',
      features: [
        'Design profissional sob medida',
        'Multi-páginas ilimitadas',
        'Servidor dedicado de alto desempenho',
        'Domínio registrado (.com.br, .com ou .net)',
        'Formulários e integrações de API',
        'Certificado SSL de Segurança',
        'Alterações mensais sob demanda',
        'SEO Avançado + Sitemap automático',
        'Suporte prioritário 24/7',
        'Painel administrativo integrado',
      ],
      notIncluded: [],
      pop: false,
      badge: 'Avançado',
    },
  ];

  return (
    <section id="pricing-anchor" className="relative bg-black py-24 sm:py-32 border-t border-white/5 z-20 overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute top-1/3 left-1/4 w-[50%] h-[50%] bg-moss/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[40%] h-[40%] bg-clay/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-24">
        {/* Section Header */}
        <div className="text-center flex flex-col gap-4 mb-20">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-matrix font-semibold">
            Investimento Inteligente
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-extrabold text-white leading-tight">
            Planos Sob Medida Para Sua Presença Digital
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-light text-sm sm:text-base">
            Sem contratos abusivos, sem taxas ocultas. Escolha o plano perfeito para o momento do seu negócio.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isPerformance = plan.pop;

            return (
              <div
                key={idx}
                id={`pricing-card-${plan.name.toLowerCase()}`}
                className={`relative flex flex-col justify-between p-8 sm:p-10 select-none transition-all duration-500 rounded-[2.5rem] border ${
                  isPerformance
                    ? 'bg-moss border-moss/45 shadow-[0_20px_50px_rgba(46,64,54,0.4)] text-cream'
                    : 'bg-charcoal border-charcoal-border text-white shadow-2xl hover:border-white/20'
                }`}
              >
                {/* Highlight line overlay for Performance plan */}
                {isPerformance && (
                  <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-clay to-transparent rounded-t-[2.5rem]" />
                )}

                <div>
                  {/* Top Badge & Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full ${
                        isPerformance
                          ? 'bg-cream/15 text-cream border border-cream/25'
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    {isPerformance && (
                      <Sparkles className="w-5 h-5 text-clay animate-pulse" />
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-display font-extrabold mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Plan Description */}
                  <p
                    className={`text-xs font-light mb-8 leading-relaxed ${
                      isPerformance ? 'text-cream/80' : 'text-white/60'
                    }`}
                  >
                    {plan.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2 font-mono">
                    <span className="text-sm font-sans font-light">R$</span>
                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="text-xs font-sans font-light text-white/40">/mês</span>
                  </div>
                  
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider mb-8 ${
                      isPerformance ? 'text-cream/60' : 'text-white/30'
                    }`}
                  >
                    {plan.setup}
                  </div>

                  {/* Features Divider */}
                  <hr
                    className={`my-6 ${
                      isPerformance ? 'border-cream/10' : 'border-white/5'
                    }`}
                  />

                  {/* Features List */}
                  <ul className="flex flex-col gap-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs font-light">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isPerformance ? 'text-clay' : 'text-matrix'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className={`flex items-start gap-3 text-xs font-light ${
                          isPerformance ? 'text-cream/40' : 'text-white/20'
                        }`}
                      >
                        <X className="w-4 h-4 shrink-0 mt-0.5 text-white/20" />
                        <span className="line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sliding Background Magnetic Button */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full relative overflow-hidden group rounded-full text-xs uppercase tracking-wider font-semibold py-4 px-6 transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer hover:scale-[1.03] active:scale-95 ${
                      isPerformance
                        ? 'bg-clay border-clay text-cream hover:shadow-[0_0_20px_rgba(204,88,51,0.5)]'
                        : 'bg-white/5 border-white/10 text-white hover:border-white hover:text-black'
                    }`}
                  >
                    {/* Sliding Layer for color transition */}
                    <span
                      className={`absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-out z-0 ${
                        isPerformance ? 'bg-cream' : 'bg-matrix'
                      }`}
                    />
                    <span className="relative z-10 flex items-center gap-1.5 font-bold">
                      Assinar Plano {plan.name}
                      <span className="text-[14px]">↗</span>
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote / Guarantee */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4 border border-white/5 bg-charcoal/30 rounded-2xl p-6">
          <ShieldAlert className="w-6 h-6 text-matrix shrink-0" />
          <p className="text-xs text-white/60 font-light max-w-xl text-left leading-relaxed">
            <span className="font-semibold text-white font-mono">SUPORTE SEM COMPLICAÇÕES:</span> Todos os nossos planos incluem backup diário automatizado, proteção SSL de nível militar e migração grátis caso você já possua um domínio registrado. Cancele quando quiser, sem taxas de fidelidade contratual.
          </p>
        </div>

      </div>
    </section>
  );
}
