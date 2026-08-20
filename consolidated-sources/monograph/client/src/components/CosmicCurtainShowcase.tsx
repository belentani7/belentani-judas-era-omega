import { useState } from 'react';

export default function CosmicCurtainShowcase() {
  const [activeItem, setActiveItem] = useState(0);

  const showcases = [
    {
      title: 'EL ORIGEN OMEGA',
      subtitle: 'CAPÍTULO I // GÉNESIS',
      desc: 'El nacimiento de la frecuencia pura. Una exploración de los contrastes entre el vacío absoluto y la iluminación sagrada.',
      image: '/manus-storage/judas_hero_cinematic_cdd64bce.jpg',
    },
    {
      title: 'LA TRAICIÓN COMO INPUT',
      subtitle: 'CAPÍTULO II // JUDAS',
      desc: 'El punto de quiebre donde la vulnerabilidad humana se convierte en algoritmo de creación artística y resistencia.',
      image: '/manus-storage/judas_hero_cinematic_cdd64bce.jpg',
    },
    {
      title: 'LA LLAVE DORADA',
      subtitle: 'CAPÍTULO III // OMEGA',
      desc: 'Trascendencia digital. El cierre del ciclo y la apertura hacia una nueva dimensión de conciencia hiperconectada.',
      image: '/manus-storage/judas_hero_cinematic_cdd64bce.jpg',
    },
  ];

  return (
    <div className="my-20 w-full max-w-6xl mx-auto px-4">
      <div className="border-b border-[#ff003c]/30 pb-4 mb-10 flex justify-between items-center font-mono text-xs text-[#ff003c]">
        <span>[GALERÍA EDITORIAL // PREMIATED DIRECTION]</span>
        <span>INDEX: 0{activeItem + 1} / 03</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="font-mono text-xs text-[#ffd700] tracking-widest">{showcases[activeItem].subtitle}</p>
          <h3 className="font-[Cinzel_Decorative] text-4xl md:text-5xl font-bold text-white leading-tight">
            {showcases[activeItem].title}
          </h3>
          <p className="font-[Chakra_Petch] text-base text-[rgba(255,255,255,0.7)] font-light leading-relaxed">
            {showcases[activeItem].desc}
          </p>

          <div className="flex gap-4 pt-4">
            {showcases.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveItem(idx)}
                className={`h-1 transition-all duration-500 clip-corner ${activeItem === idx ? 'w-16 bg-[#ff003c] shadow-[0_0_15px_#ff003c]' : 'w-8 bg-white/20 hover:bg-white/50'}`}
                aria-label={`Ver capítulo ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative h-[400px] w-full border border-[#ff003c]/40 overflow-hidden clip-corner shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          <img
            src={showcases[activeItem].image}
            alt={showcases[activeItem].title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 scale-105 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 font-mono text-xs tracking-widest text-[#ffd700]">
            ESTUDIO BELENTANI // ARCHIVE
          </div>
        </div>
      </div>
    </div>
  );
}
