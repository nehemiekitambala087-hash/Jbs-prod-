import React, { useState } from 'react';
import { X, Send, Sparkles, Music2, Mic2, Disc3, Radio, CheckCircle2 } from 'lucide-react';
import { CandidatureData } from '../types';

interface ProjectProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: (candidature: CandidatureData) => void;
}

export const ProjectProposalModal: React.FC<ProjectProposalModalProps> = ({
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState('Single / EP Studio');
  const [budgetTier, setBudgetTier] = useState('Standard');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [style, setStyle] = useState('Afrobeat');
  const [link, setLink] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const projectTypes = [
    { title: 'Enregistrement & Mixage', icon: Mic2, desc: 'Session studio cabine pro + mix' },
    { title: 'Single / EP Complet', icon: Disc3, desc: 'Production musicale de A à Z' },
    { title: 'Promotion & Streaming', icon: Radio, desc: 'Campagne de diffusion & playlists' },
    { title: 'Clip Vidéo & Visuels', icon: Music2, desc: 'Réalisation vidéo 4K à Kinshasa' },
  ];

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const candId = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCand: CandidatureData = {
      id: candId,
      fullName: name,
      email,
      phone: phone || '+243...',
      musicalStyle: style,
      projectType: `${selectedService} (${budgetTier})`,
      listenLink: link || 'Non renseigné',
      message: details || 'Projet soumis via l\'assistant de proposition.',
      createdAt: new Date().toLocaleDateString('fr-FR'),
      status: 'nouveau',
      isRead: false,
    };
    onSubmitProposal(newCand);
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const text = `Bonjour JBS Prod ! J'aimerais lancer un projet : ${selectedService} (${budgetTier}).\nNom: ${name}\nStyle: ${style}\nDétails: ${details}`;
    window.open(`https://wa.me/243978885682?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-orange-500/20 text-orange-500 border border-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Projet Transmis à l'Équipe JBS !
            </h3>
            <p className="text-neutral-300 text-sm mb-6">
              Votre demande a été enregistrée. Nous analysons votre besoin pour vous proposer la formule la plus adaptée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppInstant}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Accélérer sur WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm rounded-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Studio & Production JBS</span>
            </div>
            <h3 className="text-2xl font-black font-display text-white mb-1">
              Proposer Votre Projet
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mb-6">
              Dites-nous ce que vous souhaitez accomplir, nous vous guidons.
            </p>

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  1. Quel type de projet souhaitez-vous réaliser ?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((pt) => {
                    const Icon = pt.icon;
                    const isSelected = selectedService === pt.title;
                    return (
                      <button
                        key={pt.title}
                        type="button"
                        onClick={() => setSelectedService(pt.title)}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-neutral-900 text-orange-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{pt.title}</p>
                          <p className="text-[11px] text-neutral-400">{pt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Niveau / Envergure souhaitée
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Découverte / Démo', 'Standard Pro', 'Prestige / Album'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudgetTier(tier)}
                        className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-colors ${
                          budgetTier === tier
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-4 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Continuer vers vos coordonnées →
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleFinish} className="space-y-3.5 animate-in fade-in duration-200">
                <div className="bg-orange-500/10 border border-orange-500/20 p-2.5 rounded-lg text-xs text-orange-300 flex items-center justify-between">
                  <span>Projet : <b>{selectedService}</b> ({budgetTier})</span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="underline text-[11px] text-orange-400 hover:text-white"
                  >
                    Modifier
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Votre Nom ou Nom d'Artiste *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Gaz Mawete / Prince..."
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+243..."
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Genre Musical
                    </label>
                    <input
                      type="text"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      placeholder="Afrobeat, Rumba, Rap..."
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Lien d'écoute (optionnel)
                    </label>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="SoundCloud / Drive / YouTube"
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Brève description de votre besoin
                  </label>
                  <textarea
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Nombre de titres, délais souhaités, objectifs..."
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-orange-500 text-white rounded-lg px-3.5 py-2.5 text-sm outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-sm rounded-lg"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Valider ma proposition</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
