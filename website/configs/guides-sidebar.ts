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
          title: "Component guide",
          path: "/guides/component-guide",
        },
        {
          title: "Portals and z-Index",
          path: "/guides/z-index",
        },
        {
          title: "The as prop",
          path: "/guides/as-prop",
        },
        {
          title: "Integrations",
          path: "/guides/integrations",
          open: true,
          routes: [
            {
              title: "Create React App",
              path: "/guides/integrations/with-cra",
            },
            {
              title: "Framer Motion",
              path: "/guides/integrations/with-framer",
            },
            {
              title: "React Hook Form",
              path: "/guides/integrations/with-hook-form",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
