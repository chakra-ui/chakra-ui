import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/core"
import { globalHistory } from "@reach/router"
import * as React from "react"
import { MdDehaze } from "react-icons/md"
import { SideNavContent } from "./docs/side-nav"

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  globalHistory.listen(({ action }) => {
    if (action === "PUSH") {
      onClose()
    }
  })

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
