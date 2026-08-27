import React, { useState, useMemo } from 'react';
import {
  Play,
  Pause,
  Music,
  Volume2,
  Sparkles,
  Plus,
  Instagram,
  Share2,
  Check,
  Search,
  X,
  UserX,
  Camera,
  Film,
  Disc,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { Artist } from '../types';
import { ArtistPortfolioModal } from './ArtistPortfolioModal';

interface ArtistsSectionProps {
  artists: Artist[];
  currentPlayingTrackId: string | null;
  isPlaying: boolean;
  onTogglePlayTrack: (trackId: string, genre: string, artistName: string, trackTitle: string) => void;
  onOpenAddArtist?: () => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({
  artists,
  currentPlayingTrackId,
  isPlaying,
  onTogglePlayTrack,
  onOpenAddArtist,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedArtistId, setCopiedArtistId] = useState<string | null>(null);
  const [selectedArtistForPortfolio, setSelectedArtistForPortfolio] = useState<Artist | null>(null);

  const filters = [
    { label: 'Tous les talents', key: 'all' },
    { label: 'Afrobeat & R&B', key: 'afrobeat' },
    { label: 'Rap & Urban', key: 'rap' },
    { label: 'Rumba Moderne', key: 'rumba' },
    { label: 'Gospel Urbain', key: 'gospel' },
  ];

  const filteredArtists = useMemo(() => {
    return artists.filter((a) => {
      // Category match
      const matchesCategory = activeFilter === 'all' || a.category === activeFilter;

      // Search query match (name, style, bio, or latestRelease title)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.style.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q) ||
        a.latestRelease?.title.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [artists, activeFilter, searchQuery]);

  const handleShareArtist = (artist: Artist, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Découvrez ${artist.name} (${artist.style}) en signature chez JBS Prod Kinshasa !`;
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} - JBS Prod`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}#artistes`).then(() => {
        setCopiedArtistId(artist.id);
        setTimeout(() => setCopiedArtistId(null), 2500);
      });
    }
  };

  return (
    <section id="artistes" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-orange-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Label & Production</span>
          </div>
          <h2
            id="artists-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4"
          >
            Les Artistes <span className="text-orange-500">JBS Prod</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-medium">
            Découvrez les talents que nous accompagnons fièrement de la création à la distribution.
          </p>
        </div>

        {/* Search Bar & Controls */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="artists-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un artiste par nom, style (Afrobeat, Rap, Rumba...) ou titre..."
              className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-orange-500 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-neutral-500 outline-none transition-all shadow-inner focus:ring-2 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors cursor-pointer"
                title="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-center">
              <span className="text-xs text-neutral-400">
                Résultat(s) pour « <span className="text-orange-400 font-semibold">{searchQuery}</span> » : <strong className="text-white">{filteredArtists.length}</strong> artiste(s) trouvé(s)
              </span>
            </div>
          )}
        </div>

        {/* Category Filter Tabs & Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center justify-center flex-wrap gap-2">
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

          {onOpenAddArtist && (
            <button
              onClick={onOpenAddArtist}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-orange-500 text-neutral-300 hover:text-white border border-neutral-800 hover:border-orange-500 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Gérer & Ajouter des Artistes</span>
            </button>
          )}
        </div>

        {/* Empty State when search returns no artists */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-16 px-4 bg-neutral-900/40 rounded-3xl border border-neutral-800 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto mb-4">
              <UserX className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Aucun artiste trouvé
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Aucun talent ne correspond à « <span className="text-white font-medium">{searchQuery}</span> » dans cette catégorie.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
              {onOpenAddArtist && (
                <button
                  onClick={onOpenAddArtist}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Ajouter cet artiste
                </button>
              )}
            </div>
          </div>
        )}

        {/* Artists Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredArtists.map((artist) => {
            const isThisPlaying =
              isPlaying && currentPlayingTrackId === artist.id;

            return (
              <div
                key={artist.id}
                id={`artist-card-${artist.id}`}
                className="bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/60 transition-all duration-300 group shadow-xl hover:shadow-orange-500/10 flex flex-col"
              >
                {/* Photo container with hover zoom and social overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/20 group-hover:via-neutral-950/70 transition-colors duration-300" />

                  {/* Social Overlay Reveal on Hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px] z-10">
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest mb-3 drop-shadow">
                      Réseaux & Plateformes
                    </span>
                    <div className="flex items-center gap-3">
                      {/* Spotify */}
                      <a
                        href={artist.spotifyUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-[#1DB954] hover:scale-110 active:scale-95 text-black flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
                        title="Écouter sur Spotify"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </a>

                      {/* Apple Music */}
                      <a
                        href={artist.appleMusicUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-[#FA243C] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
                        title="Écouter sur Apple Music"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.92.04-2.02.62-2.67 1.37-.58.65-1.09 1.71-.95 2.74 1.03.08 2.08-.49 2.7-1.24z" />
                        </svg>
                      </a>

                      {/* YouTube */}
                      <a
                        href={artist.youtubeUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-[#FF0000] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
                        title="Voir sur YouTube"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href={artist.instagramUrl || 'https://instagram.com'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:scale-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
                        title="Suivre sur Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>

                      {/* Quick Share Link */}
                      <button
                        onClick={(e) => handleShareArtist(artist, e)}
                        className="w-10 h-10 rounded-full bg-neutral-800/90 hover:bg-orange-500 hover:scale-110 active:scale-95 text-white border border-neutral-700 flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
                        title="Partager le profil de l'artiste"
                      >
                        {copiedArtistId === artist.id ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {copiedArtistId === artist.id && (
                      <span className="mt-2 text-[10px] text-emerald-400 font-bold bg-black/90 px-2.5 py-1 rounded-full border border-emerald-500/40 animate-fade-in">
                        Lien copié !
                      </span>
                    )}
                  </div>

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
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-90 text-white flex items-center justify-center shadow-xl shadow-orange-500/40 transition-transform duration-200 cursor-pointer z-20"
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
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-orange-500/40 text-orange-400 text-xs font-bold animate-pulse z-20">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Extrait en cours...</span>
                    </div>
                  )}
                </div>

                {/* Artist Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-2xl font-bold font-display text-white group-hover:text-orange-400 transition-colors">
                        {artist.name}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {artist.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-orange-400/90 text-sm font-semibold mb-3">
                      Style : {artist.style}
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>

                  {/* Artist Media Database & Portfolio Action Button */}
                  <div className="my-3 p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="inline-flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800 text-neutral-300">
                        <Camera className="w-3 h-3 text-orange-400" />
                        <strong>{artist.photos?.length || 0}</strong>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800 text-neutral-300">
                        <Film className="w-3 h-3 text-red-400" />
                        <strong>{artist.videos?.length || 0}</strong>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800 text-neutral-300">
                        <Disc className="w-3 h-3 text-purple-400" />
                        <strong>{artist.discography?.length || 0}</strong>
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedArtistForPortfolio(artist)}
                      className="px-3 py-1.5 bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 hover:border-orange-500 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                      title="Consulter la base de données médias, photos, clips et discographie de l'artiste"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Dossier & Médias</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Latest Track + Streaming Platforms */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
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

      {/* Artist Portfolio Modal (Photos, Videos, Discography, Press Kit) */}
      <ArtistPortfolioModal
        artist={selectedArtistForPortfolio}
        isOpen={!!selectedArtistForPortfolio}
        onClose={() => setSelectedArtistForPortfolio(null)}
        onPlayTrack={(trackTitle, artistName) => {
          if (selectedArtistForPortfolio) {
            onTogglePlayTrack(
              selectedArtistForPortfolio.id,
              selectedArtistForPortfolio.category,
              artistName,
              trackTitle
            );
          }
        }}
        currentlyPlaying={currentPlayingTrackId}
      />
    </section>
  );
};
