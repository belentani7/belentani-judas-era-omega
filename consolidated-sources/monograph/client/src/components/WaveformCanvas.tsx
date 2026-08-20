import { useEffect, useRef, useState } from 'react';

/**
 * BELENTANI // JUDAS ERA — WaveformCanvas
 * Motivo: visualizador circular atmosférico; movimiento decorativo y no bloqueante.
 */
export default function WaveformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsActive(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let time = 0;
    let stopped = false;

    const draw = () => {
      if (stopped) return;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 22;

      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(5, 5, 5, 0.22)';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = 'rgba(255, 0, 60, 0.64)';
      context.lineWidth = 1.5;
      context.beginPath();

      for (let i = 0; i <= 360; i += 1) {
        const angle = (i * Math.PI) / 180;
        const wave = Math.sin(angle * 3 + time * 0.05) * 12 + Math.sin(angle * 8 - time * 0.025) * 5;
        const x = centerX + (radius + wave) * Math.cos(angle);
        const y = centerY + (radius + wave) * Math.sin(angle);
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.closePath();
      context.stroke();
      context.fillStyle = 'rgba(255, 0, 60, 0.08)';
      context.beginPath();
      context.arc(centerX, centerY, 34, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#ff003c';
      context.beginPath();
      context.arc(centerX, centerY, 4, 0, Math.PI * 2);
      context.fill();

      time += 1;
      animationRef.current = window.requestAnimationFrame(draw);
    };

    draw();
    return () => {
      stopped = true;
      if (animationRef.current !== undefined) window.cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="waveform-canvas"
      width={300}
      height={300}
      aria-hidden="true"
      className={`fixed bottom-40 left-1/2 z-[400] h-[300px] w-[300px] -translate-x-1/2 clip-corner border border-[rgba(255,0,60,0.4)] bg-[rgba(0,0,0,0.3)] shadow-[0_0_60px_rgba(255,0,60,0.1)] transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-60'}`}
    />
  );
}

