export interface Testimonial {
  id: string;
  artistName: string;
  artistStageName?: string;
  role: string; // e.g. "Artiste Chanteur Afro-Pop", "Rappeur & Auteur", "Chantre Gospel"
  avatarUrl: string;
  quote: string;
  highlightMetric?: string; // e.g. "+1.2M de streams", "Single certifié Or", "Tournée provinciale"
  metricLabel?: string; // e.g. "Sur Spotify & YouTube", "1ère signature label", "Kinshasa & Lubumbashi"
  projectTitle?: string; // e.g. "Album 'Renaissance'", "EP 'Bana Kin'"
  rating: number; // 5 stars
  verifiedBadge: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    artistName: 'Elinam King',
    role: 'Artiste Chanteur & Compositeur Afrobeat',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    quote: "JBS Prod a métamorphosé ma vision artistique. Dès ma première session en studio A, le son était d'une clarté chirurgicale et l'équipe a su magnifier mes mélodies. Grâce à leur stratégie de distribution, mon single a dépassé le million de streams.",
    highlightMetric: '+1.5M Streams',
    metricLabel: 'Sur les plateformes en 6 mois',
    projectTitle: "Single 'Tokomi Wapi'",
    rating: 5,
    verifiedBadge: true,
  },
  {
    id: 'test-2',
    artistName: 'Merveille B.',
    role: 'Artiste Chanteuse R&B / Soul',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    quote: "Trouver un label à Kinshasa qui respecte scrupuleusement l'authenticité de l'artiste tout en appliquant des standards internationaux est rare. Chez JBS Prod, j'ai trouvé une vraie famille de production et une direction vocale exceptionnelle.",
    highlightMetric: 'Top 10 RDC',
    metricLabel: 'Classement streaming Apple Music',
    projectTitle: "EP 'Douceur Nocturne'",
    rating: 5,
    verifiedBadge: true,
  },
  {
    id: 'test-3',
    artistName: 'Junior B. (J-Boy)',
    role: 'Rappeur & Performeur Trap Kin',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    quote: "La puissance des beats, le mixage analogique et l'énergie des ingénieurs son font toute la différence. JBS Prod m'a également connecté aux meilleures opportunités de scènes et de tournage de clips professionnels.",
    highlightMetric: '3 Clips Diffusés',
    metricLabel: 'Chaînes TV et YouTube HD',
    projectTitle: "Projet 'Bana Street 243'",
    rating: 5,
    verifiedBadge: true,
  },
  {
    id: 'test-4',
    artistName: 'Grace L.',
    role: 'Auteure & Chantre Gospel Urbain',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    quote: "Un encadrement bienveillant et une acoustique remarquable pour les harmonies vocales. L'équipe de JBS Prod comprend la sensibilité spirituelle et technique nécessaire pour la musique d'impact.",
    highlightMetric: '100% Fidélité',
    metricLabel: 'Mastering optimisé pour streaming',
    projectTitle: "Titre 'Grâce Infinie'",
    rating: 5,
    verifiedBadge: true,
  },
];
