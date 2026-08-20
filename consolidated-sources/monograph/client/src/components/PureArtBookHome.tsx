import { useState } from 'react';
import { JUDAS_ACTS, JUDAS_PHOTOS } from '@/data/judasData';

export default function PureArtBookHome() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const act = JUDAS_ACTS[activeActIndex];
  const primaryPhoto = JUDAS_PHOTOS.find((p) => act.photos.includes(p.id)) || JUDAS_PHOTOS[0];

  return (
    <div className="bg-[#050505] text-[#f2f2f2] min-h-screen font-[Chakra_Petch] selection:bg-white selection:text-black">
      {/* Minimal Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050505]/90 backdrop-blur-sm border-b border-white/10 px-8 md:px-24 py-6 flex justify-between items-center text-xs tracking-[0.2em] uppercase">
        <span className="font-semibold text-white">BELENTANI</span>
        <div className="flex gap-8 text-white/50">
          <a href="#essay" className="hover:text-white transition-colors">ENSAYO</a>
          <a href="#plates" className="hover:text-white transition-colors">PLACAS</a>
          <a href="#colophon" className="hover:text-white transition-colors">COLOFÓN</a>
        </div>
      </header>

      {/* Hero / Cover Spread */}
      <section className="min-h-screen pt-44 pb-32 px-8 md:px-24 flex flex-col justify-between border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#ff003c] block">
              Monografía Visual // 2026
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
              La forma definitiva de la <span className="italic text-[#ff003c]">materia</span> frente al ruido.
            </h1>
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
              Un estudio monográfico sobre el retrato, la obsidiana y la resistencia formal. Sin ruido de interfaz ni plantillas repetitivas.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm aspect-[3/4] bg-black border border-white/20 p-3 shadow-2xl">
              <img
                src={JUDAS_PHOTOS[2].url}
                alt={JUDAS_PHOTOS[2].title}
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full pt-16 flex justify-between text-xs text-white/40 tracking-widest">
          <span>BARCELONA</span>
          <span>DESPLAZAR PARA LEER &darr;</span>
        </div>
      </section>

      {/* Essay / Chapter Sequential Spread (One at a time, generous whitespace) */}
      <section id="essay" className="py-36 px-8 md:px-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          {/* Chapter Selector */}
          <div className="flex flex-wrap gap-6 mb-24 pb-8 border-b border-white/10 text-xs tracking-widest uppercase">
            {JUDAS_ACTS.map((a, idx) => (
              <button
                key={a.number}
                onClick={() => setActiveActIndex(idx)}
                className={`transition-colors ${
                  activeActIndex === idx ? 'text-white font-bold underline decoration-[#ff003c] underline-offset-8' : 'text-white/40 hover:text-white'
                }`}
              >
                Capítulo {a.number}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 space-y-8">
              <span className="text-xs tracking-[0.2em] text-[#ff003c] uppercase block">
                Capítulo {act.number}
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
                {act.title}
              </h2>
              <p className="text-xs uppercase tracking-widest text-white/50">{act.subtitle}</p>

              <div className="space-y-6 text-base text-white/80 font-light leading-relaxed pt-6 border-t border-white/10">
                {act.text.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[3/4] bg-black border border-white/20 p-4 shadow-2xl mb-4">
                <img
                  src={primaryPhoto.url}
                  alt={primaryPhoto.title}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
              <div className="flex justify-between text-xs text-white/50 tracking-wider">
                <span>PLACA {primaryPhoto.id < 10 ? `0${primaryPhoto.id}` : primaryPhoto.id}</span>
                <span>{primaryPhoto.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Plates Gallery (Spacious, large frames, zero cards) */}
      <section id="plates" className="py-36 px-8 md:px-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-32">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-[#ff003c]">Selección de Placas</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white">Retratos y Materia</h2>
            <p className="text-sm text-white/60 font-light">
              Placas seleccionadas de la edición monográfica. Sin adornos ni distracciones.
            </p>
          </div>

          {JUDAS_PHOTOS.slice(0, 4).map((photo, i) => (
            <div key={photo.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[3/4] bg-black border border-white/20 p-4 shadow-2xl">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover filter contrast-105" />
                </div>
              </div>
              <div className={`lg:col-span-5 space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-xs font-mono text-[#ff003c] tracking-widest">PLACA {photo.id < 10 ? `0${photo.id}` : photo.id}</span>
                <h3 className="text-2xl font-light text-white">{photo.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">{photo.commentary}</p>
                <div className="text-xs text-white/40 font-mono tracking-wider pt-4 border-t border-white/10">
                  {photo.resolution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colophon */}
      <footer id="colophon" className="py-24 px-8 md:px-24 text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">BELENTANI // MONOGRAFÍA OFICIAL</p>
        <p className="text-sm text-white/70 font-light">Barcelona, MMXXVI. Todos los derechos reservados.</p>
        <div className="pt-6">
          <a href="#top" className="text-xs tracking-widest uppercase text-white hover:text-[#ff003c] transition-colors">
            &uarr; Volver al inicio
          </a>
        </div>
      </footer>
    </div>
  );
}
