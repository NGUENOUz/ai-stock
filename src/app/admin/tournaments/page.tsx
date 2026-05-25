'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Calendar, 
  Users, 
  Gift, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search
} from 'lucide-react';

const TOURNAMENTS = [
  {
    id: 1,
    title: "Meilleur Prompt ChatGPT Marketing",
    description: "Créez le prompt le plus efficace pour générer des campagnes marketing",
    type: "prompt",
    status: "active",
    prize: "500€",
    participants: 127,
    submissions: 89,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    createdBy: "Admin",
    winner: null
  },
  {
    id: 2,
    title: "Application IA Innovante",
    description: "Développez une application utilisant l'IA de manière créative",
    type: "code",
    status: "active",
    prize: "1000€",
    participants: 89,
    submissions: 45,
    startDate: "2024-01-20",
    endDate: "2024-02-28",
    createdBy: "Admin",
    winner: null
  },
  {
    id: 3,
    title: "Prompt Engineering Décembre",
    description: "Prompt multi-étapes pour analyse de données",
    type: "prompt",
    status: "completed",
    prize: "500€",
    participants: 156,
    submissions: 98,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    createdBy: "Admin",
    winner: "Sophie M."
  }
];

const STATUS_CONFIG = {
  draft: { label: "Brouillon", color: "bg-gray-100 text-gray-700" },
  active: { label: "Actif", color: "bg-green-100 text-green-700" },
  completed: { label: "Terminé", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "Annulé", color: "bg-red-100 text-red-700" }
};

const TYPE_CONFIG = {
  prompt: { label: "Prompt", icon: "💡" },
  code: { label: "Code", icon: "💻" },
  design: { label: "Design", icon: "🎨" },
  workflow: { label: "Workflow", icon: "⚡" }
};

export default function AdminTournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTournaments = TOURNAMENTS.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter;
    const matchesType = typeFilter === "all" || tournament.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Gestion des Tournois</h1>
          <p className="text-neutral-600">Créez et gérez les tournois de la plateforme</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
          <Plus className="w-5 h-5" />
          Nouveau Tournoi
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-neutral-500">Tournois Actifs</p>
              <h3 className="text-2xl font-bold text-black">2</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-neutral-500">Participants Total</p>
              <h3 className="text-2xl font-bold text-black">372</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-neutral-500">Prix Distribués</p>
              <h3 className="text-2xl font-bold text-black">2,500€</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-neutral-500">Soumissions</p>
              <h3 className="text-2xl font-bold text-black">232</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher un tournoi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="active">Actif</option>
            <option value="completed">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Tous les types</option>
            <option value="prompt">Prompt</option>
            <option value="code">Code</option>
            <option value="design">Design</option>
            <option value="workflow">Workflow</option>
          </select>
        </div>
      </div>

      {/* Tournaments Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Tournoi</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Prix</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Participants</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Fin</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredTournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-semibold text-black">{tournament.title}</h4>
                      <p className="text-sm text-neutral-500 mt-1">{tournament.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{TYPE_CONFIG[tournament.type as keyof typeof TYPE_CONFIG]?.icon}</span>
                      <span className="text-sm font-medium">{TYPE_CONFIG[tournament.type as keyof typeof TYPE_CONFIG]?.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[tournament.status as keyof typeof STATUS_CONFIG]?.color}`}>
                      {STATUS_CONFIG[tournament.status as keyof typeof STATUS_CONFIG]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">{tournament.prize}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">{tournament.participants} participants</div>
                      <div className="text-neutral-500">{tournament.submissions} soumissions</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">{tournament.endDate}</div>
                      {tournament.winner && (
                        <div className="text-green-600">Gagnant: {tournament.winner}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}