import { useState } from 'react';
import { PSYCHOLOGICAL_MODULES } from '@/data/judasData';

export default function JudasPsychologicalCore() {
  const [activeMod, setActiveMod] = useState(0);
  const current = PSYCHOLOGICAL_MODULES[activeMod];

  return (
    <section id="psychology" className="py-28 px-6 md:px-16 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-[#ff003c]/30 pb-6 mb-16 font-mono text-xs text-[#ff003c]">
          <span>[SYSTEM ARCHITECTURE // PSYCHOLOGICAL TOPOLOGY]</span>
          <span>CLAUDE ETD & ADR PROTOCOLS</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-mono text-xs text-[#ffd700] tracking-widest uppercase mb-3">Núcleo Analítico y Comportamental</p>
          <h2 className="font-[Cinzel_Decorative] text-4xl md:text-6xl font-bold tracking-tight mb-6">
            La Topología de la <span className="text-[#ff003c] italic">Traición</span>
          </h2>
          <p className="font-[Chakra_Petch] text-base text-white/70 font-light leading-relaxed">
            Exploración profunda de los mecanismos sociológicos y cognitivos que sustentan la Judas Era: desde el rechazo a la mediocridad hasta la arquitectura de decisiones inmutables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Selector */}
          <div className="lg:col-span-1 space-y-4">
            {PSYCHOLOGICAL_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setActiveMod(idx)}
                className={`w-full text-left p-5 transition-all border ${activeMod === idx ? 'border-[#ff003c] bg-[rgba(255,0,60,0.08)] text-white shadow-[0_0_25px_rgba(255,0,60,0.25)]' : 'border-white/10 text-white/60 hover:border-white/40 hover:text-white'}`}
              >
                <div className="font-mono text-[10px] text-[#ff003c] mb-1">{mod.code}</div>
                <div className="font-[Cinzel_Decorative] text-base font-bold leading-snug">{mod.title}</div>
              </button>
            ))}
          </div>

          {/* Module Deep Analysis Display */}
          <div className="lg:col-span-3">
            <div className="border border-[#ff003c]/30 bg-black/60 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 font-mono text-[10px] text-[#ffd700] tracking-widest hidden sm:block">
                {current.metric}
              </div>

              <div className="font-mono text-xs text-[#ff003c] mb-2">{current.code} // DEEP ANALYSIS</div>
              <h3 className="font-[Cinzel_Decorative] text-3xl md:text-4xl font-bold mb-4 text-white">{current.title}</h3>
              <p className="font-mono text-xs text-white/60 tracking-wider mb-8 pb-6 border-b border-white/10">{current.subtitle}</p>

              <div className="space-y-6 font-[Chakra_Petch] text-base text-white/85 font-light leading-relaxed mb-10">
                {current.analysis.map((paragraph, i) => (
                  <p key={i} className="pl-4 border-l-2 border-[#ff003c]/40">{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center font-mono text-xs text-white/50">
                <span>STATUS: VERIFIED IN LIVE ENVIRONMENT</span>
                <span className="text-[#ffd700]">{current.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
