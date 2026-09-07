// src/components/navbar.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Zap, Cpu, Wand2, BookOpen, Newspaper, Users,
  ArrowRight, LayoutDashboard, LogOut, ChevronRight, Trophy, Rss
} from "lucide-react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
}

// ─── NAV LINKS grouped by section ─────────────────────────────────────────────
export const NAV_SECTIONS = [
  {
    label: "Explorer",
    items: [
      { name: "Outils IA",    link: "/liste",       icon: Cpu,         description: "Annuaire des meilleurs outils IA" },
      { name: "Prompts",      link: "/prompt",      icon: Wand2,       description: "Biblioth\u00e8que de prompts experts" },
      { name: "Ressources",   link: "/ressources",  icon: BookOpen,    description: "Formations, guides et templates" },
      { name: "Cr\u00e9ateurs",    link: "/createurs",   icon: Users,       description: "Classement des meilleurs cr\u00e9ateurs" },
    ],
  },
  {
    label: "Communaut\u00e9",
    items: [
      { name: "Blog",         link: "/blog",        icon: Newspaper,   description: "Articles et actualit\u00e9s IA" },
      { name: "Feed",         link: "/feed",        icon: Rss,         description: "Publications de la communaut\u00e9 IA" },
    ],
  },
];

// ─── Flat list for desktop NavItems (unchanged API) ───────────────────────────
export const FLAT_NAV_ITEMS = NAV_SECTIONS.flatMap((s) =>
  s.items.map(({ name, link }) => ({ name, link }))
);

// ─── 1. NAVBAR ────────────────────────────────────────────────────────────────
export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav className={cn("fixed top-0 z-50 w-full transition-all duration-300", className)}>
      {children}
    </nav>
  );
};

// ─── 2. NAVBODY (Desktop only) ────────────────────────────────────────────────
export const NavBody = ({ children, className, isScrolled }: NavBodyProps) => {
  return (
    <div className="relative w-full flex justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "relative z-[60] hidden lg:flex flex-row items-center justify-between transition-all duration-500 ease-in-out",
          "w-full px-6 py-4 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800",
          isScrolled && "mt-4 max-w-5xl rounded-full border border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-[#0F172A]/70 px-8 py-3 backdrop-blur-xl shadow-2xl border-b-0",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── 3. NAVITEMS (Desktop) ────────────────────────────────────────────────────
export const NavItems = ({ items, className, onItemClick }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn("flex flex-1 items-center justify-center space-x-1", className)}
    >
      {items.map((item: any, idx: number) => {
        const isCurrentPage = item.link === pathname || (item.link !== "/" && pathname.startsWith(item.link));
        return (
          <Link
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
              isCurrentPage ? "text-black dark:text-white" : "text-neutral-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 z-0 rounded-full bg-neutral-100/80 dark:bg-slate-800/80"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {isCurrentPage && (
              <motion.div
                layoutId="active-nav"
                className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

// ─── 4. MOBILENAV wrapper ─────────────────────────────────────────────────────
export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string; isScrolled?: boolean }) => {
  return (
    // Always full-width solid bar on mobile — no pill/margin to avoid content bleed through
    <div
      className={cn(
        "flex items-center justify-between lg:hidden",
        "w-full px-4 py-3 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

// ─── 5. MOBILE MENU (full-screen drawer) ──────────────────────────────────────
export const MobileNavMenu = ({
  isOpen,
  onClose,
  isLoggedIn,
  userName,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[60] w-[88vw] max-w-sm bg-white dark:bg-[#0B1120] shadow-2xl flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/30">
                  <Zap className="h-5 w-5 fill-white text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">AI-STOCK</span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* User card (si connecté) */}
            {isLoggedIn && (
              <div className="mx-4 mt-5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/30">
                  {userName ? userName[0].toUpperCase() : "U"}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{userName || "Mon compte"}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Membre actif</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="ml-auto flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Dashboard <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Nav sections */}
            <div className="flex-1 px-4 py-4 space-y-6">
              {NAV_SECTIONS.map((section) => (
                <div key={section.label}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-2">
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
                      return (
                        <Link
                          key={item.link}
                          href={item.link}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                            isActive
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            isActive
                              ? "bg-white/20"
                              : "bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
                          )}>
                            <item.icon className={cn(
                              "w-4 h-4",
                              isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            )} />
                          </div>
                          <div className="min-w-0">
                            <p className={cn("font-bold text-sm", isActive ? "text-white" : "")}>{item.name}</p>
                            <p className={cn(
                              "text-[11px] truncate",
                              isActive ? "text-white/70" : "text-slate-400 dark:text-slate-500"
                            )}>{item.description}</p>
                          </div>
                          <ChevronRight className={cn(
                            "w-4 h-4 ml-auto shrink-0 transition-transform group-hover:translate-x-0.5",
                            isActive ? "text-white/70" : "text-slate-300 dark:text-slate-600"
                          )} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* CTA Créateur */}
              <div className="mx-0 p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 border border-blue-200/50 dark:border-blue-800/40">
                <p className="text-xs font-black text-slate-900 dark:text-white mb-1">🚀 Devenez Créateur</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Publiez vos ressources et générez des revenus.</p>
                <Link
                  href="/contributor"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/25"
                >
                  Commencer <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-4 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Mon Dashboard
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                  <button
                    onClick={() => { onLogout?.(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all"
                  >
                    S'inscrire gratuitement <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Se connecter
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── 6. ATOMES ────────────────────────────────────────────────────────────────
export const NavbarLogo = () => (
  <Link href="/" className="flex items-center gap-2.5 px-2 group">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/30 transition-transform group-hover:rotate-6">
      <Zap className="h-5 w-5 fill-white text-white" />
    </div>
    <span className="text-xl font-black tracking-tighter text-black dark:text-white">AI-STOCK</span>
  </Link>
);

export const NavbarButton = ({ href, onClick, children, className, variant = "primary" }: any) => {
  const baseStyles = "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95 whitespace-nowrap";
  const variants = {
    // ✅ Bleu royal — plus de purple
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20",
    secondary: "bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-700",
    black: "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-slate-200",
  };
  const content = (
    <button onClick={onClick} className={cn(baseStyles, variants[variant as keyof typeof variants], className)}>
      {children}
    </button>
  );
  return href ? <Link href={href}>{content}</Link> : content;
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="p-2 text-black dark:text-white transition-transform active:scale-90">
    {isOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
  </button>
);