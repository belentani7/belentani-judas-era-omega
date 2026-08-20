import { useState } from 'react';
import { JUDAS_ACTS, JUDAS_PHOTOS, JudasPhoto } from '@/data/judasData';

export default function PureEditorialMonograph() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<JudasPhoto | null>(null);

  const chapter = JUDAS_ACTS[activeChapter];
  const chapterPhotos = JUDAS_PHOTOS.filter((p) => chapter.photos.includes(p.id));

  return (
    <section id="monograph" className="py-32 px-8 md:px-24 bg-[#050505] text-[#f2f2f2] font-[Chakra_Petch]">
      <div className="max-w-6xl mx-auto">
        {/* Monograph Section Title */}
        <div className="border-b border-white/15 pb-8 mb-20 flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff003c]">Monografía // Capítulos</span>
          <span className="text-xs text-white/40 tracking-widest">01 — 06</span>
        </div>

        {/* Chapter Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-20 border-b border-white/10 pb-8">
          {JUDAS_ACTS.map((act, idx) => (
            <button
              key={act.number}
              onClick={() => setActiveChapter(idx)}
              className={`text-xs tracking-widest uppercase px-4 py-2 transition-all border ${
                activeChapter === idx
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/20 text-white/60 hover:border-white hover:text-white'
              }`}
            >
              Capítulo {act.number}
            </button>
          ))}
        </div>

        {/* Chapter Essay Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#ff003c] block mb-2">CAPÍTULO {chapter.number}</span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
                {chapter.title}
              </h2>
            </div>
            <p className="text-sm tracking-widest text-white/60 uppercase">{chapter.subtitle}</p>
            
            <div className="space-y-6 text-base text-white/80 font-light leading-relaxed pt-4 border-t border-white/10">
              {chapter.text.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Chapter Plates / Photographs */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8">
              {chapterPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxPhoto(photo)}
                  className="group cursor-pointer space-y-3"
                >
                  <div className="aspect-[4/5] bg-black border border-white/20 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/60 tracking-wider pt-2 border-t border-white/10">
                    <span>PLACA {photo.id < 10 ? `0${photo.id}` : photo.id} // {photo.page}</span>
                    <span className="group-hover:text-white transition-colors">{photo.title} &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clean Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 md:p-16">
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-8 right-8 text-xs tracking-widest text-white/70 hover:text-white uppercase border border-white/20 px-4 py-2"
          >
            Cerrar [✕]
          </button>
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#080808] border border-white/20 p-8">
            <div className="aspect-[3/4] bg-black border border-white/10 overflow-hidden">
              <img src={lightboxPhoto.url} alt={lightboxPhoto.title} className="w-full h-full object-contain" />
            </div>
            <div className="space-y-6">
              <span className="text-xs tracking-widest text-[#ff003c]">PLACA {lightboxPhoto.id} // {lightboxPhoto.page}</span>
              <h3 className="text-2xl font-light text-white">{lightboxPhoto.title}</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">{lightboxPhoto.commentary}</p>
              <div className="text-xs text-white/40 tracking-wider pt-4 border-t border-white/10">
                {lightboxPhoto.resolution}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
