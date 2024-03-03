import { cx } from "@chakra-ui/utils"
import type { HTMLMotionProps } from "framer-motion"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
export const DrawerContent = forwardRef<DrawerContentProps, "section">(
  function DrawerContent(props, ref) {
    const { className, children, motionProps, ...rest } = props

    const api = useDialogContext()
    const { placement } = useDrawerContext()
    const styles = useDialogStyles()

    return (
      <DialogFocusScope>
        <StyledContent
          motionProps={motionProps}
          direction={placement}
          in={api.isOpen}
          {...(api.getContentProps(rest, ref) as any)}
          className={cx("chakra-dialog__content", className)}
          css={styles.content}
        >
          {children}
        </StyledContent>
      </DialogFocusScope>
    )
  },
)

DrawerContent.displayName = "DrawerContent"
