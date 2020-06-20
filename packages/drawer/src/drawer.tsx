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

if (__DEV__) {
  TransitionContext.displayName = "TransitionContext"
}

const useTransitionContext = () => React.useContext(TransitionContext)

interface DrawerTransitionProps {
  in: boolean
  children: (styles: TransitionStyles) => React.ReactNode
  placement: SlideProps["placement"]
}

function DrawerTransition(props: DrawerTransitionProps) {
  const { in: inProp, children, placement } = props
  return (
    <Slide in={inProp} placement={placement}>
      {(contentStyle) => (
        <Fade in={inProp}>
          {(overlayStyle) =>
            children({ content: contentStyle, overlay: overlayStyle })
          }
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
      {(styles) => (
        <TransitionContext.Provider value={styles}>
          <Modal isOpen={true} onClose={onClose} {...rest}>
            {children}
          </Modal>
        </TransitionContext.Provider>
      )}
    </DrawerTransition>
  )
}

if (__DEV__) {
  Drawer.displayName = "Drawer"
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

if (__DEV__) {
  DrawerContent.displayName = "DrawerContent"
}

export const DrawerOverlay = forwardRef<ModalOverlayProps>(
  function DrawerOverlay(props, ref) {
    const { overlay: styles } = useTransitionContext()
    return (
      <ModalOverlay
        style={styles}
        transition={"all 0.2s"}
        ref={ref}
        {...props}
      />
    )
  },
)

if (__DEV__) {
  DrawerOverlay.displayName = "DrawerOverlay"
}

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
