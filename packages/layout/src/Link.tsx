import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"

interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
  /**
   * If `true`, the link will be disabled and not tabbable
   */
  isDisabled?: boolean
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
    onClick: event => {
      props.isDisabled ? event.preventDefault() : props.onClick
    },
    ...(props.isExternal && { target: "_blank", rel: "noopener noreferrer" }),
  }),
  shouldForwardProp: prop => !["isExternal", "isDisabled"].includes(prop),
})

Link.displayName = "Link"
