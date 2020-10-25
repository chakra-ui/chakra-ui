import {
  chakra,
  forwardRef,
  SystemStyleObject,
  useStyles,
  useTheme,
  WithChakraProps,
} from "@chakra-ui/system"
import { Slide, SlideOptions } from "@chakra-ui/transition"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Modal, ModalFocusScope, ModalProps, useModalContext } from "./modal"

const [DrawerContextProvider, useDrawerContext] = createContext<DrawerOptions>()

interface DrawerOptions {
  /**
   * The placement of the drawer
   */
  placement?: SlideOptions["direction"]
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean
}

export interface DrawerProps extends ModalProps {
  /**
   * The placement of the drawer
   */
  placement?: SlideOptions["direction"]
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
    <DrawerContextProvider value={{ placement }}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        styleConfig={drawerStyleConfig}
        {...rest}
      >
        {children}
      </Modal>
    </DrawerContextProvider>
  )
}

const StyleSlide = chakra(Slide)

export interface DrawerContentProps extends WithChakraProps<"section"> {}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const DrawerContent = forwardRef<DrawerContentProps, "section">(
  function DrawerContent(props, ref) {
    const { className, children, ...rest } = props

    const {
      getDialogProps,
      getDialogContainerProps,
      isOpen,
    } = useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps()

    const _className = cx("chakra-modal__content", className)

    const styles = useStyles()

    const dialogStyles: SystemStyleObject = {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog,
    }

    const dialogContainerStyles: SystemStyleObject = {
      display: "flex",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    }

    const { placement } = useDrawerContext()

    return (
      <chakra.div
        {...containerProps}
        className="chakra-modal__content-container"
        __css={dialogContainerStyles}
      >
        <ModalFocusScope>
          <StyleSlide
            direction={placement}
            in={isOpen}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </StyleSlide>
        </ModalFocusScope>
      </chakra.div>
    )
  },
)

if (__DEV__) {
  DrawerContent.displayName = "DrawerContent"
}

export {
  ModalBody as DrawerBody,
  ModalCloseButton as DrawerCloseButton,
  ModalFooter as DrawerFooter,
  ModalHeader as DrawerHeader,
  ModalOverlay as DrawerOverlay,
} from "./modal"
