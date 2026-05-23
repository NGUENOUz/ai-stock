'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX, Mail, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'contributor' | 'admin';
  status: 'active' | 'inactive';
  joinedAt: string;
  purchases: number;
  spent: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setUsers([
        { id: '1', name: 'Marie Dubois', email: 'marie.d@email.com', role: 'contributor', status: 'active', joinedAt: '2024-01-15', purchases: 12, spent: 450 },
        { id: '2', name: 'Jean Martin', email: 'jean.m@email.com', role: 'user', status: 'active', joinedAt: '2024-02-20', purchases: 5, spent: 180 },
        { id: '3', name: 'Sophie Laurent', email: 'sophie.l@email.com', role: 'contributor', status: 'active', joinedAt: '2024-01-08', purchases: 8, spent: 320 },
        { id: '4', name: 'Thomas Petit', email: 'thomas.p@email.com', role: 'user', status: 'inactive', joinedAt: '2024-03-12', purchases: 2, spent: 80 },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleColors = {
    admin: 'bg-purple-50 text-purple-700',
    contributor: 'bg-blue-50 text-blue-700',
    user: 'bg-neutral-100 text-neutral-700',
  };

  const roleLabels = {
    admin: 'Admin',
    contributor: 'Contributeur',
    user: 'Utilisateur',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Utilisateurs</h1>
          <p className="text-neutral-600">Gérez votre communauté</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500 mb-1">Total Utilisateurs</p>
          <h3 className="text-3xl font-bold text-black">2,847</h3>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500 mb-1">Actifs</p>
          <h3 className="text-3xl font-bold text-green-600">2,654</h3>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500 mb-1">Contributeurs</p>
          <h3 className="text-3xl font-bold text-blue-600">342</h3>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <p className="text-sm text-neutral-500 mb-1">Nouveaux (30j)</p>
          <h3 className="text-3xl font-bold text-primary">156</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="search"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="h-10 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="all">Tous les rôles</option>
            <option value="user">Utilisateurs</option>
            <option value="contributor">Contributeurs</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Utilisateur</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Rôle</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Inscription</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Achats</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Dépensé</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-black">{user.name}</div>
                          <div className="text-xs text-neutral-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {user.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(user.joinedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{user.purchases}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">{user.spent}€</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
