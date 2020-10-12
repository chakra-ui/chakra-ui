const baseUrl = "https://github.com/chakra-ui/chakra-ui"

const site_name =
  "Chakra UI: Simple, Modular and Accessible UI Components for your React Applications."

export const siteConfig = {
  algolia: {
    apiKey: "df1dcc41f7b8e5d68e73dd56d1e19701",
    indexName: "chakra-ui",
    inputSelector: "#algolia-search",
  },
  author: {
    email: "sage@adebayosegun.com",
    github: "https://github.com/segunadebayo",
    linkedin: "https://linkedin.com/in/thesegunadebayo",
    name: "Segun Adebayo",
    twitter: "https://twitter.com/thesegunadebayo",
  },
  copyright: `Copyright © ${new Date().getFullYear()} Segun Adebayo. All Rights Reserved.`,
  discord: {
    url: "https://discord.gg/dQHfcWF",
  },
  openCollective: {
    url: "https://opencollective.com/chakra-ui",
  },
  repo: {
    blobUrl: `${baseUrl}/blob/develop`,
    editUrl: `${baseUrl}/edit/develop/website`,
    url: baseUrl,
  },
  seo: {
    description:
      "Simple, Modular and Accessible UI Components for your React Applications.",
    openGraph: {
      description:
        "Simple, Modular and Accessible UI Components for your React Applications.",
      images: [
        {
          alt: site_name,
          height: 480,
          url: "/og-image.png",
          width: 1240,
        },
        {
          alt: site_name,
          height: 506,
          url: "/twitter-og-image.png",
          width: 1012,
        },
      ],
      locale: "en_US",
      site_name,
      title: "Chakra UI",
      type: "website",
      url: "https://chakra-ui.com",
    },
    siteUrl: "https://chakra-ui.com",
    title: "Chakra UI",
    titleTemplate: "%s - Chakra UI",
    twitter: {
      cardType: "summary_large_image",
      handle: "@chakra-ui",
      site: "@chakra-ui",
    },
  },
}
