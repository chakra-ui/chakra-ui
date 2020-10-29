import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface LinkProps extends HTMLChakraProps<"a">, ThemingProps {
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
export const Link = forwardRef<LinkProps, "a">(function Link(props, ref) {
  const styles = useStyleConfig("Link", props)
  const { className, isExternal, ...rest } = omitThemingProps(props)

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      ref={ref}
      className={cx("chakra-link", className)}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Link.displayName = "Link"
}
