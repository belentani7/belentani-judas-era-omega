import { useState } from 'react';

/**
 * BELENTANI // JUDAS ERA — MagicGate
 * Motivo: convertir la entrada en un gesto narrativo, accesible y reversible por recarga.
 */
export default function MagicGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [burst, setBurst] = useState(false);

  const unlock = () => {
    if (isOpen || burst) return;
    setBurst(true);
    document.body.classList.add('ascended');
    window.setTimeout(() => setIsOpen(true), 1200);
  };

  return (
    <>
      <div
        id="magic-gate"
        className={`fixed inset-0 z-[9500] flex flex-col items-center justify-center gap-10 bg-[radial-gradient(circle_at_50%_50%,#150008,#000_70%)] transition-opacity duration-[1.5s] [perspective:1200px] ${burst ? 'burst' : ''} ${isOpen ? 'open' : ''}`}
        aria-hidden={isOpen}
      >
        <button
          type="button"
          className="mbox relative h-[180px] w-[180px] cursor-pointer border-0 bg-transparent p-0 [transform-style:preserve-3d]"
          onClick={unlock}
          aria-label="Desbloquear el portal de Judas Era"
        >
          {[
            ['f1', '◆'],
            ['f2', '◇'],
            ['f3', '✦'],
            ['f4', '✧'],
            ['f5', '✺'],
            ['f6', '◈'],
          ].map(([face, glyph]) => (
            <span
              key={face}
              className={`face absolute inset-0 flex items-center justify-center border border-[#ff003c] bg-[rgba(255,0,60,0.1)] text-5xl text-white backdrop-blur-sm ${face}`}
              aria-hidden="true"
            >
              {glyph}
            </span>
          ))}
        </button>

        <div className="flex items-center justify-center gap-6" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((index) => (
            <span key={index} data-i={index} className="ggem lit h-[26px] w-[26px]" />
          ))}
        </div>

        <div className="text-center font-mono text-xs tracking-widest text-[rgba(255,255,255,0.6)]">
          <p className="mb-2 text-[#ff003c]">CLICK THE CUBE TO UNLOCK</p>
          <p>LA LLAVE DORADA TE ESPERA</p>
        </div>
      </div>

      <div
        id="ascension-flash"
        className={`pointer-events-none fixed inset-0 z-[9990] opacity-0 transition-opacity duration-700 ${burst && !isOpen ? 'opacity-100' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
