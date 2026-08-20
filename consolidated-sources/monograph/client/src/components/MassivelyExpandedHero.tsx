import { JUDAS_PHOTOS } from '@/data/judasData';

export default function MassivelyExpandedHero() {
  const previewPhotos = JUDAS_PHOTOS.slice(0, 6);

  return (
    <section className="relative min-h-screen bg-[#030303] text-white pt-24 pb-20 px-6 md:px-16 flex flex-col justify-between border-b border-[#ff003c]/30">
      {/* Top Meta Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-12 font-mono text-xs text-white/60">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="w-2 h-2 bg-[#ff003c] rounded-full animate-ping" />
          <span className="text-[#ffd700] tracking-widest">[MASSIVE STORYTELLING ARCHIVE ACTIVE]</span>
        </div>
        <div className="flex items-center gap-6">
          <span>PLAQ_COUNT: 12_OFFICIAL</span>
          <span>DURATION: +10_MIN</span>
          <span className="text-[#ff003c]">NODE: BARCELONA // 2026</span>
        </div>
      </div>

      {/* Hero Content & Collage Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-block font-mono text-xs text-[#ff003c] border border-[#ff003c]/40 px-3 py-1 bg-[rgba(255,0,60,0.05)]">
            CRÓNICA DE LARGA DURACIÓN // JUDAS ERA
          </div>
          <h1 className="font-[Cinzel_Decorative] text-5xl md:text-7xl font-bold tracking-tight leading-none text-white">
            El Archivo <span className="text-[#ff003c] italic">Definitivo</span> de la Traición.
          </h1>
          <p className="font-[Chakra_Petch] text-base md:text-lg text-white/70 font-light leading-relaxed">
            Una obra de escala masiva que integra las 12 placas fotográficas oficiales en alta resolución, 6 actos narrativos profundos, el Núcleo Psicológico Claude ETD, Google Tudo y la contabilidad universal de La Deuda Todo.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#chronicle"
              className="px-8 py-4 bg-[#ff003c] text-white font-[Chakra_Petch] font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors"
            >
              Explorar los 6 Actos ↘
            </a>
            <a
              href="#psychology"
              className="px-8 py-4 border border-white/30 text-white font-[Chakra_Petch] font-bold text-sm tracking-wider uppercase hover:border-[#ffd700] hover:text-[#ffd700] transition-colors"
            >
              Núcleo Psicológico
            </a>
          </div>
        </div>

        {/* Live Photo Collage Grid */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-3">
          {previewPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden border border-white/20 bg-black aspect-[3/4] group ${index % 2 === 1 ? 'translate-y-6' : ''}`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover filter saturate-75 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-2 right-2 font-mono text-[9px] text-[#ffd700]">
                PLAQ_0{photo.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/10 mt-12 font-mono text-xs">
        <div>
          <div className="text-white/40 text-[10px]">PLANTILLAS VISUALES</div>
          <div className="text-white font-bold text-lg mt-1">12 / 12 ACTIVA</div>
        </div>
        <div>
          <div className="text-white/40 text-[10px]">TIEMPO DE LECTURA</div>
          <div className="text-[#ffd700] font-bold text-lg mt-1">+12 MINUTOS</div>
        </div>
        <div>
          <div className="text-white/40 text-[10px]">MARCO TEÓRICO</div>
          <div className="text-white font-bold text-lg mt-1">CLAUDE ETD / ADR</div>
        </div>
        <div>
          <div className="text-white/40 text-[10px]">ESTADO DEL NÚCLEO</div>
          <div className="text-[#ff003c] font-bold text-lg mt-1">OMEGA ACTIVE</div>
        </div>
      </div>
    </section>
  );
}
