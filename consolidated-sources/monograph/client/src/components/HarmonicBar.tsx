import { useEffect, useState } from 'react';

/**
 * BELENTANI // JUDAS ERA — HarmonicBar
 * Motivo: interfaz de estado ficticia para reforzar la narrativa sin afirmar datos reales.
 */
export default function HarmonicBar() {
  const [active, setActive] = useState(false);
  const [metrics, setMetrics] = useState({ bpm: 92, frequency: '430.08', resonance: 78, harmonic: 42 });

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > window.innerHeight * 0.5);
    const update = () => {
      setMetrics({
        bpm: 85 + Math.floor(Math.random() * 20),
        frequency: (400 + Math.random() * 50).toFixed(2),
        resonance: 60 + Math.floor(Math.random() * 30),
        harmonic: 30 + Math.floor(Math.random() * 50),
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const interval = window.setInterval(update, 2400);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={`harmonic-bar ${active ? 'active' : ''}`} aria-hidden="true">
      <span className="hb-item"><span>BPM:</span> {metrics.bpm}</span>
      <i className="hb-divider" />
      <span className="hb-item"><span>FREQ:</span> {metrics.frequency}Hz</span>
      <i className="hb-divider" />
      <span className="hb-item"><span>RES:</span> {metrics.resonance}%</span>
      <i className="hb-divider" />
      <span className="hb-item"><span>HAR:</span> {metrics.harmonic}</span>
    </div>
  );
}
