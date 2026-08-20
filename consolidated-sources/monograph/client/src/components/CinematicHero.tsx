export default function CinematicHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-8 md:px-20 py-16 overflow-hidden bg-[#030303]">
      {/* Cinematic Background Image with Gradient Mask */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="/manus-storage/judas_hero_cinematic_cdd64bce.jpg"
          alt="Judas Era Cinematic Atmosphere"
          className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
      </div>

      {/* Editorial Header */}
      <div className="relative z-10 flex justify-between items-center font-mono text-xs tracking-[0.3em] text-[rgba(255,255,255,0.6)]">
        <div>STUDIO BELENTANI // OMEGA EDITION</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 clip-corner bg-[#ff003c] animate-ping" />
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Main Hero Content - Editorial Typography */}
      <div className="relative z-10 my-auto max-w-5xl">
        <p className="font-mono text-xs tracking-[0.4em] text-[#ff003c] mb-6 uppercase">
          [MANIFIESTO DE LA NUEVA ERA]
        </p>
        <h1 className="font-[Cinzel_Decorative] text-6xl md:text-9xl font-black tracking-tight text-white mb-8 leading-[0.9]">
          BELENTANI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] via-[#ffd700] to-[#ff003c]">
            // JUDAS ERA
          </span>
        </h1>
        <p className="font-[Chakra_Petch] text-lg md:text-xl text-[rgba(255,255,255,0.75)] max-w-2xl font-light leading-relaxed mb-12">
          Una obra inmersiva donde el arte sagrado converge con la computación cuántica. Exploración sensorial de alta precisión estética, diseñada para trascender el formato digital convencional.
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <a
            href="#artist"
            className="clip-corner border border-[#ff003c] bg-[#ff003c]/10 px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-300 hover:bg-[#ff003c] hover:shadow-[0_0_30px_#ff003c]"
          >
            Iniciar Inmersión
          </a>
          <a
            href="#portal"
            className="clip-corner border border-[rgba(255,255,255,0.2)] bg-transparent px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-[rgba(255,255,255,0.8)] backdrop-blur-md transition-all duration-300 hover:border-white hover:text-white"
          >
            Explorar Portal 3D
          </a>
        </div>
      </div>

      {/* Editorial Footer Info */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-[11px] text-[rgba(255,255,255,0.4)] gap-4 border-t border-[rgba(255,255,255,0.1)] pt-6">
        <div>COORD: 41.3851° N, 2.1734° E</div>
        <div>SCROLL DOWN TO ENTER THE VOID</div>
        <div>PROTOCOLO Ω-MAX VERIFIED</div>
      </div>
    </section>
  );
}
