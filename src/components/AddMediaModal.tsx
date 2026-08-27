import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  Film,
  Camera,
} from 'lucide-react';
import { GalleryItem, GalleryCategory } from '../types';
import { GALLERY_CATEGORIES } from '../data/gallery';
import { getYouTubeVideoId, isDirectVideoUrl } from '../utils/mediaHelpers';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (item: GalleryItem) => void;
}

export const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  onAddMedia,
}) => {
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('studio');
  const [mediaUrl, setMediaUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  });

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'photo' | 'video' | 'youtube' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setCategory('studio');
    setMediaUrl('');
    setThumbnailUrl('');
    setDescription('');
    setArtist('');
    setDuration('');
    setPreviewSrc(null);
    setPreviewType(null);
    setErrorMsg(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    setErrorMsg(null);
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      setErrorMsg('Veuillez sélectionner un fichier image (JPG, PNG, WEBP) ou vidéo (MP4, WEBM).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('Le fichier dépasse la limite recommandée de 50 Mo.');
      return;
    }

    // Auto-detect type
    const detectedType: 'photo' | 'video' = isVideo ? 'video' : 'photo';
    setMediaType(detectedType);

    if (!title) {
      // Auto fill title from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setMediaUrl(result);
      setPreviewSrc(result);
      setPreviewType(detectedType);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setMediaUrl(url);
    setErrorMsg(null);

    if (!url.trim()) {
      setPreviewSrc(null);
      setPreviewType(null);
      return;
    }

    const ytId = getYouTubeVideoId(url);
    if (ytId) {
      setMediaType('video');
      setPreviewType('youtube');
      setPreviewSrc(`https://www.youtube.com/embed/${ytId}`);
      if (!thumbnailUrl) {
        setThumbnailUrl(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
      }
    } else if (isDirectVideoUrl(url)) {
      setMediaType('video');
      setPreviewType('video');
      setPreviewSrc(url);
    } else {
      // Assume photo or direct image
      setPreviewType('photo');
      setPreviewSrc(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Veuillez renseigner un titre pour ce média.');
      return;
    }

    if (!mediaUrl.trim()) {
      setErrorMsg('Veuillez téléverser un fichier ou saisir une URL valide.');
      return;
    }

    setIsSubmitting(true);

    const ytId = getYouTubeVideoId(mediaUrl);
    let finalThumbnail = thumbnailUrl;
    if (mediaType === 'video' && !finalThumbnail && ytId) {
      finalThumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    } else if (mediaType === 'photo' && !finalThumbnail) {
      finalThumbnail = mediaUrl;
    }

    const newItem: GalleryItem = {
      id: `custom-${Date.now()}`,
      type: mediaType,
      title: title.trim(),
      category: category === 'all' ? 'studio' : category,
      url: mediaUrl.trim(),
      thumbnailUrl: finalThumbnail || undefined,
      description: description.trim() || undefined,
      artist: artist.trim() || undefined,
      duration: mediaType === 'video' ? duration.trim() || undefined : undefined,
      date: date || 'Récemment',
      isCustom: true,
    };

    onAddMedia(newItem);
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="add-media-modal"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
              {mediaType === 'photo' ? (
                <Camera className="w-5 h-5" />
              ) : (
                <Film className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Ajouter à la Galerie
              </h3>
              <p className="text-xs text-neutral-400">
                Publiez une nouvelle photo ou vidéo de session, clip ou live
              </p>
            </div>
          </div>
          <button
            id="close-add-media-modal-btn"
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pt-4 pb-2 space-y-5 pr-1">
          {errorMsg && (
            <div className="p-3.5 bg-red-500/15 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Type Toggle: Photo vs Video */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              Type de média *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="media-type-photo-btn"
                onClick={() => {
                  setMediaType('photo');
                  if (previewType === 'youtube') {
                    setPreviewSrc(null);
                    setPreviewType(null);
                  }
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  mediaType === 'photo'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-md shadow-orange-500/10'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo (Image)</span>
              </button>

              <button
                type="button"
                id="media-type-video-btn"
                onClick={() => setMediaType('video')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  mediaType === 'video'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500 shadow-md shadow-orange-500/10'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <VideoIcon className="w-4 h-4" />
                <span>Vidéo (Clip / Session)</span>
              </button>
            </div>
          </div>

          {/* Input Source Toggle: Upload file vs URL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-300">
                Source du fichier *
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    inputMode === 'upload'
                      ? 'bg-neutral-800 text-orange-400 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Téléverser un fichier
                </button>
                <span className="text-neutral-700">|</span>
                <button
                  type="button"
                  onClick={() => setInputMode('url')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    inputMode === 'url'
                      ? 'bg-neutral-800 text-orange-400 font-semibold'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Lien URL / YouTube
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={
                    mediaType === 'photo'
                      ? 'image/jpeg,image/png,image/webp,image/gif'
                      : 'video/mp4,video/webm,video/ogg,image/*'
                  }
                  className="hidden"
                  id="media-file-input"
                />
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-neutral-700/80 hover:border-orange-500/50 bg-neutral-950/60 hover:bg-neutral-950'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-orange-400 mb-3">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Cliquez pour choisir ou glissez-déposez votre {mediaType === 'photo' ? 'photo' : 'vidéo'}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {mediaType === 'photo'
                      ? 'Formats supportés : JPG, PNG, WEBP, GIF (Max 20 Mo)'
                      : 'Formats supportés : MP4, WEBM (Max 50 Mo)'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    id="media-url-input"
                    value={mediaUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder={
                      mediaType === 'video'
                        ? 'Ex: https://www.youtube.com/watch?v=... ou lien MP4'
                        : 'Ex: https://images.unsplash.com/photo-...'
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-neutral-500">
                  {mediaType === 'video'
                    ? 'Astuce : Collez simplement un lien YouTube ou un fichier MP4 direct pour générer le lecteur automatique.'
                    : 'Collez le lien direct vers une image hébergée en ligne.'}
                </p>
              </div>
            )}
          </div>

          {/* Live Preview if available */}
          {previewSrc && (
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
              <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                Aperçu du média :
              </span>
              <div className="relative rounded-lg overflow-hidden max-h-48 flex items-center justify-center bg-black">
                {previewType === 'photo' && (
                  <img
                    src={previewSrc}
                    alt="Aperçu"
                    className="max-h-48 w-full object-contain"
                    onError={() => {
                      setErrorMsg("Impossible de charger l'aperçu de l'image. Vérifiez l'URL.");
                    }}
                  />
                )}
                {previewType === 'video' && (
                  <video
                    src={previewSrc}
                    controls
                    className="max-h-48 w-full object-contain"
                  />
                )}
                {previewType === 'youtube' && (
                  <iframe
                    src={previewSrc}
                    title="Aperçu YouTube"
                    className="w-full h-44 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Titre du média *
              </label>
              <input
                type="text"
                id="media-title-input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. Enregistrement Solo Rumba"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Catégorie *
              </label>
              <select
                id="media-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-orange-500 outline-none cursor-pointer"
              >
                {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Artist & Duration / Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Artiste ou Projet
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Ex. Sarah M. / JBS"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none"
              />
            </div>

            {mediaType === 'video' ? (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Durée (ex. 3:45)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ex. 3:20"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Ex. Août 2024"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Miniature personnalisée (optionnel)
              </label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="URL de l'image miniature..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Description / Légende (optionnel)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez la séance, le matériel utilisé ou l'événement..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-orange-500 outline-none resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              id="submit-add-media-btn"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ajouter à la Galerie</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
