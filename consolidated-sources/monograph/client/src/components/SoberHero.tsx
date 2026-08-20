import { JUDAS_PHOTOS } from '@/data/judasData';

export default function SoberHero() {
  const heroPhoto = JUDAS_PHOTOS[2]; // Placa 03: El Ascenso del Guerrero (retrato de alta calidad)

  return (
    <section className="relative min-h-screen bg-[#050505] text-[#f2f2f2] pt-28 pb-20 px-6 md:px-20 flex flex-col justify-between border-b border-white/10 font-[Chakra_Petch]">
      {/* Top minimal header */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-xs tracking-widest text-white/50 border-b border-white/10 pb-6">
        <span>BELENTANI // JUDAS ERA</span>
        <span className="text-white/80">BARCELONA // 2026</span>
      </div>

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center my-auto py-12">
        <div className="lg:col-span-7 space-y-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ff003c]">
            Estudio Independiente de Imagen y Sistema
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
            La precisión de la <span className="italic text-[#ff003c]">materia</span> frente al ruido.
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
            Una dirección de arte sobria, sin ornamentos superfluos. Imagen, sonido y código operando en un único plano de claridad rigurosa.
          </p>
          <div className="pt-4 flex items-center gap-6">
            <a
              href="#archive"
              className="px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#ff003c] hover:text-white transition-colors"
            >
              Ver Archivo
            </a>
            <a
              href="#method"
              className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              Método &rarr;
            </a>
          </div>
        </div>

        {/* Single Dominant Portrait / Object Image (No collages, no noise) */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] bg-black border border-white/15 overflow-hidden shadow-2xl">
            <img
              src={heroPhoto.url}
              alt={heroPhoto.title}
              className="w-full h-full object-cover filter contrast-110 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/40 to-transparent">
              <span className="text-[10px] tracking-widest text-[#ff003c] block mb-1">PLACA 03</span>
              <p className="text-xs text-white tracking-wide">{heroPhoto.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-white/10 flex justify-between items-center text-[11px] text-white/40 tracking-wider">
        <span>ESTADO: ESTABLE</span>
        <span>SCROLL PARA EXPLORAR</span>
      </div>
    </section>
  );
}
