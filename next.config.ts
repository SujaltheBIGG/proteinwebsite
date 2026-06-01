import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ironplate-restaurant-68kdqrj4z.vercel.app',
      },
    ],
  },
  allowedDevOrigins: ['127.0.0.1'],
}

export default nextConfig
