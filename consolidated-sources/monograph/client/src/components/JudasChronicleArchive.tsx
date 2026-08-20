import { useState } from 'react';
import { JUDAS_ACTS, JUDAS_PHOTOS, JudasPhoto } from '@/data/judasData';

export default function JudasChronicleArchive() {
  const [activeAct, setActiveAct] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<JudasPhoto | null>(null);

  const act = JUDAS_ACTS[activeAct];
  const actPhotos = JUDAS_PHOTOS.filter((p) => act.photos.includes(p.id));

  return (
    <section id="chronicle" className="chronicle-section py-28 px-6 md:px-16 bg-[#030303] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-[#ff003c]/30 pb-6 mb-16 font-mono text-xs text-[#ff003c]">
          <span>[MASSIVE STORYTELLING ARCHIVE // 12 OFFICIAL PLATES]</span>
          <span>JUDAS ERA — COMPLETE CHRONICLE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Act Selector */}
          <div className="lg:col-span-1 space-y-4">
            <p className="font-mono text-[10px] text-[#ffd700] tracking-widest uppercase mb-4">Actos de la Crónica</p>
            {JUDAS_ACTS.map((a, idx) => (
              <button
                key={a.number}
                onClick={() => setActiveAct(idx)}
                className={`w-full text-left p-4 transition-all border ${activeAct === idx ? 'border-[#ff003c] bg-[rgba(255,0,60,0.08)] text-white shadow-[0_0_20px_rgba(255,0,60,0.2)]' : 'border-white/10 text-white/60 hover:border-white/40 hover:text-white'}`}
              >
                <div className="font-mono text-[10px] text-[#ff003c] mb-1">ACTO {a.number}</div>
                <div className="font-[Cinzel_Decorative] text-lg font-bold">{a.title}</div>
              </button>
            ))}
          </div>

          {/* Act Content & Massive Photo Grid */}
          <div className="lg:col-span-3 space-y-12">
            <div className="brand-surface p-8 md:p-12 border border-[#ff003c]/30 bg-black/40">
              <div className="font-mono text-xs text-[#ff003c] mb-2">ACTO {act.number} // {act.subtitle}</div>
              <h3 className="font-[Cinzel_Decorative] text-3xl md:text-5xl font-bold mb-8 text-white">{act.title}</h3>
              
              <div className="space-y-6 font-[Chakra_Petch] text-base text-white/80 font-light leading-relaxed mb-10">
                {act.text.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Photos for this act */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                {actPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative overflow-hidden border border-white/20 bg-black cursor-pointer aspect-[3/4]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover filter saturate-75 contrast-110 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono text-[10px] text-[#ffd700] mb-1">{photo.page} // {photo.resolution}</div>
                      <h4 className="font-[Cinzel_Decorative] text-lg font-bold text-white">{photo.title}</h4>
                      <p className="font-[Chakra_Petch] text-xs text-white/70 mt-1 line-clamp-2">{photo.commentary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Plate Index */}
            <div className="border border-white/10 p-8 bg-black/60">
              <h4 className="font-[Cinzel_Decorative] text-2xl font-bold mb-6 text-white">Índice Completo de Placas (12 Archivos Oficiales)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {JUDAS_PHOTOS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPhoto(p)}
                    className="p-3 border border-white/10 hover:border-[#ff003c] cursor-pointer transition-colors bg-white/[0.02]"
                  >
                    <div className="font-mono text-[9px] text-[#ff003c]">PLACA {p.id < 10 ? `0${p.id}` : p.id}</div>
                    <div className="font-[Chakra_Petch] text-xs font-semibold text-white truncate mt-1">{p.title}</div>
                    <div className="font-mono text-[8px] text-white/50">{p.page}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 font-mono text-xs text-[#ff003c] border border-[#ff003c] px-4 py-2 hover:bg-[#ff003c] hover:text-white transition-colors"
          >
            [ CERRAR PLACA ✕ ]
          </button>
          
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#080808] border border-white/20 p-6 md:p-8">
            <div className="aspect-[3/4] overflow-hidden bg-black border border-white/10">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-contain" />
            </div>
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#ffd700]">PLACA OFICIAL {selectedPhoto.id} // {selectedPhoto.page}</div>
              <h3 className="font-[Cinzel_Decorative] text-3xl font-bold text-white">{selectedPhoto.title}</h3>
              <p className="font-[Chakra_Petch] text-sm text-white/80 leading-relaxed">{selectedPhoto.commentary}</p>
              <div className="border-t border-white/10 pt-4 font-mono text-xs text-[#ff003c]">
                RESOLUCIÓN: {selectedPhoto.resolution}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
