import * as React from "react"
import { Slide, SlideProps, Fade } from "@chakra-ui/transition"
import {
  Modal,
  ModalProps,
  ModalContentProps,
  ModalContent,
  ModalOverlayProps,
  ModalOverlay,
} from "@chakra-ui/modal"
import { forwardRef } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

interface TransitionStyles {
  content: React.CSSProperties
  overlay: React.CSSProperties
}

const TransitionContext = React.createContext<TransitionStyles>({
  content: {},
  overlay: {},
})

TransitionContext.displayName = "TransitionContext"
const useTransitionContext = () => React.useContext(TransitionContext)

interface DrawerTransitionProps {
  in: boolean
  children: React.ReactNode
  placement: SlideProps["placement"]
}

function DrawerTransition(props: DrawerTransitionProps) {
  const { in: inProp, children, placement } = props
  return (
    <Slide
      timeout={250}
      in={inProp}
      placement={placement}
      transition="transform 250ms cubic-bezier(0.16, 1, 0.3, 1)"
    >
      {(content) => (
        <Fade
          timeout={250}
          in={inProp}
          transition="opacity 250ms cubic-bezier(0.16, 1, 0.3, 1)"
        >
          {(overlay) => (
            <TransitionContext.Provider value={{ content, overlay: overlay }}>
              {children}
            </TransitionContext.Provider>
          )}
        </Fade>
      )}
    </Slide>
  )
}

if (__DEV__) {
  DrawerTransition.displayName = "DrawerTransition"
}

export interface DrawerProps extends ModalProps {
  placement?: SlideProps["placement"]
  isFullHeight?: boolean
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onClose, placement = "right", children, ...rest } = props
  return (
    <DrawerTransition in={isOpen} placement={placement}>
      <Modal isOpen onClose={onClose} {...rest}>
        {children}
      </Modal>
    </DrawerTransition>
  )
}

export const DrawerContent = forwardRef<ModalContentProps>(
  function DrawerContent(props, ref) {
    const { content: styles } = useTransitionContext()
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

export const DrawerOverlay = forwardRef<ModalOverlayProps>(
  function DrawerOverlay(props, ref) {
    const { overlay: styles } = useTransitionContext()
    return <ModalOverlay style={styles} ref={ref} {...props} />
  },
)

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
