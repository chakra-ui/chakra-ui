import { cloneElement, forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../system"
import { useAvatarContext, useAvatarStyles } from "./avatar-context"

export interface AvatarFallbackProps extends HTMLChakraProps<"div"> {}

export const AvatarFallback = forwardRef<HTMLSpanElement, any>(
  function AvatarFallback(props, ref) {
    const { icon, iconLabel, name, showFallback, getInitials } =
      useAvatarContext()

    const styles = useAvatarStyles()

    if (!showFallback) return null

    if (name != null) {
      return (
        <chakra.div
          ref={ref}
          role="img"
          aria-label={name}
          {...props}
          __css={styles.label}
        >
          {getInitials(name)}
        </chakra.div>
      )
    }

    return cloneElement(icon, {
      ref,
      role: "img",
      "aria-label": iconLabel,
    })
  },
)

AvatarFallback.displayName = "AvatarFallback"
