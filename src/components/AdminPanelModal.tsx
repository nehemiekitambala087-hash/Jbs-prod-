import React, { useState } from 'react';
import { X, Search, Filter, Phone, Mail, ExternalLink, Trash2, CheckCircle2, Clock, User, ShieldCheck } from 'lucide-react';
import { CandidatureData } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatures: CandidatureData[];
  onUpdateStatus: (id: string, newStatus: CandidatureData['status']) => void;
  onDeleteCandidature: (id: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  candidatures,
  onUpdateStatus,
  onDeleteCandidature,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CandidatureData['status']>('all');

  if (!isOpen) return null;

  const filtered = candidatures.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.musicalStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: CandidatureData['status']) => {
    switch (status) {
      case 'nouveau':
        return <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">Nouveau</span>;
      case 'en_etude':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">En Étude</span>;
      case 'retenu':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">Retenu</span>;
      case 'archive':
        return <span className="bg-neutral-800 text-neutral-400 border border-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Archivé</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Gestion des Candidatures & Projets
              </h3>
              <p className="text-xs text-neutral-400">
                {candidatures.length} dossier(s) reçu(s) au total
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un artiste..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {(['all', 'nouveau', 'en_etude', 'retenu', 'archive'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-orange-500 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {st === 'all' ? 'Tous' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <User className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Aucune candidature trouvée pour ce critère.</p>
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{c.fullName}</span>
                    {getStatusBadge(c.status)}
                    <span className="text-[11px] text-neutral-500 font-mono">#{c.id}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                    <span className="text-orange-400 font-medium">{c.musicalStyle}</span>
                    <span>•</span>
                    <span>{c.projectType}</span>
                    <span>•</span>
                    <span className="text-neutral-500">{c.createdAt}</span>
                  </div>
                  <p className="text-xs text-neutral-300 italic line-clamp-1 pt-1">
                    "{c.message}"
                  </p>
                  {c.listenLink && c.listenLink !== 'Maquette directe / Aucun lien' && (
                    <a
                      href={c.listenLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-orange-400 hover:underline pt-0.5"
                    >
                      <span>Lien d'écoute</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-neutral-800">
                  {/* Status selector */}
                  <select
                    value={c.status}
                    onChange={(e) => onUpdateStatus(c.id, e.target.value as CandidatureData['status'])}
                    className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-orange-500"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_etude">En Étude</option>
                    <option value="retenu">Retenu</option>
                    <option value="archive">Archivé</option>
                  </select>

                  {/* WhatsApp contact */}
                  {c.phone && (
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Bonjour ${c.fullName}, c'est l'équipe JBS Prod concernant votre candidature #${c.id} !`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black rounded-lg transition-colors"
                      title="Contacter sur WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}

                  {/* Mail contact */}
                  <a
                    href={`mailto:${c.email}?subject=JBS Prod - Candidature #${c.id}`}
                    className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                    title="Envoyer un email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteCandidature(c.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
