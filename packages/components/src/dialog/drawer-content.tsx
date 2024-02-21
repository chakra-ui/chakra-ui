import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import type { HTMLMotionProps } from "framer-motion"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { Slide } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"
import { DialogFocusScope } from "./dialog-focus"
import { useDrawerContext } from "./drawer"

const StyledContent = chakra(Slide)

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

    const { getContentProps, isOpen } = useDialogContext()

    const contentProps = getContentProps(rest, ref) as any
    const styles = useDialogStyles()

    const ContentStyles = defineStyle({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.content,
    })

    const { placement } = useDrawerContext()

    return (
      <DialogFocusScope>
        <StyledContent
          motionProps={motionProps}
          direction={placement}
          in={isOpen}
          className={cx("chakra-dialog__content", className)}
          {...contentProps}
          __css={ContentStyles}
        >
          {children}
        </StyledContent>
      </DialogFocusScope>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
