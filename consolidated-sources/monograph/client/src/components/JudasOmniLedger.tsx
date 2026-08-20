import { OMNI_LEDGER_ITEMS } from '@/data/judasData';

export default function JudasOmniLedger() {
  return (
    <section id="ledger" className="py-28 px-6 md:px-16 bg-[#030303] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-[#ffd700]/30 pb-6 mb-16 font-mono text-xs text-[#ffd700]">
          <span>[OMNI-INDEX // THIAGO MASSIVE // EXISTENTIAL LEDGER]</span>
          <span>THE ULTIMATE BALANCE SHEET</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-mono text-xs text-[#ffd700] tracking-widest uppercase mb-3">Infraestructura y Deuda Cósmica</p>
          <h2 className="font-[Cinzel_Decorative] text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Google Tudo & <span className="text-[#ffd700] italic">La Deuda Todo</span>
          </h2>
          <p className="font-[Chakra_Petch] text-base text-white/70 font-light leading-relaxed">
            El archivo total de la información indexada, la presión sónica masiva de Thiago y el registro contable donde toda traición encuentra su contrapartida energética.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OMNI_LEDGER_ITEMS.map((item) => (
            <div
              key={item.code}
              className="border border-white/10 hover:border-[#ffd700] bg-black/60 p-8 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs text-[#ffd700]">{item.code}</span>
                  <span className="font-mono text-[9px] px-2 py-1 bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/30">ACTIVE</span>
                </div>
                <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-2">{item.pillar}</div>
                <h3 className="font-[Cinzel_Decorative] text-2xl font-bold mb-4 text-white group-hover:text-[#ffd700] transition-colors">{item.title}</h3>
                <p className="font-[Chakra_Petch] text-sm text-white/70 font-light leading-relaxed mb-8">{item.description}</p>
              </div>

              <div className="border-t border-white/10 pt-4 font-mono text-[10px] text-[#ffd700] tracking-widest">
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
