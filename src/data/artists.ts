import { Artist, Track } from '../types';

export const ARTISTS: Artist[] = [
  {
    id: 'artiste-1',
    name: 'Elinam King',
    stageName: 'Elinam King',
    style: 'Afrobeat / R&B',
    category: 'afrobeat',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop',
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
    bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
    pressKitBio: 'Artiste complet et performeur scénique, Elinam King a débuté son parcours dans les clubs de Bandalungwa avant de signer chez JBS Prod en 2023. Son premier EP produit par JBS a dépassé 1.2M de streams cumulés.',
    photos: [
      {
        id: 'ek-p1',
        url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop',
        title: 'Session Studio Acoustique JBS',
        caption: 'Enregistrement des voix lead pour l\'album',
        date: 'Janvier 2024',
      },
      {
        id: 'ek-p2',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
        title: 'Tournage Clip Officiel « Mbote Love »',
        caption: 'Décor nocturne sur les toits de Gombe, Kinshasa',
        date: 'Mars 2024',
      },
      {
        id: 'ek-p3',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop',
        title: 'Showcase Live Kinshasa',
        caption: 'Performance live en première partie au Palais du Peuple',
        date: 'Mai 2024',
      },
      {
        id: 'ek-p4',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
        title: 'Backstage & Réglages Scéniques',
        caption: 'Préparation avec l\'équipe technique JBS Prod',
        date: 'Juin 2024',
      }
    ],
    videos: [
      {
        id: 'ek-v1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Mbote Love (Clip Officiel 4K)',
        type: 'clip',
        duration: '3:25',
        views: '450K vues',
        date: '2024',
      },
      {
        id: 'ek-v2',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Live Acoustic Session @ Studio JBS Kinshasa',
        type: 'live',
        duration: '4:10',
        views: '125K vues',
        date: '2024',
      },
      {
        id: 'ek-v3',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Making-Of & Dans les coulisses de la création',
        type: 'studio',
        duration: '6:45',
        views: '80K vues',
        date: '2023',
      }
    ],
    discography: [
      {
        id: 'ek-d1',
        title: 'Mbote Love',
        type: 'Single',
        year: '2024',
        streams: '850K+ streams',
        coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'ek-d2',
        title: 'Kinshasa Nights EP',
        type: 'EP',
        year: '2023',
        streams: '1.4M streams',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'artiste-2',
    name: 'MC Bravos',
    stageName: 'MC Bravos',
    style: 'Rap / Pop',
    category: 'rap',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop',
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
    bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
    pressKitBio: 'Figure incontournable de la Drill kinoise et du Rap francophone africain, MC Bravos enchaîne les hits avec une écriture acérée et une production lourde signée JBS Prod.',
    photos: [
      {
        id: 'mb-p1',
        url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop',
        title: 'Mastering Vocal en Cabine A',
        caption: 'Prise de son sur micro Neumann U87',
        date: 'Février 2024',
      },
      {
        id: 'mb-p2',
        url: 'https://images.unsplash.com/photo-1520523839898-50712825e617?q=80&w=1000&auto=format&fit=crop',
        title: 'Clip « Bana Kinshasa » Tournage Urbain',
        caption: 'Atmosphère street à Matonge',
        date: 'Avril 2024',
      },
      {
        id: 'mb-p3',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
        title: 'Festival Urbain Kinshasa Live',
        caption: 'Devant plus de 5 000 spectateurs survoltés',
        date: 'Juillet 2024',
      }
    ],
    videos: [
      {
        id: 'mb-v1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Bana Kinshasa - Drill Anthem (Clip Officiel)',
        type: 'clip',
        duration: '3:05',
        views: '620K vues',
        date: '2024',
      },
      {
        id: 'mb-v2',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Freestyle JBS Studio Session #4',
        type: 'studio',
        duration: '2:40',
        views: '210K vues',
        date: '2024',
      }
    ],
    discography: [
      {
        id: 'mb-d1',
        title: 'Bana Kinshasa',
        type: 'Single',
        year: '2024',
        streams: '980K streams',
        coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'mb-d2',
        title: 'Matonge Boy',
        type: 'Single',
        year: '2023',
        streams: '540K streams',
        coverUrl: 'https://images.unsplash.com/photo-1520523839898-50712825e617?q=80&w=400&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'artiste-3',
    name: 'Naomie K.',
    stageName: 'Naomie K.',
    style: 'Rumba Moderne / Soul',
    category: 'rumba',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
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
    bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
    pressKitBio: 'Chanteuse et compositrice d\'exception, Naomie K. allie la grâce de la rumba classique aux arrangements veloutés du RnB et de la néo-soul.',
    photos: [
      {
        id: 'nk-p1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        title: 'Séance Shooting Couverture Album',
        caption: 'Portrait officiel studio JBS Prod',
        date: 'Février 2024',
      },
      {
        id: 'nk-p2',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
        title: 'Session Cordes & Piano Live',
        caption: 'Enregistrement live avec orchestre acoustique',
        date: 'Avril 2024',
      },
      {
        id: 'nk-p3',
        url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1000&auto=format&fit=crop',
        title: 'Concert Acoustique Intimiste',
        caption: 'Soirée VIP JBS Prod à Kinshasa',
        date: 'Juin 2024',
      }
    ],
    videos: [
      {
        id: 'nk-v1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Motema Na Ngai (Clip Officiel HD)',
        type: 'clip',
        duration: '3:50',
        views: '540K vues',
        date: '2024',
      },
      {
        id: 'nk-v2',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Rumba Session Live Piano-Voix',
        type: 'live',
        duration: '4:45',
        views: '190K vues',
        date: '2024',
      }
    ],
    discography: [
      {
        id: 'nk-d1',
        title: 'Motema Na Ngai',
        type: 'Single',
        year: '2024',
        streams: '720K streams',
        coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      },
      {
        id: 'nk-d2',
        title: 'Élégance Kinoise',
        type: 'Album',
        year: '2023',
        streams: '2.1M streams',
        coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'artiste-4',
    name: 'Junior Gaz',
    stageName: 'Junior Gaz',
    style: 'Gospel Urbain / Afro-Gospel',
    category: 'gospel',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
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
    bookingContact: '+243 891 668 120 / booking@jbsprod.cd',
    pressKitBio: 'Porté par une ferveur spirituelle contagieuse et des productions Afro-Gospel contemporaines calibrées pour l\'international.',
    photos: [
      {
        id: 'jg-p1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        title: 'Enregistrement Chœurs Gospel',
        caption: 'Harmonisation avec 12 choristes au Studio A JBS',
        date: 'Janvier 2024',
      },
      {
        id: 'jg-p2',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
        title: 'Célébration Live Kinshasa',
        caption: 'Concert de louange en plein air',
        date: 'Mai 2024',
      }
    ],
    videos: [
      {
        id: 'jg-v1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Grâce Infinie (Clip Officiel Louange)',
        type: 'clip',
        duration: '4:15',
        views: '380K vues',
        date: '2024',
      },
      {
        id: 'jg-v2',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Session Live Worship @ Studio JBS',
        type: 'live',
        duration: '5:30',
        views: '160K vues',
        date: '2024',
      }
    ],
    discography: [
      {
        id: 'jg-d1',
        title: 'Grâce Infinie',
        type: 'Single',
        year: '2024',
        streams: '640K streams',
        coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      }
    ]
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
