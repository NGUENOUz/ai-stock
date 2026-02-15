// src/components/navbar.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";

// --- Interfaces ---

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

// ---------------------------
// 1. NAVBAR (STABLE & STICKY)
// ---------------------------
export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav className={cn("fixed top-0 z-50 w-full pt-4", className)}>
      {children}
    </nav>
  );
};

// ---------------------------
// 2. NAVBODY (DESKTOP - CLEAN PREMIUM)
// ---------------------------
export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between rounded-full border border-neutral-100 bg-white/80 px-6 py-2.5 backdrop-blur-md shadow-premium lg:flex",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// ---------------------------
// 3. NAVITEMS (STYLE FRAMER AVEC ACCENT JAUNE)
// ---------------------------
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn("flex flex-1 items-center justify-center space-x-1", className)}
    >
      {items.map((item, idx) => {
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
            {/* Background au Hover (Gris très léger) */}
            {hovered === idx && (
              <motion.div
                layoutId="hover-bg"
                className="absolute inset-0 z-0 rounded-full bg-neutral-100/80"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Indicateur Page Active (Petit point Jaune ou ligne discrète) */}
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

// ---------------------------
// 4. MOBILENAV (MODERNE)
// ---------------------------
export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "mx-4 flex items-center justify-between rounded-2xl border border-neutral-100 bg-white/90 p-3 backdrop-blur-md shadow-premium lg:hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  isOpen,
  onClose,
  items,
  mobileActions,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; link: string }[];
  mobileActions: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-x-0 top-20 mx-4 z-50 flex flex-col gap-4 rounded-3xl border border-neutral-100 bg-white p-6 shadow-2xl"
        >
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              onClick={onClose}
              className="text-lg font-bold text-neutral-800 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-neutral-50 pt-4">
            {mobileActions}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------
// 5. COMPONENTS ATOMIQUES (LOGO & BOUTONS)
// ---------------------------

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-2 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-[0_4px_14px_0_rgba(255,208,7,0.39)] transition-transform group-hover:rotate-6">
        <Zap className="h-5 w-5 fill-black text-black" />
      </div>
      <span className="text-xl font-black tracking-tighter text-black">
        AI-STOCK
      </span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  onClick,
  children,
  className,
  variant = "primary",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "black";
}) => {
  const baseStyles = "px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-yellow-400 shadow-sm",
    secondary: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
    black: "bg-black text-white hover:bg-neutral-800 shadow-md",
  };

  const content = (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </button>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="p-2 text-black">
    {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
  </button>
);