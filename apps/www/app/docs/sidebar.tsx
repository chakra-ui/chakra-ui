"use client"

import { SideNav } from "@/components/sidenav"
import { useRoute } from "@/lib/use-route"
import {
  Box,
  BoxProps,
  IconButton,
  Portal,
  Stack,
  chakra,
} from "@chakra-ui/react"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "compositions/ui/drawer"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
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
  const [isOpen, setIsOpen] = useState(false)
  const route = useRoute()
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

  return (
    <DrawerRoot
      open={isOpen}
      placement="bottom"
      onPointerDownOutside={closeMenu}
      onEscapeKeyDown={closeMenu}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <DrawerTrigger asChild>
        <MobileMenuButton aria-label="Open menu">
          <AiOutlineMenu />
          Menu
        </MobileMenuButton>
      </DrawerTrigger>
      <Portal>
        <DrawerBackdrop />

        <DrawerContent borderTopRadius="md" maxH="var(--content-height)">
          <DrawerCloseTrigger asChild>
            <IconButton size="sm" variant="ghost">
              <AiOutlineClose />
            </IconButton>
          </DrawerCloseTrigger>
          <DrawerBody display="flex" flexDir="column" gap="6" py="5" flex="1">
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
          </DrawerBody>
        </DrawerContent>
      </Portal>
    </DrawerRoot>
  )
}
