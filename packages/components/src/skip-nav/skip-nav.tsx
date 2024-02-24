import {
  ThemingProps,
  defineStyle,
  omitThemingProps,
} from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef, useStyleConfig } from "../system"

export interface SkipNavLinkProps
  extends HTMLChakraProps<"a">,
    ThemingProps<"SkipNavLink"> {}

const fallbackId = "chakra-skip-nav"

function getStyles(styles: any) {
  return defineStyle({
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
    ...styles,
    _focus: {
      clip: "auto",
      width: "auto",
      height: "auto",
      ...styles["_focus"],
    },
  })
}

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs https://chakra-ui.com/docs/components/skip-nav
 */
export const SkipNavLink = forwardRef<SkipNavLinkProps, "a">(
  function SkipNavLink(props, ref) {
    const styles = useStyleConfig("SkipLink", props)
    const { id = fallbackId, ...rest } = omitThemingProps(props)
    return (
      <chakra.a {...rest} ref={ref} href={`#${id}`} __css={getStyles(styles)} />
    )
  },
)

SkipNavLink.displayName = "SkipNavLink"

export interface SkipNavContentProps extends HTMLChakraProps<"div"> {}

/**
 * Renders a div as the target for the `SkipNavLink`.
 *
 * @see Docs https://chakra-ui.com/docs/components/skip-nav
 */
export const SkipNavContent = forwardRef<SkipNavContentProps, "div">(
  function SkipNavContent(props, ref) {
    const { id = fallbackId, ...rest } = props
    return (
      <chakra.div
        ref={ref}
        id={id}
        tabIndex={-1}
        style={{ outline: 0 }}
        {...rest}
      />
    )
  },
)

SkipNavContent.displayName = "SkipNavContent"
