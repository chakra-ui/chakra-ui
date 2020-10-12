import { chakra, forwardRef, PropsOf } from "@chakra-ui/system"
import * as React from "react"

export interface LinkOverlayProps extends PropsOf<typeof chakra.a> {}

export const LinkOverlay = (props: LinkOverlayProps) => (
  <chakra.a
    {...props}
    css={{
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
    }}
  />
)

export interface LinkBoxProps
  extends PropsOf<typeof chakra.div>,
    Pick<PropsOf<"a">, "href" | "target" | "rel"> {
  isExternal?: boolean
}

/**
 * LinkBox is used to wrap content areas within a link while ensuring semantic html
 * To learn more, @see https://github.com/chakra-ui/chakra-ui/pull/1717
 */
const LinkBox = forwardRef(function LinkBox(props: LinkBoxProps, ref) {
  const { children, href, target, rel, isExternal, ...rest } = props

  return (
    <chakra.div ref={ref} pos="relative" {...rest}>
      {children}
      <LinkOverlay
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      />
    </chakra.div>
  )
})

export default LinkBox
