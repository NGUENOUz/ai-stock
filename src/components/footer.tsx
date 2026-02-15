"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  IconBrandInstagram, 
  IconBrandTwitter, 
  IconBrandLinkedin, 
  IconArrowRight,
  IconCircleCheckFilled
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Section Haute : Newsletter & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-3xl lg:text-4xl font-black text-black tracking-tighter mb-6">
              Ne manquez plus <br />
              <span className="text-primary italic">le futur.</span>
            </h3>
            <p className="text-neutral-500 max-w-sm mb-8">
              Soyez notifié dès qu'un nouveau prompt, workflow ou outil IA est publié par nos meilleurs contributeurs.
            </p>
            <form className="relative max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full h-14 pl-6 pr-32 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-primary transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-black text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-neutral-800 transition-all">
                S'abonner <IconArrowRight size={14} />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Plateforme" links={[
              { label: "Outils AI", href: "#" },
              { label: "Prompts", href: "#" },
              { label: "Workflows", href: "#" },
              { label: "Formations", href: "#" }
            ]} />
            <FooterColumn title="Créateurs" links={[
              { label: "Devenir Contributeur", href: "#" },
              { label: "Centre d'aide", href: "#" },
              { label: "Commissions", href: "#" },
              { label: "Awards 2024", href: "#" }
            ]} />
            <FooterColumn title="Entreprise" links={[
              { label: "Ajouter votre Outil", href: "#" },
              { label: "Solutions B2B", href: "#" },
              { label: "Publicité", href: "#" },
              { label: "Contact Pro", href: "#" }
            ]} />
          </div>
        </div>

        {/* Section Basse : Logo & Mentions */}
        <div className="pt-12 border-t border-neutral-50 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
              AI<span className="text-primary">STOCK</span>
              <IconCircleCheckFilled className="text-primary w-5 h-5" />
            </div>
            <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-widest">
              © 2024 AI STOCK — LA MARKETPLACE DES PIONNIERS
            </p>
          </div>

          <div className="flex items-center gap-6">
            <SocialIcon icon={<IconBrandTwitter size={20} />} href="#" />
            <SocialIcon icon={<IconBrandInstagram size={20} />} href="#" />
            <SocialIcon icon={<IconBrandLinkedin size={20} />} href="#" />
          </div>

          <div className="flex items-center gap-8 text-[12px] font-bold text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-black transition-colors">CGU / CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-300">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.href} className="text-sm font-bold text-neutral-500 hover:text-black transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a href={href} className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-all">
      {icon}
    </a>
  );
}