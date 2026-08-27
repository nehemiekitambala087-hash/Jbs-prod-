export interface ArtistPhoto {
  id: string;
  url: string;
  title?: string;
  caption?: string;
  date?: string;
}

export interface ArtistVideo {
  id: string;
  url: string;
  title: string;
  type?: 'clip' | 'live' | 'studio' | 'teaser';
  duration?: string;
  views?: string;
  date?: string;
}

export interface ArtistRelease {
  id: string;
  title: string;
  type: 'Single' | 'EP' | 'Album';
  year: string;
  streams?: string;
  coverUrl?: string;
}

export interface Artist {
  id: string;
  name: string;
  stageName?: string;
  style: string;
  category: 'afrobeat' | 'rap' | 'rumba' | 'rnb' | 'gospel' | 'all';
  image: string;
  bio: string;
  latestRelease: {
    title: string;
    year: string;
    duration: string;
    audioUrl?: string;
  };
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  instagramUrl?: string;
  // Base de données médias propre à chaque artiste
  photos?: ArtistPhoto[];
  videos?: ArtistVideo[];
  discography?: ArtistRelease[];
  bookingContact?: string;
  pressKitBio?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: 'disc' | 'megaphone' | 'user' | 'mic' | 'sliders' | 'shield';
  description: string;
  features: string[];
  badge?: string;
}

export interface CandidatureData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  musicalStyle: string;
  projectType: string;
  listenLink: string;
  fileName?: string;
  message: string;
  createdAt: string;
  status: 'nouveau' | 'en_etude' | 'retenu' | 'archive';
  isRead?: boolean;
}

export interface Track {
  id: string;
  title: string;
  artistName: string;
  genre: string;
  duration: number; // in seconds
  coverUrl: string;
}

export type FaqCategory = 'all' | 'selection' | 'contrat' | 'studio' | 'tarifs';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  highlight?: string;
  tags?: string[];
}

export type GalleryMediaType = 'all' | 'photo' | 'video';
export type GalleryCategory = 'all' | 'studio' | 'clips' | 'live' | 'backstage' | 'equipment';

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  category: GalleryCategory;
  url: string;
  thumbnailUrl?: string;
  description?: string;
  artist?: string;
  date?: string;
  duration?: string;
  isCustom?: boolean;
}
