import {
  chakra,
  PropsOf,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { getValidChildren, __DEV__, cx } from "@chakra-ui/utils"
import React, { ReactNode, cloneElement } from "react"
import { baseStyle } from "./avatar"

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: ReactNode
  /**
   * The space between the avatars in the group.
   */
  spacing?: SystemProps["margin"]
  /**
   * The maximum number of visible avatars
   */
  max?: number
}

export interface AvatarGroupProps
  extends AvatarGroupOptions,
    Omit<PropsOf<typeof chakra.div>, "children">,
    ThemingProps {}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps, "div">(
  function AvatarGroup(props, ref) {
    const styles = useMultiStyleConfig("Avatar", props)

    const {
      children,
      borderColor,
      max,
      spacing = "-0.75rem",
      ...rest
    } = omitThemingProps(props)

    const validChildren = getValidChildren(children)

    /**
     * get the avatars within the max
     */
    const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

    /**
     * get the remaining avatar count
     */
    const excess = max != null && validChildren.length - max

    /**
     * Reversing the children is a great way to avoid using zIndex
     * to overlap the avatars
     */
    const reversedChildren = childrenWithinMax.reverse()

    const clones = reversedChildren.map((child, index) => {
      const isFirstAvatar = index === 0

      return cloneElement(child, {
        mr: isFirstAvatar ? 0 : spacing,
        size: props.size,
        borderColor: child.props.borderColor || borderColor,
        showBorder: true,
      })
    })

    const groupStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "row-reverse",
    }

    const excessStyles = {
      borderRadius: "full",
      ml: spacing,
      ...baseStyle,
      ...styles.excessLabel,
    }

    return (
      <chakra.div
        ref={ref}
        role="group"
        __css={groupStyles}
        {...rest}
        className={cx("chakra-avatar__group", props.className)}
      >
        {excess > 0 && (
          <chakra.span
            className="chakra-avatar__excess"
            data-testid="avatar-excess"
            __css={excessStyles}
            children={`+${excess}`}
          />
        )}
        {clones}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  AvatarGroup.displayName = "AvatarGroup"
}
