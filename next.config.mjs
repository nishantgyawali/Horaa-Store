/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.166'],
  transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three'],
};

export default nextConfig;
