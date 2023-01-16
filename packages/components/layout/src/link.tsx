import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

export interface LinkProps extends HTMLChakraProps<"a">, ThemingProps<"Link"> {
  /**
   *  If `true`, the link will open in new tab
   *
   * @default false
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
 * @see Docs https://chakra-ui.com/link
 */
export const Link = forwardRef<LinkProps, "a">(function Link(props, ref) {
  const styles = useStyleConfig("Link", props)
  const { className, isExternal, ...rest } = omitThemingProps(props)

  return (
    <chakra.a
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      ref={ref}
      className={cx("chakra-link", className)}
      {...rest}
      __css={styles}
    />
  )
})

Link.displayName = "Link"
