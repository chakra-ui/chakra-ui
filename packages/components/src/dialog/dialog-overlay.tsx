import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps, m, LazyMotion, domAnimation } from "framer-motion"
import { ChakraProps, chakra, forwardRef } from "../system"
import { fadeConfig } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"

const StyledDiv = chakra(m.div)

export interface DialogOverlayProps
  extends Omit<HTMLMotionProps<"div">, "color" | "transition">,
    ChakraProps {
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
      <LazyMotion features={domAnimation}>
        <StyledDiv
          {...motionProps}
          {...rest}
          __css={styles.overlay}
          ref={ref}
          className={cx("chakra-dialog__overlay", props.className)}
        />
      </LazyMotion>
    )
  },
)

DialogOverlay.displayName = "DialogOverlay"
