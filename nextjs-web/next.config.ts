import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'placehold.co' }]
  },
  turbopack: {
    rules: { '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' } }
  },
  serverExternalPackages: ['winston', 'node-cron'],
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
      '@component': path.resolve(__dirname, 'components'),
      '@util': path.resolve(__dirname, 'src/utils'),
      '@constant': path.resolve(__dirname, 'src/constants'),
      '@asset': path.resolve(__dirname, 'public/assets'),
      '@i18n': path.resolve(__dirname, 'src/i18n')
    };
    return config;
  }
};

export default nextConfig;
