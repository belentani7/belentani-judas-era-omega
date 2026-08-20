import { useState } from 'react';

export default function PortfolioShowcase() {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: 'QUANTUM NEXUS ENGINE',
      client: 'ESTUDIO BELENTANI // 2026',
      desc: 'Plataforma interactiva WebGL con simulación de nebulosas en tiempo real, shaders personalizados y arquitectura de validación estricta PVC-U.',
      metrics: 'FPS: 60 STABLE // LATENCY: < 12MS // SHADER: GLSL 3.0',
    },
    {
      title: 'AETHERPUNK SONIC LAB',
      client: 'JUDAS RECORDS // 2025',
      desc: 'Sintetizador polifónico basado en WebAudio y Tone.js con visualizador circular de ondas y control de armónicos por gestos.',
      metrics: 'POLYPHONY: 12 VOICES // FREQ: 430-440Hz // OSC: SAW/SINE',
    },
    {
      title: 'MONOLITHIC E-COMMERCE',
      client: 'SILVER FACTORY // 2026',
      desc: 'Experiencia de comercio de alta costura digital con tipografía monumental, contraste absoluto y transiciones espaciales.',
      metrics: 'CONVERSION: +42% // PERFORMANCE: 99/100 // ACCESSIBILITY: AA',
    },
  ];

  return (
    <section id="portfolio" className="section min-h-screen flex flex-col justify-center items-center px-8 md:px-20 py-24 bg-[#030303] text-white">
      <div className="w-full max-w-6xl mx-auto">
        <div className="border-b border-[#ff003c]/30 pb-4 mb-12 flex justify-between items-center font-mono text-xs text-[#ff003c]">
          <span>[SELECTED WORKS // POSITIONING PORTFOLIO]</span>
          <span>ESTUDIO BELENTANI ARCHIVE</span>
        </div>

        <h2 className="font-[Cinzel_Decorative] text-5xl md:text-7xl font-bold mb-16 tracking-tight">
          CASOS DE <span className="text-[#ff003c] italic">ESTUDIO</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              onClick={() => setActiveProject(idx)}
              className={`brand-surface p-8 clip-corner cursor-pointer transition-all duration-500 flex flex-col justify-between ${activeProject === idx ? 'border-[#ff003c] bg-[rgba(255,0,60,0.04)] shadow-[0_0_40px_rgba(255,0,60,0.2)]' : 'hover:border-white/40'}`}
            >
              <div>
                <div className="font-mono text-[10px] text-[#ffd700] tracking-widest mb-3">{proj.client}</div>
                <h3 className="font-[Cinzel_Decorative] text-2xl font-bold text-white mb-4 leading-snug">{proj.title}</h3>
                <p className="font-[Chakra_Petch] text-sm text-[rgba(255,255,255,0.7)] font-light leading-relaxed mb-6">{proj.desc}</p>
              </div>

              <div className="border-t border-white/10 pt-4 font-mono text-[10px] text-[#ff003c] tracking-widest">
                {proj.metrics}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
