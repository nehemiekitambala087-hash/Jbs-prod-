import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { Disc3, Megaphone, UserCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'disc':
        return <Disc3 className="w-9 h-9 text-orange-500" />;
      case 'megaphone':
        return <Megaphone className="w-9 h-9 text-orange-500" />;
      case 'user':
        return <UserCheck className="w-9 h-9 text-orange-500" />;
      default:
        return <Disc3 className="w-9 h-9 text-orange-500" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-100 text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-neutral-900 mb-4"
          >
            Nos <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-medium">
            Un accompagnement de A à Z pour faire décoller votre musique.
          </p>
        </div>

        {/* 3 Main Cards Grid Matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl p-8 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200/80 flex flex-col items-center text-center group hover:-translate-y-1 relative"
            >
              {/* Icon Container matching mockup */}
              <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                {getServiceIcon(service.iconName)}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              {/* Key Highlights list */}
              <div className="w-full text-left bg-neutral-50 rounded-xl p-4 mb-6 border border-neutral-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Inclus dans la prestation :
                </p>
                <ul className="space-y-1.5">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-orange-500 text-white font-bold text-sm transition-colors duration-200 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
              >
                <span>Choisir ce service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold font-display text-white mb-1">
              Vous avez un projet spécial ou un besoin sur-mesure ?
            </h4>
            <p className="text-sm text-neutral-400">
              Session d'écoute, enregistrement d'album complet, clip vidéo ou direction artistique.
            </p>
          </div>
          <a
            href="#candidature"
            className="shrink-0 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-orange-500/20"
          >
            Discuter avec l'équipe JBS
          </a>
        </div>
      </div>
    </section>
  );
};
