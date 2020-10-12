import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Box,
  useDisclosure,
} from "@chakra-ui/core"
import { useRouteChanged } from "hooks/use-route-changed"
import { MdDehaze } from "react-icons/md"

export const MobileNav = (): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  useRouteChanged(onClose)

  return (
    <>
      <IconButton
        display={{ md: "none", sm: "inline-flex" }}
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
              <Box h="100vh" top="0" />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
