/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/incourse-cal' : '', // Add base path for GitHub Pages
}

export default nextConfig
