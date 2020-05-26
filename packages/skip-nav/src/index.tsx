import * as React from "react"
import { PropsOf, chakra, useColorModeValue } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type SkipNavLinkProps = PropsOf<typeof chakra.a>

const fallbackId = "chakra-skip-nav"

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 */
export function SkipNavLink(props: SkipNavLinkProps) {
  const { id = fallbackId, sx, ...rest } = props
  const bg = useColorModeValue("white", "gray.700")
  return (
    <chakra.a
      href={`#${id}`}
      borderRadius="md"
      fontWeight="semibold"
      userSelect="none"
      border="0"
      height="1px"
      width="1px"
      margin="-1px"
      padding="0"
      outline="0"
      overflow="hidden"
      position="absolute"
      _focus={{
        boxShadow: "outline",
        padding: "1rem",
        position: "fixed",
        top: "1.5rem",
        left: "1.5rem",
        bg,
        width: "auto",
        height: "auto",
      }}
      sx={{
        clip: "rect(0 0 0 0)",
        _focus: { clip: "auto" },
        ...sx,
      }}
      {...rest}
    />
  )
}

if (__DEV__) {
  SkipNavLink.displayName = "SkipNavLink"
}

export type SkipNavContentProps = PropsOf<"div">

/**
 * Renders a div as the target for the link.
 */
export function SkipNavContent(props: SkipNavContentProps) {
  const { id = fallbackId, ...rest } = props
  return <chakra.div id={id} {...rest} />
}

if (__DEV__) {
  SkipNavContent.displayName = "SkipNavContent"
}
