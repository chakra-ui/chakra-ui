import { chakra, createChakra, SystemProps } from "@chakra-ui/system"
import { getValidChildren } from "@chakra-ui/utils"
import * as React from "react"
import { AvatarProps } from "./Avatar"

const MoreAvatarLabel = createChakra("div", {
  themeKey: "Avatar",
  baseStyle: props => ({
    bg: props.colorMode === "light" ? "gray.200" : "whiteAlpha.400",
  }),
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

export type AvatarGroupProps = AvatarGroupOptions & AvatarProps

export const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    children,
    borderColor,
    max,
    spacing = -3,
    variantSize,
    ...rest
  } = props

  const validChildren = getValidChildren(children)

  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren

  const remainingAvatarCount = max && validChildren.length - max

  // Reversing the children is a great way to avoid using zIndex
  // to overlap the avatars
  const reversedChildren = childrenWithinMax.reverse()

  type AvatarElement = React.ReactElement<AvatarProps>

  const clones = reversedChildren.map((child, index) => {
    const isFirstAvatar = index === 0

    return React.cloneElement(child as AvatarElement, {
      marginRight: isFirstAvatar ? 0 : spacing,
      variantSize,
      borderColor: child.props["borderColor"] || borderColor,
      showBorder: true,
    })
  })

  return (
    <chakra.div
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection="row-reverse"
      {...rest}
    >
      {remainingAvatarCount && (
        <MoreAvatarLabel
          variantSize={variantSize}
          marginLeft={spacing}
          children={`+${remainingAvatarCount}`}
        />
      )}
      {clones}
    </chakra.div>
  )
}

export default AvatarGroup
