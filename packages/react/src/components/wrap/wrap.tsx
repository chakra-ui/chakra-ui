import { cx } from "@chakra-ui/utils"
import { Children, useMemo } from "react"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"

interface WrapOptions {
  /**
   * The `justify-content` value (for cross-axis alignment)
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: SystemStyleObject["justifyContent"]
  /**
   * The `align-items` value (for main axis alignment)
   * @type SystemStyleObject["alignItems"]
   */
  align?: SystemStyleObject["alignItems"]
  /**
   * The `flex-direction` value
   * @type SystemStyleObject["flexDirection"]
   */
  direction?: SystemStyleObject["flexDirection"]
  /**
   * If `true`, the children will be wrapped in a `WrapItem`
   * @default false
   */
  shouldWrapChildren?: boolean
}

export interface WrapProps extends HTMLChakraProps<"div", WrapOptions> {}

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
    gap = "0.5rem",
    columnGap,
    rowGap,
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
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: justify,
          alignItems: align,
          flexDirection: direction,
          listStyleType: "none",
          gap,
          columnGap,
          rowGap,
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
        css={{ display: "flex", alignItems: "flex-start" }}
        className={cx("chakra-wrap__listitem", className)}
        {...rest}
      />
    )
  },
)

WrapItem.displayName = "WrapItem"
