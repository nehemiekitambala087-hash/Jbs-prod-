import React, { useState } from 'react';
import {
  X,
  Search,
  Plus,
  Trash2,
  Edit2,
  Users,
  Image,
  Music,
  CheckCircle2,
  Upload,
  Link as LinkIcon,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Disc,
  FolderOpen,
  Eye,
  EyeOff,
  CheckCheck,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Bell
} from 'lucide-react';
import { Artist, Track, GalleryItem, CandidatureData, GalleryCategory } from '../types';
import { ARTISTS as DEFAULT_ARTISTS, DEMO_TRACKS as DEFAULT_TRACKS } from '../data/artists';
import { INITIAL_GALLERY_ITEMS } from '../data/gallery';

interface AdminStudioManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Artists management
  artists: Artist[];
  onAddArtist: (artist: Artist) => void;
  onUpdateArtist: (artist: Artist) => void;
  onDeleteArtist: (id: string) => void;
  onResetArtists: () => void;
  // Tracks management
  tracks: Track[];
  onAddTrack: (track: Track) => void;
  onUpdateTrack: (track: Track) => void;
  onDeleteTrack: (id: string) => void;
  onResetTracks: () => void;
  // Gallery media management
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onResetGallery: () => void;
  // Candidatures
  candidatures: CandidatureData[];
  onUpdateCandidatureStatus: (id: string, newStatus: CandidatureData['status']) => void;
  onDeleteCandidature: (id: string) => void;
  onMarkCandidatureAsRead?: (id: string, isRead: boolean) => void;
  onMarkAllCandidaturesAsRead?: () => void;
}

