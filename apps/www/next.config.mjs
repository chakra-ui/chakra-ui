/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
