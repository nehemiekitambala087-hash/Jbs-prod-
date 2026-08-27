import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  Video as VideoIcon,
  PlusCircle,
  Play,
  Maximize2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Camera,
  Film,
  Trash2,
  Calendar,
  User,
  X,
  RotateCcw,
} from 'lucide-react';
import { GalleryItem, GalleryMediaType, GalleryCategory } from '../types';
import { GALLERY_CATEGORIES } from '../data/gallery';
import { MediaLightboxModal } from './MediaLightboxModal';
import { AddMediaModal } from './AddMediaModal';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  onAddMedia: (item: GalleryItem) => void;
  onDeleteMedia: (id: string) => void;
  onResetDefaultGallery: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryItems,
  onAddMedia,
  onDeleteMedia,
  onResetDefaultGallery,
}) => {
  const [mediaTypeFilter, setMediaTypeFilter] = useState<GalleryMediaType>('all');
  const [categoryFilter, setCategoryFilter] = useState<GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Lightbox State
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filtering
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchType =
        mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
      const matchCategory =
        categoryFilter === 'all' || item.category === categoryFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.artist?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchType && matchCategory && matchSearch;
    });
  }, [galleryItems, mediaTypeFilter, categoryFilter, searchQuery]);

  const activeItem =
    activeLightboxIndex !== null && filteredItems[activeLightboxIndex]
      ? filteredItems[activeLightboxIndex]
      : null;

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex !== null && activeLightboxIndex > 0) {
      setActiveLightboxIndex(activeLightboxIndex - 1);
    }
  };

  const handleNextLightbox = () => {
    if (
      activeLightboxIndex !== null &&
      activeLightboxIndex < filteredItems.length - 1
    ) {
      setActiveLightboxIndex(activeLightboxIndex + 1);
    }
  };

  const photoCount = galleryItems.filter((i) => i.type === 'photo').length;
  const videoCount = galleryItems.filter((i) => i.type === 'video').length;
  const customCount = galleryItems.filter((i) => i.isCustom).length;

  return (
    <section
      id="galerie"
      className="py-24 bg-black text-white relative border-t border-neutral-900 overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Camera className="w-3.5 h-3.5 text-orange-500" />
              <span>Studio, Clips & Scène</span>
            </div>
            <h2
              id="gallery-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-3"
            >
              Galerie <span className="text-orange-500">Photos & Vidéos</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Plongez dans l'univers de JBS Prod : sessions d'enregistrement à Kinshasa, coulisses de tournage de clips, prestations live et matériel de régie pro.
            </p>
          </div>

          {/* Action Button: Add Media */}
          <div className="flex items-center gap-3 shrink-0">
            {customCount > 0 && (
              <button
                onClick={onResetDefaultGallery}
                className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl text-xs font-semibold border border-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Réinitialiser la galerie par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
            )}

            <button
              id="open-add-media-modal-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ajouter une photo / vidéo</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl mb-8 space-y-4 shadow-xl backdrop-blur-md">
          {/* Top filter row: Media Type Tabs + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Media Type Segmented Controls */}
            <div
              id="gallery-type-filters"
              className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800"
            >
              <button
                id="gallery-type-all"
                onClick={() => setMediaTypeFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mediaTypeFilter === 'all'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tous</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({galleryItems.length})
                </span>
              </button>

              <button
                id="gallery-type-photo"
                onClick={() => setMediaTypeFilter('photo')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mediaTypeFilter === 'photo'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({photoCount})
                </span>
              </button>

              <button
                id="gallery-type-video"
                onClick={() => setMediaTypeFilter('video')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mediaTypeFilter === 'video'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span>Vidéos</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({videoCount})
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="gallery-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, artiste..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 text-white pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm placeholder:text-neutral-500 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom filter row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs text-neutral-500 font-semibold mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Catégories :
            </span>
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = categoryFilter === cat.id;
              const count =
                cat.id === 'all'
                  ? galleryItems.length
                  : galleryItems.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`gallery-category-${cat.id}`}
                  onClick={() => setCategoryFilter(cat.id as GalleryCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-800 text-orange-400 border border-orange-500/40 shadow-sm'
                      : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-14 text-center">
            <Film className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">
              Aucun média correspondant
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto">
              Aucune photo ou vidéo ne correspond à vos filtres actuels.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ajouter une photo ou vidéo maintenant</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const isVideo = item.type === 'video';
              const displayThumb =
                item.thumbnailUrl || (item.type === 'photo' ? item.url : undefined);

              return (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  onClick={() => handleOpenLightbox(index)}
                  className="group relative bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800/90 hover:border-orange-500/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
                >
                  {/* Media Thumbnail Container */}
                  <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                    {displayThumb ? (
                      <img
                        src={displayThumb}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                        {isVideo ? (
                          <Film className="w-10 h-10" />
                        ) : (
                          <ImageIcon className="w-10 h-10" />
                        )}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-60 group-hover:opacity-90 transition-opacity" />

                    {/* Badges on Top */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md shadow-md ${
                          isVideo
                            ? 'bg-red-500/90 text-white'
                            : 'bg-black/70 text-neutral-200 border border-white/10'
                        }`}
                      >
                        {isVideo ? (
                          <>
                            <Play className="w-3 h-3 fill-current" />
                            <span>Vidéo {item.duration ? `• ${item.duration}` : ''}</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-3 h-3" />
                            <span>Photo</span>
                          </>
                        )}
                      </span>

                      {item.isCustom && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-500 text-white shadow-md">
                          Ajout récent
                        </span>
                      )}
                    </div>

                    {/* Center Hover Action Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        {isVideo ? (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        ) : (
                          <Maximize2 className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-neutral-900/60">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-neutral-400">
                        <span className="uppercase tracking-wider font-semibold text-orange-400/90">
                          {GALLERY_CATEGORIES.find((c) => c.id === item.category)?.label ||
                            item.category}
                        </span>
                        {item.date && <span>{item.date}</span>}
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata & Delete for Custom */}
                    <div className="mt-4 pt-3 border-t border-neutral-800/70 flex items-center justify-between text-xs text-neutral-400">
                      {item.artist ? (
                        <span className="inline-flex items-center gap-1 text-neutral-300 font-medium truncate">
                          <User className="w-3 h-3 text-neutral-500" />
                          <span>{item.artist}</span>
                        </span>
                      ) : (
                        <span className="text-neutral-500 font-mono text-[11px]">
                          JBS Studios Kinshasa
                        </span>
                      )}

                      {item.isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Supprimer cet élément de la galerie ?')) {
                              onDeleteMedia(item.id);
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Media Modal */}
      <AddMediaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMedia={onAddMedia}
      />

      {/* Lightbox / Media Viewer Modal */}
      <MediaLightboxModal
        item={activeItem}
        isOpen={activeLightboxIndex !== null}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        hasPrev={activeLightboxIndex !== null && activeLightboxIndex > 0}
        hasNext={
          activeLightboxIndex !== null &&
          activeLightboxIndex < filteredItems.length - 1
        }
        onDeleteCustom={onDeleteMedia}
      />
    </section>
  );
};
