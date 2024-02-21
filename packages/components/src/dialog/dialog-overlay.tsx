import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps, motion } from "framer-motion"
import { ChakraProps, chakra, forwardRef } from "../system"
import { fadeConfig } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"

const MotionDiv = chakra(motion.div)

export interface DialogOverlayProps
  extends Omit<HTMLMotionProps<"div">, "color" | "transition">,
    ChakraProps {
  children?: React.ReactNode
  motionProps?: HTMLMotionProps<"div">
}

/**
 * Renders a backdrop behind the dialog.
 * It is also used as a wrapper for the dialog content for better positioning.
 *
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogOverlay = forwardRef<DialogOverlayProps, "div">(
  (props, ref) => {
    const { className, transition, motionProps: _motionProps, ...rest } = props
    const _className = cx("chakra-dialog__overlay", className)

    const styles = useDialogStyles()

    const overlayStyles = defineStyle({
      pos: "fixed",
      left: "0",
      top: "0",
      w: "100vw",
      h: "100vh",
      ...styles.overlay,
    })

    const { motionPreset } = useDialogContext()

    const defaultMotionProps: HTMLMotionProps<"div"> =
      motionPreset === "none" ? {} : fadeConfig

    const motionProps: any = _motionProps || defaultMotionProps

    return (
      <MotionDiv
        {...motionProps}
        __css={overlayStyles}
        ref={ref}
        className={_className}
        {...rest}
      />
    )
  },
)

DialogOverlay.displayName = "DialogOverlay"
