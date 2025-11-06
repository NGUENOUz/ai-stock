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
  
  // Si vous utilisez une ancienne version de Next.js (avant la v13.2)
  // vous auriez utilisé la syntaxe suivante (qui est moins recommandée maintenant):
  /*
  images: {
    domains: ['picsum.photos'],
  },
  */
};

module.exports = nextConfig;