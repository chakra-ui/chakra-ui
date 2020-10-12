export const guidesSidebar = {
  routes: [
    {
      heading: true,
      routes: [
        {
          path: "/guides/how-to-create-a-guide",
          title: "How to Create a guide",
        },
        {
          path: "/guides/z-index",
          title: "Portals and z-Index",
        },
        {
          path: "/guides/as-prop",
          title: "The as prop",
        },
        {
          open: true,
          path: "/guides/integrations",
          routes: [
            {
              path: "/guides/integrations/with-cra",
              title: "Create React App",
            },
            {
              path: "/guides/integrations/with-framer",
              title: "Framer Motion",
            },
            {
              path: "/guides/integrations/with-hook-form",
              title: "React Hook Form",
            },
          ],
          title: "Integrations",
        },
      ],
      title: "Guides",
    },
  ],
}
