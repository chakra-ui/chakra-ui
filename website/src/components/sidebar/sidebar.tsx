import { Box, chakra, Stack } from "@chakra-ui/core"
import { useRouter } from "next/router"
import * as React from "react"
import SidebarCategory from "./sidebar-category"
import SidebarLink from "./sidebar-link"

const Sidebar = ({ routes }: any) => {
  const { pathname } = useRouter()
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      as="aside"
      pos="sticky"
      top="6.5rem"
      w="280px"
      pr="8"
      pb="8"
      pl="1"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      display={{ base: "none", md: "block" }}
    >
      {/* <Search /> */}
      {routes.map((c1, idx) => {
        return (
          <React.Fragment key={idx}>
            {c1.heading && (
              <chakra.h4 fontSize="md" fontWeight="bold" my="1.25rem">
                {c1.title}
              </chakra.h4>
            )}

            {c1.routes.map((c2) => {
              if (!c2.routes) {
                return (
                  <SidebarLink mt="3" key={c2.path} href={c2.path}>
                    {c2.title}
                  </SidebarLink>
                )
              }

              const selected = pathname.startsWith(c2.path)
              const opened = selected || c2.open

              return (
                <SidebarCategory
                  contentRef={ref}
                  key={c2.path}
                  {...c2}
                  selected={selected}
                  opened={opened}
                >
                  <Stack spacing="3">
                    {c2.routes.map((c3) => (
                      <SidebarLink key={c3.path} href={c3.path}>
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
