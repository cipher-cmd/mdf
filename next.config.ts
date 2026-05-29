import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options',    value: 'nosniff' },
        { key: 'X-Frame-Options',           value: 'DENY' },
        { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      ],
    },
    {
      source: '/(.*)\\.(webp|avif|png|jpg|jpeg|svg|ico)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
}

export default nextConfig
