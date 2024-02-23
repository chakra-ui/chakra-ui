import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps, motion } from "framer-motion"
import { ChakraProps, chakra, forwardRef } from "../system"
import { fadeConfig } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"

const StyledDiv = chakra(motion.div)

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

    const { motionPreset } = useDialogContext()

    const defaultMotionProps: HTMLMotionProps<"div"> =
      motionPreset === "none" ? {} : fadeConfig

    const motionProps: any = _motionProps || defaultMotionProps

    return (
      <StyledDiv
        {...motionProps}
        __css={styles.overlay}
        ref={ref}
        className={_className}
        {...rest}
      />
    )
  },
)

DialogOverlay.displayName = "DialogOverlay"
