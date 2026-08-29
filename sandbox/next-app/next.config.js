/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.resolve.conditionNames = [
      "dev",
      "import",
      "module",
      "browser",
      "default",
    ]
    return config
  },
}
