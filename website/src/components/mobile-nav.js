import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/core"
import * as React from "react"
import { MdDehaze } from "react-icons/md"
import { SideNavContent } from "./side-nav"
import useRouteChanged from "hooks/use-route-changed"

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  useRouteChanged(onClose)

  return (
    <>
      <IconButton
        display={{ sm: "inline-flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        variant="ghost"
        icon={<MdDehaze />}
        onClick={onToggle}
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0}>
              <SideNavContent contentHeight="100vh" top="0" />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
