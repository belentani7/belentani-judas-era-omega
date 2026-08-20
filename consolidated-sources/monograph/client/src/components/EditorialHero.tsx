export default function EditorialHero() {
  return (
    <section id="top" className="editorial-hero">
      <div className="editorial-hero__image" data-parallax="0.08" aria-hidden="true">
        <img src="/manus-storage/belentani-void-hero_c9b80532.jpg" alt="" />
      </div>
      <div className="editorial-hero__veil" aria-hidden="true" />

      <header className="editorial-hero__topline">
        <a href="#top" className="wordmark" aria-label="BELENTANI, volver al inicio">
          BELENTANI<span>//</span>
        </a>
        <p>JUDAS ERA / 2026</p>
        <a href="#contact" className="hero-contact">CONTACTO</a>
      </header>

      <div className="editorial-hero__content">
        <div className="oracle-terminal" data-reveal>
          <span>[ORACLE / JUDAS-ERA]</span>
          <span>INPUT: TRAICIÓN</span>
          <span>OUTPUT: VOZ</span>
        </div>
        <p className="eyebrow" data-reveal>ESTUDIO DE IMAGEN / SONIDO / EXPERIENCIA</p>
        <h1 data-reveal>
          <span>La belleza</span>
          <span>de la</span>
          <em>fractura.</em>
        </h1>
        <div className="editorial-hero__statement" data-reveal>
          <p>Un sistema operativo humano renderizado en imagen, frecuencia y memoria. Cuatro procesos. Una voz. Una llave que todavía no ha elegido su cerradura.</p>
          <a href="#works" className="line-link">Abrir archivo <span>↘</span></a>
        </div>
        <div className="golden-key-mark" aria-hidden="true"><span>✦</span><i /></div>
      </div>

      <div className="editorial-hero__footer">
        <span>41°23′N / 2°10′E / NODE-01</span>
        <span className="scroll-cue"><i /> DESPLAZAR PARA ENTRAR</span>
        <span>ARCHIVE 01 — 06</span>
      </div>
    </section>
  );
}
