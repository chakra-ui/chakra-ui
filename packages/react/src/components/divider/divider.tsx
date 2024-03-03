import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

/**
 * Layout component used to visually separate content in a list or group.
 * It displays a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/divider
 */
export const Divider = forwardRef<DividerProps, "hr">(
  function Divider(props, ref) {
    const recipe = useRecipe("Divider")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const variantStyles = recipe(variantProps)

    const {
      borderLeftWidth,
      borderBottomWidth,
      borderTopWidth,
      borderRightWidth,
      borderWidth,
      borderStyle,
      borderColor,
      ...styles
    } = variantStyles

    const { className, orientation = "horizontal", css, ...rest } = localProps

    const dividerStyles = {
      vertical: {
        borderLeftWidth:
          borderLeftWidth || borderRightWidth || borderWidth || "1px",
        height: "100%",
      },
      horizontal: {
        borderBottomWidth:
          borderBottomWidth || borderTopWidth || borderWidth || "1px",
        width: "100%",
      },
    }

    return (
      <chakra.hr
        ref={ref}
        aria-orientation={orientation}
        {...rest}
        css={{
          ...styles,
          border: "0",

          borderColor,
          borderStyle,
          ...dividerStyles[orientation],
          ...css,
        }}
        className={cx("chakra-divider", className)}
      />
    )
  },
)

export interface DividerProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"Divider"> {
  orientation?: "horizontal" | "vertical"
}

Divider.displayName = "Divider"
