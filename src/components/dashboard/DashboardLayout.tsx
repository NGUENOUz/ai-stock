import React from "react";
import Sidebar, { SidebarLink } from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  links: SidebarLink[];
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  showAddButton?: boolean;
}

export default function DashboardLayout({ children, links, user, showAddButton = false }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-white flex">
      {/* Sidebar fixe à gauche */}
      <Sidebar links={links} user={user} />
      
      {/* Contenu Principal (décalé à droite pour ne pas être caché par la sidebar) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar showAddButton={showAddButton} />
        
        {/* Grille technique de fond (optionnelle, pour le style tech) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden ml-64">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <main className="relative z-10 flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
