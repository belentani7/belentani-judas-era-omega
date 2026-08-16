import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import '../styles/music-studio.css';

interface MusicStudioProps {
  onInteraction?: () => void;
  onListeningComplete?: () => void;
}

interface Track {
  title: string;
  bpm: number;
  key: string;
  duration: string;
  url: string;
  platform: string;
}

const TRACKS: Track[] = [
  { title: 'Apaga a Luz', bpm: 120, key: 'C Minor', duration: '03:28', url: 'https://open.spotify.com/track/3hN3SpkROvGNmX4lGlPxai', platform: 'SPOTIFY' },
  { title: 'Mon Amour', bpm: 110, key: 'F Minor', duration: '03:45', url: 'https://open.spotify.com/track/5g1FZR5Kjd9W0jSmRu1pk7', platform: 'SPOTIFY' },
  { title: 'Heart Breaking', bpm: 108, key: 'A Minor', duration: '03:37', url: 'https://open.spotify.com/search/Belentani%20Heart%20Breaking', platform: 'SPOTIFY SEARCH' },
  { title: 'Baila Conmigo', bpm: 118, key: 'E Minor', duration: '03:31', url: 'https://open.spotify.com/search/Belentani%20Baila%20Conmigo', platform: 'SPOTIFY SEARCH' },
  { title: 'America Has A Problem', bpm: 115, key: 'A Minor', duration: '03:35', url: 'https://open.spotify.com/track/1lbuw5PFbT6E3qBHiEww8P', platform: 'SPOTIFY' },
  { title: 'Therapist', bpm: 95, key: 'D Minor', duration: '04:12', url: 'https://open.spotify.com/track/3Aj36RRP0ow2NSbfjwqsXU', platform: 'SPOTIFY' },
  { title: 'I Wrote a Song', bpm: 105, key: 'G Minor', duration: '03:52', url: 'https://open.spotify.com/track/6Z44Lel2ej96S9JGkwmJWi', platform: 'SPOTIFY' },
  { title: 'Beautiful Skies', bpm: 100, key: 'E Minor', duration: '04:05', url: 'https://open.spotify.com/track/3zcxdpFTuH8wlo0qZCnmMn', platform: 'SPOTIFY' },
];

const RINGTONES = [
  { name: 'Judas Theme', notes: ['C4', 'E4', 'G4', 'B4', 'G4', 'E4'] },
  { name: 'Golden Key', notes: ['G4', 'B4', 'D5', 'B4', 'G4', 'E4'] },
  { name: 'Betrayal', notes: ['D4', 'F4', 'A4', 'C5', 'A4', 'F4'] },
  { name: 'Redemption', notes: ['E4', 'G4', 'B4', 'E5', 'B4', 'G4'] },
  { name: 'Omega', notes: ['A4', 'C5', 'E5', 'A5', 'E5', 'C5'] },
  { name: 'Eternity', notes: ['F4', 'A4', 'C5', 'F5', 'C5', 'A4'] },
];

const KEYBOARD = [
  { note: 'C4', label: 'C', key: 'a' },
  { note: 'D4', label: 'D', key: 's' },
  { note: 'E4', label: 'E', key: 'd' },
  { note: 'F4', label: 'F', key: 'f' },
  { note: 'G4', label: 'G', key: 'g' },
  { note: 'A4', label: 'A', key: 'h' },
  { note: 'B4', label: 'B', key: 'j' },
  { note: 'C5', label: 'C5', key: 'k' },
];

