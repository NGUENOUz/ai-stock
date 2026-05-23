'use client';

import { useState, useEffect } from 'react';
import { Search, Star, DollarSign, TrendingUp, Award } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSales: number;
  revenue: number;
  commission: number;
  rating: number;
  items: number;
  joinedAt: string;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setContributors([
        { id: '1', name: 'Marie Dubois', email: 'marie.d@email.com', avatar: 'MD', totalSales: 156, revenue: 12400, commission: 8680, rating: 4.9, items: 12, joinedAt: '2024-01-15' },
        { id: '2', name: 'Jean Martin', email: 'jean.m@email.com', avatar: 'JM', totalSales: 142, revenue: 11200, commission: 7840, rating: 4.8, items: 9, joinedAt: '2024-01-20' },
        { id: '3', name: 'Sophie Laurent', email: 'sophie.l@email.com', avatar: 'SL', totalSales: 128, revenue: 9800, commission: 6860, rating: 4.7, items: 15, joinedAt: '2024-02-01' },
        { id: '4', name: 'Thomas Petit', email: 'thomas.p@email.com', avatar: 'TP', totalSales: 98, revenue: 7600, commission: 5320, rating: 4.6, items: 8, joinedAt: '2024-02-10' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredContributors = contributors.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = contributors.reduce((sum, c) => sum + c.revenue, 0);
  const totalCommission = contributors.reduce((sum, c) => sum + c.commission, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-black mb-2">Contributeurs</h1>
        <p className="text-neutral-600">Gérez vos créateurs de contenu</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Contributeurs</p>
              <h3 className="text-2xl font-bold text-black">{contributors.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Revenus Générés</p>
              <h3 className="text-2xl font-bold text-black">{totalRevenue.toLocaleString()}€</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Commissions Payées</p>
              <h3 className="text-2xl font-bold text-black">{totalCommission.toLocaleString()}€</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Note Moyenne</p>
              <h3 className="text-2xl font-bold text-black">4.75</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Rechercher un contributeur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-black">🏆 Classement des Contributeurs</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {loading ? (
            <div className="p-12 text-center text-neutral-500">Chargement...</div>
          ) : filteredContributors.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">Aucun contributeur trouvé</div>
          ) : (
            filteredContributors.map((contributor, index) => (
              <div key={contributor.id} className="p-6 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-neutral-200 text-neutral-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{contributor.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black">{contributor.name}</h3>
                      <p className="text-sm text-neutral-500">{contributor.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-black">{contributor.rating}</span>
                        <span className="text-sm text-neutral-400">• {contributor.items} contenus</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Ventes</p>
                      <p className="text-xl font-bold text-black">{contributor.totalSales}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Revenus</p>
                      <p className="text-xl font-bold text-green-600">{contributor.revenue.toLocaleString()}€</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Commission</p>
                      <p className="text-xl font-bold text-primary">{contributor.commission.toLocaleString()}€</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
