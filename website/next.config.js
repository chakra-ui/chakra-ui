const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

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
  redirects: require("./next-redirect"),
}

module.exports = withPlugins([withBundleAnalyzer], defaultConfig)
