import {
  chakra,
  ChakraComponent,
  forwardRef,
  HTMLChakraProps,
  SystemProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { getValidChildren } from "@chakra-ui/react-utils"
import * as React from "react"
import type { StackDirection } from "./stack.utils"
import { getDividerStyles, getStackStyles, selector } from "./stack.utils"

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
   */
  spacing?: SystemProps["margin"]
  /**
   * The direction to stack the items.
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
   */
  shouldWrapChildren?: boolean
  /**
   * If `true` the items will be stacked horizontally.
   */
  isInline?: boolean
}

export interface StackDividerProps extends HTMLChakraProps<"div"> {}

export const StackDivider: ChakraComponent<"div"> = (props) => (
  <chakra.div
    className="chakra-stack__divider"
    {...props}
    __css={{
      ...props["__css"],
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto",
    }}
  />
)

export const StackItem: ChakraComponent<"div"> = (props) => (
  <chakra.div
    className="chakra-stack__item"
    {...props}
    __css={{
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"],
    }}
  />
)

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

  const styles = React.useMemo(() => getStackStyles({ direction, spacing }), [
    direction,
    spacing,
  ])

  const dividerStyle = React.useMemo(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction],
  )

  const hasDivider = !!divider
  const shouldUseChildren = !shouldWrapChildren && !hasDivider

  const validChildren = getValidChildren(children)

  const clones = shouldUseChildren
    ? validChildren
    : validChildren.map((child, index) => {
        // Prefer provided child key, fallback to index
        const key = typeof child.key !== "undefined" ? child.key : index
        const isLast = index + 1 === validChildren.length
        const wrappedChild = <StackItem key={key}>{child}</StackItem>
        const _child = shouldWrapChildren ? wrappedChild : child

        if (!hasDivider) return _child

        const clonedDivider = React.cloneElement(
          divider as React.ReactElement<any>,
          { __css: dividerStyle },
        )

        const _divider = isLast ? null : clonedDivider

        return (
          <React.Fragment key={key}>
            {_child}
            {_divider}
          </React.Fragment>
        )
      })

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

if (__DEV__) {
  Stack.displayName = "Stack"
}

/**
 * A view that arranges its children in a horizontal line.
 */
export const HStack = forwardRef<StackProps, "div">((props, ref) => (
  <Stack align="center" {...props} direction="row" ref={ref} />
))

if (__DEV__) {
  HStack.displayName = "HStack"
}

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = forwardRef<StackProps, "div">((props, ref) => (
  <Stack align="center" {...props} direction="column" ref={ref} />
))

if (__DEV__) {
  VStack.displayName = "VStack"
}
