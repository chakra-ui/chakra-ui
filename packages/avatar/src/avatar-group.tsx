import {
  chakra,
  PropsOf,
  SystemProps,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { cx, getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { baseStyle } from "./avatar"

const AvatarExcessLabel = chakra("span", {
  baseStyle: {
    ...baseStyle,
    borderRadius: "full",
  },
})

if (__DEV__) {
  AvatarExcessLabel.displayName = "AvatarExcessLabel"
}

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode
  /**
   * The space between the avatars in the group.
   */
  spacing?: SystemProps["margin"]
  /**
   * The maximum number of visible avatars
   */
  max?: number
}

const StyledGroup = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
})

export type AvatarGroupProps = AvatarGroupOptions &
  PropsOf<typeof StyledGroup> &
  ThemingProps

/**
 * AvatarGroup
 *
 * React component to displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = React.forwardRef(function AvatarGroup(
  props: AvatarGroupProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Avatar", props)
  const realProps = omitThemingProps(props)

  const {
    children,
    borderColor,
    max,
    spacing = -3,
    className,
    ...rest
  } = realProps

  const validChildren = getValidChildren(children)

  /**
   * get the avatars within the max
   */
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

  /**
   * get the remaining avatar count
   */
  const excess = max && validChildren.length - max

  /**
   * Reversing the children is a great way to avoid using zIndex
   * to overlap the avatars
   */
  const reversedChildren = childrenWithinMax.reverse()

  const clones = reversedChildren.map((child, index) => {
    const isFirstAvatar = index === 0

    return React.cloneElement(child as React.ReactElement<any>, {
      marginRight: isFirstAvatar ? 0 : spacing,
      size: props.size,
      borderColor: child.props.borderColor || borderColor,
      showBorder: true,
    })
  })

  const _className = cx("chakra-avatar-group", className)

  return (
    <StyledGroup ref={ref} role="group" className={_className} {...rest}>
      {excess && (
        <AvatarExcessLabel
          className="chakra-avatar-group__excess"
          ml={spacing}
          __css={styles.excessLabel}
          children={`+${excess}`}
        />
      )}
      {clones}
    </StyledGroup>
  )
})

if (__DEV__) {
  AvatarGroup.displayName = "AvatarGroup"
}
