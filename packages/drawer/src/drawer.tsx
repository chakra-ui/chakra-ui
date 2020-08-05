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
import { forwardRef, useTheme } from "@chakra-ui/system"
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
            <TransitionContext.Provider value={{ content, overlay }}>
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
  /**
   * The placement of the drawer
   */
  placement?: SlideProps["placement"]
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onClose, placement = "right", children, ...rest } = props

  const theme = useTheme()
  const drawerStyleConfig = theme.components?.Drawer

  return (
    <DrawerTransition in={isOpen} placement={placement}>
      <Modal isOpen onClose={onClose} styleConfig={drawerStyleConfig} {...rest}>
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

import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/modal"

export const DrawerBody = ModalBody
export const DrawerHeader = ModalHeader
export const DrawerFooter = ModalFooter
export const DrawerCloseButton = ModalCloseButton
