import { JUDAS_PHOTOS } from '@/data/judasData';

export default function PureEditorialHero() {
  const coverPhoto = JUDAS_PHOTOS[2]; // Retrato principal / objeto de alta calidad

  return (
    <section className="relative min-h-screen bg-[#050505] text-[#f2f2f2] pt-32 pb-24 px-8 md:px-24 flex flex-col justify-between font-[Chakra_Petch]">
      {/* Editorial Header */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-baseline border-b border-white/15 pb-8">
        <span className="text-sm font-normal tracking-widest uppercase">BELENTANI</span>
        <div className="flex gap-8 text-xs tracking-widest text-white/60">
          <a href="#monograph" className="hover:text-white transition-colors">MONOGRAFÍA</a>
          <a href="#plates" className="hover:text-white transition-colors">PLACAS</a>
          <a href="#colophon" className="hover:text-white transition-colors">COLOFÓN</a>
        </div>
      </header>

      {/* Main Editorial Spread */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center my-auto py-16">
        <div className="lg:col-span-6 space-y-10">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-[#ff003c] block">
              Volumen I // 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.15] text-white">
              La forma definitiva de la <span className="italic text-[#ff003c]">traición</span> como objeto estético.
            </h1>
          </div>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-lg">
            Una colección monográfica dedicada a la exploración del retrato, la materia oscura y la resistencia formal frente a la complacencia visual. Sin artefactos digitales, sin ruido de interfaz.
          </p>
          <div className="pt-2">
            <a
              href="#monograph"
              className="inline-block border-b border-white pb-1 text-xs tracking-widest uppercase text-white hover:border-[#ff003c] hover:text-[#ff003c] transition-colors"
            >
              Comenzar lectura &darr;
            </a>
          </div>
        </div>

        {/* Dominant Single Photograph */}
        <div className="lg:col-span-6 flex flex-col items-start lg:items-end">
          <div className="w-full max-w-md aspect-[3/4] bg-black border border-white/20 overflow-hidden shadow-2xl">
            <img
              src={coverPhoto.url}
              alt={coverPhoto.title}
              className="w-full h-full object-cover filter contrast-105"
            />
          </div>
          <div className="w-full max-w-md mt-4 flex justify-between text-xs text-white/50 tracking-wider">
            <span>PLACA 03</span>
            <span>BARCELONA, 2026</span>
          </div>
        </div>
      </div>

      {/* Editorial Footer Note */}
      <footer className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex justify-between text-xs text-white/40 tracking-widest">
        <span>EDICIÓN INDEPENDIENTE</span>
        <span>ISBN 978-84-000-0000-0</span>
      </footer>
    </section>
  );
}
