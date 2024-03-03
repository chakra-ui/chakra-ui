import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  defineStyle,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface SkipNavLinkProps
  extends HTMLChakraProps<"a">,
    SystemRecipeProps<"SkipNavLink"> {}

const fallbackId = "chakra-skip-nav"

const baseStyle = defineStyle({
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
})

/**
 * Renders a link that remains hidden until focused to skip to the main content.
 *
 * @see Docs https://chakra-ui.com/docs/components/skip-nav
 */
export const SkipNavLink = forwardRef<SkipNavLinkProps, "a">(
  function SkipNavLink(props, ref) {
    const recipe = useRecipe("SkipLink")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    localProps.id ||= fallbackId

    return (
      <chakra.a
        {...localProps}
        ref={ref}
        href={`#${localProps.id}`}
        css={[baseStyle, styles]}
      />
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
