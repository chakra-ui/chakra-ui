import { cx, getValidChildren } from "@chakra-ui/utils"
import { Fragment, cloneElement, useMemo } from "react"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"
import { StackItem } from "./stack-item"
import type { StackDirection } from "./stack.utils"
import { getDividerStyles } from "./stack.utils"

export type { StackDirection }

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
   * The space between each stack item
   * @type SystemStyleObject["margin"]
   * @default "0.5rem"
   */
  spacing?: SystemStyleObject["margin"]
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
}

export interface StackProps extends HTMLChakraProps<"div", StackOptions> {}

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
export const Stack = forwardRef<StackProps, "div">(function Stack(props, ref) {
  const {
    direction = "column",
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
      flexDirection={direction}
      flexWrap={wrap}
      gap={hasDivider ? undefined : spacing}
      className={_className}
      {...rest}
    >
      {clones}
    </chakra.div>
  )
})

Stack.displayName = "Stack"
