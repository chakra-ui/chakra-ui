import { createChakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"

const externalLinkAttributes = {
  target: "_blank",
  rel: "noopener noreferrer",
}

const Link = createChakra("a", {
  themeKey: "Link",
  attrs: (props: LinkOptions) => ({
    ...(props.isExternal && externalLinkAttributes),
    tabIndex: props.isDisabled ? -1 : undefined,
    "aria-disabled": props.isDisabled || undefined,
    onClick: event => {
      props.isDisabled ? event.preventDefault() : props.onClick
    },
  }),
  shouldForwardProp: prop => !["isExternal", "isDisabled"].includes(prop),
})

export interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean
  /**
   * If `true`, the link will be disabled and not tabbable
   */
  isDisabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export type LinkProps = PropsOf<typeof Link> & LinkOptions

Link.displayName = "Link"

export default Link
