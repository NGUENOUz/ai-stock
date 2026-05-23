'use client';

import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import TopContributorsChart from '@/components/admin/TopContributorsChart';
import CategoryDistribution from '@/components/admin/CategoryDistribution';
import { 
  DollarSign, 
  Users, 
  GraduationCap, 
  TrendingUp,
  Download,
  Eye,
  Clock
} from 'lucide-react';

// Données mockées pour la démo
const revenueData = [
  { name: 'Lun', revenus: 4200, ventes: 24 },
  { name: 'Mar', revenus: 3800, ventes: 18 },
  { name: 'Mer', revenus: 5100, ventes: 32 },
  { name: 'Jeu', revenus: 4600, ventes: 28 },
  { name: 'Ven', revenus: 6200, ventes: 42 },
  { name: 'Sam', revenus: 5800, ventes: 38 },
  { name: 'Dim', revenus: 4900, ventes: 31 },
];

const topContributors = [
  { name: 'Marie D.', ventes: 156, revenus: 12400 },
  { name: 'Jean P.', ventes: 142, revenus: 11200 },
  { name: 'Sophie L.', ventes: 128, revenus: 9800 },
  { name: 'Thomas M.', ventes: 98, revenus: 7600 },
  { name: 'Claire B.', ventes: 87, revenus: 6900 },
];

const categoryData = [
  { name: 'IA Générative', value: 35 },
  { name: 'Automatisation', value: 28 },
  { name: 'Marketing', value: 18 },
  { name: 'Design', value: 12 },
  { name: 'Développement', value: 7 },
];

const recentActivities = [
  { user: 'Marie Dubois', action: 'a acheté', item: 'Formation ChatGPT Pro', time: 'Il y a 5 min', avatar: 'MD' },
  { user: 'Jean Martin', action: 'a publié', item: 'Nouveau workflow Midjourney', time: 'Il y a 12 min', avatar: 'JM' },
  { user: 'Sophie Laurent', action: 'a complété', item: 'Formation IA Marketing', time: 'Il y a 23 min', avatar: 'SL' },
  { user: 'Thomas Petit', action: 'a commenté', item: 'Prompt Engineering 101', time: 'Il y a 1h', avatar: 'TP' },
  { user: 'Claire Bernard', action: 'a acheté', item: 'Pack Outils IA', time: 'Il y a 2h', avatar: 'CB' },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Tableau de Bord</h1>
          <p className="text-neutral-600">Vue d'ensemble de votre plateforme AI-STOCK</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
          <Download className="w-5 h-5" />
          Télécharger le PDF
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Revenus Total"
          value="34 700 €"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="success"
        />
        <StatsCard
          title="Utilisateurs Actifs"
          value="2,847"
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          color="info"
        />
        <StatsCard
          title="Formations"
          value="156"
          icon={GraduationCap}
          trend={{ value: 3.1, isPositive: false }}
          color="purple"
        />
        <StatsCard
          title="Taux de Conversion"
          value="24.8%"
          icon={TrendingUp}
          trend={{ value: 5.4, isPositive: true }}
          color="primary"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <TopContributorsChart data={topContributors} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-black mb-1">Activités Récentes</h3>
                <p className="text-sm text-neutral-500">Dernières actions sur la plateforme</p>
              </div>
              <button className="text-sm font-semibold text-primary hover:text-primary/80">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{activity.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-black">
                      <span className="font-semibold">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-semibold">{activity.item}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span className="text-xs text-neutral-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <CategoryDistribution data={categoryData} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Vues Totales</p>
              <h4 className="text-2xl font-bold text-black">127.5K</h4>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600 font-semibold">↑ 18.2%</span>
            <span className="text-neutral-400">vs semaine dernière</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Téléchargements</p>
              <h4 className="text-2xl font-bold text-black">8,942</h4>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600 font-semibold">↑ 12.8%</span>
            <span className="text-neutral-400">vs semaine dernière</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Taux Engagement</p>
              <h4 className="text-2xl font-bold text-black">68.4%</h4>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600 font-semibold">↑ 5.3%</span>
            <span className="text-neutral-400">vs semaine dernière</span>
          </div>
        </div>
      </div>
    </div>
  );
}
