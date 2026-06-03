'use client';

import { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [reportType, setReportType] = useState('monthly');
  const [period, setPeriod] = useState('current');

  const handleGeneratePDF = async () => {
    setGenerating(true);
    
    // Simuler la génération
    setTimeout(() => {
      setGenerating(false);
      alert('Rapport PDF généré avec succès ! (Fonctionnalité à implémenter)');
    }, 2000);
  };

  const reportTemplates = [
    {
      id: 'monthly',
      title: 'Rapport Mensuel',
      description: 'Vue d\'ensemble complète du mois',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'revenue',
      title: 'Rapport Financier',
      description: 'Revenus, paiements et commissions',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'users',
      title: 'Rapport Utilisateurs',
      description: 'Croissance et engagement',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'content',
      title: 'Rapport Contenu',
      description: 'Formations, prompts et outils',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black mb-2">Rapports</h1>
        <p className="text-neutral-600">Générez des rapports PDF détaillés</p>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => setReportType(template.id)}
              className={`bg-white rounded-xl border-2 p-6 text-left transition-all hover:shadow-lg ${
                reportType === template.id ? 'border-primary' : 'border-neutral-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{template.title}</h3>
              <p className="text-sm text-neutral-600">{template.description}</p>
            </button>
          );
        })}
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-black">Configuration du Rapport</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Type de rapport
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="monthly">Rapport Mensuel</option>
              <option value="revenue">Rapport Financier</option>
              <option value="users">Rapport Utilisateurs</option>
              <option value="content">Rapport Contenu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Période
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="current">Mois en cours</option>
              <option value="last">Mois dernier</option>
              <option value="quarter">Trimestre en cours</option>
              <option value="year">Année en cours</option>
              <option value="custom">Période personnalisée</option>
            </select>
          </div>
        </div>

        {period === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Date de début
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Date de fin
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-black mb-3">
            Sections à inclure
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Vue d\'ensemble',
              'Métriques clés',
              'Graphiques',
              'Tableaux détaillés',
              'Top contributeurs',
              'Analyse comparative',
            ].map((section) => (
              <label key={section} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-black">{section}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleGeneratePDF}
          disabled={generating}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {generating ? 'Génération en cours...' : 'Générer le rapport PDF'}
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-black mb-6">Rapports Récents</h2>
        <div className="space-y-3">
          {[
            { name: 'Rapport Mensuel - Mars 2024', date: '2024-03-15', size: '2.4 MB' },
            { name: 'Rapport Financier - Q1 2024', date: '2024-03-10', size: '1.8 MB' },
            { name: 'Rapport Utilisateurs - Février 2024', date: '2024-02-28', size: '1.2 MB' },
          ].map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-black">{report.name}</p>
                  <p className="text-xs text-neutral-500">
                    {new Date(report.date).toLocaleDateString('fr-FR')} • {report.size}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Download className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
