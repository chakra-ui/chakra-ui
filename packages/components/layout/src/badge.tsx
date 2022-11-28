import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  ChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useMemo } from "react"

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    ThemingProps<"Badge"> {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
export const Badge = forwardRef<BadgeProps, "span">(function Badge(props, ref) {
  const styles = useStyleConfig("Badge", props)
  const { className, ...rest } = omitThemingProps(props)
  const badgeStyle = useMemo((): ChakraProps => {
    if (props.noOfLines) {
      return {
        __css: {
          verticalAlign: "middle",
          ...styles,
        },
        sx: {
          display: props.display || "-webkit-inline-box",
          ...rest.sx,
        },
      }
    }
    return {
      __css: {
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...styles,
      },
    }
  }, [props.display, props.noOfLines, styles, rest.sx])

  return (
    <chakra.span
      ref={ref}
      className={cx("chakra-badge", props.className)}
      {...rest}
      {...badgeStyle}
    />
  )
})

Badge.displayName = "Badge"
