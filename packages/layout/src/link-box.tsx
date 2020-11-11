import {
  chakra,
  ChakraComponent,
  forwardRef,
  PropsOf,
  HTMLChakraProps,
} from "@chakra-ui/system"
import * as React from "react"

export interface LinkOverlayProps extends HTMLChakraProps<"a"> {}

export const LinkOverlay: ChakraComponent<"a"> = (props) => (
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

type BaseLinkProps = Pick<PropsOf<"a">, "href" | "target" | "rel">

export interface LinkBoxProps extends HTMLChakraProps<"div">, BaseLinkProps {
  isExternal?: boolean
}

/**
 * LinkBox is used to wrap content areas within a link while ensuring semantic html
 * To learn more, @see https://github.com/chakra-ui/chakra-ui/pull/1717
 */
export const LinkBox = forwardRef<LinkBoxProps, "div">(function LinkBox(props, ref) {
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
