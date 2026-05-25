"use client";

import { useState } from "react";
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Upload
} from "lucide-react";

const SUBMISSIONS = [
  {
    id: 1,
    title: "Formation ChatGPT Avancé",
    type: "formation",
    status: "approved",
    submittedAt: "2024-01-15",
    reviewedAt: "2024-01-16",
    price: "49€",
    sales: 127,
    revenue: "6,223€",
    feedback: null
  },
  {
    id: 2,
    title: "Pack 50 Prompts Marketing",
    type: "prompt",
    status: "pending",
    submittedAt: "2024-01-20",
    reviewedAt: null,
    price: "19€",
    sales: 0,
    revenue: "0€",
    feedback: null
  },
  {
    id: 3,
    title: "Workflow Automatisation Email",
    type: "workflow",
    status: "rejected",
    submittedAt: "2024-01-18",
    reviewedAt: "2024-01-19",
    price: "29€",
    sales: 0,
    revenue: "0€",
    feedback: "Le contenu doit être plus détaillé avec des exemples concrets."
  },
  {
    id: 4,
    title: "Formation Midjourney Pro",
    type: "formation",
    status: "under_review",
    submittedAt: "2024-01-22",
    reviewedAt: null,
    price: "79€",
    sales: 0,
    revenue: "0€",
    feedback: null
  }
];

const WITHDRAWALS = [
  {
    id: 1,
    amount: "1,250€",
    status: "completed",
    requestedAt: "2024-01-10",
    processedAt: "2024-01-12",
    method: "Virement bancaire"
  },
  {
    id: 2,
    amount: "890€",
    status: "pending",
    requestedAt: "2024-01-25",
    processedAt: null,
    method: "PayPal"
  }
];

const STATUS_CONFIG = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  under_review: { label: "En révision", color: "bg-blue-100 text-blue-700", icon: Eye },
  approved: { label: "Approuvé", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejected: { label: "Rejeté", color: "bg-red-100 text-red-700", icon: XCircle }
};

const TYPE_CONFIG = {
  formation: { label: "Formation", icon: "🎓" },
  prompt: { label: "Prompt", icon: "💡" },
  workflow: { label: "Workflow", icon: "⚡" },
  tool: { label: "Outil", icon: "🔧" }
};

export default function ContributorSubmissionsPage() {
  const [activeTab, setActiveTab] = useState<"submissions" | "finances">("submissions");

  const totalRevenue = SUBMISSIONS
    .filter(s => s.status === "approved")
    .reduce((sum, s) => sum + parseFloat(s.revenue.replace(/[€,]/g, "")), 0);

  const pendingRevenue = SUBMISSIONS
    .filter(s => s.status === "pending" || s.status === "under_review")
    .reduce((sum, s) => sum + (s.sales * parseFloat(s.price.replace("€", ""))), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Espace Contributeur</h1>
            <p className="text-gray-600 mt-1">Gérez vos soumissions et suivez vos revenus</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all">
            <Plus className="w-5 h-5" />
            Nouvelle Soumission
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Revenus Total</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()}€</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Ventes ce mois</p>
                <h3 className="text-2xl font-bold text-gray-900">127</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Soumissions</p>
                <h3 className="text-2xl font-bold text-gray-900">{SUBMISSIONS.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">En attente</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {SUBMISSIONS.filter(s => s.status === "pending" || s.status === "under_review").length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border">
            {[
              { key: "submissions", label: "Mes Soumissions" },
              { key: "finances", label: "Finances & Retraits" }
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
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "submissions" && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Contenu</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Prix</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ventes</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Revenus</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SUBMISSIONS.map((submission) => {
                    const StatusIcon = STATUS_CONFIG[submission.status as keyof typeof STATUS_CONFIG]?.icon;
                    return (
                      <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{submission.title}</h4>
                            <p className="text-sm text-gray-500">Soumis le {submission.submittedAt}</p>
                            {submission.feedback && (
                              <p className="text-sm text-red-600 mt-1 italic">{submission.feedback}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{TYPE_CONFIG[submission.type as keyof typeof TYPE_CONFIG]?.icon}</span>
                            <span className="text-sm font-medium">{TYPE_CONFIG[submission.type as keyof typeof TYPE_CONFIG]?.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[submission.status as keyof typeof STATUS_CONFIG]?.color}`}>
                              {STATUS_CONFIG[submission.status as keyof typeof STATUS_CONFIG]?.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold">{submission.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium">{submission.sales}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-green-600">{submission.revenue}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            {submission.status === "rejected" && (
                              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                                <Edit className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
          <div className="space-y-6">
            {/* Balance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Solde Disponible</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">{totalRevenue.toLocaleString()}€</p>
                  <p className="text-sm text-gray-500 mt-1">Disponible pour retrait</p>
                </div>
                <button className="bg-primary text-black font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all">
                  Demander un retrait
                </button>
              </div>
            </div>

            {/* Withdrawal History */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-bold text-gray-900">Historique des Retraits</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Montant</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Méthode</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Demandé le</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Traité le</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {WITHDRAWALS.map((withdrawal) => (
                      <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">{withdrawal.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            withdrawal.status === "completed" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {withdrawal.status === "completed" ? "Complété" : "En attente"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{withdrawal.method}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{withdrawal.requestedAt}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {withdrawal.processedAt || "En cours"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}