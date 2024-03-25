// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  optimizeFonts: true,
  images: {
    remotePatterns: [
      { hostname: 'img.youtube.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'github.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'avatars0.githubusercontent.com' },
      { hostname: 'avatars1.githubusercontent.com' },
      { hostname: 'avatars2.githubusercontent.com' },
      { hostname: 'avatars3.githubusercontent.com' },
    ],
  },
  productionBrowserSourceMaps: true,
  redirects: require('./next-redirect'),
  reactStrictMode: true,
})
