import React, { useState, useEffect } from 'react';
import { Menu, X, Disc3, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onOpenProjectModal: () => void;
  onOpenAdminModal: () => void;
  pendingApplicationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjectModal,
  onOpenAdminModal,
  pendingApplicationsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Nos Services', href: '#services' },
    { label: 'Artistes', href: '#artistes' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Nous Rejoindre', href: '#candidature' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#accueil"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex items-center tracking-tight text-2xl sm:text-3xl font-black font-display text-white">
            <span>JBS</span>
            <span className="text-orange-500 ml-1.5 transition-transform group-hover:scale-105 inline-block">
              PROD
            </span>
          </div>
          <Disc3 className="w-5 h-5 text-orange-500 animate-spin-slow opacity-80 ml-0.5" />
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-300 hover:text-orange-400 text-sm font-semibold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Admin */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="admin-dashboard-btn"
            onClick={onOpenAdminModal}
            title={
              pendingApplicationsCount > 0
                ? `Espace Gestion Studio • ${pendingApplicationsCount} nouvelle(s) candidature(s) non lue(s)`
                : 'Espace Gestion Studio, Artistes, Morceaux & Photos'
            }
            className={`relative px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl transition-all text-xs flex items-center gap-2 cursor-pointer shadow-sm ${
              pendingApplicationsCount > 0
                ? 'border border-orange-500/70 shadow-orange-500/20 bg-neutral-900/95 ring-1 ring-orange-500/30'
                : 'border border-neutral-700/80'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <ShieldAlert className={`w-4 h-4 ${pendingApplicationsCount > 0 ? 'text-orange-400' : 'text-orange-500'}`} />
              {pendingApplicationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </div>

            <span className="font-bold text-white">Gestion Studio</span>

            {pendingApplicationsCount > 0 && (
              <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md shadow-red-500/30 flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>{pendingApplicationsCount} non lu{pendingApplicationsCount > 1 ? 's' : ''}</span>
              </span>
            )}
          </button>

          <a
            id="nav-cta-btn"
            href="#candidature"
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-lg shadow-orange-500/20 transition-all duration-200"
          >
            Nous Rejoindre
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAdminModal}
            className={`relative p-2.5 text-neutral-300 bg-neutral-900 rounded-xl text-xs transition-all cursor-pointer ${
              pendingApplicationsCount > 0
                ? 'border border-orange-500/70 shadow-lg shadow-orange-500/20'
                : 'border border-neutral-800'
            }`}
            title={
              pendingApplicationsCount > 0
                ? `${pendingApplicationsCount} nouvelle(s) candidature(s) non lue(s)`
                : 'Gestion Studio Admin'
            }
          >
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            {pendingApplicationsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-black shadow-md shadow-red-500/40 animate-pulse">
                {pendingApplicationsCount}
              </span>
            )}
          </button>

          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900/90 text-neutral-200 hover:text-white border border-neutral-800 focus:outline-none"
            aria-label="Menu mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-neutral-950/98 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-neutral-200 hover:text-orange-500 py-2 border-b border-neutral-800/50"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-neutral-900 border border-neutral-700 text-white font-bold rounded-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-orange-500" />
                  <span>Gestion Studio & Admin</span>
                </div>
                {pendingApplicationsCount > 0 && (
                  <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse shadow-md">
                    {pendingApplicationsCount} non lue{pendingApplicationsCount > 1 ? 's' : ''}
                  </span>
                )}
              </button>

              <a
                href="#candidature"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transition-all"
              >
                Nous Rejoindre
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold py-3 rounded-lg transition-all"
              >
                Proposer un Projet
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
