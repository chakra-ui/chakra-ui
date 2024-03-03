import { cx } from "@chakra-ui/utils"
import { HTMLMotionProps, motion } from "framer-motion"
import { JsxStyleProps, chakra, forwardRef } from "../../styled-system"
import { HtmlProp } from "../../styled-system/factory.types"
import { fadeConfig } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"

const StyledDiv = chakra(motion.div)

export interface DialogOverlayProps
  extends Omit<HTMLMotionProps<"div">, HtmlProp>,
    JsxStyleProps {
  motionProps?: HTMLMotionProps<"div">
}

export const DialogOverlay = forwardRef<DialogOverlayProps, "div">(
  function DialogOverlay(props, ref) {
    const { transition, motionProps: _motionProps, ...rest } = props

    const styles = useDialogStyles()
    const api = useDialogContext()

    const defaultMotionProps: HTMLMotionProps<"div"> =
      api.motionPreset === "none" ? {} : fadeConfig

    const motionProps: any = _motionProps || defaultMotionProps

    return (
      <StyledDiv
        {...motionProps}
        {...rest}
        css={styles.overlay}
        ref={ref}
        className={cx("chakra-dialog__overlay", props.className)}
      />
    )
  },
)

DialogOverlay.displayName = "DialogOverlay"
