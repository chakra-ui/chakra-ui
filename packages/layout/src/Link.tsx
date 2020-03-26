import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"

/**
 * @todo Add to migration guide
 *
 * A11y: We removed `isDisabled` prop from link. A link should never be
 * allowed to be disabled.
 */

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

export type LinkProps = PropsOf<typeof Link>

export const Link = chakra<"a", LinkOptions>("a", {
  themeKey: "Link",
  attrs: props => ({
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
