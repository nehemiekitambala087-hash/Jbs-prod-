import { Artist, Track } from '../types';

export const ARTISTS: Artist[] = [
  {
    id: 'artiste-1',
    name: 'Elinam King',
    stageName: 'Elinam King',
    style: 'Afrobeat / R&B',
    category: 'afrobeat',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop', // Singer with sunglasses and mic under golden lighting
    bio: 'Pionnier de la nouvelle vague Afro-RnB kinoise, Elinam King fusionne les harmonies chaleureuses de la Rumba avec les rythmiques entraînantes de l\'Afrobeats.',
    latestRelease: {
      title: 'Mbote Love (feat. JBS Studio)',
      year: '2024',
      duration: '3:18',
    },
    spotifyUrl: 'https://open.spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
  },
  {
    id: 'artiste-2',
    name: 'MC Bravos',
    stageName: 'MC Bravos',
    style: 'Rap / Pop',
    category: 'rap',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop', // Studio rapper with headphones and vintage mic
    bio: 'Rappeur percutant au flow incisif et aux refrains contagieux, MC Bravos dépeint la vibrante énergie urbaine de Kinshasa à travers des prods percutantes.',
    latestRelease: {
      title: 'Bana Kinshasa (Drill Anthem)',
      year: '2024',
      duration: '2:54',
    },
    spotifyUrl: 'https://open.spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
  },
  {
    id: 'artiste-3',
    name: 'Naomie K.',
    stageName: 'Naomie K.',
    style: 'Rumba Moderne / Soul',
    category: 'rumba',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', // Elegant female vocalist
    bio: 'Une voix d\'or qui revisite l\'héritage rumba congolais avec une touche de soul moderne et d\'élégance acoustique.',
    latestRelease: {
      title: 'Motema Na Ngai',
      year: '2024',
      duration: '3:45',
    },
    spotifyUrl: 'https://open.spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
  },
  {
    id: 'artiste-4',
    name: 'Junior Gaz',
    stageName: 'Junior Gaz',
    style: 'Gospel Urbain / Afro-Gospel',
    category: 'gospel',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop', // Expressive artist
    bio: 'Auteur-compositeur inspirant, portant des messages d\'espoir avec des arrangements modernes et des chœurs puissants.',
    latestRelease: {
      title: 'Grâce Infinie',
      year: '2024',
      duration: '4:10',
    },
    spotifyUrl: 'https://open.spotify.com',
    appleMusicUrl: 'https://music.apple.com',
    youtubeUrl: 'https://youtube.com',
    instagramUrl: 'https://instagram.com',
  },
];

export const DEMO_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Mbote Love',
    artistName: 'Elinam King',
    genre: 'Afrobeat / R&B',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'track-2',
    title: 'Bana Kinshasa',
    artistName: 'MC Bravos',
    genre: 'Rap / Pop',
    duration: 174,
    coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'track-3',
    title: 'Motema Na Ngai',
    artistName: 'Naomie K.',
    genre: 'Rumba Moderne',
    duration: 225,
    coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'track-4',
    title: 'JBS Studio Instrumental Master',
    artistName: 'JBS Beatmakers',
    genre: 'Afro-Trap / Beatmaking',
    duration: 160,
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop',
  },
];
