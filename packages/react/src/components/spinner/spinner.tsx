import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  defineStyle,
  forwardRef,
  useRecipe,
} from "../../styled-system"

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   * @default "transparent"
   */
  emptyColor?: string
  /**
   * The color of the spinner
   */
  color?: string
  /**
   * The thickness of the spinner
   * @default "2px"
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string
  /**
   * The speed of the spinner.
   * @default "0.45s"
   * @example
   * ```jsx
   * <Spinner speed="0.2s"/>
   * ```
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string
}

export interface SpinnerProps
  extends HTMLChakraProps<"div", SpinnerOptions>,
    SystemRecipeProps<"Spinner"> {}

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/spinner
 */
export const Spinner = forwardRef<SpinnerProps, "div">(
  function Spinner(props, ref) {
    const recipe = useRecipe("Spinner")

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const {
      label = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      emptyColor = "transparent",
      className,
      ...rest
    } = localProps

    const spinnerStyles = defineStyle({
      ...styles,
      borderWidth: thickness,
      borderBottomColor: emptyColor,
      borderLeftColor: emptyColor,
      animationDuration: speed,
    })

    return (
      <chakra.div
        ref={ref}
        css={spinnerStyles}
        className={cx("chakra-spinner", className)}
        {...rest}
      >
        {label && <chakra.span srOnly>{label}</chakra.span>}
      </chakra.div>
    )
  },
)

Spinner.displayName = "Spinner"
