import { cx } from "@chakra-ui/shared-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { Slide } from "@chakra-ui/transition"
import type { HTMLMotionProps } from "framer-motion"

import { useDrawerContext } from "./drawer"
import { useModalContext, useModalStyles } from "./modal"
import { ModalFocusScope } from "./modal-focus"

const MotionDiv = chakra(Slide)

export interface DrawerContentProps extends HTMLChakraProps<"section"> {
  /**
   * The props to forward to the modal's content wrapper
   */
  containerProps?: HTMLChakraProps<"div">
  /**
   * The custom framer-motion transition to use for the modal
   */
  motionProps?: HTMLMotionProps<"section">
}

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const DrawerContent = forwardRef<DrawerContentProps, "section">(
  (props, ref) => {
    const {
      className,
      children,
      motionProps,
      containerProps: rootProps,
      ...rest
    } = props

    const { getDialogProps, getDialogContainerProps, isOpen } =
      useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)

    const _className = cx("chakra-modal__content", className)

    const styles = useModalStyles()

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
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    }

    const { placement } = useDrawerContext()

    return (
      <ModalFocusScope>
        <chakra.div
          {...containerProps}
          className="chakra-modal__content-container"
          __css={dialogContainerStyles}
        >
          <MotionDiv
            motionProps={motionProps}
            direction={placement}
            in={isOpen}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </MotionDiv>
        </chakra.div>
      </ModalFocusScope>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
