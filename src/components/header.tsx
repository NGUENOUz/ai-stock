"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore"; 
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavToggle,
  MobileNavMenu,
} from "./navbar";

/**
 * Composant Header principal
 * Gère l'état du scroll pour modifier l'apparence de la navigation
 */
export default function HeaderComponent() {
  const { isLoggedIn, userName, handleLogout } = useAppStore();
  const router = useRouter();
  
  // États pour l'interactivité
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effet pour détecter le scroll et adapter la UI
  useEffect(() => {
    const handleScroll = () => {
      // On déclenche le changement dès 20px de scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Configuration des liens de navigation
  const navItems = [
    { name: "Outils IA", link: "/liste" },
    { name: "Prompts", link: "/prompt" },
    { name: "Formations", link: "/formations" },
    { name: "Workflows", link: "/workflows" },
  ];

  const onLogout = () => { 
    handleLogout(); 
    router.push("/"); 
    setIsMobileMenuOpen(false); 
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // --- Rendu des boutons d'authentification (Desktop) ---
  const AuthButtons = () => (
    <div className="flex items-center gap-3">
      {isLoggedIn ? (
        <>
          <NavbarButton href="/dashboard" variant="secondary" className="hidden sm:inline-block">
            {userName || "Dashboard"}
          </NavbarButton>
          <NavbarButton onClick={onLogout} variant="black">
            Déconnexion
          </NavbarButton>
        </>
      ) : (
        <>
          <NavbarButton href="/login" variant="secondary" className="hidden sm:inline-block">
            Connexion
          </NavbarButton>
          <NavbarButton href="/signup" variant="primary">
            S'inscrire
          </NavbarButton>
        </>
      )}
    </div>
  );

  return (
    <header className="relative w-full">
      <Navbar>
        {/* VERSION DESKTOP 
          Le passage de isScrolled permet de switcher entre le mode 'Pill' (centré)
          et le mode 'Full Width' (recouvrement total des bords).
        */}
        <NavBody isScrolled={isScrolled}>
          <NavbarLogo />
          
          <NavItems items={navItems} onItemClick={closeMobileMenu} />
          
          <AuthButtons />
        </NavBody>

        {/* VERSION MOBILE 
          Même logique : au scroll, elle perd ses marges latérales pour 
          recouvrir parfaitement le contenu qui défile derrière.
        */}
        <MobileNav isScrolled={isScrolled}>
          <NavbarLogo />
          
          <MobileNavToggle 
            isOpen={isMobileMenuOpen} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />

          <MobileNavMenu 
            isOpen={isMobileMenuOpen} 
            onClose={closeMobileMenu} 
            items={navItems}
            mobileActions={
              <div className="flex flex-col gap-3 w-full">
                {isLoggedIn ? (
                  <>
                    <NavbarButton href="/dashboard" onClick={closeMobileMenu} variant="black" className="w-full h-12">
                      Mon Dashboard
                    </NavbarButton>
                    <NavbarButton onClick={onLogout} variant="secondary" className="w-full h-12">
                      Déconnexion
                    </NavbarButton>
                  </>
                ) : (
                  <>
                    <NavbarButton href="/login" onClick={closeMobileMenu} variant="secondary" className="w-full h-12">
                      Connexion
                    </NavbarButton>
                    <NavbarButton href="/signup" onClick={closeMobileMenu} variant="primary" className="w-full h-12">
                      S'inscrire gratuitement
                    </NavbarButton>
                  </>
                )}
              </div>
            }
          />
        </MobileNav>
      </Navbar>
    </header>
  );
}