export function MusicStudio({ onInteraction, onListeningComplete }: MusicStudioProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [listeningSeconds, setListeningSeconds] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const outputRef = useRef<Tone.Gain | null>(null);

  const ensureAudio = async () => {
    await Tone.start();
    if (!synthRef.current) {
      const output = new Tone.Gain(0.85).toDestination();
      const analyser = new Tone.Analyser('waveform', 64);
      output.connect(analyser);
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.008, decay: 0.12, sustain: 0.35, release: 1.2 },
      }).connect(output);
      synth.volume.value = -8;
      outputRef.current = output;
      analyserRef.current = analyser;
      synthRef.current = synth;
      setAudioReady(true);
    }
    return synthRef.current;
  };

  const playNote = async (note: string) => {
    const synth = await ensureAudio();
    if (!synth) return;
    synth.triggerAttackRelease(note, '8n');
    setActiveKey(note);
    setTimeout(() => setActiveKey(null), 220);
    onInteraction?.();
  };

  const playMelody = async (notes: string[]) => {
    if (isPlaying) return;
    setIsPlaying(true);
    onInteraction?.();
    for (const note of notes) {
      await playNote(note);
      await new Promise((resolve) => setTimeout(resolve, 260));
    }
    setIsPlaying(false);
  };

  const startListening = (track: Track) => {
    setSelectedTrack(track);
    setListeningSeconds(0);
    onInteraction?.();
  };

  const playBeat = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    onInteraction?.();
    const beatLength = 60000 / 110;
    const pattern = ['C4', 'C4', 'G3', 'C4', 'C4', 'C4', 'A3', 'G3'];
    for (const note of pattern) {
      await playNote(note);
      await new Promise((resolve) => setTimeout(resolve, beatLength / 2));
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!selectedTrack || listeningSeconds >= 30) return;
    const timer = window.setInterval(() => {
      setListeningSeconds((seconds) => {
        const next = Math.min(30, seconds + 1);
        if (next === 30) onListeningComplete?.();
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [listeningSeconds, onListeningComplete, selectedTrack]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = KEYBOARD.find((item) => item.key === event.key.toLowerCase());
      if (key && !event.repeat) void playNote(key.note);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0;
    const render = () => {
      const width = canvas.clientWidth || 420;
      const height = canvas.clientHeight || 112;
      const ratio = window.devicePixelRatio || 1;
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#050305';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = 'rgba(255, 0, 60, 0.22)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, height / 2);
      context.lineTo(width, height / 2);
      context.stroke();
      const values = analyserRef.current?.getValue() as Float32Array | undefined;
      context.strokeStyle = '#ff003c';
      context.shadowColor = '#ff003c';
      context.shadowBlur = 12;
      context.lineWidth = 1.5;
      context.beginPath();
      for (let index = 0; index < width; index += 2) {
        const sample = values?.[Math.floor((index / width) * (values.length || 1))] ?? Math.sin((index + frame * 2) * 0.035) * 0.04;
        const y = height / 2 + sample * height * 1.6;
        index === 0 ? context.moveTo(index, y) : context.lineTo(index, y);
      }
      context.stroke();
      context.shadowBlur = 0;
      frame += 1;
      const raf = requestAnimationFrame(render);
      return raf;
    };
    const raf = render();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => {
    synthRef.current?.dispose();
    analyserRef.current?.dispose();
    outputRef.current?.dispose();
  }, []);

  return (
    <div className="music-studio">
      <div className="music-console-bar">
        <span><i className={`status-pulse ${audioReady ? 'ready' : ''}`} /> AUDIO CORE {audioReady ? 'ARMED' : 'STANDBY'}</span>
        <span>KEYS A–K / 110 BPM SIGNAL</span>
      </div>
      <div className="studio-section sonic-panel">
        <div className="studio-section-heading"><h3>SONIC KEYBOARD</h3><span>LIVE FREQUENCY TUNER</span></div>
        <div className="keyboard">
          {KEYBOARD.map((item) => <button key={item.note} className={`key ${activeKey === item.note ? 'active' : ''}`} onClick={() => void playNote(item.note)} title={`${item.label} (${item.key})`} type="button"><span>{item.label}</span><small>{item.note}</small></button>)}
        </div>
      </div>
      <div className="studio-section visualizer-panel">
        <div className="studio-section-heading"><h3>VISUALIZER</h3><span>NEURAL RESONANCE / 32 BANDS</span></div>
        <canvas ref={canvasRef} className="visualizer" aria-label="Visualizador de frecuencia en tiempo real" />
      </div>
      <div className="studio-section">
        <div className="studio-section-heading"><h3>RINGTONE GENERATOR</h3><span>06 TRANSMISSIONS</span></div>
        <div className="ringtones">{RINGTONES.map((ringtone) => <button key={ringtone.name} className="ringtone-btn" onClick={() => void playMelody(ringtone.notes)} disabled={isPlaying} type="button">{ringtone.name}<span>PLAY / 08N</span></button>)}</div>
        <button className="beat-btn" onClick={() => void playBeat()} disabled={isPlaying} type="button">{isPlaying ? 'TRANSMISSION IN PROGRESS...' : 'PLAY BEAT / 110 BPM'}</button>
      </div>
      <div className="studio-section discography-panel">
        <div className="studio-section-heading"><h3>SONIC ARCHIVE</h3><span>{TRACKS.length.toString().padStart(2, '0')} RELEASES INDEXED</span></div>
        <div className="listening-challenge"><span>LISTENING PROTOCOL</span><strong>{selectedTrack ? `${selectedTrack.title} / ${listeningSeconds.toString().padStart(2, '0')} SEC` : 'OPEN A RELEASE TO BEGIN'}</strong><div className="listening-progress"><i style={{ width: `${(listeningSeconds / 30) * 100}%` }} /></div><small>{listeningSeconds >= 30 ? 'SIGNAL CAPTURED — MUSIC CHALLENGE UNLOCKED' : 'Keep the selected release open for 30 seconds to unlock the sonic signal.'}</small></div>
        <div className="tracks-list">{TRACKS.map((track, index) => <div key={track.title} className={`track-item ${selectedTrack?.title === track.title ? 'selected' : ''}`}><span className="track-index">0{index + 1}</span><div className="track-info"><h4>{track.title}</h4><p>{track.bpm} BPM <b>•</b> {track.key} <b>•</b> {track.duration}</p></div><a href={track.url} target="_blank" rel="noopener noreferrer" className="track-link" onClick={() => startListening(track)}>{track.platform} ↗</a></div>)}</div>
      </div>
    </div>
  );
}

export default MusicStudio;
