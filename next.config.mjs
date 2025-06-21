const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Add redirects configuration here
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;