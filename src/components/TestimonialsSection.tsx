import React, { useState } from 'react';
import {
  Quote,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  TrendingUp,
  Award,
  Music2,
  HeartHandshake,
  Share2,
  Check,
  Copy,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '../data/testimonials';

interface TestimonialsSectionProps {
  onOpenProjectModal?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenProjectModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentItem = TESTIMONIALS[currentIndex];

  const getShareText = (item: Testimonial) => {
    const metric = item.highlightMetric ? ` (${item.highlightMetric})` : '';
    return `« ${item.quote} » — ${item.artistName}${metric}, artiste accompagné par JBS Prod Label & Studio Kinshasa.`;
  };

  const handleCopyQuote = (item: Testimonial) => {
    const text = `${getShareText(item)} ${window.location.origin}#temoignages`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(item.id);
      setShareFeedback('Citation et lien copiés dans le presse-papiers !');
      setTimeout(() => {
        setCopiedId(null);
        setShareFeedback(null);
      }, 3000);
    }).catch(() => {
      // Fallback
    });
  };

  const handleShareWhatsApp = (item: Testimonial) => {
    const text = encodeURIComponent(`${getShareText(item)}\n👉 Découvrir JBS Prod : ${window.location.origin}#temoignages`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = (item: Testimonial) => {
    const url = encodeURIComponent(`${window.location.origin}#temoignages`);
    const quote = encodeURIComponent(getShareText(item));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = (item: Testimonial) => {
    const text = encodeURIComponent(getShareText(item));
    const url = encodeURIComponent(`${window.location.origin}#temoignages`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=JBSProd,MusiqueKinshasa,StudioEnregistrement`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = (item: Testimonial) => {
    const url = encodeURIComponent(`${window.location.origin}#temoignages`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async (item: Testimonial) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Témoignage ${item.artistName} - JBS Prod`,
          text: getShareText(item),
          url: `${window.location.origin}#temoignages`,
        });
      } catch (err) {
        // User cancelled or aborted
      }
    } else {
      handleCopyQuote(item);
    }
  };

  return (
    <section
      id="temoignages"
      className="py-24 bg-neutral-900/90 text-white relative overflow-hidden border-y border-neutral-800"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Success Stories & Témoignages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4">
            Ils Font Confiance à <span className="text-orange-500">JBS Prod</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Découvrez l'expérience vécue par les artistes et musiciens accompagnés par notre studio et nos directeurs artistiques à Kinshasa.
          </p>
        </div>

        {/* Featured Testimonial Spotlight Carousel */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Artist Avatar & Profile Card */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-5 group">
                <img
                  src={currentItem.avatarUrl}
                  alt={currentItem.artistName}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-orange-500/40 shadow-xl shadow-orange-500/10"
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-1.5 rounded-xl shadow-lg">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-xl font-bold text-white font-display">
                    {currentItem.artistName}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Signé JBS
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-medium">
                  {currentItem.role}
                </p>
                {currentItem.projectTitle && (
                  <p className="text-xs text-orange-400/90 font-medium flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                    <Music2 className="w-3.5 h-3.5" />
                    <span>{currentItem.projectTitle}</span>
                  </p>
                )}
              </div>

              {/* Metric Pill */}
              {currentItem.highlightMetric && (
                <div className="mt-5 w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {currentItem.highlightMetric}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {currentItem.metricLabel}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Quote Content & Social Share */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l lg:border-neutral-800">
              <div className="space-y-4">
                {/* 5-Star Rating & Quote Mark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-orange-400">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                    <span className="text-xs font-bold text-neutral-300 ml-2">
                      5.0 / 5.0
                    </span>
                  </div>
                  <Quote className="w-10 h-10 text-orange-500/25" />
                </div>

                {/* Main Quote */}
                <blockquote className="text-lg sm:text-xl md:text-2xl text-neutral-100 font-medium leading-relaxed italic">
                  "{currentItem.quote}"
                </blockquote>

                {/* Social Share Bar for this Success Story */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                      <Share2 className="w-4 h-4 text-orange-400" />
                      <span>Partager ce témoignage :</span>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                      {/* WhatsApp Share */}
                      <button
                        onClick={() => handleShareWhatsApp(currentItem)}
                        title="Partager sur WhatsApp"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>

                      {/* Facebook Share */}
                      <button
                        onClick={() => handleShareFacebook(currentItem)}
                        title="Partager sur Facebook"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Facebook</span>
                      </button>

                      {/* X / Twitter Share */}
                      <button
                        onClick={() => handleShareTwitter(currentItem)}
                        title="Partager sur X (Twitter)"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>X</span>
                      </button>

                      {/* LinkedIn Share */}
                      <button
                        onClick={() => handleShareLinkedIn(currentItem)}
                        title="Partager sur LinkedIn"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/20 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/40 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </button>

                      {/* Copy Link / Quote */}
                      <button
                        onClick={() => handleCopyQuote(currentItem)}
                        title="Copier la citation et le lien"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 ${
                          copiedId === currentItem.id
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border-neutral-700'
                        }`}
                      >
                        {copiedId === currentItem.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {shareFeedback && (
                    <div className="mt-2 text-center text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/50 py-1.5 px-3 rounded-lg animate-fade-in">
                      {shareFeedback}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-800/80">
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex
                          ? 'w-8 bg-orange-500'
                          : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                      }`}
                      title={`Témoignage ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                    aria-label="Témoignage suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Card Grid Overview with Quick Share */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Précision & Acoustique HD</h5>
                <p className="text-xs text-neutral-400">Standard de mixage 24-bit / 96kHz</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              « Chaque prise vocale est traitée avec le plus grand soin. Les préamplis et microphones apportent une chaleur inégalée. »
            </p>
            <div className="flex items-center justify-between text-[11px] text-orange-400 font-semibold pt-2 border-t border-neutral-800/60">
              <span>98% de satisfaction artistes</span>
              <button
                onClick={() => handleShareWhatsApp(TESTIMONIALS[0])}
                className="text-neutral-400 hover:text-[#25D366] transition-colors flex items-center gap-1 cursor-pointer"
                title="Partager ce pilier"
              >
                <Share2 className="w-3 h-3" />
                <span>Partager</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Déploiement & Streaming</h5>
                <p className="text-xs text-neutral-400">Distribution internationale</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              « Présence garantie sur Spotify, Apple Music, YouTube et Boomplay avec stratégie de playlists éditoriales ciblées. »
            </p>
            <div className="flex items-center justify-between text-[11px] text-orange-400 font-semibold pt-2 border-t border-neutral-800/60">
              <span>+3.2M de flux générés</span>
              <button
                onClick={() => handleShareWhatsApp(TESTIMONIALS[1])}
                className="text-neutral-400 hover:text-[#25D366] transition-colors flex items-center gap-1 cursor-pointer"
                title="Partager ce pilier"
              >
                <Share2 className="w-3 h-3" />
                <span>Partager</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Contrats Clairs & Éthiques</h5>
                <p className="text-xs text-neutral-400">Protection des droits d'auteur</p>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              « Une collaboration transparente où les droits de l'artiste sont protégés dès l'enregistrement jusqu'aux redevances. »
            </p>
            <div className="flex items-center justify-between text-[11px] text-orange-400 font-semibold pt-2 border-t border-neutral-800/60">
              <span>100% transparence contractuelle</span>
              <button
                onClick={() => handleShareWhatsApp(TESTIMONIALS[2])}
                className="text-neutral-400 hover:text-[#25D366] transition-colors flex items-center gap-1 cursor-pointer"
                title="Partager ce pilier"
              >
                <Share2 className="w-3 h-3" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        {onOpenProjectModal && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <span className="text-xs sm:text-sm text-neutral-300">
                Prêt à écrire votre propre Success Story avec notre label ?
              </span>
              <button
                onClick={onOpenProjectModal}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                Proposer un Projet Musical
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
