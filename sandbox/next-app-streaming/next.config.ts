import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  agentRules: false,
  experimental: {
    externalDir: true,
  },
}

export default nextConfig
