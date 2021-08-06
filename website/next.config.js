const withPlugins = require("next-compose-plugins")
const withPreconstruct = require("@preconstruct/next")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const redirects = require("./next-redirect")

const defaultConfig = {
  target: "serverless",
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, "sharp"],
  }),
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  redirects,
}

module.exports = withPlugins(
  [withBundleAnalyzer, withPreconstruct({})],
  defaultConfig,
)
