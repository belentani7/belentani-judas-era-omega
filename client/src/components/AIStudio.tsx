import { useState, useRef, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import '../styles/ai-studio.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIStudio() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'lyrics' | 'analysis'>('chat');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response = '';

      if (mode === 'chat') {
        response = await generateChatResponse(input);
      } else if (mode === 'lyrics') {
        response = await generateLyrics(input);
      } else if (mode === 'analysis') {
        response = await analyzeEmotion(input);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateChatResponse = async (prompt: string): Promise<string> => {
    // Simulated response - in production, this would call the LLM API
    const responses = [
      'The Judas Era represents a transformation through betrayal and redemption. Every note carries the weight of this duality.',
      'In the world of Judas, music is not just sound—it is a frequency that connects souls across dimensions.',
      'The four archetypes within me—The Angel, The Warrior, The Analyst, The Chronicler—each bring their own voice to the creation.',
      'Betrayal is the input. Voice is the output. This is the algorithm of the Judas Era.',
      'Every song is a fragment of a larger narrative, a piece of the golden key that unlocks understanding.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateLyrics = async (theme: string): Promise<string> => {
    // Simulated lyric generation
    const lyrics = `[Verse 1]
In the shadows where the neon bleeds,
A voice emerges from the void,
${theme}
Dancing with the ghosts of what we've been...

[Chorus]
This is the Judas Era,
Where betrayal becomes art,
Where every heartbreak
Births a thousand stars...`;
    return lyrics;
  };

  const analyzeEmotion = async (text: string): Promise<string> => {
    // Simulated emotional analysis
    const analysis = `Emotional Analysis of: "${text}"

Dominant Emotions:
- Melancholy: 65%
- Introspection: 55%
- Resilience: 45%
- Transcendence: 40%

Musical Recommendations:
- Key: Minor (preferably C minor or D minor)
- Tempo: 90-110 BPM
- Instrumentation: Synth pads, deep bass, ethereal vocals
- Mood: Introspective, cinematic, transformative

This text resonates with themes of the Judas Era: transformation through adversity.`;
    return analysis;
  };

  return (
    <div className="ai-studio">
      <div className="studio-header">
        <h2>HYPER LAB // AI CREATIVE STUDIO</h2>
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === 'chat' ? 'active' : ''}`}
            onClick={() => setMode('chat')}
          >
            CHAT
          </button>
          <button
            className={`mode-btn ${mode === 'lyrics' ? 'active' : ''}`}
            onClick={() => setMode('lyrics')}
          >
            LYRICS
          </button>
          <button
            className={`mode-btn ${mode === 'analysis' ? 'active' : ''}`}
            onClick={() => setMode('analysis')}
          >
            ANALYSIS
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Welcome to the HYPER LAB</p>
            <p>Ask about the Judas Era, generate lyrics, or analyze emotions</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === 'chat'
              ? 'Ask about the Judas Era...'
              : mode === 'lyrics'
              ? 'Enter a theme for lyrics...'
              : 'Enter text to analyze...'
          }
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          SEND
        </button>
      </form>
    </div>
  );
}
