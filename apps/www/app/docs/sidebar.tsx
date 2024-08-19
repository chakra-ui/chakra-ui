"use client"

import { SideNav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import {
  Box,
  BoxProps,
  Drawer,
  IconButton,
  Portal,
  Stack,
  chakra,
} from "@chakra-ui/react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

export const SidebarStart = (props: BoxProps) => {
  const route = useRoute()
  return (
    <Box
      className="no-bg-scrollbar"
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pe="5"
      ms="-3"
      py="8"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      overscrollBehavior="contain"
      width="16rem"
      hideBelow="md"
      fontSize="sm"
      {...props}
    >
      <Stack gap="6">
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

export const SidebarEnd = (props: BoxProps) => {
  const { children } = props
  return (
    <Box
      className="no-bg-scrollbar"
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pt="8"
      pb="8"
      px="2"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      overscrollBehavior="contain"
      width="16rem"
      hideBelow="xl"
      {...props}
    >
      <Stack gap="4" align="flex-start">
        {children}
      </Stack>
    </Box>
  )
}

const MobileMenuButton = chakra("button", {
  base: {
    display: "flex",
    px: "4",
    py: "2",
    gap: "2",
    w: "full",
    hideFrom: "md",
    fontSize: "md",
    alignItems: "center",
    color: "fg",
    position: "sticky",
    top: "var(--header-height)",
    borderBottom: "1px solid",
    borderColor: "border.muted",
    zIndex: "10",
    cursor: "pointer",
    bg: "bg",
  },
})

export const MobileSidebarNav = () => {
  const route = useRoute()
  return (
    <Drawer.Root placement="bottom">
      <Drawer.Trigger asChild>
        <MobileMenuButton aria-label="Open menu">
          <AiOutlineMenu />
          Menu
        </MobileMenuButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content borderTopRadius="md">
            <Drawer.CloseTrigger asChild>
              <IconButton size="sm" variant="ghost">
                <AiOutlineClose />
              </IconButton>
            </Drawer.CloseTrigger>
            <Drawer.Body
              display="flex"
              flexDir="column"
              gap="6"
              py="5"
              flex="1"
            >
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
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
