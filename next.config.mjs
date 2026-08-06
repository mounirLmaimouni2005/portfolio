/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM in a few subpaths; let Next handle it.
  transpilePackages: ['three'],
};

export default nextConfig;
