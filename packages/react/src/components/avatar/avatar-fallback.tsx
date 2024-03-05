import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useAvatarContext, useAvatarStyles } from "./avatar-context"
import { getInitials } from "./get-initials"

export interface AvatarFallbackProps extends HTMLChakraProps<"div"> {
  name?: string
}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const styles = useAvatarStyles()
    const api = useAvatarContext()

    const { name, ...restProps } = props
    const initials = props.name ? getInitials(props.name) : null

    return (
      <chakra.div
        ref={ref}
        role="img"
        aria-label={name}
        hidden={api.isLoaded}
        {...restProps}
        className={cx("chakra-avatar__fallback", props.className)}
        css={styles.fallback}
      >
        {props.children || initials}
      </chakra.div>
    )
  },
)

AvatarFallback.displayName = "AvatarFallback"
