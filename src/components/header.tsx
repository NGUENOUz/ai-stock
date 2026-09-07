"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import ThemeToggle from "./theme-toggle";
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavToggle,
  MobileNavMenu,
  FLAT_NAV_ITEMS,
} from "./navbar";

/**
 * Composant Header principal
 * Gère l'état du scroll pour modifier l'apparence de la navigation
 */
export default function HeaderComponent() {
  const { isLoggedIn, userName, handleLogout } = useAppStore();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu et bloque le scroll body quand il est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const onLogout = () => {
    handleLogout();
    router.push("/");
    closeMobileMenu();
  };

  // Boutons auth — desktop uniquement
  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <div className="w-px h-6 bg-border mx-2 hidden sm:block" />
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
          <NavbarButton href="/login" variant="secondary" className="hidden sm:inline-block !bg-transparent !text-foreground hover:!bg-muted">
            Se connecter
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
        {/* ── Desktop nav ─────────────────────────────────────────────── */}
        <NavBody isScrolled={isScrolled}>
          <NavbarLogo />
          <NavItems items={FLAT_NAV_ITEMS} onItemClick={closeMobileMenu} />
          <AuthButtons />
        </NavBody>

        {/* ── Mobile nav ──────────────────────────────────────────────── */}
        <MobileNav isScrolled={isScrolled}>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNav>

        {/* ── Mobile drawer menu ──────────────────────────────────────── */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isLoggedIn={isLoggedIn}
          userName={userName ?? undefined}
          onLogout={onLogout}
        />
      </Navbar>
    </header>
  );
}