import { useEffect, useState } from 'react';

/**
 * GLITCH GALLERY - Galería de Arte con Efectos Glitch
 * Imágenes de Judas con distorsiones visuales y parallax
 */

interface GalleryImage {
  id: number;
  title: string;
  url: string;
  glitchIntensity: number;
}

export default function GlitchGallery() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      title: 'El Hombre Integrado',
      url: 'https://files.catbox.moe/rt1p03.jpg',
      glitchIntensity: 0.3,
    },
    {
      id: 2,
      title: 'La Deuda Impagable',
      url: 'https://files.catbox.moe/943t1r.png',
      glitchIntensity: 0.4,
    },
    {
      id: 3,
      title: 'El Robo y El Canto',
      url: 'https://files.catbox.moe/kmtlco.jpg',
      glitchIntensity: 0.35,
    },
    {
      id: 4,
      title: 'La Victoria Amarga',
      url: 'https://files.catbox.moe/h0wamv.jpg',
      glitchIntensity: 0.45,
    },
    {
      id: 5,
      title: 'La Mentira Compartida',
      url: 'https://files.catbox.moe/d2c8e5.jpg',
      glitchIntensity: 0.5,
    },
    {
      id: 6,
      title: 'Transmission End',
      url: 'https://files.catbox.moe/y8kuk4.jpg',
      glitchIntensity: 0.55,
    },
  ]);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <div
            key={image.id}
            onMouseEnter={() => setHoveredId(image.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group overflow-hidden clip-corner border border-[#ff003c]/30 hover:border-[#ff003c] transition-all duration-300"
            style={{
              transform: `translateY(${Math.sin(scrollProgress * Math.PI + idx) * 20}px)`,
            }}
          >
            {/* Glitch Effect */}
            <div className="relative aspect-square overflow-hidden bg-[#050505]">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23050505' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23ff003c'%3E${image.title}%3C/text%3E%3C/svg%3E`;
                }}
              />

              {/* Glitch Layers */}
              {hoveredId === image.id && (
                <>
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 0, 60, 0.3) 2px,
                        rgba(255, 0, 60, 0.3) 4px
                      )`,
                      animation: 'glitch-scan 0.15s infinite',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-lighten pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)`,
                      animation: 'glitch-shift 0.3s infinite',
                    }}
                  />
                </>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="font-[Cinzel_Decorative] text-lg font-bold text-[#ffd700] mb-1">
                  {image.title}
                </h3>
                <p className="text-xs text-[#ffd700] font-mono">FASE_{image.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Glitch Animation Styles */}
      <style>{`
        @keyframes glitch-scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        @keyframes glitch-shift {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes glitch-distort {
          0%, 100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          20% {
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
          }
          40% {
            clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
          }
          60% {
            clip-path: polygon(0 0, 100% 20%, 100% 100%, 0 80%);
          }
          80% {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
          }
        }
      `}</style>

      {/* Info */}
      <div className="p-4 bg-[rgba(255,215,0,0.05)] border border-[#ffd700]/30 clip-corner font-mono text-xs text-[#ffd700]">
        <p>
          <span className="text-[#ff003c]">✦</span> Galería de Arte - 6 fases de la crónica de Judas
        </p>
        <p className="mt-1 text-[rgba(255,255,255,0.5)]">
          Pasa el ratón sobre las imágenes para ver efectos glitch
        </p>
      </div>
    </div>
  );
}
