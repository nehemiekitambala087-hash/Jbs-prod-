import React, { useState } from 'react';
import {
  X,
  Camera,
  Film,
  Disc,
  FileText,
  Play,
  Pause,
  ExternalLink,
  Instagram,
  Sparkles,
  Share2,
  Check,
  Calendar,
  Eye,
  Clock,
  Music,
  Send,
  Download,
  Maximize2
} from 'lucide-react';
import { Artist, ArtistPhoto, ArtistVideo, ArtistRelease } from '../types';

interface ArtistPortfolioModalProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayTrack?: (trackTitle: string, artistName: string) => void;
  currentlyPlaying?: string | null;
}

export const ArtistPortfolioModal: React.FC<ArtistPortfolioModalProps> = ({
  artist,
  isOpen,
  onClose,
  onPlayTrack,
  currentlyPlaying,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'discography' | 'presskit'>('photos');
  const [selectedPhoto, setSelectedPhoto] = useState<ArtistPhoto | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ArtistVideo | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !artist) return null;

  const photos = artist.photos || [];
  const videos = artist.videos || [];
  const discography = artist.discography || [];

  const handleShare = () => {
    const text = `Découvrez le profil, les photos, clips et la discographie de ${artist.name} sur le label JBS Prod Kinshasa !`;
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} - Portfolio & Médias JBS Prod`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}#artistes`).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleBookingClick = () => {
    const message = encodeURIComponent(
      `Bonjour JBS Prod, je souhaite obtenir des informations de booking et management pour l'artiste ${artist.name} (${artist.style}).`
    );
    window.open(`https://wa.me/243891668120?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Banner */}
        <div className="relative bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-6 sm:p-8 border-b border-neutral-800">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer z-10"
            title="Fermer le portfolio"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Photo */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-orange-500/60 shadow-2xl flex-shrink-0 bg-neutral-950 group">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wide">
                  {artist.category}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Label JBS Prod Kinshasa
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight mb-1">
                {artist.name}
              </h2>
              <p className="text-sm font-semibold text-orange-400/90 mb-3">
                Style : {artist.style}
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-2xl mb-4 font-normal leading-relaxed">
                {artist.bio}
              </p>

              {/* Action Buttons & Socials */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={handleBookingClick}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Demande de Booking / Show</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Lien copié</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Partager</span>
                    </>
                  )}
                </button>

                {/* Social Quick links */}
                <div className="flex items-center gap-2">
                  {artist.spotifyUrl && (
                    <a
                      href={artist.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#1DB954]/20 hover:bg-[#1DB954] text-[#1DB954] hover:text-black flex items-center justify-center transition-colors"
                      title="Spotify"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </a>
                  )}
                  {artist.youtubeUrl && (
                    <a
                      href={artist.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#FF0000]/20 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-colors"
                      title="YouTube"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                  {artist.instagramUrl && (
                    <a
                      href={artist.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-pink-500/20 hover:bg-pink-600 text-pink-400 hover:text-white flex items-center justify-center transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-800/80 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'photos'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Galerie Photos ({photos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Clips & Vidéos ({videos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('discography')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'discography'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Discographie ({discography.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('presskit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'presskit'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fiche & Press Kit</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-neutral-950">
          {/* TAB 1: PHOTOS */}
          {activeTab === 'photos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-orange-400" />
                  <span>Shooting, Studios & Scènes de {artist.name}</span>
                </h3>
                <span className="text-xs text-neutral-400">
                  {photos.length} photo(s) répertoriée(s)
                </span>
              </div>

              {photos.length === 0 ? (
                <div className="py-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800">
                  <Camera className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">
                    Aucune photo n'a encore été ajoutée dans la base de cet artiste.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-orange-500/60 transition-all cursor-pointer shadow-lg flex flex-col justify-end"
                    >
                      <img
                        src={photo.url}
                        alt={photo.title || artist.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative p-3.5 z-10">
                        {photo.title && (
                          <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                            {photo.title}
                          </h4>
                        )}
                        {photo.caption && (
                          <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                            {photo.caption}
                          </p>
                        )}
                        {photo.date && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 mt-1">
                            <Calendar className="w-3 h-3" />
                            {photo.date}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIDEOS */}
          {activeTab === 'videos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-orange-400" />
                  <span>Clips officiels, Live Sessions & Coulisses</span>
                </h3>
                <span className="text-xs text-neutral-400">
                  {videos.length} vidéo(s) enregistrée(s)
                </span>
              </div>

              {videos.length === 0 ? (
                <div className="py-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800">
                  <Film className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">
                    Aucune vidéo enregistrée pour cet artiste.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-orange-500/50 transition-all p-4 flex flex-col justify-between group"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3 group/thumb">
                        <img
                          src={artist.image}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer"
                          >
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </a>
                        </div>
                        {vid.duration && (
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white backdrop-blur-xs">
                            {vid.duration}
                          </div>
                        )}
                        {vid.type && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-orange-500 text-[10px] font-bold text-white uppercase tracking-wider">
                            {vid.type}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors mb-1">
                          {vid.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-neutral-500" />
                            {vid.views || 'Diffusion officielle'}
                          </span>
                          {vid.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                              {vid.date}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400">Production JBS Records</span>
                        <a
                          href={vid.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-semibold"
                        >
                          <span>Visionner</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DISCOGRAPHY */}
          {activeTab === 'discography' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Disc className="w-4 h-4 text-orange-400" />
                  <span>Discographie & Titres Produits</span>
                </h3>
                <span className="text-xs text-neutral-400">
                  {discography.length} projet(s)
                </span>
              </div>

              {discography.length === 0 ? (
                <div className="py-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800">
                  <Disc className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">
                    Aucune discographie détaillée pour le moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {discography.map((item) => (
                    <div
                      key={item.id}
                      className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 hover:border-orange-500/40 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.coverUrl || artist.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover border border-neutral-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 uppercase">
                              {item.type}
                            </span>
                            <span className="text-xs text-neutral-400 font-medium">{item.year}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                            {item.title}
                          </h4>
                          {item.streams && (
                            <p className="text-xs text-neutral-400">
                              Streams cumulés : <span className="text-white font-medium">{item.streams}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {onPlayTrack && (
                          <button
                            onClick={() => onPlayTrack(item.title, artist.name)}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden sm:inline">Écouter</span>
                          </button>
                        )}
                        <a
                          href={artist.spotifyUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                          title="Écouter sur streaming"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PRESS KIT & BIOGRAPHY */}
          {activeTab === 'presskit' && (
            <div className="space-y-6">
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Biographie Complète & Parcours</span>
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal whitespace-pre-line">
                  {artist.pressKitBio || artist.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Management & Booking Direct
                  </h4>
                  <p className="text-sm font-semibold text-white mb-1">
                    {artist.bookingContact || '+243 891 668 120 / booking@jbsprod.cd'}
                  </p>
                  <p className="text-xs text-neutral-400 mb-4">
                    Disponible pour concerts, showcases, festivals, collaborations et placements publicitaires.
                  </p>
                  <button
                    onClick={handleBookingClick}
                    className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/20"
                  >
                    Contacter le manager JBS Prod
                  </button>
                </div>

                <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Distribution & Label
                  </h4>
                  <div className="space-y-2 text-xs text-neutral-300">
                    <div className="flex justify-between py-1 border-b border-neutral-800">
                      <span className="text-neutral-400">Label de production :</span>
                      <strong className="text-white">JBS Prod Kinshasa</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-800">
                      <span className="text-neutral-400">Studio d'enregistrement :</span>
                      <strong className="text-white">JBS Studio Kinshasa</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-400">Distribution internationale :</span>
                      <strong className="text-emerald-400">Spotify, Apple, YouTube</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Dossier artistique officiel • JBS Prod</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>

      {/* Lightbox photo modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title || ''}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-neutral-800"
          />
          {(selectedPhoto.title || selectedPhoto.caption) && (
            <div className="mt-4 text-center max-w-lg">
              {selectedPhoto.title && (
                <h4 className="text-base font-bold text-white">{selectedPhoto.title}</h4>
              )}
              {selectedPhoto.caption && (
                <p className="text-xs text-neutral-300 mt-1">{selectedPhoto.caption}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
