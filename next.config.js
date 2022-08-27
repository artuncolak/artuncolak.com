/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://res.cloudinary.com/artuncolak/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
