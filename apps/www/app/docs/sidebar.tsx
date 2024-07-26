"use client"

import { SideNav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import { Box, Stack } from "@chakra-ui/react"

export const SidebarStart = () => {
  const route = useRoute()
  return (
    <Box
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pe="5"
      ms="-3"
      py="8"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="16rem"
      hideBelow="md"
      fontSize="sm"
    >
      <Stack gap="10">
        {route
          .getSidebarNavItems()
          ?.map((group) => (
            <SideNav
              key={group.title}
              currentUrl={route.currentUrl}
              title={group.title}
              items={group.items}
            />
          ))}
      </Stack>
    </Box>
  )
}

export const SidebarEnd = (props: React.PropsWithChildren) => {
  const { children } = props
  return (
    <Box
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pt="8"
      pb="8"
      px="2"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="16rem"
      hideBelow="xl"
    >
      <Stack gap="4" align="flex-start">
        {children}
      </Stack>
    </Box>
  )
}
