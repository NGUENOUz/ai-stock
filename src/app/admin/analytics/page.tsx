'use client';

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart, Download } from 'lucide-react';

const userGrowthData = [
  { month: 'Jan', users: 1200, active: 980 },
  { month: 'Fév', users: 1450, active: 1180 },
  { month: 'Mar', users: 1680, active: 1420 },
  { month: 'Avr', users: 1920, active: 1650 },
  { month: 'Mai', users: 2180, active: 1890 },
  { month: 'Juin', users: 2450, active: 2120 },
  { month: 'Juil', users: 2847, active: 2450 },
];

const salesByCategory = [
  { name: 'Formations', value: 45, revenue: 34500 },
  { name: 'Prompts', value: 28, revenue: 18200 },
  { name: 'Workflows', value: 18, revenue: 12800 },
  { name: 'Outils', value: 9, revenue: 6400 },
];

const conversionFunnel = [
  { stage: 'Visiteurs', count: 12500 },
  { stage: 'Inscrits', count: 3200 },
  { stage: 'Actifs', count: 2450 },
  { stage: 'Acheteurs', count: 890 },
];

const COLORS = ['#FFD11A', '#3B82F6', '#10B981', '#F59E0B'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Analytics</h1>
          <p className="text-neutral-600">Analyse détaillée de vos performances</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 px-4 rounded-lg bg-white border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
            <Download className="w-5 h-5" />
            Rapport PDF
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">MRR</p>
              <h3 className="text-2xl font-bold text-black">12,450€</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">+18.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">CAC</p>
              <h3 className="text-2xl font-bold text-black">24.50€</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">-8.5%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">LTV</p>
              <h3 className="text-2xl font-bold text-black">342€</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">+12.3%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Churn Rate</p>
              <h3 className="text-2xl font-bold text-black">3.2%</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">-2.1%</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black mb-1">Croissance Utilisateurs</h3>
            <p className="text-sm text-neutral-500">Évolution sur 7 mois</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="month" stroke="#A3A3A3" style={{ fontSize: '12px' }} />
              <YAxis stroke="#A3A3A3" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#FFD11A" 
                strokeWidth={3}
                name="Total Utilisateurs"
                dot={{ fill: '#FFD11A', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Utilisateurs Actifs"
                dot={{ fill: '#10B981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black mb-1">Ventes par Catégorie</h3>
            <p className="text-sm text-neutral-500">Distribution des revenus</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black mb-1">Tunnel de Conversion</h3>
            <p className="text-sm text-neutral-500">Du visiteur à l'acheteur</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis type="number" stroke="#A3A3A3" style={{ fontSize: '12px' }} />
              <YAxis dataKey="stage" type="category" stroke="#A3A3A3" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="count" fill="#FFD11A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Metrics */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-black mb-1">Métriques Clés</h3>
            <p className="text-sm text-neutral-500">Performance globale</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Taux de Conversion</p>
              <p className="text-2xl font-bold text-black">7.12%</p>
              <div className="mt-2 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '71.2%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Engagement Rate</p>
              <p className="text-2xl font-bold text-black">68.4%</p>
              <div className="mt-2 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '68.4%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Satisfaction Client</p>
              <p className="text-2xl font-bold text-black">4.8/5</p>
              <div className="mt-2 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
