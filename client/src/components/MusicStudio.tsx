import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import '../styles/music-studio.css';

interface Track {
  title: string;
  bpm: number;
  key: string;
  duration: string;
  url: string;
}

export function MusicStudio() {
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [ringtones, setRingtones] = useState<{ name: string; notes: string[] }[]>([]);
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);

  const tracks: Track[] = [
    { title: 'Mon Amour', bpm: 110, key: 'F Minor', duration: '3:45', url: 'https://open.spotify.com/track/5g1FZR5Kjd9W0jSmRu1pk7' },
    { title: 'Therapist', bpm: 95, key: 'D Minor', duration: '4:12', url: 'https://open.spotify.com/track/3Aj36RRP0ow2NSbfjwqsXU' },
    { title: 'Apaga a Luz', bpm: 120, key: 'C Minor', duration: '3:28', url: 'https://open.spotify.com/track/3hN3SpkROvGNmX4lGlPxai' },
    { title: 'I Wrote a Song', bpm: 105, key: 'G Minor', duration: '3:52', url: 'https://open.spotify.com/track/6Z44Lel2ej96S9JGkwmJWi' },
    { title: 'America Has A Problem', bpm: 115, key: 'A Minor', duration: '3:35', url: 'https://open.spotify.com/track/1lbuw5PFbT6E3qBHiEww8P' },
    { title: 'Beautiful Skies', bpm: 100, key: 'E Minor', duration: '4:05', url: 'https://open.spotify.com/track/3zcxdpFTuH8wlo0qZCnmMn' },
  ];

  const keys = [
    { note: 'C4', label: 'C', key: 'a' },
    { note: 'D4', label: 'D', key: 's' },
    { note: 'E4', label: 'E', key: 'd' },
    { note: 'F4', label: 'F', key: 'f' },
    { note: 'G4', label: 'G', key: 'g' },
    { note: 'A4', label: 'A', key: 'h' },
    { note: 'B4', label: 'B', key: 'j' },
    { note: 'C5', label: 'C5', key: 'k' },
  ];

  useEffect(() => {
    const initSynth = async () => {
      await Tone.start();
      const analyser = new Tone.Analyser('waveform', 32);
      analyserRef.current = analyser;

      const newSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
      }).connect(analyser);

      newSynth.volume.value = -8;
      setSynth(newSynth);

      // Generate ringtones
      const ringtoneData = [
        { name: 'Judas Theme', notes: ['C4', 'E4', 'G4', 'B4', 'G4', 'E4'] },
        { name: 'Golden Key', notes: ['G4', 'B4', 'D5', 'B4', 'G4', 'E4'] },
        { name: 'Betrayal', notes: ['D4', 'F4', 'A4', 'C5', 'A4', 'F4'] },
        { name: 'Redemption', notes: ['E4', 'G4', 'B4', 'E5', 'B4', 'G4'] },
        { name: 'Omega', notes: ['A4', 'C5', 'E5', 'A5', 'E5', 'C5'] },
        { name: 'Eternity', notes: ['F4', 'A4', 'C5', 'F5', 'C5', 'A4'] },
      ];
      setRingtones(ringtoneData);
    };

    initSynth();
  }, []);

  const playNote = async (note: string) => {
    if (!synth) return;
    setActiveKey(note);
    synth.triggerAttackRelease(note, '8n');
    setTimeout(() => setActiveKey(null), 200);
  };

  const playMelody = async (notes: string[], tempo: number = 500) => {
    if (!synth) return;
    setIsPlaying(true);
    for (const note of notes) {
      playNote(note);
      await new Promise((resolve) => setTimeout(resolve, tempo));
    }
    setIsPlaying(false);
  };

  const playBeat = async () => {
    if (!synth) return;
    setIsPlaying(true);
    // 110 BPM beat pattern
    const beatPattern = ['C4', 'C4', 'G3', 'C4'];
    for (let i = 0; i < 4; i++) {
      for (const note of beatPattern) {
        playNote(note);
        await new Promise((resolve) => setTimeout(resolve, 136)); // 110 BPM
      }
    }
    setIsPlaying(false);
  };

  // Visualizer
  useEffect(() => {
    if (!visualizerRef.current || !analyserRef.current) return;

    const canvas = visualizerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const waveform = analyserRef.current!.getValue() as any;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#ff003c';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / waveform.length;
      let x = 0;

      for (let i = 0; i < waveform.length; i++) {
        const v = (waveform[i] as number) / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="music-studio">
      <div className="studio-section">
        <h3>SONIC KEYBOARD</h3>
        <div className="keyboard">
          {keys.map((k) => (
            <button
              key={k.note}
              className={`key ${activeKey === k.note ? 'active' : ''}`}
              onClick={() => playNote(k.note)}
              title={`${k.label} (${k.key})`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <div className="studio-section">
        <h3>VISUALIZER</h3>
        <canvas ref={visualizerRef} className="visualizer" width={400} height={100}></canvas>
      </div>

      <div className="studio-section">
        <h3>RINGTONE GENERATOR</h3>
        <div className="ringtones">
          {ringtones.map((rt) => (
            <button
              key={rt.name}
              className="ringtone-btn"
              onClick={() => playMelody(rt.notes)}
              disabled={isPlaying}
            >
              {rt.name}
            </button>
          ))}
        </div>
        <button className="beat-btn" onClick={playBeat} disabled={isPlaying}>
          PLAY BEAT (110 BPM)
        </button>
      </div>

      <div className="studio-section">
        <h3>DISCOGRAPHY</h3>
        <div className="tracks-list">
          {tracks.map((track) => (
            <div key={track.title} className="track-item">
              <div className="track-info">
                <h4>{track.title}</h4>
                <p>{track.bpm} BPM • {track.key} • {track.duration}</p>
              </div>
              <a href={track.url} target="_blank" rel="noopener noreferrer" className="track-link">
                SPOTIFY →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
