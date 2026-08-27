import { FaqItem } from '../types';

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'Toutes les questions' },
  { id: 'selection', label: 'Processus de sélection' },
  { id: 'contrat', label: 'Contrat & Droits d’auteur' },
  { id: 'studio', label: 'Modalités de travail' },
  { id: 'tarifs', label: 'Tarifs & Distribution' },
] as const;

export const FAQ_DATA: FaqItem[] = [
  // 1. Processus de sélection
  {
    id: 'faq-1',
    category: 'selection',
    question: 'Comment se déroule le processus de sélection après l’envoi de ma candidature ?',
    answer:
      'Dès réception de votre candidature via notre formulaire ou par WhatsApp, notre direction artistique procède à une écoute attentive de vos maquettes sous 48 à 72 heures ouvrées. Si votre projet correspond à notre ligne éditoriale ou à nos critères de production, nous vous contactons pour un entretien préliminaire et une audition en studio à Kinshasa pour tester votre potentiel vocal et artistique en conditions réelles.',
    highlight: 'Délai de retour moyen : 48h à 72h avec écoute garantie de chaque maquette.',
    tags: ['Candidature', 'Audition', 'Délais', 'Direction Artistique'],
  },
  {
    id: 'faq-2',
    category: 'selection',
    question: 'Quels types et formats de maquettes sont acceptés pour postuler ?',
    answer:
      'Nous acceptons tous types de formats audio : fichiers MP3, WAV, M4A ou liens d’écoute vers SoundCloud, YouTube, Google Drive, Audiomack ou Spotify. Une qualité studio n’est pas obligatoire : une maquette voix-guitare, voix-piano ou même un enregistrement témoin propre au dictaphone sur une instru suffit amplement pour que notre équipe évalue votre voix, votre plume et votre musicalité.',
    highlight: 'Pas besoin d’un mixage parfait : nous évaluons avant tout le talent brut et la créativité.',
    tags: ['Maquette', 'Formats audio', 'Démo', 'Qualité'],
  },
  {
    id: 'faq-3',
    category: 'selection',
    question: 'Les artistes débutants ou sans expérience en studio peuvent-ils postuler ?',
    answer:
      'Absolument ! JBS Prod a pour mission de révéler les nouveaux talents émergents. Si vous n’avez jamais enregistré en studio professionnel, nos coachs vocaux et nos directeurs artistiques vous guideront pas à pas lors de vos premières séances pour vous mettre en confiance et tirer le meilleur de votre interprétation.',
    highlight: 'Accompagnement bienveillant et coaching vocal disponibles pour les novices.',
    tags: ['Débutants', 'Coaching vocal', 'Emergence', 'Accompagnement'],
  },
  {
    id: 'faq-4',
    category: 'selection',
    question: 'Quels styles musicaux sont privilégiés par JBS Prod ?',
    answer:
      'Bien que nous ayons une forte expertise en Afrobeats, Rumba congolaise moderne, Rap/Trap, Gospel contemporain, R&B et Afro-Pop, JBS Prod est ouvert à toutes les esthétiques innovantes et hybrides. La qualité du texte, l’authenticité de la démarche et l’émotion transmise priment sur le genre musical.',
    highlight: 'Ouverture à tous les genres : Afrobeats, Rumba, Rap, Gospel, Afro-Pop, R&B...',
    tags: ['Genres', 'Afrobeat', 'Rumba', 'Rap', 'Gospel'],
  },

  // 2. Contrat & Droits d'auteur
  {
    id: 'faq-5',
    category: 'contrat',
    question: 'Quel type de contrat propose JBS Prod (signature label vs prestation) ?',
    answer:
      'Nous proposons deux grandes formules adaptées à votre situation :\n1. Formule Signature / Co-production : JBS Prod investit financièrement dans la production, le clip, la promotion et le marketing en échange d’un partage équitable sur les revenus générés (contrat d’artiste ou de licence).\n2. Formule Prestation & Accompagnement Indépendant : Vous restez 100% propriétaire de vos masters ; vous payez uniquement la prestation studio (enregistrement, mix, mastering, clip) et conservez l’intégralité de vos revenus de diffusion.',
    highlight: 'Flexibilité totale : contrat de production avec financement ou prestation à la carte sans cession de droits.',
    tags: ['Contrat d’artiste', 'Signature', 'Licence', 'Prestation'],
  },
  {
    id: 'faq-6',
    category: 'contrat',
    question: 'Comment sont protégés mes droits d’auteur et ma propriété intellectuelle ?',
    answer:
      'Vos créations restent protégées dès le premier instant. Avant tout travail en commun, un accord de confidentialité et de collaboration artistique peut être signé. Nous vous accompagnons également dans les démarches de dépôt et de protection de vos œuvres auprès des organismes de gestion collective (SOCODA en RDC, SACEM, etc.) afin de garantir la perception de vos droits d’auteur et droits voisins.',
    highlight: 'Respect strict de la propriété intellectuelle et aide au dépôt des œuvres (SOCODA / SACEM).',
    tags: ['Droits d’auteur', 'SOCODA', 'SACEM', 'Propriété intellectuelle'],
  },
  {
    id: 'faq-7',
    category: 'contrat',
    question: 'Quelle est la durée d’un engagement contractuel avec le label ?',
    answer:
      'Pour les artistes signés en développement ou en production exclusive, les contrats sont généralement conclus pour une durée définie (ex. 1 à 3 ans) ou pour un nombre précis de projets (ex. un EP de 4 à 6 titres ou un album), avec des clauses de réévaluation périodique transparentes.',
    highlight: 'Contrats clairs, limités dans le temps et sans clause abusive.',
    tags: ['Durée contrat', 'Engagements', 'Transparence'],
  },

  // 3. Modalités de travail au Studio
  {
    id: 'faq-8',
    category: 'studio',
    question: 'Comment s’organisent concrètement les séances d’enregistrement au studio ?',
    answer:
      'Les séances se déroulent dans nos studios insonorisés et traités acoustiquement à Kinshasa. Avant la séance, nous validons la structure du morceau, les harmonies et les pistes d’instrumentale (stems). Pendant l’enregistrement, un ingénieur du son dédié et un directeur artistique sont à vos côtés pour vous assister, ajuster les prises de voix et optimiser le rendu sonore.',
    highlight: 'Ingénieur du son et directeur artistique dédiés à chaque session.',
    tags: ['Séance d’enregistrement', 'Studio Kinshasa', 'Ingénieur du son', 'Matériel'],
  },
  {
    id: 'faq-9',
    category: 'studio',
    question: 'Quel est l’équipement technique utilisé par JBS Prod ?',
    answer:
      'Notre régie est équipée de matériel professionnel haut de gamme répondant aux normes internationales : microphones de référence (Neumann, Shure SM7B, AKG), préamplis et cartes sons Universal Audio (Apollo), monitoring Focal et Yamaha, ainsi qu’une suite complète de plug-ins de mixage et mastering (FabFilter, Waves, Soundtoys, iZotope Ozone).',
    highlight: 'Matériel studio de standard international pour une clarté et une dynamique irréprochables.',
    tags: ['Équipement', 'Neumann', 'Apollo', 'Universal Audio', 'Mastering'],
  },
  {
    id: 'faq-10',
    category: 'studio',
    question: 'Sous quels délais et dans quels formats recevrai-je mes morceaux finalisés ?',
    answer:
      'Pour un single, le premier jet de mixage est généralement livré sous 3 à 5 jours ouvrés après la prise de son. Vous bénéficiez de 3 sessions de retouches gratuites. Une fois validé, vous recevez les versions Master HD (WAV 24-bit / 44.1kHz), MP3 320kbps, versions instrumentales, a cappella, playback et l’ensemble des pistes séparées (stems) pour archivage.',
    highlight: 'Livraison complète : Master WAV HD, version instrumentale, a cappella et stems séparés.',
    tags: ['Délais de livraison', 'Stems', 'WAV HD', 'Retouches'],
  },

  // 4. Tarifs & Distribution
  {
    id: 'faq-11',
    category: 'tarifs',
    question: 'Quelles sont les modalités de paiement pour les prestations indépendantes ?',
    answer:
      'Pour toute prestation à la carte (enregistrement, mix, mastering, clip), nous demandons un acompte de 50% à la réservation du créneau studio, et le solde de 50% à la livraison finale des masters approuvés. Nous acceptons les paiements en espèces, virement bancaire, et Mobile Money (M-Pesa, Orange Money, Airtel Money).',
    highlight: 'Acompte de 50% et solde à la livraison finale. Paiements Mobile Money et banques acceptés.',
    tags: ['Tarifs', 'Paiement', 'M-Pesa', 'Acompte'],
  },
  {
    id: 'faq-12',
    category: 'tarifs',
    question: 'Comment JBS Prod m’accompagne-t-il dans la distribution et la promotion ?',
    answer:
      'Nous assurons la distribution digitale globale de votre musique sur plus de 150 plateformes (Spotify, Apple Music, YouTube Music, Boomplay, Audiomack, Deezer, TikTok). Côté promotion, nous élaborons une stratégie sur mesure : kit presse, visuels de couverture, campagnes publicitaires ciblées sur les réseaux sociaux, placement sur playlists officielles et pitch auprès des médias et radios locales.',
    highlight: 'Distribution sur 150+ plateformes et accompagnement marketing digital & playlists.',
    tags: ['Distribution', 'Spotify', 'Boomplay', 'Marketing', 'Playlists'],
  },
];
