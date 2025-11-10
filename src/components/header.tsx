// src/components/header.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// ⚠️ Assurez-vous que le chemin vers votre store Zustand est correct
import { useAppStore } from "@/store/useAppStore"; 

import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./navbar"; // ⚠️ Assurez-vous que le chemin est correct

export default function HeaderComponent() {
  // 1. Récupération de l'état d'authentification et des actions depuis Zustand
  // ⚠️ NOTE: Si vous avez une erreur sur 'user' ou 'simulateLogout', vérifiez l'interface de useAppStore
  const { isLoggedIn, userName, handleLogout } = useAppStore();
  const router = useRouter();

  const navItems = [
    { name: "Liste des AI", link: "/liste" },
    { name: "Prompts Populaires", link: "/prompt" },
    { name: "Formations", link: "/formations" },
    // { name: "Blog", link: "/blog" },
    // { name: "Events", link: "/events" },
    // { name: "Contact", link: "/contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGlobalLogout = () => { 
    handleLogout(); 
    router.push("/"); 
    setIsMobileMenuOpen(false); 
  }

  const handleNavClick = () => {
    // Ferme le menu mobile après un clic
    setIsMobileMenuOpen(false);
  };

  // --- Contenu conditionnel pour l'authentification (Desktop) ---

  const unauthenticatedButtons = (
    <>
      <NavbarButton href="/login" variant="secondary" className="hidden sm:inline-block">
        Connexion
      </NavbarButton>
      <NavbarButton href="/signup" variant="primary">
        S'inscrire
      </NavbarButton>
    </>
  );

  const authenticatedButtons = (
    <>
      <NavbarButton href="/dashboard" variant="secondary" className="hidden sm:inline-block">
        {userName || "Mon Compte"} 
      </NavbarButton>
      {/* Utilisation de handleGlobalLogout pour gérer la redirection après déconnexion */}
      <NavbarButton as="button" onClick={handleGlobalLogout} variant="primary">
        Déconnexion
      </NavbarButton>
    </>
  );

  // --- Contenu conditionnel pour l'authentification (Mobile) ---

  const mobileActionButtons = isLoggedIn ? (
    <>
      <NavbarButton href="/dashboard" onClick={handleNavClick} variant="primary" className="w-full">
        Dashboard
      </NavbarButton>
      <NavbarButton as="button" onClick={handleGlobalLogout} variant="secondary" className="w-full">
        Déconnexion
      </NavbarButton>
    </>
  ) : (
    <>
      <NavbarButton href="/login" onClick={handleNavClick} variant="primary" className="w-full">
        Connexion
      </NavbarButton>
      <NavbarButton href="/signup" onClick={handleNavClick} variant="secondary" className="w-full">
        S'inscrire
      </NavbarButton>
    </>
  );


  return (
    // 🎯 HEADER CONTENEUR : Maintient le header visible.
    <header className="relative w-full fixed" >
      <Navbar className="header  fixed">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          
          <NavItems items={navItems} onItemClick={handleNavClick} />
          
          <div className="flex items-center gap-4">
            {/* 🎯 AFFICHAGE DES BOUTONS */}
            {isLoggedIn ? authenticatedButtons : unauthenticatedButtons}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            items={navItems} 
            mobileActions={mobileActionButtons} 
          >
            {/* <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="dark"
              href="/book-a-call"
              className="w-full mt-4" 
            >
              Book a call
            </NavbarButton> */}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}