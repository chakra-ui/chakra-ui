import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

/**
 * Layout component used to visually separate content in a list or group.
 * It displays a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/divider
 */
export const Divider = forwardRef<DividerProps, "hr">(function Divider(
  props,
  ref,
) {
  const {
    borderLeftWidth,
    borderBottomWidth,
    borderTopWidth,
    borderRightWidth,
    borderWidth,
    borderStyle,
    borderColor,
    ...styles
  } = useStyleConfig("Divider", props)
  const {
    className,
    orientation = "horizontal",
    __css,
    ...rest
  } = omitThemingProps(props)

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
      __css={{
        ...styles,
        border: "0",

        borderColor,
        borderStyle,
        ...dividerStyles[orientation],
        ...__css,
      }}
      className={cx("chakra-divider", className)}
    />
  )
})

export interface DividerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Divider"> {
  orientation?: "horizontal" | "vertical"
}

Divider.displayName = "Divider"
