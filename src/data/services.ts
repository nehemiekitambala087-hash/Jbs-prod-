import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'production-studio',
    title: 'Production Studio',
    iconName: 'disc',
    description:
      'Enregistrement, mixage et mastering professionnel pour donner vie à vos morceaux avec une qualité optimale.',
    features: [
      'Enregistrement voix et instruments HD',
      'Mixage multipiste & spatialisation',
      'Mastering conforme aux normes streaming (Spotify, Apple)',
      'Arrangements et composition sur-mesure',
      'Cabine insonorisée & micros Neumann / Shure',
    ],
    badge: 'Populaire',
  },
  {
    id: 'promotion-marketing',
    title: 'Promotion & Marketing',
    iconName: 'megaphone',
    description:
      'Stratégie digitale, diffusion sur les plateformes de streaming et campagnes de communication ciblées.',
    features: [
      'Distribution digitale mondiale (Spotify, Apple Music, Deezer, Boomplay)',
      'Placement en playlists officielles & éditoriales',
      'Campagnes publicitaires ciblées (TikTok, Instagram, YouTube Ads)',
      'Relations presse, médias & passages radio à Kinshasa',
      'Stratégie de lancement de single/EP',
    ],
    badge: 'Essentiel',
  },
  {
    id: 'management-carriere',
    title: 'Management & Carrière',
    iconName: 'user',
    description:
      'Conseils juridiques, gestion d’image, recherche de dates de concert et accompagnement artistique personnalisé.',
    features: [
      'Direction artistique & développement d’identité visuelle',
      'Gestion des droits d’auteur (SOCODA / SACEM) & contrats',
      'Booking concerts, festivals & showcases',
      'Relations avec les sponsors et partenariats marques',
      'Coaching vocal et scénique',
    ],
    badge: 'Sur-mesure',
  },
];
