import { useEffect, useState } from 'react';

/**
 * BELENTANI // JUDAS ERA — TopNav
 * Motivo: navegación HUD compacta con labels, foco visible y scroll suave.
 */
const sections = [
  ['home', 'GENESIS'],
  ['artist', 'ARCHETYPES'],
  ['portal', 'GATEWAY'],
  ['challenges', 'TRIALS'],
  ['synthesizer', 'HARMONY'],
  ['gallery', 'VISIONS'],
  ['music', 'SONIC'],
  ['studio', 'CREATION'],
  ['contact', 'NEXUS'],
  ['omega', 'OMEGA'],
] as const;

export default function TopNav() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="top-nav fixed left-0 right-0 top-0 z-[1500] flex flex-wrap items-center justify-center gap-2 border-b border-[rgba(255,0,60,0.25)] bg-[rgba(5,0,2,0.55)] px-2.5 py-3.5 backdrop-blur-[18px]"
      aria-label="Navegación principal"
    >
      <div className="nav-dots flex items-center gap-3" role="list">
        {sections.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-dot block h-2 w-2 clip-corner transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd700] ${activeId === id ? 'w-[30px] clip-corner bg-[#ff003c] shadow-[0_0_15px_#ff003c]' : 'bg-[rgba(255,255,255,0.2)] hover:scale-125 hover:bg-[#ff003c]'}`}
            aria-label={`Ir a ${label}`}
            aria-current={activeId === id ? 'page' : undefined}
            title={label}
            role="listitem"
          />
        ))}
      </div>
      <span className="section-name ml-3 self-center font-mono text-[10px] tracking-[0.22em] text-[rgba(255,255,255,0.5)]">
        {sections.find(([id]) => id === activeId)?.[1] ?? 'SYSTEM'}
      </span>
    </nav>
  );
}
