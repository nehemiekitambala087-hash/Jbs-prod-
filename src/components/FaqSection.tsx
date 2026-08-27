import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  FileCheck2,
  Sliders,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  X,
} from 'lucide-react';
import { FAQ_DATA, FAQ_CATEGORIES } from '../data/faq';
import { FaqCategory } from '../types';

interface FaqSectionProps {
  onContactClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Open the first question by default
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenAll = () => {
    const allOpen = filteredFaqs.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setOpenItems(allOpen);
  };

  const handleCloseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.highlight?.toLowerCase().includes(query) ||
        item.tags?.some((t) => t.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleWhatsAppHelp = () => {
    const text =
      "Bonjour JBS Prod ! J'ai une question concernant le studio, les contrats ou le processus de sélection.";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/243978885682?text=${encoded}`, '_blank');
  };

  return (
    <section
      id="faq"
      className="py-24 bg-neutral-950 text-white relative border-t border-neutral-800/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
            <span>Foire Aux Questions</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4"
          >
            Tout ce que vous devez savoir sur{' '}
            <span className="text-orange-500">JBS Prod</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed">
            Processus de sélection des artistes, cadre contractuel, protection de vos droits d'auteur et organisation de vos sessions en studio à Kinshasa.
          </p>
        </div>

        {/* 3 Quick Summary Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div
            id="faq-card-selection"
            onClick={() => setSelectedCategory('selection')}
            className="bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 p-6 rounded-2xl transition-all duration-200 cursor-pointer group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-orange-400 transition-colors">
              1. Sélection & Auditions
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Écoute de chaque maquette sous 48-72h. Audition personnalisée au studio pour les talents retenus.
            </p>
          </div>

          <div
            id="faq-card-contrat"
            onClick={() => setSelectedCategory('contrat')}
            className="bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 p-6 rounded-2xl transition-all duration-200 cursor-pointer group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-orange-400 transition-colors">
              2. Contrats & Droits d'auteur
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Protection légale de vos œuvres, conservation de vos droits et modèles contractuels clairs (signature ou prestation).
            </p>
          </div>

          <div
            id="faq-card-studio"
            onClick={() => setSelectedCategory('studio')}
            className="bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 p-6 rounded-2xl transition-all duration-200 cursor-pointer group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-orange-400 transition-colors">
              3. Modalités au Studio
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Ingénieurs et directeurs artistiques dédiés, matériel haut de gamme, livraison de masters HD et stems complets.
            </p>
          </div>
        </div>

        {/* Filter bar: Search & Category tabs */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between shadow-xl">
          {/* Categories */}
          <div
            id="faq-category-pills"
            className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin"
          >
            {FAQ_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? FAQ_DATA.length
                  : FAQ_DATA.filter((i) => i.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`faq-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id as FaqCategory)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question (ex. contrat, maquette, stems)..."
              className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-neutral-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5"
                title="Effacer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Global Controls & Count */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-1">
          <span>
            Affichage de <strong className="text-white">{filteredFaqs.length}</strong> question{filteredFaqs.length > 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-3">
            <button
              id="faq-expand-all-btn"
              onClick={handleOpenAll}
              className="hover:text-orange-400 transition-colors font-medium cursor-pointer"
            >
              Tout déplier
            </button>
            <span>•</span>
            <button
              id="faq-collapse-all-btn"
              onClick={handleCloseAll}
              className="hover:text-orange-400 transition-colors font-medium cursor-pointer"
            >
              Tout replier
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center">
            <HelpCircle className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">Aucune question trouvée</h4>
            <p className="text-sm text-neutral-400 mb-6 max-w-md mx-auto">
              Nous n'avons pas trouvé de résultat pour « {searchQuery} ». Posez-nous votre question directement via WhatsApp.
            </p>
            <button
              onClick={handleWhatsAppHelp}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter l'équipe JBS</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-neutral-900/90 border-orange-500/40 shadow-xl shadow-orange-500/5'
                      : 'bg-neutral-900/50 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/70'
                  }`}
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full py-5 px-6 sm:px-8 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOpen
                            ? 'bg-orange-500 text-white'
                            : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-base sm:text-lg font-bold font-display text-white leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-orange-500/20 text-orange-400 rotate-180'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 pt-1 text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-neutral-800/60 animate-in fade-in-50 duration-200">
                      <p className="whitespace-pre-line mb-4">{faq.answer}</p>

                      {faq.highlight && (
                        <div className="p-3.5 bg-orange-500/10 border border-orange-500/25 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-orange-300 mb-4">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span className="font-medium">{faq.highlight}</span>
                        </div>
                      )}

                      {faq.tags && faq.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-800/40">
                          <span className="text-[11px] font-semibold text-neutral-500 mr-1">
                            Thèmes :
                          </span>
                          {faq.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] bg-neutral-950 text-neutral-400 px-2.5 py-0.5 rounded-md border border-neutral-800"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner: "Une question spécifique ?" */}
        <div className="mt-16 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800 p-8 sm:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Vous avez un projet particulier ou une question spécifique ?
            </h3>
            <p className="text-sm text-neutral-400">
              Notre équipe d'ingénieurs du son et de producteurs à Kinshasa est disponible 7j/7 pour échanger sur vos ambitions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              id="faq-whatsapp-cta"
              onClick={handleWhatsAppHelp}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Échanger sur WhatsApp</span>
            </button>

            <a
              id="faq-candidature-cta"
              href="#candidature"
              className="w-full sm:w-auto px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Déposer ma candidature</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
