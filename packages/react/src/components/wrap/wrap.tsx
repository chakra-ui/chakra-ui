"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, SystemStyleObject, chakra } from "../../styled-system"

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
export const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  function Wrap(props, ref) {
    const {
      gap = "0.5rem",
      columnGap,
      rowGap,
      justify,
      direction,
      align,
      ...rest
    } = props

    return (
      <chakra.div
        ref={ref}
        {...rest}
        className={cx("chakra-wrap", props.className)}
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
          ...props.css,
        }}
      />
    )
  },
)

Wrap.displayName = "Wrap"
