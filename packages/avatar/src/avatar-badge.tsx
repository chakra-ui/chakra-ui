import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { useAvatarStyles } from "./avatar-context"

export interface AvatarBadgeProps extends HTMLChakraProps<"div"> {}

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<AvatarBadgeProps, "div">(
  function AvatarBadge(props, ref) {
    const styles = useAvatarStyles()

    const badgeStyles: SystemStyleObject = {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      insetEnd: "0",
      bottom: "0",
      ...styles.badge,
    }

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-avatar__badge", props.className)}
        __css={badgeStyles}
      />
    )
  },
)
if (__DEV__) {
  AvatarBadge.displayName = "AvatarBadge"
}
