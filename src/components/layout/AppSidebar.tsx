"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  LayoutGrid, 
  Wand2, 
  BookOpen, 
  Newspaper, 
  Users, 
  Trophy, 
  Bell, 
  Plus,
  Menu,
  X
} from "lucide-react";
import { useTheme } from "next-themes";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";

export default function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mainNav = [
    { name: "Feed", href: "/", icon: Home },
    { name: "Outils IA", href: "/liste", icon: LayoutGrid },
    { name: "Prompts", href: "/prompt", icon: Wand2 },
    { name: "Ressources", href: "/ressources", icon: BookOpen },
  ];

  const communityNav = [
    { name: "Créateurs", href: "/createurs", icon: Users },
    { name: "Tournois", href: "/tournois", icon: Trophy, badge: "NEW" },
    { name: "Blog", href: "/blog", icon: Newspaper },
  ];

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
    
    return (
      <Link 
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all group",
          isActive 
            ? "bg-slate-100 dark:bg-[#1E293B] text-primary" 
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#151e32] hover:text-slate-900 dark:hover:text-white"
        )}
      >
        <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
        <span>{item.name}</span>
        {item.badge && (
          <span className="ml-auto text-[9px] bg-gradient-ai text-white px-1.5 py-0.5 rounded font-black tracking-widest">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-[var(--banner-height,0px)] left-0 right-0 h-16 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 font-black text-xl tracking-tight text-slate-900 dark:text-white">
          AI<span className="text-primary">STOCK</span>
          <IconCircleCheckFilled className="w-5 h-5 text-primary" />
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="relative text-slate-600 dark:text-slate-400">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 border-2 border-white dark:border-[#0B1120] rounded-full"></span>
          </button>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 -mr-2 text-slate-600 dark:text-slate-400">
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
        "top-[var(--banner-height,0px)]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Logo (Desktop) */}
        <div className="hidden lg:flex h-20 items-center px-6 border-b border-slate-100 dark:border-slate-800/50 shrink-0">
          <Link href="/" className="flex items-center gap-1.5 font-black text-2xl tracking-tight text-slate-900 dark:text-white">
            AI<span className="text-primary">STOCK</span>
            <IconCircleCheckFilled className="w-6 h-6 text-primary" />
          </Link>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 no-scrollbar">
          
          <div className="lg:hidden flex items-center justify-between mb-8 px-2">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full">
               <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-black text-slate-400 uppercase tracking-widest">Plateforme</div>
            <nav className="space-y-1">
              {mainNav.map((item, i) => <NavItem key={i} item={item} />)}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2 text-xs font-black text-slate-400 uppercase tracking-widest">Communauté</div>
            <nav className="space-y-1">
              {communityNav.map((item, i) => <NavItem key={i} item={item} />)}
            </nav>
          </div>

        </div>

        {/* Bottom Actions (User / Theme / Publish) */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0F172A] shrink-0">
          
          <button className="w-full mb-4 flex items-center justify-center gap-2 bg-gradient-ai text-white rounded-xl py-3 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
            <Plus className="w-5 h-5" />
            <span>Publier</span>
          </button>

          <div className="flex items-center justify-between px-2">
            <Link href="/createurs/me" className="flex items-center gap-3 hover:bg-slate-200/50 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors cursor-pointer -ml-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative border border-slate-300 dark:border-slate-700">
                <Image src="https://i.pravatar.cc/150?u=current_user" alt="User" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">Alex Dev</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">Pro</span>
              </div>
            </Link>
            
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
              title="Changer de thème"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>

        </div>

      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
