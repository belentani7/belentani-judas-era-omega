import { useEffect, useRef, useState } from 'react';

/**
 * MUSIC PLAYER - Reproductor de Música Integrado
 * Links a Spotify, Apple Music, YouTube, SoundCloud, etc.
 */

interface Track {
  id: number;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  duration: string;
  platforms: {
    spotify?: string;
    apple?: string;
    youtube?: string;
    soundcloud?: string;
  };
}

export default function MusicPlayer() {
  const [tracks] = useState<Track[]>([
    {
      id: 1,
      title: 'Mon Amour',
      artist: 'BELENTANI',
      bpm: 92,
      key: 'F Minor',
      duration: '3:45',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
    {
      id: 2,
      title: 'Therapist',
      artist: 'BELENTANI',
      bpm: 110,
      key: 'C Minor',
      duration: '4:12',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
    {
      id: 3,
      title: 'Apaga la Luz',
      artist: 'BELENTANI',
      bpm: 88,
      key: 'G Minor',
      duration: '3:28',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
    {
      id: 4,
      title: 'Lento',
      artist: 'BELENTANI',
      bpm: 72,
      key: 'D Minor',
      duration: '4:55',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
    {
      id: 5,
      title: 'I Wrote a Song',
      artist: 'BELENTANI',
      bpm: 95,
      key: 'A Minor',
      duration: '3:33',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
    {
      id: 6,
      title: 'America Has a Problem',
      artist: 'BELENTANI',
      bpm: 105,
      key: 'E Minor',
      duration: '3:19',
      platforms: {
        spotify: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl',
        apple: 'https://music.apple.com/es/artist/belentani/1522171354',
        youtube: 'https://www.youtube.com/c/PedroMarcosSantosBelentani',
        soundcloud: 'https://soundcloud.com/belentani',
      },
    },
  ]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full space-y-6">
      {/* Now Playing */}
      {currentTrack && (
        <div className="p-6 glass-panel bg-gradient-to-br from-[rgba(20,0,10,0.8)] to-[rgba(0,0,0,0.6)] backdrop-blur-2xl border border-[rgba(255,0,60,0.4)] space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-[Cinzel_Decorative] text-2xl font-bold text-[#ffd700]">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-[rgba(255,255,255,0.6)] font-mono">
                {currentTrack.artist} • {currentTrack.duration}
              </p>
            </div>
            <div className="text-right text-xs font-mono text-[#ffd700]">
              <div>{currentTrack.bpm} BPM</div>
              <div>{currentTrack.key}</div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="px-6 py-2 bg-[#ff003c] text-white font-mono text-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] transition-all"
            >
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
            </button>
            <div className="flex-1 h-1 bg-[rgba(255,0,60,0.1)] clip-corner">
              <div className="h-full w-1/3 bg-[#ff003c] clip-corner" />
            </div>
            <span className="text-xs font-mono text-[rgba(255,255,255,0.5)]">1:15 / 3:45</span>
          </div>

          {/* Platform Links */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(255,0,60,0.2)]">
            {currentTrack.platforms.spotify && (
              <a
                href={currentTrack.platforms.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[#1DB954] text-white text-xs font-mono hover:shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all"
              >
                Spotify
              </a>
            )}
            {currentTrack.platforms.apple && (
              <a
                href={currentTrack.platforms.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[#555555] text-white text-xs font-mono hover:shadow-[0_0_15px_rgba(85,85,85,0.5)] transition-all"
              >
                Apple Music
              </a>
            )}
            {currentTrack.platforms.youtube && (
              <a
                href={currentTrack.platforms.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[#FF0000] text-white text-xs font-mono hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all"
              >
                YouTube
              </a>
            )}
            {currentTrack.platforms.soundcloud && (
              <a
                href={currentTrack.platforms.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-[#FF7700] text-white text-xs font-mono hover:shadow-[0_0_15px_rgba(255,119,0,0.5)] transition-all"
              >
                SoundCloud
              </a>
            )}
          </div>
        </div>
      )}

      {/* Playlist */}
      <div className="space-y-2">
        <p className="font-mono text-xs text-[#ff003c] tracking-widest">DISCOGRAFÍA COMPLETA</p>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setCurrentTrack(track)}
              className={`p-3 clip-corner border transition-all cursor-pointer ${
                currentTrack?.id === track.id
                  ? 'bg-[rgba(255,0,60,0.1)] border-[#ff003c]'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,0,60,0.2)] hover:border-[#ff003c]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-[#ffd700]">{track.title}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.5)]">
                    {track.bpm} BPM • {track.key} • {track.duration}
                  </p>
                </div>
                {currentTrack?.id === track.id && (
                  <span className="text-[#ff003c] text-lg">▶</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streaming Platforms */}
      <div className="p-4 bg-[rgba(255,255,255,0.05)] border border-[#ffffff]/30 clip-corner space-y-3">
        <p className="font-mono text-xs text-[#ffffff] tracking-widest">ESCUCHA EN TODAS PARTES</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: 'Spotify', url: 'https://open.spotify.com/artist/2bU5Ir70YHHuUnq2f3WCYl', color: '#1DB954' },
            { name: 'Apple Music', url: 'https://music.apple.com/es/artist/belentani/1522171354', color: '#555555' },
            { name: 'YouTube', url: 'https://www.youtube.com/c/PedroMarcosSantosBelentani', color: '#FF0000' },
            { name: 'SoundCloud', url: 'https://soundcloud.com/belentani', color: '#FF7700' },
            { name: 'Deezer', url: 'https://www.deezer.com/mx/artist/99797362', color: '#FF0000' },
            { name: 'Amazon Music', url: '#', color: '#00A8E1' },
            { name: 'Tidal', url: '#', color: '#000000' },
            { name: 'Bandcamp', url: '#', color: '#1DA0C3' },
          ].map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 clip-corner text-white text-xs font-mono text-center hover:shadow-lg transition-all"
              style={{ backgroundColor: platform.color }}
            >
              {platform.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
