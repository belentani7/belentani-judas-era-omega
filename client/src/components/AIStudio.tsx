import { useEffect, useMemo, useRef, useState } from 'react';
import { trpc } from '@/lib/trpc';
import '../styles/ai-studio.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIStudioProps {
  onInteraction?: () => void;
}

const STORAGE_KEY = 'belentani-judas-hyper-lab-history';

export function AIStudio({ onInteraction }: AIStudioProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as Message[] : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'lyrics' | 'analysis' | 'visual'>('chat');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.llm.chat.useMutation();
  const lyricsMutation = trpc.llm.generateLyrics.useMutation();
  const analysisMutation = trpc.llm.analyzeEmotion.useMutation();
  const visualMutation = trpc.visual.generateConcept.useMutation();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  const modeCopy = useMemo(() => ({
    chat: { label: 'Ask the Judas consciousness...', badge: 'CONVERSATION' },
    lyrics: { label: 'Enter a theme for a new transmission...', badge: 'LYRICS ENGINE' },
    analysis: { label: 'Paste text to read its emotional frequency...', badge: 'MOOD ANALYSIS' },
    visual: { label: 'Describe the artifact you want to summon...', badge: 'CONCEPT FORGE' },
  }[mode]), [mode]);

  const addMessage = (role: Message['role'], content: string) => {
    setMessages((previous) => [...previous, { id: `${Date.now()}-${role}`, role, content, timestamp: new Date().toISOString() }]);
  };

  const revealAssistant = (content: string) => new Promise<void>((resolve) => {
    const id = `${Date.now()}-assistant-reveal`;
    const timestamp = new Date().toISOString();
    setMessages((previous) => [...previous, { id, role: 'assistant', content: '', timestamp }]);
    let cursor = 0;
    const step = Math.max(2, Math.ceil(content.length / 120));
    const timer = window.setInterval(() => {
      cursor = Math.min(content.length, cursor + step);
      setMessages((previous) => previous.map((message) => message.id === id ? { ...message, content: content.slice(0, cursor) } : message));
      if (cursor >= content.length) {
        window.clearInterval(timer);
        resolve();
      }
    }, 18);
  });

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || isLoading) return;
    addMessage('user', prompt);
    setInput('');
    setIsLoading(true);
    onInteraction?.();
    try {
      let response = '';
      if (mode === 'chat') {
        const history = [...messages, { id: 'pending', role: 'user' as const, content: prompt, timestamp: new Date().toISOString() }].map(({ role, content }) => ({ role, content }));
        response = (await chatMutation.mutateAsync({ messages: history, mode: 'chat' })).response;
      } else if (mode === 'lyrics') {
        response = (await lyricsMutation.mutateAsync({ theme: prompt })).lyrics;
      } else if (mode === 'analysis') {
        response = (await analysisMutation.mutateAsync({ text: prompt })).analysis;
      } else {
        const result = await visualMutation.mutateAsync({ prompt });
        setGeneratedImage(result.url ?? null);
        response = result.url ? 'CONCEPT FORGED. THE ARTIFACT HAS ENTERED THE ARCHIVE.' : 'THE FORGE RETURNED NO IMAGE.';
      }
      await revealAssistant(response);
    } catch (error) {
      console.error('[HYPER LAB]', error);
      await revealAssistant('OMEGA CORE OFFLINE. Configura un proveedor LLM para abrir esta transmisión. El archivo quedó guardado en tu consola local.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="ai-studio">
      <div className="studio-header">
        <div><span className="eyebrow">HYPER LAB / {modeCopy.badge}</span><h2>JUDAS<span>AI</span></h2></div>
        <div className="studio-actions"><span className="ai-status"><i /> ROUTER READY</span><button type="button" onClick={clearHistory} className="clear-btn">CLEAR LOG</button></div>
      </div>
      <div className="mode-selector" role="tablist" aria-label="Modo del Hyper Lab">
        {(['chat', 'lyrics', 'analysis', 'visual'] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={mode === item} className={`mode-btn ${mode === item ? 'active' : ''}`} onClick={() => setMode(item)}>{item.toUpperCase()}</button>)}
      </div>
      <div className="messages-container" aria-live="polite">
        {generatedImage && <figure className="concept-output"><img src={generatedImage} alt="Arte conceptual generado para la Judas Era" /><figcaption>CONCEPT FORGE / ARCHIVE FRAME</figcaption></figure>}
        {messages.length === 0 ? <div className="empty-state"><span className="empty-glyph">◆</span><p>THE CORE IS LISTENING</p><small>Ask about the Judas Era, generate a lyric fragment, decode an emotion, or summon an artifact.</small></div> : messages.map((message) => <div key={message.id} className={`message ${message.role}`}><div className="message-meta">{message.role === 'assistant' ? 'JUDASAI' : 'YOU'} <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div><div className="message-content">{message.content}</div></div>)}
        {isLoading && <div className="message assistant loading"><div className="message-meta">JUDASAI <span>PROCESSING</span></div><div className="skeleton-lines" aria-label="Procesando respuesta"><i /><i /><i /></div><div className="loading-dots"><span /><span /><span /></div></div>}
        <div ref={messagesEndRef} />
      </div>
      <form className="input-form" onSubmit={handleSendMessage}>
        <span className="input-prefix">&gt;_</span>
        <input aria-label={modeCopy.label} type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder={modeCopy.label} disabled={isLoading} />
        <button type="submit" disabled={isLoading || !input.trim()}>{isLoading ? '...' : 'SEND'}</button>
      </form>
    </div>
  );
}

export default AIStudio;
