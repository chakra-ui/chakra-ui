/** @type {import('next').NextConfig} */
const nextConfig = {
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

const isDev = process.argv.indexOf("dev") !== -1
const isBuild = process.argv.indexOf("build") !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1"
  const { build } = await import("velite")
  await build({ watch: isDev, clean: !isDev })
}

export default nextConfig
