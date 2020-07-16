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

interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
}

export type LinkProps = PropsOf<typeof chakra.a> & LinkOptions & ThemingProps

/**
 * Link
 *
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

export const Link = forwardRef<LinkProps>(function Link(props, ref) {
  const styles = useStyleConfig("Link", props)
  const { className, isExternal, isDisabled, ...rest } = omitThemingProps(props)

  return (
    <chakra.a
      tabIndex={isDisabled ? -1 : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-disabled={isDisabled || undefined}
      ref={ref}
      className={cx("chakra-link", className)}
      {...rest}
      __css={styles.link}
    />
  )
})

if (__DEV__) {
  Link.displayName = "Link"
}
