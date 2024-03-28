"use client"

import { cx } from "@chakra-ui/utils"
import type { HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "../dialog/dialog-context"
import { DialogFocusScope } from "../dialog/dialog-focus-scope"
import { Slide } from "../transition"
import { useDrawerContext } from "./drawer-context"

const StyledContent = chakra(Slide)

export interface DrawerContentProps extends HTMLChakraProps<"section"> {
  /**
   * The custom framer-motion transition to use for the dialog
   */
  motionProps?: HTMLMotionProps<"section">
}

/**
 * Used to group dialog's content. It has all the
 * necessary `aria-*` properties to indicate that it is a dialog
 */
export const DrawerContent = forwardRef<HTMLElement, DrawerContentProps>(
  function DrawerContent(props, ref) {
    const { children, motionProps, ...rest } = props

    const api = useDialogContext()
    const drawerApi = useDrawerContext()

    const styles = useDialogStyles()

    return (
      <DialogFocusScope>
        <StyledContent
          motionProps={motionProps}
          direction={drawerApi.placement}
          in={api.open}
          {...(api.getContentProps(rest, ref) as any)}
          className={cx("chakra-dialog__content", props.className)}
          css={[styles.content, props.css]}
        >
          {children}
        </StyledContent>
      </DialogFocusScope>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
