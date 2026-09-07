"use client";

import React from "react";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Politique de Confidentialité</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Collecte des données</h2>
            <p>
              AI-STOCK collecte certaines informations personnelles lorsque vous utilisez notre plateforme, notamment lors de la création d'un compte (nom, adresse e-mail, profession), lors de la soumission de contenu (prompts, outils), ou via des cookies pour analyser le trafic.
            </p>

            <h2>2. Utilisation des données</h2>
            <p>
              Vos données sont utilisées pour :
            </p>
            <ul>
              <li>Personnaliser votre expérience sur la plateforme.</li>
              <li>Vous envoyer des notifications concernant vos interactions (likes, commentaires).</li>
              <li>Améliorer nos services et notre annuaire d'outils.</li>
            </ul>

            <h2>3. Partage des données</h2>
            <p>
              Nous ne vendons pas vos données personnelles à des tiers. Elles peuvent être partagées avec des prestataires de services de confiance (hébergement, base de données) dans le seul but de faire fonctionner la plateforme AI-STOCK.
            </p>

            <h2>4. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, vous pouvez nous contacter via l'adresse de support (bientôt disponible).
            </p>

            <h2>5. Cookies</h2>
            <p>
              Nous utilisons des cookies essentiels pour le fonctionnement du site (authentification, préférences de thème) et des cookies analytiques pour comprendre l'utilisation de la plateforme.
            </p>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