export const AdminStudioManagerModal: React.FC<AdminStudioManagerModalProps> = ({
  isOpen,
  onClose,
  artists,
  onAddArtist,
  onUpdateArtist,
  onDeleteArtist,
  onResetArtists,
  tracks,
  onAddTrack,
  onUpdateTrack,
  onDeleteTrack,
  onResetTracks,
  galleryItems,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onResetGallery,
  candidatures,
  onUpdateCandidatureStatus,
  onDeleteCandidature,
  onMarkCandidatureAsRead,
  onMarkAllCandidaturesAsRead,
}) => {
  const [activeTab, setActiveTab] = useState<'artists' | 'tracks' | 'gallery' | 'candidatures'>('artists');

  // Artists state for creation/editing
  const [isArtistFormOpen, setIsArtistFormOpen] = useState(false);
  const [editingArtistId, setEditingArtistId] = useState<string | null>(null);
  const [artistForm, setArtistForm] = useState<{
    name: string;
    stageName: string;
    style: string;
    category: Artist['category'];
    image: string;
    bio: string;
    pressKitBio: string;
    bookingContact: string;
    latestTrackTitle: string;
    latestTrackYear: string;
    latestTrackDuration: string;
    spotifyUrl: string;
    appleMusicUrl: string;
    youtubeUrl: string;
    instagramUrl: string;
    newPhotoUrl: string;
    newPhotoTitle: string;
    newVideoUrl: string;
    newVideoTitle: string;
  }>({
    name: '',
    stageName: '',
    style: 'Afrobeat / R&B',
    category: 'afrobeat',
    image: '',
    bio: '',
    pressKitBio: '',
    bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
    latestTrackTitle: '',
    latestTrackYear: '2024',
    latestTrackDuration: '3:20',
    spotifyUrl: 'https://open.spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
    newPhotoUrl: '',
    newPhotoTitle: '',
    newVideoUrl: '',
    newVideoTitle: '',
  });

  // Track state for creation/editing
  const [isTrackFormOpen, setIsTrackFormOpen] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [trackForm, setTrackForm] = useState<{
    title: string;
    artistName: string;
    genre: string;
    duration: number;
    coverUrl: string;
  }>({
    title: '',
    artistName: '',
    genre: 'Afrobeat',
    duration: 180,
    coverUrl: '',
  });

  // Gallery item form state
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState<{
    type: 'photo' | 'video';
    title: string;
    category: GalleryCategory;
    url: string;
    thumbnailUrl: string;
    description: string;
    artist: string;
    duration: string;
  }>({
    type: 'photo',
    title: '',
    category: 'studio',
    url: '',
    thumbnailUrl: '',
    description: '',
    artist: 'JBS Prod',
    duration: '03:15',
  });

  // Candidatures search and filter
  const [candSearch, setCandSearch] = useState('');
  const [candStatusFilter, setCandStatusFilter] = useState<'all' | 'unread' | CandidatureData['status']>('all');
  const [inspectingCandidature, setInspectingCandidature] = useState<CandidatureData | null>(null);

  const unreadCount = candidatures.filter(
    (c) => c.isRead === false || (c.isRead === undefined && c.status === 'nouveau')
  ).length;

  if (!isOpen) return null;

  // Handlers for Artists
  const handleOpenArtistForm = (artist?: Artist) => {
    if (artist) {
      setEditingArtistId(artist.id);
      setArtistForm({
        name: artist.name,
        stageName: artist.stageName || artist.name,
        style: artist.style,
        category: artist.category,
        image: artist.image,
        bio: artist.bio,
        pressKitBio: artist.pressKitBio || artist.bio,
        bookingContact: artist.bookingContact || '+243 891 668 120 / booking@jbsprod.cd',
        latestTrackTitle: artist.latestRelease.title,
        latestTrackYear: artist.latestRelease.year,
        latestTrackDuration: artist.latestRelease.duration,
        spotifyUrl: artist.spotifyUrl,
        appleMusicUrl: artist.appleMusicUrl,
        youtubeUrl: artist.youtubeUrl,
        instagramUrl: artist.instagramUrl || 'https://instagram.com',
        newPhotoUrl: '',
        newPhotoTitle: '',
        newVideoUrl: '',
        newVideoTitle: '',
      });
    } else {
      setEditingArtistId(null);
      setArtistForm({
        name: '',
        stageName: '',
        style: 'Afrobeat / R&B',
        category: 'afrobeat',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop',
        bio: '',
        pressKitBio: '',
        bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
        latestTrackTitle: 'Nouveau Single',
        latestTrackYear: '2024',
        latestTrackDuration: '3:30',
        spotifyUrl: 'https://open.spotify.com',
        appleMusicUrl: 'https://music.apple.com',
        youtubeUrl: 'https://youtube.com',
        instagramUrl: 'https://instagram.com',
        newPhotoUrl: '',
        newPhotoTitle: '',
        newVideoUrl: '',
        newVideoTitle: '',
      });
    }
    setIsArtistFormOpen(true);
  };

  const handleArtistImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtistForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistForm.name || !artistForm.image) {
      alert('Veuillez renseigner le nom et une photo pour l\'artiste.');
      return;
    }

    const existingArtist = artists.find((a) => a.id === editingArtistId);
    
    // Existing or new photos
    const currentPhotos = existingArtist?.photos ? [...existingArtist.photos] : [];
    if (artistForm.newPhotoUrl) {
      currentPhotos.push({
        id: `p-${Date.now()}`,
        url: artistForm.newPhotoUrl,
        title: artistForm.newPhotoTitle || `Shooting ${artistForm.name}`,
        caption: 'Session officielle JBS Prod',
        date: '2024',
      });
    }

    // Existing or new videos
    const currentVideos = existingArtist?.videos ? [...existingArtist.videos] : [];
    if (artistForm.newVideoUrl) {
      currentVideos.push({
        id: `v-${Date.now()}`,
        url: artistForm.newVideoUrl,
        title: artistForm.newVideoTitle || `Clip Officiel - ${artistForm.name}`,
        type: 'clip',
        duration: '03:40',
        date: '2024',
      });
    }

    const artistObj: Artist = {
      id: editingArtistId || `artist-custom-${Date.now()}`,
      name: artistForm.name,
      stageName: artistForm.stageName || artistForm.name,
      style: artistForm.style,
      category: artistForm.category,
      image: artistForm.image,
      bio: artistForm.bio || `Artiste talentueux signé sous le label JBS Prod.`,
      pressKitBio: artistForm.pressKitBio || artistForm.bio,
      bookingContact: artistForm.bookingContact,
      photos: currentPhotos.length > 0 ? currentPhotos : [
        {
          id: `p-init-${Date.now()}`,
          url: artistForm.image,
          title: `Shooting ${artistForm.name}`,
          caption: 'Visuel officiel',
          date: '2024',
        }
      ],
      videos: currentVideos.length > 0 ? currentVideos : (existingArtist?.videos || []),
      discography: existingArtist?.discography || [
        {
          id: `d-${Date.now()}`,
          title: artistForm.latestTrackTitle || 'Single Promo',
          type: 'single',
          year: artistForm.latestTrackYear || '2024',
          coverUrl: artistForm.image,
        }
      ],
      latestRelease: {
        title: artistForm.latestTrackTitle || 'Nouveau Titre',
        year: artistForm.latestTrackYear || '2024',
        duration: artistForm.latestTrackDuration || '3:30',
      },
      spotifyUrl: artistForm.spotifyUrl || 'https://open.spotify.com',
      appleMusicUrl: artistForm.appleMusicUrl || 'https://music.apple.com',
      youtubeUrl: artistForm.youtubeUrl || 'https://youtube.com',
      instagramUrl: artistForm.instagramUrl || 'https://instagram.com',
    };

    if (editingArtistId) {
      onUpdateArtist(artistObj);
    } else {
      onAddArtist(artistObj);
    }
    setIsArtistFormOpen(false);
  };

  // Handlers for Tracks
  const handleOpenTrackForm = (track?: Track) => {
    if (track) {
      setEditingTrackId(track.id);
      setTrackForm({
        title: track.title,
        artistName: track.artistName,
        genre: track.genre,
        duration: track.duration,
        coverUrl: track.coverUrl,
      });
    } else {
      setEditingTrackId(null);
      setTrackForm({
        title: '',
        artistName: artists[0]?.name || 'JBS Artiste',
        genre: 'Afrobeat / R&B',
        duration: 180,
        coverUrl: artists[0]?.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
      });
    }
    setIsTrackFormOpen(true);
  };

  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackForm.title || !trackForm.artistName) {
      alert('Veuillez indiquer le titre du morceau et l\'artiste.');
      return;
    }

    const trackObj: Track = {
      id: editingTrackId || `track-custom-${Date.now()}`,
      title: trackForm.title,
      artistName: trackForm.artistName,
      genre: trackForm.genre,
      duration: Number(trackForm.duration) || 180,
      coverUrl: trackForm.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    };

    if (editingTrackId) {
      onUpdateTrack(trackObj);
    } else {
      onAddTrack(trackObj);
    }
    setIsTrackFormOpen(false);
  };

  // Handlers for Gallery
  const handleGalleryMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setGalleryForm((prev) => ({
          ...prev,
          url: result,
          thumbnailUrl: prev.type === 'video' ? prev.thumbnailUrl : result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.url) {
      alert('Veuillez spécifier un titre et une image / vidéo valide.');
      return;
    }

    const newItem: GalleryItem = {
      id: `media-custom-${Date.now()}`,
      type: galleryForm.type,
      title: galleryForm.title,
      category: galleryForm.category,
      url: galleryForm.url,
      thumbnailUrl: galleryForm.thumbnailUrl || (galleryForm.type === 'photo' ? galleryForm.url : undefined),
      description: galleryForm.description,
      artist: galleryForm.artist,
      date: 'Aujourd\'hui',
      duration: galleryForm.type === 'video' ? galleryForm.duration : undefined,
      isCustom: true,
    };

    onAddGalleryItem(newItem);
    setIsGalleryFormOpen(false);
    setGalleryForm({
      type: 'photo',
      title: '',
      category: 'studio',
      url: '',
      thumbnailUrl: '',
      description: '',
      artist: 'JBS Prod',
      duration: '03:15',
    });
  };

  // Filtered Candidatures
  const filteredCandidatures = candidatures.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(candSearch.toLowerCase()) ||
      c.musicalStyle.toLowerCase().includes(candSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(candSearch.toLowerCase()) ||
      c.phone.toLowerCase().includes(candSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(candSearch.toLowerCase());

    let matchesStatus = true;
    if (candStatusFilter === 'unread') {
      matchesStatus = c.isRead === false || (c.isRead === undefined && c.status === 'nouveau');
    } else if (candStatusFilter !== 'all') {
      matchesStatus = c.status === candStatusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-display text-white">
                  Tableau de Bord & Gestion Studio
                </h3>
                <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Admin Professionnel
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Gérez vos artistes, modifiez les morceaux, ajoutez des photos/vidéos et traitez les demandes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-3 border-b border-neutral-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('artists')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'artists'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Artistes ({artists.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tracks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'tracks'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Chansons & Démos ({tracks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Galerie Médias ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('candidatures')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'candidatures'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Candidatures ({candidatures.length})</span>
            {unreadCount > 0 && (
              <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</span>
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Artists Management */}
        {activeTab === 'artists' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div>
                <h4 className="text-sm font-bold text-white">Catalogue des Artistes du Label</h4>
                <p className="text-xs text-neutral-400">
                  Ajoutez vos artistes, modifiez leurs biographies, photos et liens streaming.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetArtists}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  title="Restaurer les artistes d'origine"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
                <button
                  onClick={() => handleOpenArtistForm()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un Artiste</span>
                </button>
              </div>
            </div>

            {/* List of Artists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-4 rounded-xl flex items-center gap-4 transition-all"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-sm truncate">{artist.name}</h5>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {artist.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate">{artist.style}</p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      Dernier titre : {artist.latestRelease.title} ({artist.latestRelease.year})
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleOpenArtistForm(artist)}
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      title="Modifier cet artiste"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer l'artiste ${artist.name} ?`)) {
                          onDeleteArtist(artist.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Supprimer cet artiste"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Tracks & Songs Management */}
        {activeTab === 'tracks' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div>
                <h4 className="text-sm font-bold text-white">Gestion des Chansons & Démos Audio</h4>
                <p className="text-xs text-neutral-400">
                  Modifiez les titres, artistes associés, styles musicaux et visuels de pochette.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetTracks}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  title="Restaurer les morceaux par défaut"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
                <button
                  onClick={() => handleOpenTrackForm()}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter une Chanson</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-4 rounded-xl flex items-center gap-4 transition-all"
                >
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-14 h-14 rounded-lg object-cover border border-neutral-700 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white text-sm truncate">{track.title}</h5>
                    <p className="text-xs text-orange-400 font-medium truncate">{track.artistName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                      <span>{track.genre}</span>
                      <span>•</span>
                      <span>
                        {Math.floor(track.duration / 60)}:
                        {String(track.duration % 60).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleOpenTrackForm(track)}
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      title="Modifier cette chanson"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer la chanson ${track.title} ?`)) {
                          onDeleteTrack(track.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Supprimer cette chanson"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Gallery Media Management */}
        {activeTab === 'gallery' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div>
                <h4 className="text-sm font-bold text-white">Galerie Photos & Vidéos du Studio</h4>
                <p className="text-xs text-neutral-400">
                  Ajoutez vos sessions, clips et matériel en photo ou vidéo haute résolution.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetGallery}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  title="Restaurer la galerie par défaut"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
                <button
                  onClick={() => setIsGalleryFormOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un Média</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden group relative flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.type === 'video'
                          ? 'bg-red-600 text-white'
                          : 'bg-orange-500 text-white'
                      }`}
                    >
                      {item.type === 'video' ? 'Vidéo' : 'Photo'}
                    </span>
                    <button
                      onClick={() => onDeleteGalleryItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-neutral-300 hover:text-white transition-colors"
                      title="Supprimer ce média"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <h6 className="text-xs font-bold text-white truncate">{item.title}</h6>
                    <p className="text-[11px] text-neutral-400 truncate">{item.artist || 'JBS Prod'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Candidatures Management */}
        {activeTab === 'candidatures' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {/* Top Stats and Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">
                    Traitement des Candidatures & Demandes
                  </h4>
                  {unreadCount > 0 ? (
                    <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>{unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCheck className="w-3 h-3" />
                      <span>Tous les dossiers sont lus</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400">
                  Consultez les maquettes, contactez les candidats et gérez l'état de chaque dossier.
                </p>
              </div>

              {unreadCount > 0 && onMarkAllCandidaturesAsRead && (
                <button
                  onClick={onMarkAllCandidaturesAsRead}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Tout marquer comme lu</span>
                </button>
              )}
            </div>

            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={candSearch}
                  onChange={(e) => setCandSearch(e.target.value)}
                  placeholder="Rechercher par nom, style, email, téléphone..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setCandStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    candStatusFilter === 'all'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  Toutes ({candidatures.length})
                </button>

                <button
                  onClick={() => setCandStatusFilter('unread')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                    candStatusFilter === 'unread'
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping shrink-0" />
                  )}
                  <span>Non lues ({unreadCount})</span>
                </button>

                {(['nouveau', 'en_etude', 'retenu', 'archive'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setCandStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      candStatusFilter === st
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {st === 'nouveau'
                      ? 'Nouveaux'
                      : st === 'en_etude'
                      ? 'En Étude'
                      : st === 'retenu'
                      ? 'Retenus'
                      : 'Archivés'}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {filteredCandidatures.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 bg-neutral-950/50 rounded-xl border border-neutral-800/80">
                <FolderOpen className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm font-semibold">Aucun dossier trouvé pour ce filtre.</p>
                {candStatusFilter !== 'all' && (
                  <button
                    onClick={() => setCandStatusFilter('all')}
                    className="mt-2 text-xs text-orange-400 hover:underline"
                  >
                    Afficher toutes les candidatures
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCandidatures.map((c) => {
                  const isUnread = c.isRead === false || (c.isRead === undefined && c.status === 'nouveau');

                  return (
                    <div
                      key={c.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        isUnread
                          ? 'bg-gradient-to-r from-red-950/20 via-neutral-950 to-neutral-950 border-orange-500/70 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/30'
                          : 'bg-neutral-950 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-sm">{c.fullName}</span>

                          {isUnread && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span>NON LU</span>
                            </span>
                          )}

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.status === 'nouveau'
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                                : c.status === 'en_etude'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                : c.status === 'retenu'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}
                          >
                            {c.status === 'nouveau'
                              ? 'Nouveau'
                              : c.status === 'en_etude'
                              ? 'En Étude'
                              : c.status === 'retenu'
                              ? 'Retenu'
                              : 'Archivé'}
                          </span>

                          <span className="text-[11px] text-neutral-500 font-mono">#{c.id}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                          <span className="text-orange-400 font-semibold">{c.musicalStyle}</span>
                          <span>•</span>
                          <span className="text-neutral-300">{c.projectType}</span>
                          <span>•</span>
                          <span>📞 {c.phone}</span>
                          <span>•</span>
                          <span className="text-neutral-500">{c.createdAt}</span>
                        </div>

                        <p className="text-xs text-neutral-300 italic line-clamp-1">
                          "{c.message}"
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-800">
                        {/* Open Detailed Dossier */}
                        <button
                          onClick={() => {
                            setInspectingCandidature(c);
                            if (isUnread && onMarkCandidatureAsRead) {
                              onMarkCandidatureAsRead(c.id, true);
                            }
                          }}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Consulter le dossier complet"
                        >
                          <Eye className="w-3.5 h-3.5 text-orange-400" />
                          <span>Dossier</span>
                        </button>

                        {/* Toggle Read/Unread */}
                        {onMarkCandidatureAsRead && (
                          <button
                            onClick={() => onMarkCandidatureAsRead(c.id, !isUnread)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                              isUnread
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                            }`}
                            title={isUnread ? 'Marquer comme lu' : 'Marquer comme non lu'}
                          >
                            {isUnread ? (
                              <CheckCheck className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        )}

                        {/* Status selector */}
                        <select
                          value={c.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as CandidatureData['status'];
                            onUpdateCandidatureStatus(c.id, newStatus);
                            if (newStatus !== 'nouveau' && onMarkCandidatureAsRead) {
                              onMarkCandidatureAsRead(c.id, true);
                            }
                          }}
                          className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-orange-500"
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_etude">En Étude</option>
                          <option value="retenu">Retenu</option>
                          <option value="archive">Archivé</option>
                        </select>

                        {/* Delete button */}
                        <button
                          onClick={() => onDeleteCandidature(c.id)}
                          className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Supprimer la candidature"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Modal Sub-Form: Add/Edit Artist */}
        {isArtistFormOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="font-bold text-white text-lg">
                  {editingArtistId ? 'Modifier l\'Artiste' : 'Ajouter un Nouvel Artiste'}
                </h4>
                <button
                  onClick={() => setIsArtistFormOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArtist} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Nom / Nom de scène *
                  </label>
                  <input
                    type="text"
                    required
                    value={artistForm.name}
                    onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
                    placeholder="Ex: Gaz Mawete, Fally, Elinam..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Style Musical</label>
                    <input
                      type="text"
                      value={artistForm.style}
                      onChange={(e) => setArtistForm({ ...artistForm, style: e.target.value })}
                      placeholder="Ex: Rumba / Afro-Pop"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Catégorie</label>
                    <select
                      value={artistForm.category}
                      onChange={(e) =>
                        setArtistForm({ ...artistForm, category: e.target.value as Artist['category'] })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    >
                      <option value="afrobeat">Afrobeat / R&B</option>
                      <option value="rap">Rap / Pop Urbain</option>
                      <option value="rumba">Rumba Moderne</option>
                      <option value="gospel">Gospel Urbain</option>
                      <option value="rnb">R&B / Soul</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Photo de l'Artiste (Lien URL ou Téléversement) *
                  </label>
                  <input
                    type="text"
                    value={artistForm.image}
                    onChange={(e) => setArtistForm({ ...artistForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500 mb-2"
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir une photo depuis l'appareil</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleArtistImageUpload}
                      className="hidden"
                    />
                  </label>
                  {artistForm.image && (
                    <img
                      src={artistForm.image}
                      alt="Prévisualisation"
                      className="w-20 h-20 rounded-xl object-cover mt-2 border border-neutral-700"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Biographie / Description</label>
                  <textarea
                    rows={3}
                    value={artistForm.bio}
                    onChange={(e) => setArtistForm({ ...artistForm, bio: e.target.value })}
                    placeholder="Présentation de l'artiste, son univers et ses projets..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Dernier Titre</label>
                    <input
                      type="text"
                      value={artistForm.latestTrackTitle}
                      onChange={(e) =>
                        setArtistForm({ ...artistForm, latestTrackTitle: e.target.value })
                      }
                      placeholder="Ex: Mbote Love"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Année</label>
                    <input
                      type="text"
                      value={artistForm.latestTrackYear}
                      onChange={(e) =>
                        setArtistForm({ ...artistForm, latestTrackYear: e.target.value })
                      }
                      placeholder="2024"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Durée</label>
                    <input
                      type="text"
                      value={artistForm.latestTrackDuration}
                      onChange={(e) =>
                        setArtistForm({ ...artistForm, latestTrackDuration: e.target.value })
                      }
                      placeholder="3:45"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Artist Media Database & Booking Additions */}
                <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-3">
                  <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wide block">
                    Base de données multimédia de l'artiste
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 text-[11px] mb-1">
                        + Ajouter une Photo HD (Lien URL)
                      </label>
                      <input
                        type="text"
                        value={artistForm.newPhotoUrl}
                        onChange={(e) => setArtistForm({ ...artistForm, newPhotoUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-orange-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-[11px] mb-1">
                        Titre du shooting / scène
                      </label>
                      <input
                        type="text"
                        value={artistForm.newPhotoTitle}
                        onChange={(e) => setArtistForm({ ...artistForm, newPhotoTitle: e.target.value })}
                        placeholder="Ex: Shooting Studio Kinshasa"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-orange-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 text-[11px] mb-1">
                        + Ajouter un Clip / Vidéo (Lien YouTube / URL)
                      </label>
                      <input
                        type="text"
                        value={artistForm.newVideoUrl}
                        onChange={(e) => setArtistForm({ ...artistForm, newVideoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-orange-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-[11px] mb-1">
                        Titre du clip / live
                      </label>
                      <input
                        type="text"
                        value={artistForm.newVideoTitle}
                        onChange={(e) => setArtistForm({ ...artistForm, newVideoTitle: e.target.value })}
                        placeholder="Ex: Clip Officiel - 4K"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-orange-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 text-[11px] mb-1">
                      Contact Booking / Management
                    </label>
                    <input
                      type="text"
                      value={artistForm.bookingContact}
                      onChange={(e) => setArtistForm({ ...artistForm, bookingContact: e.target.value })}
                      placeholder="+243 891 668 120 / booking@jbsprod.cd"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-orange-500 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsArtistFormOpen(false)}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg font-semibold hover:bg-neutral-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  >
                    Enregistrer l'Artiste
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Sub-Form: Add/Edit Track */}
        {isTrackFormOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="font-bold text-white text-lg">
                  {editingTrackId ? 'Modifier la Chanson' : 'Ajouter une Chanson'}
                </h4>
                <button
                  onClick={() => setIsTrackFormOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTrack} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Titre du Morceau *</label>
                  <input
                    type="text"
                    required
                    value={trackForm.title}
                    onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                    placeholder="Ex: Bana Kinshasa"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Nom de l'Artiste *</label>
                  <input
                    type="text"
                    required
                    value={trackForm.artistName}
                    onChange={(e) => setTrackForm({ ...trackForm, artistName: e.target.value })}
                    placeholder="Ex: Elinam King"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Genre</label>
                    <input
                      type="text"
                      value={trackForm.genre}
                      onChange={(e) => setTrackForm({ ...trackForm, genre: e.target.value })}
                      placeholder="Afrobeat, Rumba, Trap..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Durée (secondes)</label>
                    <input
                      type="number"
                      value={trackForm.duration}
                      onChange={(e) =>
                        setTrackForm({ ...trackForm, duration: Number(e.target.value) })
                      }
                      placeholder="180"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Image de Couverture</label>
                  <input
                    type="text"
                    value={trackForm.coverUrl}
                    onChange={(e) => setTrackForm({ ...trackForm, coverUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTrackFormOpen(false)}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg font-semibold hover:bg-neutral-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  >
                    Enregistrer le Morceau
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Sub-Form: Add Gallery Item */}
        {isGalleryFormOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="font-bold text-white text-lg">Ajouter une Photo ou Vidéo</h4>
                <button
                  onClick={() => setIsGalleryFormOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Type de Média</label>
                    <select
                      value={galleryForm.type}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, type: e.target.value as 'photo' | 'video' })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    >
                      <option value="photo">Photo HD</option>
                      <option value="video">Vidéo / Clip</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">Catégorie</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          category: e.target.value as GalleryCategory,
                        })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                    >
                      <option value="studio">Sessions Studio</option>
                      <option value="clips">Clips & Tournages</option>
                      <option value="live">Lives & Concerts</option>
                      <option value="backstage">Coulisses & Équipe</option>
                      <option value="equipment">Régie & Matériel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Titre du Média *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="Ex: Prise de voix studio A"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Lien Web / YouTube ou Téléversement direct *
                  </label>
                  <input
                    type="text"
                    value={galleryForm.url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=... ou URL image"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500 mb-2"
                  />
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Téléverser depuis le téléphone / PC</span>
                    <input
                      type="file"
                      accept={galleryForm.type === 'photo' ? 'image/*' : 'video/*'}
                      onChange={handleGalleryMediaUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Artiste / Projet</label>
                  <input
                    type="text"
                    value={galleryForm.artist}
                    onChange={(e) => setGalleryForm({ ...galleryForm, artist: e.target.value })}
                    placeholder="Ex: JBS Prod & Elinam"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsGalleryFormOpen(false)}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg font-semibold hover:bg-neutral-700 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/25 cursor-pointer"
                  >
                    Ajouter à la Galerie
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Candidature Dossier Inspector */}
        {inspectingCandidature && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">
                      {inspectingCandidature.fullName}
                    </h4>
                    <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      #{inspectingCandidature.id}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Dossier soumis le <span className="text-white font-medium">{inspectingCandidature.createdAt}</span>
                  </p>
                </div>
                <button
                  onClick={() => setInspectingCandidature(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 space-y-2">
                  <span className="text-[11px] font-bold tracking-wider text-orange-400 uppercase">
                    Coordonnées de Contact
                  </span>
                  <div className="space-y-1.5 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <a
                        href={`mailto:${inspectingCandidature.email}`}
                        className="hover:text-orange-400 transition-colors break-all underline decoration-neutral-700"
                      >
                        {inspectingCandidature.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <a
                        href={`tel:${inspectingCandidature.phone}`}
                        className="hover:text-orange-400 transition-colors font-mono"
                      >
                        {inspectingCandidature.phone}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <a
                      href={`https://wa.me/${inspectingCandidature.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${inspectingCandidature.phone}`}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Appeler</span>
                    </a>
                  </div>
                </div>

                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 space-y-2">
                  <span className="text-[11px] font-bold tracking-wider text-orange-400 uppercase">
                    Projet & Direction Musicale
                  </span>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-neutral-500">Style musical : </span>
                      <span className="text-white font-bold">{inspectingCandidature.musicalStyle}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Type de projet : </span>
                      <span className="text-white font-bold">{inspectingCandidature.projectType}</span>
                    </div>
                    {inspectingCandidature.fileName && (
                      <div className="flex items-center gap-1.5 text-neutral-300 pt-1">
                        <FileText className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-[11px] font-mono truncate max-w-[180px]">
                          {inspectingCandidature.fileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Demo link if present */}
              {inspectingCandidature.audioDemoUrl && (
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <Music className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">Lien de la Maquette / Démo</p>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {inspectingCandidature.audioDemoUrl}
                      </p>
                    </div>
                  </div>
                  <a
                    href={inspectingCandidature.audioDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Écouter</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Présentation du Candidat & Message
                </label>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {inspectingCandidature.message}
                </div>
              </div>

              {/* Status and Action Bar */}
              <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium">Statut du dossier :</span>
                  <select
                    value={inspectingCandidature.status}
                    onChange={(e) => {
                      const newSt = e.target.value as CandidatureData['status'];
                      onUpdateCandidatureStatus(inspectingCandidature.id, newSt);
                      setInspectingCandidature({
                        ...inspectingCandidature,
                        status: newSt,
                        isRead: true,
                      });
                    }}
                    className="bg-neutral-950 border border-neutral-700 text-white rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:border-orange-500"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_etude">En Étude</option>
                    <option value="retenu">Retenu (Signer)</option>
                    <option value="archive">Archivé</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {onMarkCandidatureAsRead && (
                    <button
                      onClick={() => {
                        const currentIsRead = inspectingCandidature.isRead ?? true;
                        onMarkCandidatureAsRead(inspectingCandidature.id, !currentIsRead);
                        setInspectingCandidature({
                          ...inspectingCandidature,
                          isRead: !currentIsRead,
                        });
                      }}
                      className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {inspectingCandidature.isRead ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Marquer non lu</span>
                        </>
                      ) : (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-orange-400" />
                          <span>Marquer lu</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onDeleteCandidature(inspectingCandidature.id);
                      setInspectingCandidature(null);
                    }}
                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Supprimer</span>
                  </button>

                  <button
                    onClick={() => setInspectingCandidature(null)}
                    className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
