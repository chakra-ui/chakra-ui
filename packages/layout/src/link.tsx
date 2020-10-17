import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import * as React from "react"
import { __DEV__, cx, isDisabled } from "@chakra-ui/utils"
import { useClickable } from "@chakra-ui/clickable"

export interface LinkProps extends PropsOf<typeof chakra.a>, ThemingProps {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
  /**
   * If `true`, the link will be disabled
   */
  isDisabled?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 *
 * @see Docs https://chakra-ui.com/components/link
 */
export const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const styles = useStyleConfig("Link", props)
  const {
    className,
    isExternal,
    isDisabled,
    onClick,
    onAuxClick,
    onTouchStart,
    onDoubleClick,
    href,
    ...rest
  } = omitThemingProps(props)

  const clickableProps = useClickable({
    ref,
    isFocusable: isDisabled,
    isDisabled,
    onClick,
    onAuxClick,
    onTouchStart,
    onDoubleClick,
  })

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cx("chakra-link", className)}
      href={isDisabled ? undefined : href}
      {...rest}
      {...clickableProps}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Link.displayName = "Link"
}
