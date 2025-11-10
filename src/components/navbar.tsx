// src/components/navbar.tsx
"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  // ⚠️ SUPPRESSION: useScroll, useMotionValueEvent
} from "framer-motion";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; 

// --- Interfaces ---

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  // Nous maintenons 'visible' pour le clonage, mais il sera toujours 'true'
  visible?: boolean; 
}
// ... (Autres interfaces restent les mêmes)

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children?: React.ReactNode; 
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; link: string }[];
  mobileActions: React.ReactNode; 
}


// ---------------------------
// 1. NAVBAR (STABLE & STICKY)
// ---------------------------
export const Navbar = ({ children, className }: NavbarProps) => {
  // 🎯 CORRECTION : Suppression de toute logique de scroll. Le header est toujours "visible".
  const visible = true; 

  return (
    <motion.div
      // 🎯 CORRECTION : Position sticky au lieu de fixed/animated pour la stabilité
      // La classe sticky top-0 garantit qu'il reste en haut pendant le défilement.
      className={cn("sticky top-0 z-40 w-full", className)}
    >
      <div>
        {/* Clonage pour passer la prop 'visible' (qui est toujours true maintenant) */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}
      </div>
    </motion.div>
  );
};

// ---------------------------
// 2. NAVBODY (DESKTOP - GLASSMORHPISM)
// ---------------------------
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      // 🎯 CORRECTION : Animate fixe (pas de changement de valeur) pour garder Glassmorphism
      animate={{
        backdropFilter: "blur(10px)", 
        boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: "95%", 
        y: 0, // 🎯 SUPPRESSION de l'animation de mouvement
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      style={{
        minWidth: "1200px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        // 🎯 Application des styles de fond permanent
        "bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm",
        "mt-5", // Marge supérieure pour centrer visuellement
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

// ---------------------------
// 3. NAVITEMS (LIENS DESKTOP)
// ---------------------------
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isCurrentPage = item.link === pathname || (item.link !== '/' && pathname.startsWith(item.link));

        return (
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-1 text-neutral-600 dark:text-neutral-300",
              isCurrentPage && "font-bold text-black dark:text-white"
            )}
            key={`link-${idx}`}
            href={item.link}
          >
            {/* Le background de focus pour le hover */}
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            {/* Le background de focus pour la page active */}
            {isCurrentPage && (
              <motion.div
                layoutId="active-nav-item"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-200 dark:bg-gray-700"
                initial={false}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

// ---------------------------
// 4. MOBILENAV (CONTENEUR MOBILE - GLASSMORHPISM)
// ---------------------------
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      // 🎯 CORRECTION : Animate fixe pour garder Glassmorphism
      animate={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: "95%",
        paddingRight: "12px",
        paddingLeft: "12px",
        borderRadius: "4px",
        y: 0, // 🎯 SUPPRESSION de l'animation de mouvement
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden",
        // 🎯 Application des styles de fond permanent
        "bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm mt-5", 
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

// ---------------------------
// 5. MOBILENAVMENU (MENU OUVERT)
// ---------------------------
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  items, 
  mobileActions, 
}: MobileNavMenuProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-xl dark:bg-neutral-950",
            className,
          )}
        >
          {/* Liens de navigation */}
          {items.map((item, idx) => {
            const isCurrentPage = item.link === pathname || (item.link !== '/' && pathname.startsWith(item.link));

            return (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={onClose} 
                className={cn(
                  "relative text-neutral-600 dark:text-neutral-300 w-full px-4 py-2 rounded-lg transition duration-150",
                  isCurrentPage ? "font-bold text-black dark:text-white bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                )}
              >
                <span className="block">{item.name}</span>
              </Link>
            );
          })}

          <div className="flex w-full flex-col gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
            {mobileActions}
          </div>
          
          {children} 
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">AI-Stock</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const Component = href ? Link : Tag; 

  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-[#FFD007] text-black shadow-md hover:bg-opacity-90",
  };

  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...(props as any)} 
    >
      {children}
    </Component>
  );
};