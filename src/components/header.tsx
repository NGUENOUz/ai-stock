// src/components/header.tsx
"use client";

import React, { useState } from "react";
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

export default function HeaderComponent() {
  const { isLoggedIn, userName, handleLogout } = useAppStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // --- Groupes de Boutons (Desktop) ---

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

  // --- Groupes de Boutons (Mobile) ---

  const MobileActionButtons = () => (
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
  );

  return (
    <header className="relative w-full">
      <Navbar>
        {/* --- Version Desktop --- */}
        <NavBody>
          <NavbarLogo />
          
          <NavItems items={navItems} onItemClick={closeMobileMenu} />
          
          <AuthButtons />
        </NavBody>

      </Navbar>
    </header>
  );
}