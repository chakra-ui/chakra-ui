const baseUrl = "https://github.com/chakra-ui/chakra-ui"

const siteConfig = {
  copyright: `Copyright © ${new Date().getFullYear()} Segun Adebayo. All Rights Reserved.`,
  algolia: {
    apiKey: "df1dcc41f7b8e5d68e73dd56d1e19701",
    indexName: "chakra-ui",
    inputSelector: "#algolia-search",
  },
  author: {
    name: "Segun Adebayo",
    github: "https://github.com/segunadebayo",
    twitter: "https://twitter.com/thesegunadebayo",
    linkedin: "https://linkedin.com/in/thesegunadebayo",
    email: "sage@adebayosegun.com",
  },
  repo: {
    url: baseUrl,
    editUrl: `${baseUrl}/edit/develop/website`,
    blobUrl: `${baseUrl}/blob/develop`,
  },
  openCollective: {
    url: "https://opencollective.com/chakra-ui",
  },
  discord: {
    url: "https://discord.gg/dQHfcWF",
  },
  seo: {
    title: "Chakra UI",
    titleTemplate: "%s - Chakra UI",
    description:
      "Simple, Modular and Accessible UI Components for your React Applications.",
    siteUrl: "https://chakra-ui.com",
    twitter: {
      handle: "@chakra-ui",
      site: "@chakra-ui",
      cardType: "summary_large_image",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://chakra-ui.com",
      title: "Chakra UI",
      description:
        "Simple, Modular and Accessible UI Components for your React Applications.",
      site_name:
        "Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.",
      images: [
        {
          url: "/og-image.png",
          width: 1240,
          height: 480,
          alt:
            "Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.",
        },
        {
          url: "/twitter-og-image.png",
          width: 1012,
          height: 506,
          alt:
            "Chakra UI: Simple, Modular and Accessible UI Components for your React Applications.",
        },
      ],
    },
  },
}

export default siteConfig
