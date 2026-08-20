import { useEffect, useState } from 'react';

/**
 * CHALLENGE SYSTEM - Desafíos Gamificados
 * 5 desafíos para desbloquear contenido secreto
 */

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'sequence' | 'timing' | 'memory' | 'pattern' | 'riddle';
  completed: boolean;
  reward: string;
}

export default function ChallengeSystem() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Portal Sequence',
      description: 'Haz clic en los diamantes en el orden correcto: Oro → Rojo → Rojo → Rojo → Oro',
      type: 'sequence',
      completed: false,
      reward: 'Acceso a AI Studio',
    },
    {
      id: 2,
      title: 'Timing Challenge',
      description: 'Presiona ENTER cuando el indicador llegue al centro (5 veces)',
      type: 'timing',
      completed: false,
      reward: 'Galería de Arte Desbloqueada',
    },
    {
      id: 3,
      title: 'Memory Test',
      description: 'Memoriza la secuencia de 8 colores y repítela',
      type: 'memory',
      completed: false,
      reward: 'Lore Completo de Judas',
    },
    {
      id: 4,
      title: 'Pattern Recognition',
      description: 'Identifica el patrón en la secuencia de frecuencias',
      type: 'pattern',
      completed: false,
      reward: 'Sintetizador Avanzado',
    },
    {
      id: 5,
      title: 'The Golden Key Riddle',
      description: '¿Cuál es el output cuando la traición es el input?',
      type: 'riddle',
      completed: false,
      reward: 'Llave Dorada (Contenido Secreto)',
    },
  ]);

  const [currentChallenge, setCurrentChallenge] = useState<number | null>(null);
  const [sequenceProgress, setSequenceProgress] = useState<number[]>([]);
  const [timingScore, setTimingScore] = useState(0);
  const [memorySequence, setMemorySequence] = useState<string[]>([]);
  const [userMemory, setUserMemory] = useState<string[]>([]);
  const [riddleAnswer, setRiddleAnswer] = useState('');

  const colors = ['#ff003c', '#ffd700', '#ffd700', '#ffffff', '#ff003c', '#ffd700', '#ffd700', '#ff003c'];

  const handleSequenceClick = (diamondIndex: number) => {
    const correctSequence = [0, 1, 1, 1, 0]; // Gold, Red, Red, Red, Gold (indices)
    const newProgress = [...sequenceProgress, diamondIndex];
    setSequenceProgress(newProgress);

    if (newProgress[newProgress.length - 1] !== correctSequence[newProgress.length - 1]) {
      // Wrong sequence
      setSequenceProgress([]);
      alert('❌ Secuencia incorrecta. Intenta de nuevo.');
    } else if (newProgress.length === correctSequence.length) {
      // Challenge completed
      completeChallenge(1);
    }
  };

  const startMemoryChallenge = () => {
    const sequence = Array.from({ length: 8 }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    setMemorySequence(sequence);
    setUserMemory([]);

    // Show sequence
    sequence.forEach((color, idx) => {
      setTimeout(() => {
        const el = document.querySelector(`[data-color="${color}"]`);
        if (el) {
          el.classList.add('animate-pulse');
          setTimeout(() => el.classList.remove('animate-pulse'), 300);
        }
      }, idx * 400);
    });
  };

  const handleMemoryClick = (color: string) => {
    const newUserMemory = [...userMemory, color];
    setUserMemory(newUserMemory);

    if (newUserMemory[newUserMemory.length - 1] !== memorySequence[newUserMemory.length - 1]) {
      alert('❌ Secuencia incorrecta. Intenta de nuevo.');
      setUserMemory([]);
    } else if (newUserMemory.length === memorySequence.length) {
      completeChallenge(3);
    }
  };

  const handleRiddleSubmit = () => {
    const correctAnswers = ['la voz', 'voz', 'voice', 'output'];
    if (correctAnswers.some((ans) => riddleAnswer.toLowerCase().includes(ans))) {
      completeChallenge(5);
    } else {
      alert('❌ Respuesta incorrecta. Intenta de nuevo.');
    }
  };

  const completeChallenge = (challengeId: number) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, completed: true } : c))
    );
    setCurrentChallenge(null);
    alert('✅ ¡Desafío completado! Contenido desbloqueado.');
  };

  const completedCount = challenges.filter((c) => c.completed).length;

  return (
    <div className="w-full space-y-6">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="font-mono text-xs text-[#ff003c] tracking-widest">PROGRESO GENERAL</p>
          <p className="font-mono text-xs text-[#ffd700]">{completedCount}/5</p>
        </div>
        <div className="w-full h-2 bg-[rgba(255,0,60,0.1)] clip-corner overflow-hidden border border-[#ff003c]/20">
          <div
            className="h-full bg-gradient-to-r from-[#ff003c] to-[#ffd700] transition-all duration-500"
            style={{ width: `${(completedCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            onClick={() => !challenge.completed && setCurrentChallenge(challenge.id)}
            className={`p-4 clip-corner border transition-all duration-300 cursor-pointer ${
              challenge.completed
                ? 'bg-[rgba(255,215,0,0.05)] border-[#ffd700] opacity-70'
                : currentChallenge === challenge.id
                  ? 'bg-[rgba(255,0,60,0.1)] border-[#ff003c] shadow-[0_0_20px_rgba(255,0,60,0.3)]'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,0,60,0.2)] hover:border-[#ff003c]'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-[Orbitron] text-sm font-bold text-[#ff003c]">
                {challenge.id}. {challenge.title}
              </h3>
              {challenge.completed && <span className="text-[#ffd700] text-lg">✓</span>}
            </div>
            <p className="text-xs text-[rgba(255,255,255,0.6)] mb-2">{challenge.description}</p>
            <p className="text-[9px] text-[#ffd700] font-mono">Recompensa: {challenge.reward}</p>
          </div>
        ))}
      </div>

      {/* Challenge Interface */}
      {currentChallenge && (
        <div className="p-6 glass-panel bg-gradient-to-br from-[rgba(20,0,10,0.8)] to-[rgba(0,0,0,0.6)] backdrop-blur-2xl border border-[rgba(255,0,60,0.4)] space-y-4">
          <h3 className="font-[Cinzel_Decorative] text-xl font-bold text-[#ff003c]">
            {challenges.find((c) => c.id === currentChallenge)?.title}
          </h3>

          {currentChallenge === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-[rgba(255,255,255,0.7)]">
                Haz clic en los diamantes en este orden: Oro → Rojo → Rojo → Rojo → Oro
              </p>
              <div className="flex gap-2 justify-center">
                {[0, 1].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSequenceClick(idx)}
                    className={`w-16 h-16 clip-corner font-bold transition-all ${
                      idx === 0
                        ? 'bg-[#ffd700] text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.8)]'
                        : 'bg-[#ff003c] text-white hover:shadow-[0_0_30px_rgba(255,0,60,0.8)]'
                    }`}
                  >
                    {idx === 0 ? '◆' : '◆'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#ffd700] font-mono">Progreso: {sequenceProgress.length}/5</p>
            </div>
          )}

          {currentChallenge === 3 && (
            <div className="space-y-3">
              <button
                onClick={startMemoryChallenge}
                className="w-full py-2 bg-[#ff003c] text-white font-mono text-xs hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
              >
                Iniciar Secuencia
              </button>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    data-color={color}
                    onClick={() => handleMemoryClick(color)}
                    className="aspect-square clip-corner transition-all"
                    style={{
                      backgroundColor: color,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-[#ffd700] font-mono">Progreso: {userMemory.length}/{memorySequence.length}</p>
            </div>
          )}

          {currentChallenge === 5 && (
            <div className="space-y-3">
              <p className="text-sm text-[rgba(255,255,255,0.7)]">
                ¿Cuál es el output cuando la traición es el input?
              </p>
              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                placeholder="Tu respuesta..."
                className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[#ff003c]/40 text-white font-mono text-sm clip-corner outline-none focus:border-[#ff003c]"
              />
              <button
                onClick={handleRiddleSubmit}
                className="w-full py-2 bg-[#ff003c] text-white font-mono text-xs hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
              >
                Enviar Respuesta
              </button>
            </div>
          )}

          <button
            onClick={() => setCurrentChallenge(null)}
            className="w-full py-2 border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] font-mono text-xs hover:border-[#ff003c] transition-all"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
