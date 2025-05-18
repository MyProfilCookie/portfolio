const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation du cache webpack
  webpack: (config, { dev, isServer }) => {
    // Configurations spécifiques pour le développement
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000, // Vérifie les changements toutes les secondes
        aggregateTimeout: 300, // Délai avant reconstruction
      };
    }
    // Optimisation du cache webpack
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.resolve(__dirname, '.next/cache'),
      compression: false, // Désactive la compression qui peut causer des erreurs
      name: isServer ? 'server' : 'client',
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config;
  },
  // Amélioration de la stabilité en développement
  onDemandEntries: {
    // Période pendant laquelle une page doit être conservée en mémoire
    maxInactiveAge: 60 * 60 * 1000, // 1 heure
    // Nombre de pages à conserver en mémoire
    pagesBufferLength: 5,
  },
  // Optimisation des images
  images: {
    domains: [
      'example.com',
      'images.unsplash.com',
      'images.pexels.com'
    ],
    minimumCacheTTL: 60,
  },
  // Amélioration de la stabilité
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
