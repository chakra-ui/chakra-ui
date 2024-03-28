"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  defineStyle,
} from "../../styled-system"
import { useAvatarStyles } from "./avatar-context"

type BadgePlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end"

const placementMap: Record<BadgePlacement, SystemStyleObject> = {
  "top-start": {
    top: "0",
    insetStart: "0",
    transform: "translate(-25%, -25%)",
  },
  "top-end": {
    top: "0",
    insetEnd: "0",
    transform: "translate(25%, -25%)",
  },
  "bottom-start": {
    bottom: "0",
    insetStart: "0",
    transform: "translate(-25%, 25%)",
  },
  "bottom-end": {
    bottom: "0",
    insetEnd: "0",
    transform: "translate(25%, 25%)",
  },
}

export interface AvatarBadgeProps extends HTMLChakraProps<"div"> {
  placement?: BadgePlacement
}

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<HTMLDivElement, AvatarBadgeProps>(
  function AvatarBadge(props, ref) {
    const { placement = "bottom-end", ...rest } = props
    const styles = useAvatarStyles()

    const placementStyles = placementMap[placement]

    const badgeStyles = defineStyle({
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...placementStyles,
      ...styles.badge,
    })

    return (
      <chakra.div
        ref={ref}
        {...rest}
        className={cx("chakra-avatar__badge", props.className)}
        css={[badgeStyles, props.css]}
      />
    )
  },
)

AvatarBadge.displayName = "AvatarBadge"
