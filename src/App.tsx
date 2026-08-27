import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ArtistsSection } from './components/ArtistsSection';
import { GallerySection } from './components/GallerySection';
import { CandidatureSection } from './components/CandidatureSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { ProjectProposalModal } from './components/ProjectProposalModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CandidatureData, GalleryItem } from './types';
import { audioPreviewEngine } from './utils/audioSynth';
import { DEMO_TRACKS, ARTISTS } from './data/artists';
import { INITIAL_GALLERY_ITEMS } from './data/gallery';

export default function App() {
  // Application / Candidatures State
  const [candidatures, setCandidatures] = useState<CandidatureData[]>(() => {
    const saved = localStorage.getItem('jbs_candidatures');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'JBS-1042',
        fullName: 'Patrick Malula',
        email: 'patrick.malula@gmail.com',
        phone: '+243978112233',
        musicalStyle: 'Rumba Trap / Afro',
        projectType: 'Production Studio',
        listenLink: 'https://soundcloud.com/patrick-malula/demo-2024',
        message: 'Recherche studio pour enregistrer un EP de 4 titres avec mixage et mastering pro.',
        createdAt: '25 août 2024',
        status: 'en_etude',
      },
      {
        id: 'JBS-1039',
        fullName: 'Grace Divine',
        email: 'gracedivine.music@yahoo.fr',
        phone: '+243815556677',
        musicalStyle: 'Gospel R&B',
        projectType: 'Promotion & Marketing',
        listenLink: 'https://youtube.com/watch?v=demo',
        message: 'Single déjà enregistré en quête d\'une stratégie de distribution et de visibilité.',
        createdAt: '24 août 2024',
        status: 'nouveau',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('jbs_candidatures', JSON.stringify(candidatures));
  }, [candidatures]);

  // Gallery Photos & Videos State with localStorage persistence
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('jbs_gallery_media');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_GALLERY_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('jbs_gallery_media', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const handleAddMedia = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteMedia = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDefaultGallery = () => {
    if (window.confirm('Voulez-vous réinitialiser la galerie avec les photos et vidéos par défaut ?')) {
      setGalleryItems(INITIAL_GALLERY_ITEMS);
    }
  };

  // Audio Playback State
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<{
    id: string;
    artistName: string;
    trackTitle: string;
    genre: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Modals & Navigation Helpers
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedServiceToQuote, setSelectedServiceToQuote] = useState<string | undefined>(undefined);

  // Sync audio engine listener
  useEffect(() => {
    audioPreviewEngine.setTimeUpdateListener((time, playing) => {
      setCurrentTime(time);
      setIsPlaying(playing);
    });

    return () => {
      audioPreviewEngine.stop();
    };
  }, []);

  const handleTogglePlayTrack = (
    trackId: string,
    genre: string,
    artistName: string,
    trackTitle: string
  ) => {
    if (isPlaying && currentPlayingTrack?.id === trackId) {
      audioPreviewEngine.pause();
      setIsPlaying(false);
    } else {
      setCurrentPlayingTrack({
        id: trackId,
        artistName,
        trackTitle,
        genre,
      });
      audioPreviewEngine.playTrack(trackId, genre);
      setIsPlaying(true);
    }
  };

  const handlePlayHeroDemo = () => {
    const demo = DEMO_TRACKS[0];
    handleTogglePlayTrack(demo.id, 'afrobeat', demo.artistName, demo.title);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceToQuote(serviceTitle);
    const elem = document.getElementById('candidature');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddCandidature = (cand: CandidatureData) => {
    setCandidatures((prev) => [cand, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: CandidatureData['status']) => {
    setCandidatures((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDeleteCandidature = (id: string) => {
    setCandidatures((prev) => prev.filter((c) => c.id !== id));
  };

  const pendingCount = candidatures.filter((c) => c.status === 'nouveau').length;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        pendingApplicationsCount={pendingCount}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
          onPlayDemo={handlePlayHeroDemo}
        />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Artists Showcase Section */}
        <ArtistsSection
          currentPlayingTrackId={currentPlayingTrack?.id || null}
          isPlaying={isPlaying}
          onTogglePlayTrack={handleTogglePlayTrack}
        />

        {/* Media Gallery Section (Photos & Videos) */}
        <GallerySection
          galleryItems={galleryItems}
          onAddMedia={handleAddMedia}
          onDeleteMedia={handleDeleteMedia}
          onResetDefaultGallery={handleResetDefaultGallery}
        />

        {/* Candidature & Contact Section */}
        <CandidatureSection
          onAddCandidature={handleAddCandidature}
          prefilledService={selectedServiceToQuote}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent / Floating Audio Player Bar */}
      {currentPlayingTrack && (
        <AudioPlayerBar
          currentTrack={currentPlayingTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onTogglePlay={() => {
            if (isPlaying) {
              audioPreviewEngine.pause();
            } else if (currentPlayingTrack) {
              audioPreviewEngine.playTrack(
                currentPlayingTrack.id,
                currentPlayingTrack.genre
              );
            }
          }}
          onClose={() => {
            audioPreviewEngine.stop();
            setCurrentPlayingTrack(null);
          }}
        />
      )}

      {/* WhatsApp Quick Connect Floating Button */}
      <WhatsAppFloatingButton />

      {/* Project Proposal Modal */}
      <ProjectProposalModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmitProposal={handleAddCandidature}
      />

      {/* Admin Candidatures Management Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        candidatures={candidatures}
        onUpdateStatus={handleUpdateStatus}
        onDeleteCandidature={handleDeleteCandidature}
      />
    </div>
  );
}
