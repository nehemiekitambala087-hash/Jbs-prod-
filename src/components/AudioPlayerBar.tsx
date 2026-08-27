import React from 'react';
import { Play, Pause, X, Volume2, Music2, Disc3 } from 'lucide-react';

interface AudioPlayerBarProps {
  currentTrack: {
    id: string;
    artistName: string;
    trackTitle: string;
    genre: string;
  } | null;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  onTogglePlay,
  onClose,
}) => {
  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside
      aria-label="Lecteur audio en direct"
      className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-orange-500/30 p-3 sm:p-4 shadow-2xl shadow-black animate-in slide-in-from-bottom-6 duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track details */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
            <Disc3
              className={`w-6 h-6 text-orange-500 ${
                isPlaying ? 'animate-spin' : ''
              }`}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white truncate">
                {currentTrack.trackTitle}
              </p>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 font-semibold px-2 py-0.5 rounded-full uppercase border border-orange-500/30 shrink-0">
                Extrait JBS
              </span>
            </div>
            <p className="text-xs text-neutral-400 truncate">
              {currentTrack.artistName} • {currentTrack.genre}
            </p>
          </div>
        </div>

        {/* Controls & Animated Equalizer */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Animated visualizer bars */}
          <div className="hidden md:flex items-center gap-1 h-6 px-3 bg-neutral-900 rounded-md border border-neutral-800">
            {[40, 75, 55, 90, 60, 80, 45, 95, 70, 50].map((h, i) => (
              <span
                key={i}
                className={`w-1 bg-orange-500 rounded-full transition-all duration-150 ${
                  isPlaying ? 'opacity-100 animate-pulse' : 'opacity-30'
                }`}
                style={{
                  height: isPlaying ? `${(h * (0.4 + Math.random() * 0.6))}%` : '4px',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>
            <span className="text-xs font-mono text-neutral-400 w-10">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title="Fermer le lecteur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
