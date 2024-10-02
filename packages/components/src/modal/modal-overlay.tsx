import { SystemStyleObject } from "@chakra-ui/styled-system"
import { ChakraProps, chakra, forwardRef } from "../system"
import { cx } from "@chakra-ui/utils"
import { HTMLMotionProps, motion } from "framer-motion"
import { fadeConfig } from "../transition"
import { useModalContext, useModalStyles } from "./modal"

const MotionDiv = chakra(motion.div)

export interface ModalOverlayProps
  extends Omit<HTMLMotionProps<"div">, "color" | "transition">,
    ChakraProps {
  children?: React.ReactNode
  motionProps?: HTMLMotionProps<"div">
}

/**
 * ModalOverlay renders a backdrop behind the modal. It is
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalOverlay = forwardRef<ModalOverlayProps, "div">(
  (props, ref) => {
    const { className, transition, motionProps: _motionProps, ...rest } = props
    const _className = cx("chakra-modal__overlay", className)

    const styles = useModalStyles()
    const overlayStyle: SystemStyleObject = {
      pos: "fixed",
      left: "0",
      top: "0",
      w: "100vw",
      h: "100vh",
      ...styles.overlay,
    }

    const { motionPreset } = useModalContext()
    const defaultMotionProps: HTMLMotionProps<"div"> =
      motionPreset === "none" ? {} : fadeConfig

    const motionProps: any = _motionProps || defaultMotionProps

    return (
      <MotionDiv
        {...motionProps}
        __css={overlayStyle}
        ref={ref}
        className={_className}
        {...rest}
      />
    )
  },
)

ModalOverlay.displayName = "ModalOverlay"
