import React, {
  createContext,
  useContext,
  ReactNode,
  CSSProperties,
  Ref,
} from "react"
import { Slide, SlideProps, Fade } from "@chakra-ui/transition"
import {
  Modal,
  ModalProps,
  ModalContentProps,
  ModalContent,
  ModalOverlayProps,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/modal"
import { forwardRef } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

interface TransitionStyles {
  content: CSSProperties
  overlay: CSSProperties
}

const TransitionContext = createContext<TransitionStyles>({
  content: {},
  overlay: {},
})

TransitionContext.displayName = "TransitionContext"
const useTransitionContext = () => {
  const context = useContext(TransitionContext)

  if (!context) {
    throw new Error(
      "useTransitionContext() was called outside of a TransitionContext.Provider in a Drawer component\nYou probably forgot to use `Drawer`.",
    )
  }

  return context
}

interface DrawerTransitionProps {
  in: boolean
  children: ReactNode
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

export const DrawerContent = forwardRef(function DrawerContent(
  props: ModalContentProps,
  ref: Ref<HTMLDivElement>,
) {
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
})

export const DrawerOverlay = forwardRef(function DrawerOverlay(
  props: ModalOverlayProps,
  ref: Ref<HTMLDivElement>,
) {
  const { overlay: styles } = useTransitionContext()
  return <ModalOverlay style={styles} ref={ref} {...props} />
})

export const DrawerBody = ModalBody
export const DrawerHeader = ModalHeader
export const DrawerFooter = ModalFooter
export const DrawerCloseButton = ModalCloseButton
