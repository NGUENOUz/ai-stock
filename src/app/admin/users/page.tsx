'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX, Mail, MoreVertical, Users as UsersIcon, UserPlus } from 'lucide-react';

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
    admin: 'badge-purple',
    contributor: 'badge-blue',
    user: 'badge-gray',
  };

  const roleLabels = {
    admin: 'Admin',
    contributor: 'Contributeur',
    user: 'Utilisateur',
  };

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">BUSINESS</p>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez votre communauté</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="stat-icon-purple mb-4">
            <UsersIcon className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Utilisateurs</p>
          <h3 className="text-3xl font-bold text-gray-900">2,847</h3>
        </div>
        <div className="stat-card">
          <div className="stat-icon-green mb-4">
            <UserCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Actifs</p>
          <h3 className="text-3xl font-bold text-gray-900">2,654</h3>
        </div>
        <div className="stat-card">
          <div className="stat-icon-blue mb-4">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Contributeurs</p>
          <h3 className="text-3xl font-bold text-gray-900">342</h3>
        </div>
        <div className="stat-card">
          <div className="stat-icon-yellow mb-4">
            <UserPlus className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Nouveaux (30j)</p>
          <h3 className="text-3xl font-bold text-gray-900">156</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-search"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none text-sm font-medium"
          >
            <option value="all">Tous les rôles</option>
            <option value="user">Utilisateurs</option>
            <option value="contributor">Contributeurs</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Inscription</th>
                <th>Achats</th>
                <th>Dépensé</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar-md bg-purple-600">
                          <span>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={roleColors[user.role]}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td>
                      <span className={user.status === 'active' ? 'badge-green' : 'badge-red'}>
                        {user.status === 'active' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="text-gray-600">
                      {new Date(user.joinedAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="text-gray-600">{user.purchases}</td>
                    <td className="font-semibold text-gray-900">{user.spent}€</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
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
