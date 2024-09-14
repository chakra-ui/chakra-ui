"use client"

import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { cx } from "../../utils"
import type { StackDirection } from "./get-separator-style"
import { getSeparatorStyles } from "./get-separator-style"

function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child),
  ) as React.ReactElement[]
}

interface StackOptions {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemStyleObject["alignItems"]
   */
  align?: SystemStyleObject["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemStyleObject["justifyContent"]
   */
  justify?: SystemStyleObject["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemStyleObject["flexWrap"]
   */
  wrap?: SystemStyleObject["flexWrap"]
  /**
   * The direction to stack the items.
   * @default "column"
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a separator
   * @type React.ReactElement
   */
  separator?: React.ReactElement
}

export interface StackProps extends HTMLChakraProps<"div", StackOptions> {}

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and separator between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/stack
 *
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const {
      direction = "column",
      align,
      justify,
      gap = "0.5rem",
      wrap,
      children,
      separator,
      className,
      ...rest
    } = props

    const separatorStyle = useMemo(
      () => getSeparatorStyles({ gap, direction }),
      [gap, direction],
    )

    const clones = useMemo(() => {
      if (!separator) return children
      return getValidChildren(children).map((child, index, arr) => {
        const key = typeof child.key !== "undefined" ? child.key : index
        const sep = cloneElement(separator, {
          css: [separatorStyle, separator.props.css],
        })
        return (
          <Fragment key={key}>
            {child}
            {index === arr.length - 1 ? null : sep}
          </Fragment>
        )
      })
    }, [children, separator, separatorStyle])

    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems={align}
        justifyContent={justify}
        flexDirection={direction}
        flexWrap={wrap}
        gap={separator ? undefined : gap}
        className={cx("chakra-stack", className)}
        {...rest}
      >
        {clones}
      </chakra.div>
    )
  },
)
