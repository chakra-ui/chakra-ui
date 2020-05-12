import * as React from "react"
import { Slide, SlideProps } from "@chakra-ui/transition"
import {
  Modal,
  ModalProps,
  ModalContentProps,
  ModalContent,
  ModalOverlayProps,
  ModalOverlay,
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

export const DrawerContent = React.forwardRef(
  (props: ModalContentProps, ref: React.Ref<any>) => {
    /**
     * We don't want to animate the opacity of the drawer
     */
    const { opacity, ...styles } = useDrawerContext()
    return (
      <ModalContent
        ref={ref}
        position="fixed"
        style={styles}
        marginTop="0"
        marginBottom="0"
        borderRadius="0"
        {...props}
      />
    )
  },
)

export const DrawerOverlay = React.forwardRef(
  (props: ModalOverlayProps, ref: React.Ref<any>) => {
    const styles = useDrawerContext() as any
    return <ModalOverlay opacity={styles.opacity} ref={ref} {...props} />
  },
)

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
