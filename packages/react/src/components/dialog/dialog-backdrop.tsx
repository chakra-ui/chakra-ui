"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"
import { JsxStyleProps, chakra } from "../../styled-system"
import { HtmlProp } from "../../styled-system/factory.types"
import { fadeConfig } from "../transition"
import { useDialogContext, useDialogStyles } from "./dialog-context"

const StyledDiv = chakra(motion.div)

export interface DialogBackdropProps
  extends Omit<HTMLMotionProps<"div">, HtmlProp>,
    JsxStyleProps {
  motionProps?: HTMLMotionProps<"div">
}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  function DialogBackdrop(props, ref) {
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

DialogBackdrop.displayName = "DialogBackdrop"
