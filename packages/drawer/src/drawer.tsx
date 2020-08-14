import * as React from "react"
import {
  Slide,
  SlideProps,
  Fade,
  TransitionChildrenProps,
} from "@chakra-ui/transition"
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
  content: TransitionChildrenProps
  overlay: TransitionChildrenProps
}

const TransitionContext = React.createContext<TransitionStyles>({
  content: {
    style: {},
    ref: { current: null },
  },
  overlay: {
    style: {},
    ref: { current: null },
  },
})

TransitionContext.displayName = "TransitionContext"
const useTransitionContext = () => React.useContext(TransitionContext)

interface DrawerTransitionProps {
  in: boolean
  children: React.ReactNode
  placement: SlideProps["placement"]
}

const DrawerTransition: React.FC<DrawerTransitionProps> = (props) => {
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

export const Drawer: React.FC<DrawerProps> = (props) => {
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

export const DrawerContent: React.FC<ModalContentProps> = forwardRef(
  (props, ref) => {
    const { content: transitionProps } = useTransitionContext()
    return (
      <ModalContent
        ref={ref || transitionProps.ref}
        position="fixed"
        marginTop="0"
        marginBottom="0"
        borderRadius="0"
        style={transitionProps.style}
        {...props}
      />
    )
  },
)

export const DrawerOverlay: React.FC<ModalOverlayProps> = forwardRef(
  (props, ref) => {
    const { overlay: transitionProps } = useTransitionContext()
    return (
      <ModalOverlay
        ref={ref || transitionProps.ref}
        style={transitionProps.style}
        {...props}
      />
    )
  },
)

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
