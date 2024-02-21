import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import type { HTMLMotionProps } from "framer-motion"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { Slide } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"
import { DialogFocusScope } from "./dialog-focus"
import { useDrawerContext } from "./drawer"

const MotionDiv = chakra(Slide)

export interface DrawerContentProps extends HTMLChakraProps<"section"> {
  /**
   * The props to forward to the dialog's content wrapper
   */
  containerProps?: HTMLChakraProps<"div">
  /**
   * The custom framer-motion transition to use for the dialog
   */
  motionProps?: HTMLMotionProps<"section">
}

/**
 * Used to group dialog's content. It has all the
 * necessary `aria-*` properties to indicate that it is a dialog
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
      useDialogContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)

    const _className = cx("chakra-dialog__content", className)

    const styles = useDialogStyles()

    const dialogStyles = defineStyle({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog,
    })

    const dialogContainerStyles = defineStyle({
      display: "flex",
      width: "100vw",
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    })

    const { placement } = useDrawerContext()

    return (
      <DialogFocusScope>
        <chakra.div
          {...containerProps}
          className="chakra-dialog__content-container"
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
      </DialogFocusScope>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
