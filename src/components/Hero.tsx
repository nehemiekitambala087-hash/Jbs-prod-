import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Sparkles,
  Play,
  Headphones,
  Radio,
  Mic,
  Music,
  Sliders,
  Volume2,
} from 'lucide-react';

interface HeroProps {
  onOpenProjectModal: () => void;
  onPlayDemo: () => void;
}

const STUDIO_INSTRUMENT_BACKGROUNDS = [
  {
    id: 'studio-instruments-main',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2400&auto=format&fit=crop',
    title: 'Microphone Neumann & Cabine Acoustique',
    tag: 'Prise de son Lead & Voix',
  },
  {
    id: 'studio-guitar-piano',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2400&auto=format&fit=crop',
    title: 'Guitares, Claviers & Instruments Live',
    tag: 'Arrangements & Composition',
  },
  {
    id: 'studio-console-synth',
    url: 'https://images.unsplash.com/photo-1520523839898-50712213d987?q=80&w=2400&auto=format&fit=crop',
    title: 'Synthétiseur & Station de Production MAO',
    tag: 'Beatmaking & Synthèse Sonore',
  },
  {
    id: 'studio-drums-percussion',
    url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2400&auto=format&fit=crop',
    title: 'Batterie Acoustique & Percussions Congolaises',
    tag: 'Rythmiques & Grooves Live',
  },
  {
    id: 'studio-mixer-console',
    url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2400&auto=format&fit=crop',
    title: 'Table de Mixage Analogique & Traitement Focal',
    tag: 'Mixage & Mastering HD',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal, onPlayDemo }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto cycle background instrument photos every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % STUDIO_INSTRUMENT_BACKGROUNDS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeBg = STUDIO_INSTRUMENT_BACKGROUNDS[currentBgIndex];

  return (
    <section
      id="accueil"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-neutral-950"
    >
      {/* Background Studio Visuals with Instruments */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {STUDIO_INSTRUMENT_BACKGROUNDS.map((bg, idx) => (
          <div
            key={bg.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentBgIndex ? 'opacity-45 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={bg.url}
              alt={bg.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out scale-105"
            />
          </div>
        ))}

        {/* Sophisticated gradient overlay for readability while keeping instruments clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-neutral-950/90 pointer-events-none" />

        {/* Subtle grid pattern overlay for music production feel */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
        />
      </div>

      {/* Floating Studio Background Selector Widget on bottom-left for user control */}
      <div className="hidden lg:flex absolute bottom-8 left-8 z-20 items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800/80 px-3.5 py-2 rounded-xl text-xs text-neutral-300 shadow-xl">
        <Music className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span className="font-semibold text-white">{activeBg.title}</span>
        <span className="text-neutral-500">•</span>
        <div className="flex items-center gap-1.5 ml-1">
          {STUDIO_INSTRUMENT_BACKGROUNDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBgIndex(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                i === currentBgIndex
                  ? 'bg-orange-500 w-5'
                  : 'bg-neutral-600 hover:bg-neutral-400'
              }`}
              title={`Photo instrument studio ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-6 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Label & Studio d'Enregistrement Musical — Kinshasa</span>
        </div>

        {/* Hero Title */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-[1.1] mb-6 max-w-4xl drop-shadow-lg"
        >
          Propulsez Votre{' '}
          <span className="text-orange-500 block sm:inline drop-shadow-[0_4px_24px_rgba(255,102,0,0.45)]">
            Carrière Musicale
          </span>
        </h1>

        {/* Description Paragraph */}
        <p
          id="hero-subtitle"
          className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow"
        >
          JBS Prod accompagne les artistes de talent dans la production, la réalisation et la promotion de leurs projets musicaux avec des instruments de pointe et un encadrement professionnel.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <button
            id="hero-btn-proposer-projet"
            onClick={onOpenProjectModal}
            className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-base rounded-xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/45 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proposer un Projet</span>
          </button>

          <a
            id="hero-btn-decouvrir-services"
            href="#services"
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900/90 hover:bg-neutral-800/90 active:scale-95 text-white border border-neutral-700 hover:border-orange-500 font-bold text-base rounded-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Découvrir nos Services</span>
          </a>
        </div>

        {/* Quick Highlights / Audio Tester */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-neutral-800/80 w-full max-w-3xl text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md shadow-lg">
            <div className="p-2.5 rounded-lg bg-orange-500/15 text-orange-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Studio Master HD</p>
              <p className="text-xs text-neutral-400">Instruments & Mix 24-bit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md shadow-lg">
            <div className="p-2.5 rounded-lg bg-orange-500/15 text-orange-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Promotion Globale</p>
              <p className="text-xs text-neutral-400">Spotify, Apple, YouTube</p>
            </div>
          </div>

          <button
            onClick={onPlayDemo}
            className="col-span-2 sm:col-span-1 flex items-center justify-between p-3.5 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/35 text-left transition-all cursor-pointer group shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-500 text-white group-hover:scale-105 transition-transform shadow-md">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-white font-bold text-xs">Écouter la Démo</p>
                <p className="text-[11px] text-orange-400 font-medium">Production JBS Beat</p>
              </div>
            </div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#services"
          className="mt-12 inline-flex flex-col items-center text-neutral-400 hover:text-orange-400 transition-colors animate-bounce"
          aria-label="Faire défiler vers le bas"
        >
          <ChevronDown className="w-6 h-6 text-neutral-400" />
        </a>
      </div>
    </section>
  );
};

