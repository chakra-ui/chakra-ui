import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { getValidChildren } from "@chakra-ui/react-children-utils"
import { cloneElement, Fragment, useMemo } from "react"

import type { StackDirection } from "./stack.utils"
import { getDividerStyles, getStackStyles, selector } from "./stack.utils"
import { StackItem } from "./stack-item"

export type { StackDirection }

interface StackOptions {
  /**
   * Shorthand for `alignItems` style prop
   * @type SystemProps["alignItems"]
   */
  align?: SystemProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   * @type SystemProps["justifyContent"]
   */
  justify?: SystemProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   * @type SystemProps["flexWrap"]
   */
  wrap?: SystemProps["flexWrap"]
  /**
   * The space between each stack item
   * @type SystemProps["margin"]
   * @default "0.5rem"
   */
  spacing?: SystemProps["margin"]
  /**
   * The direction to stack the items.
   * @default "column"
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a divider
   * @type React.ReactElement
   */
  divider?: React.ReactElement
  /**
   * If `true`, the children will be wrapped in a `Box` with
   * `display: inline-block`, and the `Box` will take the spacing props
   *
   * @default false
   */
  shouldWrapChildren?: boolean
  /**
   * If `true` the items will be stacked horizontally.
   *
   * @default false
   */
  isInline?: boolean
}

export interface StackProps extends HTMLChakraProps<"div">, StackOptions {}

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/stack
 *
 */
export const Stack = forwardRef<StackProps, "div">((props, ref) => {
  const {
    isInline,
    direction: directionProp,
    align,
    justify,
    spacing = "0.5rem",
    wrap,
    children,
    divider,
    className,
    shouldWrapChildren,
    ...rest
  } = props

  const direction = isInline ? "row" : directionProp ?? "column"

  const styles = useMemo(
    () => getStackStyles({ direction, spacing }),
    [direction, spacing],
  )

  const dividerStyle = useMemo(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction],
  )

  const hasDivider = !!divider
  const shouldUseChildren = !shouldWrapChildren && !hasDivider

  const clones = useMemo(() => {
    const validChildren = getValidChildren(children)
    return shouldUseChildren
      ? validChildren
      : validChildren.map((child, index) => {
          // Prefer provided child key, fallback to index
          const key = typeof child.key !== "undefined" ? child.key : index
          const isLast = index + 1 === validChildren.length
          const wrappedChild = <StackItem key={key}>{child}</StackItem>
          const _child = shouldWrapChildren ? wrappedChild : child

          if (!hasDivider) return _child

          const clonedDivider = cloneElement(
            divider as React.ReactElement<any>,
            {
              __css: dividerStyle,
            },
          )

          const _divider = isLast ? null : clonedDivider

          return (
            <Fragment key={key}>
              {_child}
              {_divider}
            </Fragment>
          )
        })
  }, [
    divider,
    dividerStyle,
    hasDivider,
    shouldUseChildren,
    shouldWrapChildren,
    children,
  ])

  const _className = cx("chakra-stack", className)

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems={align}
      justifyContent={justify}
      flexDirection={styles.flexDirection}
      flexWrap={wrap}
      className={_className}
      __css={hasDivider ? {} : { [selector]: styles[selector] }}
      {...rest}
    >
      {clones}
    </chakra.div>
  )
})

Stack.displayName = "Stack"
