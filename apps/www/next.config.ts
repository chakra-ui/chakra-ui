import { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/get-started/installation",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
