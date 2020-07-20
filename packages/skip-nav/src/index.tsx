import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type SkipNavLinkProps = PropsOf<typeof chakra.a>

const fallbackId = "chakra-skip-nav"

const baseStyle: SystemStyleObject = {
  userSelect: "none",
  border: "0",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  outline: "0",
  overflow: "hidden",
  position: "absolute",
  clip: "rect(0 0 0 0)",
  _focus: {
    clip: "auto",
    width: "auto",
    height: "auto",
  },
}

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 */
export const SkipNavLink = React.forwardRef(function SkipNavLink(
  props: SkipNavLinkProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("SkipLink", props)
  const { id = fallbackId, ...rest } = omitThemingProps(props)

  const linkStyles = {
    ...baseStyle,
    ...styles,
  }

  return <chakra.a {...rest} ref={ref} href={`#${id}`} __css={linkStyles} />
})

if (__DEV__) {
  SkipNavLink.displayName = "SkipNavLink"
}

export type SkipNavContentProps = PropsOf<"div">

/**
 * Renders a div as the target for the link.
 */
export const SkipNavContent = React.forwardRef(function SkipNavContent(
  props: SkipNavContentProps,
  ref: React.Ref<any>,
) {
  const { id = fallbackId, ...rest } = props
  return (
    <div ref={ref} id={id} tabIndex={-1} style={{ outline: 0 }} {...rest} />
  )
})

if (__DEV__) {
  SkipNavContent.displayName = "SkipNavContent"
}
