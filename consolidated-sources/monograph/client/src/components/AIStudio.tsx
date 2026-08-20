import { useState } from 'react';

/**
 * AI STUDIO - Herramientas Creativas con IA
 * Chat, generador de letras, análisis emocional
 */

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIStudio() {
  const [activeTab, setActiveTab] = useState<'chat' | 'lyrics' | 'analysis'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Bienvenido al JUDAS AI STUDIO. Soy la voz del sistema. ¿Qué deseas crear hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [lyricsInput, setLyricsInput] = useState('');
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [analysis, setAnalysis] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setInput('');
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      'Interesante perspectiva. La traición es el input, la voz es el output.',
      'Eso resuena con la esencia de Judas Era. Continúa...',
      'Veo patrones en tu pensamiento. ¿Cuál es tu verdadera pregunta?',
      'La crónica de la Llave Dorada se revela a través de preguntas como esa.',
      'Tu creatividad fluye. ¿Qué más deseas explorar?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateLyrics = () => {
    if (!lyricsInput.trim()) return;

    const templates = [
      `En la noche del ${lyricsInput}, la verdad emerge\nComo un espejo que refleja lo que no queremos ver\nLa traición es el input, la voz es el output\nY en ese espacio, encontramos la libertad`,
      `${lyricsInput} es el principio\nDonde todo comienza y todo termina\nUna danza entre lo sagrado y lo profano\nLa Llave Dorada brilla en la oscuridad`,
      `Cuando ${lyricsInput} llama\nEl sistema responde con precisión\nCuatro voces, una sola verdad\nBelentani canta la crónica del alma`,
    ];

    setGeneratedLyrics(templates[Math.floor(Math.random() * templates.length)]);
  };

  const analyzeEmotional = () => {
    if (!analysisText.trim()) return;

    const metrics = {
      'Índice Emocional': Math.floor(Math.random() * 100),
      'Traición Detectada': Math.floor(Math.random() * 100),
      'Redención': Math.floor(Math.random() * 100),
      'Sincronización Neural': Math.floor(Math.random() * 100),
      'Resonancia Lírica': Math.floor(Math.random() * 100),
    };

    let analysisResult = 'ANÁLISIS EMOCIONAL COMPLETADO\n\n';
    Object.entries(metrics).forEach(([key, value]) => {
      analysisResult += `${key}: ${value}%\n`;
    });

    setAnalysis(analysisResult);
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[rgba(255,0,60,0.2)]">
        {['chat', 'lyrics', 'analysis'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === tab
                ? 'text-[#ff003c] border-b-2 border-[#ff003c]'
                : 'text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.7)]'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="h-96 bg-[rgba(255,0,60,0.02)] border border-[rgba(255,0,60,0.2)] clip-corner p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 clip-corner text-sm font-mono ${
                    msg.role === 'user'
                      ? 'bg-[rgba(255,215,0,0.1)] text-[#ffd700] border border-[#ffd700]/30'
                      : 'bg-[rgba(255,0,60,0.1)] text-[#ff003c] border border-[#ff003c]/30'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[#ff003c]/40 text-white font-mono text-sm clip-corner outline-none focus:border-[#ff003c]"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-[#ff003c] text-white font-mono text-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Lyrics Generator Tab */}
      {activeTab === 'lyrics' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#ff003c] mb-2 tracking-widest">
              TEMA O PALABRA CLAVE
            </label>
            <input
              type="text"
              value={lyricsInput}
              onChange={(e) => setLyricsInput(e.target.value)}
              placeholder="Ej: La Llave Dorada, Traición, Redención..."
              className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[#ff003c]/40 text-white font-mono text-sm clip-corner outline-none focus:border-[#ff003c]"
            />
          </div>

          <button
            onClick={generateLyrics}
            className="w-full py-2 bg-[#ff003c] text-white font-mono text-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
          >
            GENERAR LETRAS
          </button>

          {generatedLyrics && (
            <div className="p-4 bg-[rgba(255,0,60,0.05)] border border-[#ff003c]/30 clip-corner">
              <p className="text-xs font-mono text-[#ff003c] mb-2 tracking-widest">LETRAS GENERADAS</p>
              <p className="text-sm text-[rgba(255,255,255,0.8)] whitespace-pre-wrap font-mono leading-relaxed">
                {generatedLyrics}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Emotional Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#ff003c] mb-2 tracking-widest">
              TEXTO A ANALIZAR
            </label>
            <textarea
              value={analysisText}
              onChange={(e) => setAnalysisText(e.target.value)}
              placeholder="Pega aquí el texto de una canción o poema..."
              className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[#ff003c]/40 text-white font-mono text-sm clip-corner outline-none focus:border-[#ff003c] h-32 resize-none"
            />
          </div>

          <button
            onClick={analyzeEmotional}
            className="w-full py-2 bg-[#ff003c] text-white font-mono text-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
          >
            ANALIZAR
          </button>

          {analysis && (
            <div className="p-4 bg-[rgba(255,215,0,0.05)] border border-[#ffd700]/30 clip-corner">
              <p className="text-xs font-mono text-[#ffd700] mb-2 tracking-widest">RESULTADOS</p>
              <p className="text-sm text-[rgba(255,255,255,0.8)] whitespace-pre-wrap font-mono">
                {analysis}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-3 bg-[rgba(255,255,255,0.05)] border border-[#ffffff]/30 clip-corner font-mono text-xs text-[#ffffff]">
        <p>
          <span className="text-[#ff003c]">✦</span> AI Studio - Herramientas creativas impulsadas por IA
        </p>
      </div>
    </div>
  );
}
