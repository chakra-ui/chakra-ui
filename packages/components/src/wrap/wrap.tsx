import { SystemProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { Children, useMemo } from "react"
import { chakra, forwardRef, HTMLChakraProps } from "../system"

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

  const _children = useMemo(
    () =>
      shouldWrapChildren
        ? Children.map(children, (child, index) => (
            <WrapItem key={index}>{child}</WrapItem>
          ))
        : children,
    [children, shouldWrapChildren],
  )

  return (
    <chakra.div ref={ref} className={cx("chakra-wrap", className)} {...rest}>
      <chakra.ul
        className="chakra-wrap__list"
        __css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: justify,
          alignItems: align,
          flexDirection: direction,
          listStyleType: "none",
          gap: spacing,
          columnGap: spacingX,
          rowGap: spacingY,
          padding: "0",
        }}
      >
        {_children}
      </chakra.ul>
    </chakra.div>
  )
})

Wrap.displayName = "Wrap"

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const WrapItem = forwardRef<WrapItemProps, "li">(
  function WrapItem(props, ref) {
    const { className, ...rest } = props
    return (
      <chakra.li
        ref={ref}
        __css={{ display: "flex", alignItems: "flex-start" }}
        className={cx("chakra-wrap__listitem", className)}
        {...rest}
      />
    )
  },
)

WrapItem.displayName = "WrapItem"
