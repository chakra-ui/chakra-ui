import { Box, chakra, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"
import * as React from "react"
import sidebar from "sidebar.config"
import SidebarCategory from "./sidebar-category"
import SidebarLink from "./sidebar-link"

const Sidebar = () => {
  const { asPath: slug } = useRouter()
  const { routes } = sidebar
  return (
    <Box
      as="aside"
      pos="sticky"
      top="6rem"
      w="300px"
      pr="3"
      pb="8"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
    >
      {routes.map((c1, idx) => {
        return (
          <React.Fragment key={idx}>
            {c1.heading && (
              <chakra.h4 fontSize="xl" fontWeight="semibold" my="1.25rem">
                {c1.title}
              </chakra.h4>
            )}

            {c1.routes.map((c2) => {
              if (!c2.routes) {
                return (
                  <SidebarLink key={c2.path} href={c2.path}>
                    {c2.title}
                  </SidebarLink>
                )
              }

              return (
                <SidebarCategory {...c2} key={c2.path}>
                  <Stack spacing="18px">
                    {c2.routes.map((c3) => (
                      <SidebarLink key={c3.path} href={`${c2.path}${c3.path}`}>
                        {c3.title}
                      </SidebarLink>
                    ))}
                  </Stack>
                </SidebarCategory>
              )
            })}
          </React.Fragment>
        )
      })}
    </Box>
  )
}

export default Sidebar
