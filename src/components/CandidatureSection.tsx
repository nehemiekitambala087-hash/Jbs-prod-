import React, { useState } from 'react';
import { Send, CheckCircle2, Upload, MessageSquare, Music, ShieldCheck, Sparkles } from 'lucide-react';
import { CandidatureData } from '../types';

interface CandidatureSectionProps {
  onAddCandidature: (candidature: CandidatureData) => void;
  prefilledService?: string;
}

export const CandidatureSection: React.FC<CandidatureSectionProps> = ({
  onAddCandidature,
  prefilledService,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [projectType, setProjectType] = useState(prefilledService || 'Single / Enregistrement');
  const [listenLink, setListenLink] = useState('');
  const [message, setMessage] = useState('');
  const [fileUploadedName, setFileUploadedName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Update projectType if prefilledService changes
  React.useEffect(() => {
    if (prefilledService) {
      setProjectType(prefilledService);
    }
  }, [prefilledService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    const newId = `JBS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCand: CandidatureData = {
      id: newId,
      fullName,
      email,
      phone: phone || '+243...',
      musicalStyle: musicalStyle || 'Non spécifié',
      projectType,
      listenLink: listenLink || 'Maquette directe / Aucun lien',
      fileName: fileUploadedName || undefined,
      message: message || 'Projet musical soumis pour étude par l\'équipe JBS Prod.',
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'nouveau',
    };

    setTimeout(() => {
      onAddCandidature(newCand);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setSubmittedId(newId);
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = `Bonjour JBS Prod ! Je m'appelle ${fullName || '[Nom]'}, je fais du ${
      musicalStyle || 'style musical'
    }. Mon projet : ${message || projectType}. Écoute : ${listenLink || 'à convenir'}.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/243978885682?text=${encoded}`, '_blank');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploadedName(e.target.files[0].name);
    }
  };

  return (
    <section id="candidature" className="py-24 bg-neutral-950 text-white relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Déposez Votre Projet Musical</span>
          </div>
          <h2
            id="candidature-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4"
          >
            Prêt à <span className="text-orange-500">Collaborer ?</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-medium">
            Envoyez-nous votre maquette ou décrivez votre projet. L’équipe de JBS Prod étudiera votre profil avec attention.
          </p>
        </div>

        {/* Split Layout matching Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-9 rounded-2xl shadow-2xl">
            {submittedSuccess ? (
              <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-orange-500/20 border border-orange-500 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Candidature Envoyée avec Succès !
                </h3>
                <p className="text-neutral-300 text-sm mb-4">
                  Merci <span className="font-semibold text-white">{fullName}</span>. Votre dossier porte la référence <span className="text-orange-400 font-mono font-bold">#{submittedId}</span>.
                </p>
                <p className="text-xs text-neutral-400 mb-8 max-w-md mx-auto">
                  Notre équipe artistique écoute toutes les maquettes et vous répondra par email ou WhatsApp sous 48h ouvrées.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirmer sur WhatsApp (+243 97 8885682)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMusicalStyle('');
                      setListenLink('');
                      setMessage('');
                      setFileUploadedName(null);
                    }}
                    className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm rounded-lg transition-colors"
                  >
                    Soumettre un autre projet
                  </button>
                </div>
              </div>
            ) : (
              <form id="candidature-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex. Junior Malonga"
                    className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Votre Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+243 97 000 0000"
                      className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Votre style musical *
                    </label>
                    <input
                      type="text"
                      required
                      value={musicalStyle}
                      onChange={(e) => setMusicalStyle(e.target.value)}
                      placeholder="ex: Rumba, Rap, Afro, R&B..."
                      className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Type d'accompagnement
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm outline-none transition-all"
                    >
                      <option value="Production Studio">Production Studio (Mix/Master/Enreg)</option>
                      <option value="Promotion & Marketing">Promotion & Marketing</option>
                      <option value="Management & Carrière">Management & Carrière</option>
                      <option value="Single & Clip Vidéo">Single & Clip Vidéo</option>
                      <option value="Signature d'Artiste / Label">Signature d'Artiste / Label</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Lien d'écoute (SoundCloud, Drive, YouTube...)
                  </label>
                  <input
                    type="url"
                    value={listenLink}
                    onChange={(e) => setListenLink(e.target.value)}
                    placeholder="https://soundcloud.com/... ou lien Google Drive"
                    className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all"
                  />
                </div>

                {/* Upload attachment option */}
                <div className="p-3.5 rounded-lg bg-neutral-950 border border-dashed border-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Upload className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-200">
                        {fileUploadedName ? fileUploadedName : 'Déposer un extrait audio (MP3, WAV)'}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Max 20MB • Démo ou maquette voix
                      </p>
                    </div>
                  </div>
                  <label className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs font-semibold cursor-pointer transition-colors">
                    <span>Parcourir</span>
                    <input
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Parlez-nous de votre projet
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Décrivez votre vision artistique, vos attentes et vos objectifs..."
                    className="w-full bg-neutral-950 border border-neutral-700/80 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white rounded-lg px-4 py-3 text-sm placeholder:text-neutral-500 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button matching mockup */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-candidature-btn"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold text-base rounded-lg shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Envoyer ma candidature</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Vos morceaux restent 100% votre propriété intellectuelle.</span>
                </p>
              </form>
            )}
          </div>

          {/* Right Visual Image (6 cols) matching mockup */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden relative shadow-2xl border border-neutral-800 min-h-[420px] flex flex-col justify-end p-8 sm:p-10 group">
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop"
              alt="Microphone de studio et casque audio professionnel JBS Prod"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Overlay card */}
            <div className="relative z-10 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-neutral-700/70 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Auditions Ouvertes — Saison 2024/2025
                </span>
              </div>
              <h4 className="text-xl font-bold font-display text-white mb-2">
                Rejoignez la Famille JBS Prod
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                Nous recherchons en permanence des voix uniques, des auteurs inspirés et des beatmakers passionnés à Kinshasa et dans la diaspora.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> Réponse sous 48h
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" /> Écoute 100% garantie
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
