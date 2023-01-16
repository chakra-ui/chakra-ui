import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemProps,
  tokenToCSSVar,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { mapResponsive } from "@chakra-ui/breakpoint-utils"
import { Children, useMemo } from "react"

export interface WrapProps extends HTMLChakraProps<"div"> {
  /**
   * The space between each child (even if it wraps)
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
  /**
   * The horizontal space between the each child (even if it wraps). Defaults to `spacing` if not defined.
   * @type SystemProps["margin"]
   */
  spacingX?: SystemProps["margin"]
  /**
   * The vertical space between the each child (even if it wraps). Defaults to `spacing` if not defined.
   * @type SystemProps["margin"]
   */
  spacingY?: SystemProps["margin"]
  /**
   * The `justify-content` value (for cross-axis alignment)
   * @type SystemProps["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]
  /**
   * The `align-items` value (for main axis alignment)
   * @type SystemProps["alignItems"]
   */
  align?: SystemProps["alignItems"]
  /**
   * The `flex-direction` value
   * @type SystemProps["flexDirection"]
   */
  direction?: SystemProps["flexDirection"]
  /**
   * If `true`, the children will be wrapped in a `WrapItem`
   * @default false
   */
  shouldWrapChildren?: boolean
}

function px(value: number | string | null): string | null {
  return typeof value === "number" ? `${value}px` : value
}

/**
 * Layout component used to stack elements that differ in length
 * and are liable to wrap.
 *
 * Common use cases:
 * - Buttons that appear together at the end of forms
 * - Lists of tags and chips
 *
 * @see Docs https://chakra-ui.com/wrap
 */
export const Wrap = forwardRef<WrapProps, "div">(function Wrap(props, ref) {
  const {
    spacing = "0.5rem",
    spacingX,
    spacingY,
    children,
    justify,
    direction,
    align,
    className,
    shouldWrapChildren,
    ...rest
  } = props

  const styles = useMemo(() => {
    const { spacingX: x = spacing, spacingY: y = spacing } = {
      spacingX,
      spacingY,
    }
    return {
      "--chakra-wrap-x-spacing": (theme: Record<string, any>) =>
        mapResponsive(x, (value) => px(tokenToCSSVar("space", value)(theme))),
      "--chakra-wrap-y-spacing": (theme: Record<string, any>) =>
        mapResponsive(y, (value) => px(tokenToCSSVar("space", value)(theme))),
      "--wrap-x-spacing": "calc(var(--chakra-wrap-x-spacing) / 2)",
      "--wrap-y-spacing": "calc(var(--chakra-wrap-y-spacing) / 2)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: justify,
      alignItems: align,
      flexDirection: direction,
      listStyleType: "none",
      padding: "0",
      margin:
        "calc(var(--wrap-y-spacing) * -1) calc(var(--wrap-x-spacing) * -1)",
      "& > *:not(style)": {
        margin: "var(--wrap-y-spacing) var(--wrap-x-spacing)",
      },
    }
  }, [spacing, spacingX, spacingY, justify, align, direction])

  const childrenToRender = useMemo(
    () =>
      shouldWrapChildren
        ? Children.map(children, (child, index) => (
            <WrapItem key={index}>{child}</WrapItem>
          ))
        : children,
    [children, shouldWrapChildren],
  )

  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-wrap", className)}
      overflow="hidden"
      {...rest}
    >
      <chakra.ul className="chakra-wrap__list" __css={styles}>
        {childrenToRender}
      </chakra.ul>
    </chakra.div>
  )
})

Wrap.displayName = "Wrap"

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const WrapItem = forwardRef<WrapItemProps, "li">(function WrapItem(
  props,
  ref,
) {
  const { className, ...rest } = props
  return (
    <chakra.li
      ref={ref}
      __css={{ display: "flex", alignItems: "flex-start" }}
      className={cx("chakra-wrap__listitem", className)}
      {...rest}
    />
  )
})

WrapItem.displayName = "WrapItem"
