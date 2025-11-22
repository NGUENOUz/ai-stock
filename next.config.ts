// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour le composant next/image
  images: {
    // Liste des noms d'hôtes des domaines externes autorisés
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // Autorise n'importe quel chemin sur ce domaine
      },
      // ⭐ AJOUT DE CLOUDINARY
      {
        protocol: 'https',
        // Le domaine standard de Cloudinary pour la livraison de contenu
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Autorise n'importe quel chemin sur ce domaine
      },
      // Si vous utilisez un sous-domaine personnalisé, remplacez 'res.cloudinary.com'
      // par ce sous-domaine.
    ],
  },
};

module.exports = nextConfig;