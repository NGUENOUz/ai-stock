// src/components/navbar.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
}

// 1. NAVBAR (Le conteneur fixe)
export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav className={cn("fixed top-0 z-50 w-full transition-all duration-300", className)}>
      {children}
    </nav>
  );
};

// 2. NAVBODY (Desktop - Transition Pilule -> Barre Pleine)
export const NavBody = ({ children, className, isScrolled }: NavBodyProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between transition-all duration-300 ease-in-out lg:flex",
        // État initial : Pilule centrée
        "mt-4 max-w-7xl rounded-full border border-neutral-100 bg-white/80 px-6 py-2.5 backdrop-blur-md shadow-premium",
        // État au Scroll : Barre pleine largeur sans arrondis sur les côtés
        isScrolled && "mt-0 max-w-full rounded-none border-none border-b border-neutral-200 bg-white/95 py-4 px-10 shadow-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// 3. NAVITEMS
export const NavItems = ({ items, className, onItemClick }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn("flex flex-1 items-center justify-center space-x-1", className)}
    >
      {items.map((item: any, idx: number) => {
        const isCurrentPage = item.link === pathname || (item.link !== '/' && pathname.startsWith(item.link));

        return (
          <Link
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
              isCurrentPage ? "text-black" : "text-neutral-500 hover:text-black"
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 z-0 rounded-full bg-neutral-100/80"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {isCurrentPage && (
              <motion.div
                layoutId="active-nav"
                className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
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

// 4. MOBILENAV (S'adapte aussi au scroll)
export const MobileNav = ({ children, className, isScrolled }: { children: React.ReactNode; className?: string; isScrolled?: boolean }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between transition-all duration-300 lg:hidden",
        // État initial
        "mx-4 mt-4 rounded-2xl border border-neutral-100 bg-white/90 p-3 backdrop-blur-md shadow-premium",
        // État scroll
        isScrolled && "mx-0 mt-0 rounded-none border-none border-b bg-white py-4 px-6 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ isOpen, onClose, items, mobileActions }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute inset-x-0 top-full z-50 flex flex-col gap-4 border-t border-neutral-100 bg-white p-8 shadow-2xl lg:hidden"
        >
          {items.map((item: any, idx: number) => (
            <Link key={idx} href={item.link} onClick={onClose} className="text-xl font-bold text-neutral-800">
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-neutral-50 pt-6">
            {mobileActions}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 5. ATOMES
export const NavbarLogo = () => (
  <Link href="/" className="flex items-center gap-2.5 px-2 group">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:rotate-6">
      <Zap className="h-5 w-5 fill-black text-black" />
    </div>
    <span className="text-xl font-black tracking-tighter text-black">AI-STOCK</span>
  </Link>
);

export const NavbarButton = ({ href, onClick, children, className, variant = "primary" }: any) => {
  const baseStyles = "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 active:scale-95 whitespace-nowrap";
  const variants = {
    primary: "bg-primary text-black hover:bg-yellow-400",
    secondary: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
    black: "bg-black text-white hover:bg-neutral-800",
  };
  const content = <button onClick={onClick} className={cn(baseStyles, variants[variant as keyof typeof variants], className)}>{children}</button>;
  return href ? <Link href={href}>{content}</Link> : content;
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="p-2 text-black transition-transform active:scale-90">
    {isOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
  </button>
);