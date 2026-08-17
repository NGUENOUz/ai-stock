"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Sidebar({ links, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] flex flex-col transition-transform">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">
            A
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
            AI-STOCK
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span className={cn("w-5 h-5 flex items-center justify-center", isActive ? "text-primary dark:text-blue-400" : "text-slate-400")}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <Image 
            src={user.avatar} 
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{user.role}</p>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
