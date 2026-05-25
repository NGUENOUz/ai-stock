"use client";

import { useState } from "react";
import { Trophy, Calendar, Users, Gift, Code, Palette, Zap, ArrowRight } from "lucide-react";

const ACTIVE_TOURNAMENTS = [
  {
    id: 1,
    title: "Meilleur Prompt ChatGPT Marketing",
    description: "Créez le prompt le plus efficace pour générer des campagnes marketing",
    type: "prompt",
    icon: Zap,
    prize: "500€",
    participants: 127,
    endDate: "2024-02-15",
    status: "active"
  },
  {
    id: 2,
    title: "Application IA Innovante",
    description: "Développez une application utilisant l'IA de manière créative",
    type: "code",
    icon: Code,
    prize: "1000€",
    participants: 89,
    endDate: "2024-02-28",
    status: "active"
  },
  {
    id: 3,
    title: "Design IA Artistique",
    description: "Créez une œuvre d'art unique avec des outils IA",
    type: "design",
    icon: Palette,
    prize: "300€",
    participants: 156,
    endDate: "2024-02-20",
    status: "active"
  }
];

const PAST_WINNERS = [
  {
    tournament: "Prompt Engineering Décembre",
    winner: "Sophie M.",
    submission: "Prompt multi-étapes pour analyse de données",
    prize: "500€"
  },
  {
    tournament: "Code IA Novembre",
    winner: "Alex R.",
    submission: "Chatbot intelligent pour e-commerce",
    prize: "1000€"
  }
];

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "past" | "my-participations">("active");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Tournois IA</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participez aux défis créatifs, montrez vos compétences en IA et gagnez des prix !
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border">
            {[
              { key: "active", label: "Tournois Actifs", count: ACTIVE_TOURNAMENTS.length },
              { key: "past", label: "Gagnants Précédents", count: PAST_WINNERS.length },
              { key: "my-participations", label: "Mes Participations", count: 3 }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-black shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "active" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVE_TOURNAMENTS.map(tournament => {
              const Icon = tournament.icon;
              return (
                <div key={tournament.id} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tournament.prize}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tournament.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tournament.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tournament.participants} participants
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Fin: {tournament.endDate}
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary text-black font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    Participer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {PAST_WINNERS.map((winner, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{winner.tournament}</h3>
                    <p className="text-gray-600">{winner.submission}</p>
                    <p className="text-sm text-gray-500 mt-1">Gagnant: <span className="font-medium">{winner.winner}</span></p>
                  </div>
                  <div className="text-right">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-2">
                      {winner.prize}
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">
                      Voir la soumission
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "my-participations" && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune participation</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore participé à des tournois.</p>
            <button 
              onClick={() => setActiveTab("active")}
              className="bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
            >
              Découvrir les tournois
            </button>
          </div>
        )}
      </div>
    </div>
  );
}