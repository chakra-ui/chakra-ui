import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, filterUndefined, __DEV__ } from "@chakra-ui/utils"
import { getValidChildren } from "@chakra-ui/react-utils"
import * as React from "react"
import { baseStyle } from "./avatar"

interface AvatarGroupOptions {
  /**
   * The children of the avatar group.
   *
   * Ideally should be `Avatar` and `MoreIndicator` components
   */
  children: React.ReactNode
  /**
   * The space between the avatars in the group.
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  /**
   * The maximum number of visible avatars
   */
  max?: number
}

export interface AvatarGroupProps
  extends AvatarGroupOptions,
    Omit<HTMLChakraProps<"div">, "children">,
    ThemingProps<"Avatar"> {}

/**
 * AvatarGroup displays a number of avatars grouped together in a stack.
 */
export const AvatarGroup = forwardRef<AvatarGroupProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Avatar", props)

  const {
    children,
    borderColor,
    max,
    spacing = "-0.75rem",
    borderRadius = "full",
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

    const childProps = {
      marginEnd: isFirstAvatar ? 0 : spacing,
      size: props.size,
      borderColor: child.props.borderColor ?? borderColor,
      showBorder: true,
    }

    return React.cloneElement(child, filterUndefined(childProps))
  })

  const groupStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  }

  const excessStyles: SystemStyleObject = {
    borderRadius,
    marginStart: spacing,
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
        <chakra.span className="chakra-avatar__excess" __css={excessStyles}>
          {`+${excess}`}
        </chakra.span>
      )}
      {clones}
    </chakra.div>
  )
})

if (__DEV__) {
  AvatarGroup.displayName = "AvatarGroup"
}
