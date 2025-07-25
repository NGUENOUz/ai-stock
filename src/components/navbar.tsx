"use client"; // Cette directive est cruciale et déjà présente, c'est bien.
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion, // <--- Change l'importation ici
  AnimatePresence, // <--- Change l'importation ici
  useScroll,
  useMotionValueEvent,
} from "framer-motion"; // <--- IMPORTE DEPUIS 'framer-motion'

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation"; // Importe usePathname pour obtenir le chemin actuel

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
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

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
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
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

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "70%" : "100%",
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
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname(); // <-- Récupère le chemin de l'URL actuelle

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        // Détermine si l'élément actuel est la page active
        const isActive = item.link === pathname;
        // Gère les cas spéciaux pour la page d'accueil si nécessaire
        // Exemple: si item.link est '/' et pathname est '/liste', tu pourrais vouloir que 'Accueil' ne soit pas actif
        // ou si '/liste' est actif, mais pathname est '/liste/category-slug', tu pourrais vouloir que '/liste' reste actif.
        // Pour une correspondance exacte, 'item.link === pathname' est suffisant.
        // Si tu veux une correspondance partielle (ex: /liste doit être actif pour /liste/category-slug),
        // tu peux utiliser `pathname.startsWith(item.link)` pour des chemins racines.
        // Pour cet exemple, on va utiliser une correspondance exacte ou une correspondance de base pour '/'.
        const isHomePage = item.link === '/';
        const isCurrentPage = isActive || (isHomePage && pathname === '/');

        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-1 text-neutral-600 dark:text-neutral-300",
              // Applique le style de focus si c'est la page active
              isCurrentPage && "font-bold text-black dark:text-white" // Rendre le texte plus visible
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
                    layoutId="active-nav-item" // Un layoutId différent pour éviter les conflits avec le hover
                    className="absolute inset-0 h-full w-full rounded-full bg-gray-200 dark:bg-gray-700" // Couleur de fond pour l'élément actif
                    initial={false} // Empêche l'animation initiale si tu veux qu'il soit directement là
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
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
        visible && "bg-white/80 dark:bg-neutral-950/80",
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

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const pathname = usePathname(); // <-- Récupère le chemin actuel pour le mobile

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0_04),_0_0_4px_rgba(34,_42,_53,_0_08),_0_16px_68px_rgba(47,_48,_55,_0_05),_0_1px_0_rgba(255,_255,_255,_0_1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {/* {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === 'a') { // Assumons que les items sont des <a>
              const isCurrentPage = (child.props.href === pathname) || (child.props.href === '/' && pathname === '/');
              return React.cloneElement(child, {
                className: cn(
                  child.props.className,
                  isCurrentPage ? "bg-orange-200 dark:bg-orange-700 rounded-lg" : "", // Applique le bg gris pour le mobile
                  "w-full px-4 py-2" // Pour que le fond remplisse bien l'item
                )
              });
            }
            return child;
          })} */}
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
  const pathname = usePathname(); // Pour s'assurer que le logo est toujours cliquable vers la page d'accueil

  return (
    <a
      href="/" // Change le lien en '/' pour la page d'accueil
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png" // Utilise ton propre logo si tu en as un
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">AI-Stock</span>
    </a>
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
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0_04),_0_0_4px_rgba(34,_42,_53,_0_08),_0_16px_68px_rgba(47,_48,_55,_0_05),_0_1px_0_rgba(255,_255,_255,_0_1)_inset]",
    gradient:
      "bg-gradient-to-b from-yellow-500 to-orange-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};