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

export interface DrawerProps extends ModalProps {
  placement?: SlideProps["placement"]
  isFullHeight?: boolean
}

export interface DrawerTransitionProps {
  in: boolean
  children: (styles: TransitionStyles) => React.ReactNode
  placement: SlideProps["placement"]
}

export function DrawerTransition(props: DrawerTransitionProps) {
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

export const DrawerContent = React.forwardRef(
  (props: ModalContentProps, ref: React.Ref<any>) => {
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

export const DrawerOverlay = React.forwardRef(
  (props: ModalOverlayProps, ref: React.Ref<any>) => {
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

export {
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter,
  ModalCloseButton as DrawerCloseButton,
} from "@chakra-ui/modal"
