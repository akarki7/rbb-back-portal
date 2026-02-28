/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rbb.com.np',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
