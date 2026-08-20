import { useEffect, useRef, useState } from 'react';

/**
 * SYNTHESIZER - Sintetizador Funcional con Tone.js
 * Teclado de 12 teclas + melodías predefinidas + visualizador
 */

export default function Synthesizer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const synthRef = useRef<any>(null);
  const melodyRef = useRef<any>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  const notes = [
    { key: 'C4', freq: 261.63, label: 'C' },
    { key: 'D4', freq: 293.66, label: 'D' },
    { key: 'E4', freq: 329.63, label: 'E' },
    { key: 'F4', freq: 349.23, label: 'F' },
    { key: 'G4', freq: 392.0, label: 'G' },
    { key: 'A4', freq: 440.0, label: 'A' },
    { key: 'B4', freq: 493.88, label: 'B' },
    { key: 'C5', freq: 523.25, label: 'C5' },
    { key: 'D5', freq: 587.33, label: 'D5' },
    { key: 'E5', freq: 659.25, label: 'E5' },
    { key: 'F5', freq: 698.46, label: 'F5' },
    { key: 'G5', freq: 783.99, label: 'G5' },
  ];

  const melodies = {
    judas: ['C4', 'E4', 'G4', 'A4', 'G4', 'E4', 'C4'],
    ascending: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
    descending: ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'],
  };

  useEffect(() => {
    const initializeSynth = async () => {
      const Tone = (window as any).Tone;
      if (!Tone) return;

      await Tone.start();

      // Create synthesizer
      const synth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 0.5,
        },
      }).toDestination();

      synthRef.current = synth;

      // Create melody synth
      const melodySynth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.3,
        },
      }).toDestination();

      melodyRef.current = melodySynth;

      setIsInitialized(true);
    };

    initializeSynth();
  }, []);

  const playNote = (note: string) => {
    if (!synthRef.current) return;
    synthRef.current.triggerAttackRelease(note, '8n');
  };

  const playMelody = (melodyName: keyof typeof melodies) => {
    if (!melodyRef.current) return;
    const melody = melodies[melodyName];
    const now = (window as any).Tone.now();

    melody.forEach((note, idx) => {
      melodyRef.current.triggerAttackRelease(note, '8n', now + idx * 0.25);
    });
  };

  const handleKeyDown = (note: string) => {
    if (!isInitialized) return;
    setActiveKeys((prev) => new Set(prev).add(note));
    playNote(note);
  };

  const handleKeyUp = (note: string) => {
    setActiveKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Visualizer */}
      <div className="w-full h-24 bg-gradient-to-b from-[rgba(255,215,0,0.1)] to-[rgba(255,0,60,0.05)] clip-corner border border-[#ffd700]/20 p-4">
        <canvas
          ref={visualizerRef}
          className="w-full h-full"
        />
      </div>

      {/* Keyboard */}
      <div className="grid grid-cols-6 gap-2">
        {notes.map((note) => (
          <button
            key={note.key}
            onMouseDown={() => handleKeyDown(note.key)}
            onMouseUp={() => handleKeyUp(note.key)}
            onMouseLeave={() => handleKeyUp(note.key)}
            className={`py-4 px-2 font-mono text-xs font-bold clip-corner transition-all duration-100 ${
              activeKeys.has(note.key)
                ? 'bg-[#ff003c] text-white shadow-[0_0_20px_rgba(255,0,60,0.8)]'
                : 'bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] border border-[#ff003c]/30 hover:border-[#ff003c]'
            }`}
          >
            {note.label}
            <div className="text-[9px] opacity-60 mt-1">{note.freq.toFixed(0)}Hz</div>
          </button>
        ))}
      </div>

      {/* Preset Melodies */}
      <div className="space-y-2">
        <p className="font-mono text-xs text-[#ff003c] tracking-widest">MELODÍAS PREDEFINIDAS</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(melodies).map((melody) => (
            <button
              key={melody}
              onClick={() => playMelody(melody as keyof typeof melodies)}
              className="py-3 px-4 bg-[rgba(255,215,0,0.1)] border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black transition-all duration-300 font-mono text-xs font-bold clip-corner"
            >
              {melody.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="p-3 bg-[rgba(255,215,0,0.05)] border border-[#ffd700]/30 clip-corner font-mono text-xs text-[#ffd700]">
        {isInitialized ? (
          <>
            <span className="text-[#ffd700]">✓</span> Sintetizador activo - Presiona las teclas o haz clic
          </>
        ) : (
          <>
            <span className="text-[#ff003c]">⚠</span> Inicializando audio...
          </>
        )}
      </div>
    </div>
  );
}
