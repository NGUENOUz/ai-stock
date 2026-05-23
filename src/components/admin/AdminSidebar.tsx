'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  GraduationCap, 
  MessageSquare, 
  Wrench, 
  Users, 
  BarChart3, 
  CreditCard,
  Settings,
  LogOut,
  Workflow,
  FileText
} from 'lucide-react';

const menuItems = [
  {
    title: 'Principal',
    items: [
      { icon: LayoutDashboard, label: 'Tableau de Bord', href: '/admin/dashboard' },
      { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
      { icon: FileText, label: 'Rapports', href: '/admin/reports' },
    ]
  },
  {
    title: 'Gestion Contenu',
    items: [
      { icon: GraduationCap, label: 'Formations', href: '/admin/trainings' },
      { icon: MessageSquare, label: 'Prompts', href: '/admin/prompts' },
      { icon: Wrench, label: 'Outils', href: '/admin/tools' },
      { icon: Workflow, label: 'Workflows', href: '/admin/workflows' },
    ]
  },
  {
    title: 'Business',
    items: [
      { icon: Users, label: 'Utilisateurs', href: '/admin/users' },
      { icon: CreditCard, label: 'Paiements', href: '/admin/payments' },
      { icon: BarChart3, label: 'Contributeurs', href: '/admin/contributors' },
    ]
  },
  {
    title: 'Système',
    items: [
      { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-200 flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-lg">AI</span>
          </div>
          <span className="font-black text-xl">AI-STOCK</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-3 mb-2 text-xs font-bold uppercase tracking-wide text-neutral-400">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isActive 
                          ? 'bg-primary text-black shadow-sm' 
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-neutral-200">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
