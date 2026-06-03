'use client';

import { useState, useEffect } from 'react';
import { Search, Download, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

interface Payment {
  id: string;
  user: string;
  item: string;
  amount: number;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  method: string;
  date: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setPayments([
        { id: 'PAY-001', user: 'Marie Dubois', item: 'Formation ChatGPT Pro', amount: 99.99, status: 'success', method: 'Stripe', date: '2024-03-15T10:30:00' },
        { id: 'PAY-002', user: 'Jean Martin', item: 'Pack Prompts Marketing', amount: 49.99, status: 'success', method: 'PayPal', date: '2024-03-15T09:15:00' },
        { id: 'PAY-003', user: 'Sophie Laurent', item: 'Workflow Midjourney', amount: 29.99, status: 'pending', method: 'Stripe', date: '2024-03-15T08:45:00' },
        { id: 'PAY-004', user: 'Thomas Petit', item: 'Formation IA Marketing', amount: 79.99, status: 'failed', method: 'Stripe', date: '2024-03-14T16:20:00' },
        { id: 'PAY-005', user: 'Claire Bernard', item: 'Outils IA Premium', amount: 149.99, status: 'refunded', method: 'PayPal', date: '2024-03-14T14:10:00' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    success: { icon: CheckCircle, color: 'bg-green-50 text-green-700', label: 'Réussi' },
    pending: { icon: Clock, color: 'bg-amber-50 text-amber-700', label: 'En attente' },
    failed: { icon: XCircle, color: 'bg-red-50 text-red-700', label: 'Échoué' },
    refunded: { icon: DollarSign, color: 'bg-purple-50 text-purple-700', label: 'Remboursé' },
  };

  const totalRevenue = payments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Paiements</h1>
          <p className="text-neutral-600">Suivez toutes vos transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
          <Download className="w-5 h-5" />
          Exporter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Revenus Total</p>
              <h3 className="text-2xl font-bold text-black">{totalRevenue.toFixed(2)}€</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">En Attente</p>
              <h3 className="text-2xl font-bold text-black">{pendingAmount.toFixed(2)}€</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Transactions</p>
              <h3 className="text-2xl font-bold text-black">{payments.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Échecs</p>
              <h3 className="text-2xl font-bold text-black">
                {payments.filter(p => p.status === 'failed').length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="search"
              placeholder="Rechercher une transaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="success">Réussi</option>
            <option value="pending">En attente</option>
            <option value="failed">Échoué</option>
            <option value="refunded">Remboursé</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">ID Transaction</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Utilisateur</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Article</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Montant</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Méthode</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Aucune transaction trouvée
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => {
                  const StatusIcon = statusConfig[payment.status].icon;
                  return (
                    <tr key={payment.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-neutral-600">{payment.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-black">{payment.user}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{payment.item}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-black">{payment.amount.toFixed(2)}€</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-neutral-600">{payment.method}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[payment.status].color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig[payment.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {new Date(payment.date).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
