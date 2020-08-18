import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import * as React from "react"
import { __DEV__, cx } from "@chakra-ui/utils"

export interface LinkProps extends PropsOf<typeof chakra.a>, ThemingProps {
  /**
   * If `true`, the link will stretch to the full width and height of its
   * nearest parent whose `position` is `relative`.
   */
  breakout?: boolean
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
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
  const { breakout, className, isExternal, ...rest } = omitThemingProps(props)

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      ref={ref}
      className={cx("chakra-link", className)}
      {...rest}
      __css={{
        ...(breakout && {
          position: "static",
          "&::before": {
            content: "''",
            cursor: "inherit",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        }),
        ...styles,
      }}
    />
  )
})

if (__DEV__) {
  Link.displayName = "Link"
}
