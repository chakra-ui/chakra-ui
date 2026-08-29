/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
