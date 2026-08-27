import React, { useState } from 'react';
import { ARTISTS } from '../data/artists';
import { Play, Pause, Music, Volume2, Sparkles, ExternalLink } from 'lucide-react';
import { Artist } from '../types';

interface ArtistsSectionProps {
  currentPlayingTrackId: string | null;
  isPlaying: boolean;
  onTogglePlayTrack: (trackId: string, genre: string, artistName: string, trackTitle: string) => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({
  currentPlayingTrackId,
  isPlaying,
  onTogglePlayTrack,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const filters = [
    { label: 'Tous les talents', key: 'all' },
    { label: 'Afrobeat & R&B', key: 'afrobeat' },
    { label: 'Rap & Urban', key: 'rap' },
    { label: 'Rumba Moderne', key: 'rumba' },
    { label: 'Gospel Urbain', key: 'gospel' },
  ];

  const filteredArtists =
    activeFilter === 'all'
      ? ARTISTS
      : ARTISTS.filter((a) => a.category === activeFilter);

  return (
    <section id="artistes" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="artists-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4"
          >
            Les Artistes <span className="text-orange-500">JBS Prod</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-medium">
            Découvrez les talents que nous accompagnons fièrement.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Artists Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredArtists.map((artist) => {
            const isThisPlaying =
              isPlaying && currentPlayingTrackId === artist.id;

            return (
              <div
                key={artist.id}
                id={`artist-card-${artist.id}`}
                className="bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/50 transition-all duration-300 group shadow-xl flex flex-col"
              >
                {/* Photo container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

                  {/* Play preview overlay button */}
                  <button
                    onClick={() =>
                      onTogglePlayTrack(
                        artist.id,
                        artist.category,
                        artist.name,
                        artist.latestRelease.title
                      )
                    }
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-90 text-white flex items-center justify-center shadow-xl shadow-orange-500/40 transition-transform duration-200 cursor-pointer z-10"
                    title="Écouter un extrait produit par JBS"
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>

                  {/* Playing indicator */}
                  {isThisPlaying && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-orange-500/40 text-orange-400 text-xs font-bold animate-pulse">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Extrait en cours...</span>
                    </div>
                  )}
                </div>

                {/* Artist Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-orange-400/90 text-sm font-semibold mb-3">
                      Style : {artist.style}
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>

                  {/* Latest Track + Streaming Platforms */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    {/* Track info */}
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-neutral-300 font-medium truncate max-w-[150px] sm:max-w-[200px]">
                        {artist.latestRelease.title}
                      </span>
                    </div>

                    {/* Social / Streaming Icons matching mockup */}
                    <div className="flex items-center gap-2">
                      {/* Spotify (Green badge) */}
                      <a
                        href={artist.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-black flex items-center justify-center transition-all duration-200"
                        title="Spotify"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </a>

                      {/* Apple Music (Pink/Red badge) */}
                      <a
                        href={artist.appleMusicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-[#FA243C]/20 hover:bg-[#FA243C] text-[#FA243C] hover:text-white flex items-center justify-center transition-all duration-200"
                        title="Apple Music"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.92.04-2.02.62-2.67 1.37-.58.65-1.09 1.71-.95 2.74 1.03.08 2.08-.49 2.7-1.24z" />
                        </svg>
                      </a>

                      {/* YouTube (Red badge) */}
                      <a
                        href={artist.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-200"
                        title="YouTube Music"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
