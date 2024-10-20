/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.giphy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
