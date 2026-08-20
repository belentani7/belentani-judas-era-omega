import { useState } from 'react';
import { JUDAS_PHOTOS, JudasPhoto } from '@/data/judasData';

export default function PureEditorialPlates() {
  const [selectedPhoto, setSelectedPhoto] = useState<JudasPhoto | null>(null);

  return (
    <section id="plates" className="py-32 px-8 md:px-24 bg-[#030303] text-[#f2f2f2] font-[Chakra_Petch] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-white/15 pb-8 mb-20 flex justify-between items-baseline">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff003c]">Índice // Placas fotográficas</span>
          <span className="text-xs text-white/40 tracking-widest">12 ARCHIVOS</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            El archivo íntegro de retratos y objetos.
          </h2>
          <p className="text-sm text-white/60 font-light leading-relaxed">
            Todas las placas registradas en alta resolución. Ningún artificio digital; únicamente la luz, el grano y la geometría de la traición.
          </p>
        </div>

        {/* Plates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {JUDAS_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer space-y-3"
            >
              <div className="aspect-[3/4] bg-black border border-white/15 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 tracking-wider pt-2 border-t border-white/10">
                <span>PLACA {photo.id < 10 ? `0${photo.id}` : photo.id}</span>
                <span className="text-white group-hover:text-[#ff003c] transition-colors">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 md:p-16">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-8 right-8 text-xs tracking-widest text-white/70 hover:text-white uppercase border border-white/20 px-4 py-2"
          >
            Cerrar [✕]
          </button>
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#080808] border border-white/20 p-8">
            <div className="aspect-[3/4] bg-black border border-white/10 overflow-hidden">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-contain" />
            </div>
            <div className="space-y-6">
              <span className="text-xs tracking-widest text-[#ff003c]">PLACA {selectedPhoto.id} // {selectedPhoto.page}</span>
              <h3 className="text-2xl font-light text-white">{selectedPhoto.title}</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">{selectedPhoto.commentary}</p>
              <div className="text-xs text-white/40 tracking-wider pt-4 border-t border-white/10">
                {selectedPhoto.resolution}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
