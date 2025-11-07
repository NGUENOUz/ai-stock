// src/components/HeaderComponent.tsx (ou là où il se trouve)
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/store/useAppStore"; // <-- Importation du store Zustand

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
} from "./navbar"; // Assurez-vous que le chemin est correct

export default function HeaderComponent() {
  // 1. Récupération de l'état d'authentification et des actions depuis Zustand
  const { isLoggedIn, userName, handleLogout } = useAppStore();
  const router = useRouter();

  const navItems = [
    { name: "Liste des AI", link: "/liste" },
    { name: "Prompts Populaires", link: "/prompt" },
    { name: "Formations", link: "/formations" },
    { name: "Blog", link: "/blog" },
    { name: "Events", link: "/events" },
    { name: "Contact", link: "/contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGlobalLogout = () => { // Renommé pour éviter la confusion avec l'action du store
    handleLogout(); // Action Zustand de déconnexion (nom corrigé)
    router.push("/"); // Redirige vers la page d'accueil après la déconnexion
    setIsMobileMenuOpen(false); // Ferme le menu mobile
  }

  const handleNavClick = () => {
    // Fonction utilitaire pour fermer le menu mobile après un clic
    setIsMobileMenuOpen(false);
  };

  // --- Contenu conditionnel pour l'authentification (Desktop) ---

  // Liens pour utilisateur DÉCONNECTÉ (Desktop)
  const unauthenticatedButtons = (
    <>
      {/* Bouton Connexion (caché sur les petits écrans) */}
      <NavbarButton href="/login" variant="secondary" className="hidden sm:inline-block">
        Connexion
      </NavbarButton>
      {/* Bouton S'inscrire */}
      <NavbarButton href="/signup" variant="primary">
        S'inscrire
      </NavbarButton>
    </>
  );

  // Liens pour utilisateur CONNECTÉ (Desktop)
  const authenticatedButtons = (
    <>
      {/* Bouton Dashboard/Mon Compte */}
      <NavbarButton href="/dashboard" variant="secondary" className="hidden sm:inline-block">
        {userName || "Mon Compte"} {/* Affiche le nom de l'utilisateur s'il existe */}
      </NavbarButton>
      {/* Bouton Déconnexion */}
      <NavbarButton onClick={handleLogout} variant="primary">
        Déconnexion
      </NavbarButton>
    </>
  );

  // --- Contenu conditionnel pour l'authentification (Mobile) ---

  // Liens d'action MOBILE (passés au MobileNavMenu)
  const mobileActionButtons = isLoggedIn ? (
    <>
      <NavbarButton href="/dashboard" onClick={handleNavClick} variant="primary" className="w-full">
        Dashboard
      </NavbarButton>
      <NavbarButton onClick={handleLogout} variant="secondary" className="w-full">
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
    <header className="relative w-full header">
      <Navbar className="header">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
         
          {/* Les NavItems utilisent maintenant la fonction onItemClick pour gérer la fermeture du menu si on le veut (bien que non nécessaire en desktop) */}
          <NavItems items={navItems} onItemClick={handleNavClick} />
          
          <div className="flex items-center gap-4">
            
           

            {/* Affichage des boutons d'authentification basés sur l'état Zustand */}
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
            items={navItems} // <-- Passage des liens de navigation
            mobileActions={mobileActionButtons} // <-- Passage des actions (Login/Logout)
          >
            {/* Si vous aviez d'autres éléments enfants spécifiques au menu mobile non listés ci-dessus, ils iraient ici */}
            {/* Par exemple, si vous voulez toujours Book a call */}
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="dark"
              href="/book-a-call"
              className="w-full mt-4" // Ajout d'une marge pour séparer
            >
              Book a call
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}