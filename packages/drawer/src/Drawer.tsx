import * as React from "react"
import { Slide, SlideProps } from "@chakra-ui/transition"
import {
  Modal,
  ModalProps,
  ModalContentProps,
  ModalContent,
} from "@chakra-ui/modal"

const DrawerContext = React.createContext<React.CSSProperties>({})
const useDrawerContext = () => React.useContext(DrawerContext)

export interface DrawerProps extends ModalProps {
  placement?: SlideProps["placement"]
  isFullHeight?: boolean
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onClose, placement = "right", children, ...rest } = props
  return (
    <Slide in={isOpen} placement={placement}>
      {styles => (
        <DrawerContext.Provider value={styles}>
          <Modal isOpen={true} onClose={onClose} {...rest}>
            {children}
          </Modal>
        </DrawerContext.Provider>
      )}
    </Slide>
  )
}

export function DrawerContent(props: ModalContentProps) {
  const styles = useDrawerContext()
  return <ModalContent position="fixed" style={styles} {...props} />
}

export {
  ModalOverlay as DrawerOverlay,
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
