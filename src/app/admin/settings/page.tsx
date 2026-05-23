'use client';

import { useState } from 'react';
import { Save, Upload, Globe, Mail, CreditCard, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Paiements', icon: CreditCard },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Paramètres sauvegardés !');
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-black mb-2">Paramètres</h1>
        <p className="text-neutral-600">Configurez votre plateforme AI-STOCK</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-neutral-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-black font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-black">Paramètres Généraux</h2>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Nom de la plateforme
                </label>
                <input
                  type="text"
                  defaultValue="AI-STOCK"
                  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Description
                </label>
                <textarea
                  defaultValue="La plus grande communauté d'outils IA"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-2xl font-black text-black">AI</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all">
                    <Upload className="w-4 h-4" />
                    Changer le logo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@ai-stock.com"
                    className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+33 1 23 45 67 89"
                    className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-black">Configuration Email</h2>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Service Email
                </label>
                <select className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>SendGrid</option>
                  <option>Mailgun</option>
                  <option>AWS SES</option>
                  <option>SMTP Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email expéditeur
                </label>
                <input
                  type="email"
                  defaultValue="noreply@ai-stock.com"
                  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-black">Paiements</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                  <div className="flex-1">
                    <p className="font-semibold text-black">Stripe</p>
                    <p className="text-sm text-neutral-500">Cartes bancaires, Apple Pay, Google Pay</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                  <div className="flex-1">
                    <p className="font-semibold text-black">PayPal</p>
                    <p className="text-sm text-neutral-500">Paiements PayPal</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Stripe API Key
                </label>
                <input
                  type="password"
                  placeholder="sk_live_••••••••••••••••"
                  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Commission plateforme (%)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  min="0"
                  max="100"
                  className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <p className="text-sm text-neutral-500 mt-2">Les contributeurs recevront 70% des ventes</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-black">Sécurité</h2>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Authentification à deux facteurs</p>
                    <p className="text-sm text-neutral-500">Sécurité renforcée pour les admins</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Logs d'audit</p>
                    <p className="text-sm text-neutral-500">Enregistrer toutes les actions admin</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Rate Limiting</p>
                    <p className="text-sm text-neutral-500">Limiter les requêtes API</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-black">Notifications</h2>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Nouvelles ventes</p>
                    <p className="text-sm text-neutral-500">Recevoir un email à chaque vente</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Nouveaux utilisateurs</p>
                    <p className="text-sm text-neutral-500">Notification pour chaque inscription</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>

                <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">Rapport hebdomadaire</p>
                    <p className="text-sm text-neutral-500">Résumé des performances chaque lundi</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary border-neutral-300 rounded focus:ring-primary" />
                </label>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Enregistrement...' : 'Sauvegarder les modifications'}
            </button>
            <button className="px-6 py-3 bg-neutral-100 text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
