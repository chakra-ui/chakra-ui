import { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "@ark-ui/react"],
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.txt/:path*.mdx",
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/get-started/installation",
        permanent: true,
      },
      {
        source: "/charts",
        destination: "/docs/charts/installation",
        permanent: true,
      },
      {
        source: "/docs/get-started/llms",
        destination: "/docs/get-started/ai/llms",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
