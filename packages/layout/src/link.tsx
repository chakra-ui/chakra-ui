import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"

interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
  /**
   * Function called when the link is clicked
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export type LinkProps = PropsOf<typeof chakra.a> & LinkOptions

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
export const Link = chakra<"a", LinkOptions>("a", {
  themeKey: "Link",
  attrs: (props) => ({
    tabIndex: props.isDisabled ? -1 : undefined,
    "aria-disabled": props.isDisabled || undefined,
    ...(props.isExternal && {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
  }),
})

if (__DEV__) {
  Link.displayName = "Link"
}
