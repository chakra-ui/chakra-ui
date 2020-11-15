import { Routes } from "utils/get-route-context"

const sidebar: Routes = {
  routes: [
    {
      title: "Blog",
      heading: true,
      routes: [
        {
          heading: true,
          title: "2020",
          open: true,
          routes: [
            {
              title: "chakra-ui v1 just landed",
              path: "/blog/2020/chakra-v1-just-landed",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
