import {
  chakra,
  PropsOf,
  SystemProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { getValidChildren, cx } from "@chakra-ui/utils"
import * as React from "react"
import { baseStyle } from "./Avatar"

const ExcessLabel = chakra("span", {
  themeKey: "Avatar.ExcessLabel",
  baseStyle: {
    ...baseStyle,
    borderRadius: "full",
  },
})

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

export type AvatarGroupProps = AvatarGroupOptions & PropsOf<typeof StyledGroup>

const StyledGroup = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
})

/**
 * AvatarGroup
 *
 * React component to displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = (props: AvatarGroupProps) => {
  const defaults = useThemeDefaultProps("Avatar")

  const {
    children,
    borderColor,
    max,
    spacing = -3,
    size = defaults?.size,
    ...rest
  } = props

  const validChildren = getValidChildren(children)

  /**
   * get the avatars within the max
   */
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

  /**
   * get the remaining avatar count
   */
  const moreAvatarCount = max && validChildren.length - max

  /**
   * Reversing the children is a great way to avoid using zIndex
   * to overlap the avatars
   */
  const reversedChildren = childrenWithinMax.reverse()

  const clones = reversedChildren.map((child, index) => {
    const isFirstAvatar = index === 0

    return React.cloneElement(child as React.ReactElement<any>, {
      marginRight: isFirstAvatar ? 0 : spacing,
      size,
      borderColor: child.props.borderColor || borderColor,
      showBorder: true,
    })
  })

  return (
    <StyledGroup
      {...rest}
      role="group"
      className={cx("chakra-avatar-group", rest.className)}
    >
      {moreAvatarCount && (
        <ExcessLabel
          className="chakra-avatar-group__excess"
          size={size}
          ml={spacing}
          children={`+${moreAvatarCount}`}
        />
      )}
      {clones}
    </StyledGroup>
  )
}
