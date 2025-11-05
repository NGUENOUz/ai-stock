"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // <-- IMPORTANT: Utilisation de Link de Next.js

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
  children?: React.ReactNode; // Rendu de contenu supplémentaire optionnel
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  // Nouvelle prop requise pour les liens de navigation
  items: { name: string; link: string }[];
  // Nouvelle prop requise pour les boutons d'action (login/logout/signup)
  mobileActions: React.ReactNode; 
}

// ---------------------------
// 1. NAVBAR (FIXE)
// ---------------------------
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // Changement: 'sticky top-10' -> 'fixed top-0 pt-10' pour la position fixe
      className={cn("fixed inset-x-0 top-0 z-40 w-full ", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

// ---------------------------
// 2. NAVBODY (DESKTOP - GLASSMORHPISM)
// ---------------------------
// navbar.tsx (composant NavBody)

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "70%" : "100%",
        // AVANT: y: visible ? 20 : 0, - ON LE GARDE POUR LA RETRACTION DU HEADER AU SCROLL
        y: visible ? 20 : 0, 
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
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm",
        // AJOUTER une marge supérieure conditionnelle si la navbar n'est PAS visible (pour la vue initiale)
        !visible && "mt-5", // Ajoute la marge de 10 unités seulement au départ (quand visible est false)
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
        // Correspondance partielle pour les chemins (ex: /blog actif pour /blog/article-1)
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
      animate={{
        // Glassmorphism (blur)
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        // Application du glassmorphism avec fond transparent et flou
        visible && "bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm !visible && mt-10",
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
  items, // <-- Récupération des liens passés par le HeaderComponent
  mobileActions, // <-- Récupération des boutons d'action passés
}: MobileNavMenuProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Ajout d'une petite translation pour l'animation
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
                onClick={onClose} // Ferme le menu après un clic
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
            {/* Boutons d'action conditionnels (Login/Logout) */}
            {mobileActions}
          </div>
          
          {children} {/* Reste du contenu optionnel */}
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
  // Utilise <Link> si 'href' est fourni pour la navigation Next.js
  const Component = href ? Link : Tag; 

  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-[#FFD007] text-black shadow-md hover:bg-opacity-90", // Remplacement du dégradé générique par une couleur vive
  };

  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...(props as any)} // Utiliser 'as any' pour gérer les props complexes de Link/a/button
    >
      {children}
    </Component>
  );
};