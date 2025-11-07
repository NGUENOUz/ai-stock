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
      // Si vous avez d'autres domaines d'images (comme un CDN ou un service de stockage), vous les ajouteriez ici.
    ],
  },
  

};

module.exports = nextConfig;