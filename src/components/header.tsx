"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavBody, NavbarLogo, NavItems, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "./navbar";
export default function HeaderComponent() {
    const navItems = [
    {
      name: "Liste des AI",
      link: "/liste",
    },
    {
      name: "prompts populaires",
      link: "#pricing",
    },
    {
      name: "Formations",
      link: "#contact",
    },

    {
      name: "Blog",
      link: "#contact",
    },
    {
      name: "Events",
      link: "#contact",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full ">
              <Navbar className="header">
                {/* Desktop Navigation */}
                <NavBody>
                  <NavbarLogo />
                  <NavItems items={navItems} />
                  <div className="flex items-center gap-4">
                    {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
                    <NavbarButton variant="gradient">Ajouter Une AI</NavbarButton>
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
                  >
                    {navItems.map((item, idx) => (
                      <a
                        key={`mobile-link-${idx}`}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="relative text-neutral-600 dark:text-neutral-300"
                      >
                        <span className="block">{item.name}</span>
                      </a>
                    ))}
                    <div className="flex w-full flex-col gap-4">
                      <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                      >
                        Login
                      </NavbarButton>
                      <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                      >
                        Book a call
                      </NavbarButton>
                    </div>
                  </MobileNavMenu>
                </MobileNav>
              </Navbar>
      </header>
  );
}