import { useState } from 'react';

export default function QuantumTimelineViewer() {
  const [activeEra, setActiveEra] = useState<'genesis' | 'judas' | 'omega'>('judas');

  return (
    <div className="my-12 w-full max-w-4xl clip-corner border border-[rgba(255,0,60,0.3)] bg-[rgba(10,0,5,0.85)] p-8 backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,0,60,0.2)] pb-4 font-mono text-xs tracking-widest text-[#ff003c]">
        <span>[QUANTUM TIMELINE VIEWER]</span>
        <span>STATUS: SYNCHRONIZED</span>
      </div>

      <div className="my-6 flex justify-center gap-4">
        {(['genesis', 'judas', 'omega'] as const).map((era) => (
          <button
            key={era}
            type="button"
            onClick={() => setActiveEra(era)}
            className={`clip-corner px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${activeEra === era ? 'bg-[#ff003c] text-white shadow-[0_0_20px_#ff003c]' : 'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,0,60,0.2)]'}`}
          >
            {era}
          </button>
        ))}
      </div>

      <div className="min-h-[160px] font-mono text-sm leading-relaxed text-[rgba(255,255,255,0.8)]">
        {activeEra === 'genesis' && (
          <p>
            [GENESIS // 2024] El origen de la visión de Belentani. La primera piedra del Estudio Belentani, donde la dualidad entre la luz sagrada y el vacío absoluto comenzó a tomar forma sonora y visual.
          </p>
        )}
        {activeEra === 'judas' && (
          <p>
            [JUDAS ERA // 2026] El apogeo de la transformación. Conquista de escenarios, producción inmersiva, experimentación con sintetizadores modulares y la creación de un culto estético inquebrantable.
          </p>
        )}
        {activeEra === 'omega' && (
          <p>
            [OMEGA // FUTURO] La convergencia total. Inteligencia artificial generativa integrada con la composición orgánica, portales dimensionales y trascendencia absoluta del formato digital.
          </p>
        )}
      </div>
    </div>
  );
}
