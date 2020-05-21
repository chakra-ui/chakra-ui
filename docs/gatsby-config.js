const siteMetadata = {
  title: "Chakra UI | Design System built with React",
  description:
    "Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System",
  author: "Chakra UI",
  siteUrl: "https://chakra-ui.com",
}

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/components/layout"),
      },
    },
    `gatsby-plugin-chakra-ui`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-mdx`,
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: siteMetadata.siteUrl,
        noTrailingSlash: true,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-default-mdx-basic",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PLT3CZ5",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
  ],
}
