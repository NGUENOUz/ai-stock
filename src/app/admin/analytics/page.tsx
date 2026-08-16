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
import { TrendingUp, Users, DollarSign, ShoppingCart, Download, ArrowUpRight } from 'lucide-react';

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

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">ANALYTICS</p>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Analytics</h1>
          <p className="text-gray-600 mt-1">Analyse détaillée de vos performances</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none text-sm font-medium transition-all"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Rapport PDF
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon-green">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="badge-green">
              <ArrowUpRight className="w-3 h-3" />
              18.2%
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">MRR</p>
            <h3 className="text-3xl font-bold text-gray-900">12,450€</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon-blue">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="badge-green">
              <TrendingUp className="w-3 h-3" />
              8.5%
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">CAC</p>
            <h3 className="text-3xl font-bold text-gray-900">24.50€</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon-purple">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <span className="badge-green">
              <ArrowUpRight className="w-3 h-3" />
              12.3%
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">LTV</p>
            <h3 className="text-3xl font-bold text-gray-900">342€</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon-yellow">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <span className="badge-green">
              <TrendingUp className="w-3 h-3" />
              2.1%
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Churn Rate</p>
            <h3 className="text-3xl font-bold text-gray-900">3.2%</h3>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Croissance Utilisateurs</h3>
            <p className="text-sm text-gray-500">Évolution sur 7 mois</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#9CA3AF" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: '600' }} />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                name="Total Utilisateurs"
                dot={{ fill: '#8B5CF6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Utilisateurs Actifs"
                dot={{ fill: '#10B981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Ventes par Catégorie</h3>
            <p className="text-sm text-gray-500">Distribution des revenus</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '12px', fontWeight: '600' }}
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Tunnel de Conversion</h3>
            <p className="text-sm text-gray-500">Du visiteur à l'acheteur</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis 
                type="number" 
                stroke="#9CA3AF" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                dataKey="stage" 
                type="category" 
                stroke="#9CA3AF" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Metrics */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Métriques Clés</h3>
            <p className="text-sm text-gray-500">Performance globale</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Taux de Conversion</p>
              <p className="text-2xl font-bold text-gray-900">7.12%</p>
              <div className="mt-3 h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: '71.2%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Engagement Rate</p>
              <p className="text-2xl font-bold text-gray-900">68.4%</p>
              <div className="mt-3 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '68.4%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium mb-1">Satisfaction Client</p>
              <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              <div className="mt-3 h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
