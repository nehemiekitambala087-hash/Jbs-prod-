import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const handleWhatsApp = () => {
    const text = "Bonjour JBS Prod ! J'aimerais me renseigner sur vos services de production musicale et d'enregistrement studio.";
    window.open(`https://wa.me/243978885682?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer border border-white/20"
      title="Discuter avec JBS Prod sur WhatsApp"
      aria-label="Contact WhatsApp JBS Prod"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="hidden sm:inline font-bold text-sm tracking-wide">
        WhatsApp JBS
      </span>
    </button>
  );
};
