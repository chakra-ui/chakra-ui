const sidebar = {
  routes: [
    {
      title: "Guides",
      heading: true,
      routes: [
        {
          title: "How to Create a guide",
          path: "/guides/how-to-create-a-guide",
        },
        {
          title: "Portals and ZIndex",
          path: "/guides/z-index",
        },
        {
          title: "Integrations",
          path: "/guides/integrations",
          open: true,
          routes: [
            {
              title: "Chakra + Create React App",
              path: "/guides/integrations/with-cra",
            },
            {
              title: "Chakra + Framer Motion",
              path: "/guides/integrations/with-framer",
            },
            {
              title: "Chakra + React Hook Form",
              path: "/guides/integrations/with-hook-form",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
