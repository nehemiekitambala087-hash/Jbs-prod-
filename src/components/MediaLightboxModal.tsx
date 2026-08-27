import React, { useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Trash2,
  Calendar,
  User,
  Tag,
  Film,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { GalleryItem } from '../types';
import { getYouTubeVideoId, isDirectVideoUrl } from '../utils/mediaHelpers';

interface MediaLightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onDeleteCustom?: (id: string) => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onDeleteCustom,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrev, hasNext, onPrev, onNext, onClose]);

  if (!isOpen || !item) return null;

  const ytId = item.type === 'video' ? getYouTubeVideoId(item.url) : null;
  const isDirectVideo = item.type === 'video' ? isDirectVideoUrl(item.url) : false;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description || `Média JBS Prod: ${item.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(item.url);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Close button */}
      <button
        id="lightbox-close-btn"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full border border-neutral-700/60 shadow-xl transition-all cursor-pointer"
        title="Fermer (Échap)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      {hasPrev && (
        <button
          id="lightbox-prev-btn"
          onClick={onPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700/60 shadow-2xl transition-all hover:scale-110 cursor-pointer"
          title="Précédent (Flèche gauche)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {hasNext && (
        <button
          id="lightbox-next-btn"
          onClick={onNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full border border-neutral-700/60 shadow-2xl transition-all hover:scale-110 cursor-pointer"
          title="Suivant (Flèche droite)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Container */}
      <div className="w-full max-w-5xl h-full max-h-[90vh] flex flex-col justify-between items-center relative z-20">
        {/* Media Frame */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0 py-2 sm:py-4">
          {item.type === 'photo' ? (
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[65vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-neutral-800/60"
            />
          ) : ytId ? (
            <div className="w-full aspect-video max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                title={item.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : isDirectVideo || item.url.startsWith('data:video') ? (
            <video
              src={item.url}
              controls
              autoPlay
              className="max-h-[65vh] sm:max-h-[70vh] max-w-full rounded-xl shadow-2xl border border-neutral-800"
            />
          ) : (
            <div className="w-full aspect-video max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
              <iframe
                src={item.url}
                title={item.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Media Info Footer Bar */}
        <div className="w-full bg-neutral-900/90 border border-neutral-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-md shrink-0 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {item.type === 'video' ? (
                  <>
                    <Film className="w-3 h-3" />
                    <span>Vidéo {item.duration ? `(${item.duration})` : ''}</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-3 h-3" />
                    <span>Photo</span>
                  </>
                )}
              </span>

              {item.artist && (
                <span className="inline-flex items-center gap-1 text-xs text-neutral-300 font-semibold bg-neutral-800 px-2.5 py-0.5 rounded-md">
                  <User className="w-3 h-3 text-neutral-400" />
                  <span>{item.artist}</span>
                </span>
              )}

              {item.date && (
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold font-display text-white truncate">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {item.type === 'photo' && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                download
                className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                title="Ouvrir / Télécharger en plein écran"
              >
                <Download className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={handleShare}
              className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl transition-colors cursor-pointer"
              title="Partager le média"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {item.isCustom && onDeleteCustom && (
              <button
                onClick={() => {
                  if (window.confirm('Voulez-vous vraiment supprimer ce média de la galerie ?')) {
                    onDeleteCustom(item.id);
                    onClose();
                  }
                }}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-colors cursor-pointer"
                title="Supprimer ce média"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
