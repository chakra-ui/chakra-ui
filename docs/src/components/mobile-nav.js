import {
  Drawer,
  DrawerBody,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/core"
import * as React from "react"
import { MdDehaze } from "react-icons/md"

const MobileNav = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        // display={{ sm: "inline-flex", md: "none" }}
        aria-label="Navigation Menu"
        fontSize="20px"
        variant="ghost"
        icon={<MdDehaze />}
        onClick={onToggle}
        marginRight="-16px"
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0}>
              <div>Welcome</div>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
