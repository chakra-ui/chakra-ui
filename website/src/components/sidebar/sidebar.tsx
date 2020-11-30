import {
  Box,
  BoxProps,
  Center,
  chakra,
  Flex,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import * as React from "react"
import { Routes } from "utils/get-route-context"
import SidebarCategory from "./sidebar-category"
import SidebarLink from "./sidebar-link"
import NextLink from "next/link"
import { DocsIcon, GuidesIcon, TeamIcon } from "./sidebar-icons"

export type SidebarContentProps = Routes & {
  pathname?: string
  contentRef?: any
}

export function SidebarContent(props: SidebarContentProps) {
  const { routes, pathname, contentRef } = props
  return (
    <>
      {routes.map((c1, idx) => {
        return (
          <React.Fragment key={idx}>
            {c1.heading && (
              <chakra.h4
                fontSize="sm"
                fontWeight="bold"
                my="1.25rem"
                textTransform="uppercase"
                letterSpacing="wider"
                color={useColorModeValue("gray.700", "inherit")}
              >
                {c1.title}
              </chakra.h4>
            )}

            {c1.routes.map((c2) => {
              if (!c2.routes) {
                return (
                  <SidebarLink ml="-3" mt="2" key={c2.path} href={c2.path}>
                    {c2.title}
                  </SidebarLink>
                )
              }

              const selected = pathname.startsWith(c2.path)
              const opened = selected || c2.open

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={c2.path}
                  {...c2}
                  selected={selected}
                  opened={opened}
                >
                  <Stack>
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
    </>
  )
}

const MainNavLink = ({ href, icon, children }) => {
  const { pathname } = useRouter()
  const [, group] = href.split("/")
  const active = pathname.includes(group)

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? "gray.900" : "gray.500"}
        _hover={{ color: "gray.900" }}
      >
        <Center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  )
}

const MainNav = (props: BoxProps) => {
  return (
    <VStack align="stretch" spacing="4" {...props}>
      <MainNavLink icon={<DocsIcon />} href="/docs/getting-started">
        Docs
      </MainNavLink>
      <MainNavLink icon={<GuidesIcon />} href="/guides/integrations/with-cra">
        Guides
      </MainNavLink>
      <MainNavLink icon={<TeamIcon />} href="/team">
        Team
      </MainNavLink>
    </VStack>
  )
}

const Sidebar = ({ routes }) => {
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
      pl="3"
      pt="8"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      display={{ base: "none", md: "block" }}
    >
      <MainNav mb="10" />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar
