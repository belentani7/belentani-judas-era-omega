import { useState } from 'react';

const cases = [
  {
    index: '01',
    type: 'IDENTIDAD / EXPERIENCIA',
    title: 'Judas Era',
    description: 'Un archivo vivo para la traición, la voz y la memoria. Una interfaz que se comporta como una pieza musical: entra, muta y deja resonancia.',
    year: '2026',
    image: '/manus-storage/belentani-signal-object_2d5c221b.jpg',
    accent: 'Oxblood / Gold / Obsidian',
  },
  {
    index: '02',
    type: 'IMAGEN / DIRECCIÓN',
    title: 'Ritual de la Señal',
    description: 'Dirección de arte para un cuerpo anónimo. El retrato no presenta a una persona: presenta una frecuencia que todavía no tiene nombre.',
    year: '2025',
    image: '/manus-storage/belentani-ritual-portrait_6b046021.jpg',
    accent: 'Velvet / Carbon / Vermilion',
  },
  {
    index: '03',
    type: 'DIGITAL / SONIDO',
    title: 'Quantum Nexus',
    description: 'Un instrumento web donde el usuario no navega una página. Activa un campo, modifica el pulso y aprende a escuchar la materia.',
    year: '2026',
    image: '/manus-storage/belentani-void-hero_c9b80532.jpg',
    accent: 'Void / Signal / Sacred Gold',
  },
];

export default function EditorialCaseStudies() {
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section id="works" className="case-studies-section">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">SELECCIÓN / 2025—2026</p>
        <h2>Obra<br /><em>seleccionada.</em></h2>
        <p className="intro-copy">No hacemos piezas para llenar una pantalla. Construimos un lugar al que la gente quiere volver.</p>
      </div>

      <div className="case-studies-grid">
        <div className="case-index" data-reveal>
          {cases.map((item, index) => (
            <button
              key={item.index}
              type="button"
              className={`case-index__item ${active === index ? 'is-active' : ''}`}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>{item.index}</span>
              <strong>{item.title}</strong>
              <small>{item.type}</small>
            </button>
          ))}
        </div>

        <article className="case-feature" data-reveal aria-live="polite">
          <div className="case-feature__image">
            <img src={current.image} alt={`${current.title}, proyecto BELENTANI`} />
            <span className="case-feature__year">{current.year}</span>
          </div>
          <div className="case-feature__meta">
            <p className="eyebrow">{current.type}</p>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            <span className="case-feature__accent">{current.accent}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
