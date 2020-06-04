import * as React from "react"
import { PropsOf, chakra } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type SkipNavLinkProps = PropsOf<typeof chakra.a>

const fallbackId = "chakra-skip-nav"

const StyledLink = chakra("a", {
  baseStyle: ({ colorMode }) => ({
    borderRadius: "md",
    fontWeight: "semibold",
    userSelect: "none",
    border: "0",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0",
    outline: "0",
    overflow: "hidden",
    position: "absolute",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      left: "1.5rem",
      bg: colorMode === "light" ? "white" : "gray.700",
      width: "auto",
      height: "auto",
    },
  }),
})

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 */
export const SkipNavLink = React.forwardRef(
  (props: SkipNavLinkProps, ref: React.Ref<any>) => {
    const { id = fallbackId, sx, ...rest } = props
    return (
      <StyledLink
        ref={ref}
        className="chakra-skip-link"
        href={`#${id}`}
        sx={{
          clip: "rect(0 0 0 0)",
          _focus: { clip: "auto" },
          ...sx,
        }}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  SkipNavLink.displayName = "SkipNavLink"
}

export type SkipNavContentProps = PropsOf<"div">

/**
 * Renders a div as the target for the link.
 */
export const SkipNavContent = React.forwardRef(
  (props: SkipNavContentProps, ref: React.Ref<any>) => {
    const { id = fallbackId, ...rest } = props
    return <chakra.div ref={ref} id={id} tabIndex={-1} outline="0" {...rest} />
  },
)

if (__DEV__) {
  SkipNavContent.displayName = "SkipNavContent"
}
