// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-8 mt-12">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <Link href="/mentions-legales" className="mx-2 hover:text-white transition-colors">Mentions Légales</Link>
          <Link href="/politique-confidentialite" className="mx-2 hover:text-white transition-colors">Politique de Confidentialité</Link>
          <Link href="/contact" className="mx-2 hover:text-white transition-colors">Contact</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} AI Stock. Tous droits réservés.</p>
      </div>
    </footer>
  );
};