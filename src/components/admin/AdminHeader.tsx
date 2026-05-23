'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-neutral-200 fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-neutral-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-black">Admin</p>
            <p className="text-xs text-neutral-500">Administrateur</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-black font-bold text-sm">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
