import { GalleryItem } from '../types';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'Tout le média' },
  { id: 'studio', label: 'Sessions Studio' },
  { id: 'clips', label: 'Clips & Tournages' },
  { id: 'live', label: 'Lives & Concerts' },
  { id: 'backstage', label: 'Coulisses & Équipe' },
  { id: 'equipment', label: 'Régie & Matériel' },
] as const;

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  // 1. Video: Clip Officiel
  {
    id: 'gal-v1',
    type: 'video',
    title: 'Tournage Clip Officiel — El Mara "Kinshasa Night"',
    category: 'clips',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // or sample video
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
    description: 'Coulisses et tournage du clip musical 4K à Gombe avec notre équipe de réalisation et cadreurs cinéma.',
    artist: 'El Mara',
    date: 'Août 2024',
    duration: '3:45',
  },
  // 2. Photo: Session Studio Voix
  {
    id: 'gal-p1',
    type: 'photo',
    title: 'Prise de voix en cabine acoustique — Neumann U87',
    category: 'studio',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    description: 'Enregistrement des voix lead et harmonies dans notre cabine traitée avec micro à lampe haut de gamme.',
    artist: 'Sarah M.',
    date: 'Juillet 2024',
  },
  // 3. Photo: Régie Mixage & Mastering
  {
    id: 'gal-p2',
    type: 'photo',
    title: 'Console de mixage analogique & Écoutes Focal',
    category: 'equipment',
    url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200&auto=format&fit=crop',
    description: 'Séance de mixage multi-pistes et sommation analogique pour le projet Afrobeats 2024.',
    artist: 'Staff Technique JBS',
    date: 'Août 2024',
  },
  // 4. Video: Session Studio Live
  {
    id: 'gal-v2',
    type: 'video',
    title: 'Session Live Acoustique — Guitare & Voix Rumba',
    category: 'studio',
    url: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    description: 'Enregistrement live direct-to-track d’un solo rumba congolaise avec nos guitaristes résidents.',
    artist: 'Fabrice K. & Band',
    date: 'Juin 2024',
    duration: '2:18',
  },
  // 5. Photo: Concert & Scène Live
  {
    id: 'gal-p3',
    type: 'photo',
    title: 'Showcase Live JBS Festival Kinshasa',
    category: 'live',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    description: 'Performance sur scène de nos artistes devant plus de 2000 spectateurs au Théâtre de Verdure.',
    artist: 'Kinsound Collective',
    date: 'Mai 2024',
  },
  // 6. Photo: Backstage / Direction Artistique
  {
    id: 'gal-p4',
    type: 'photo',
    title: 'Briefing Direction Artistique & Écoute Maquette',
    category: 'backstage',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    description: 'Sélection des arrangements et peaufinage des mélodies avec le producteur exécutif.',
    artist: 'Équipe DA & Beatmakers',
    date: 'Juillet 2024',
  },
  // 7. Video: Beatmaking Session
  {
    id: 'gal-v3',
    type: 'video',
    title: 'Création d’un beat Afro-Trap en temps réel sur MPC',
    category: 'studio',
    url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1520523839898-50712213d987?q=80&w=1000&auto=format&fit=crop',
    description: 'Composition live de percussions traditionnelles fusionnées avec des basses 808 modernes.',
    artist: 'Master Beat JBS',
    date: 'Août 2024',
    duration: '1:50',
  },
  // 8. Photo: Batterie & Percussions
  {
    id: 'gal-p5',
    type: 'photo',
    title: 'Prise de son batterie acoustique & percussions',
    category: 'equipment',
    url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1200&auto=format&fit=crop',
    description: 'Disposition multi-micros (Overheads, Snare, Kick) pour un groove authentique et percutant.',
    artist: 'David Drumz',
    date: 'Juin 2024',
  },
  // 9. Photo: Tournage Éclairage Néon
  {
    id: 'gal-p6',
    type: 'photo',
    title: 'Set Design & Éclairage ambiance cinéma',
    category: 'clips',
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    description: 'Ambiance visuelle sombre et néons futuristes pour le prochain clip urbain du label.',
    artist: 'Production Visuelle JBS',
    date: 'Juillet 2024',
  },
];
