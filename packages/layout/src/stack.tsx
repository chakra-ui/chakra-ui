import {
  chakra,
  ChakraComponent,
  forwardRef,
  HTMLChakraProps,
  PropsOf,
  ResponsiveValue,
  SystemProps,
} from "@chakra-ui/system"
import { cx, getValidChildren, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type StackDirection = ResponsiveValue<
  "row" | "column" | "row-reverse" | "column-reverse"
>

interface StackOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: SystemProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: SystemProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: SystemProps["flexWrap"]
  /**
   * The space between each stack item
   */
  spacing?: SystemProps["margin"]
  /**
   * The direction to stack the items.
   */
  direction?: StackDirection
  /**
   * If `true`, each stack item will show a divider
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

export const StackDivider: ChakraComponent<"div"> = (props) => {
  return (
    <chakra.div
      className="chakra-stack__divider"
      {...props}
      __css={{
        ...props.__css,
        borderWidth: 0,
        alignSelf: "stretch",
        borderColor: "inherit",
        width: "auto",
        height: "auto",
      }}
    />
  )
}

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

export interface StackProps extends PropsOf<typeof chakra.div>, StackOptions {}

/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */
const selector = "& > *:not(style) ~ *:not(style)"

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/components/stack
 *
 */
export const Stack = forwardRef<StackProps, "div">(function Stack(props, ref) {
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

  const styles = React.useMemo(() => {
    const directionStyles = {
      column: { mt: spacing, ml: 0 },
      row: { ml: spacing, mt: 0 },
      "column-reverse": { mb: spacing, mr: 0 },
      "row-reverse": { mr: spacing, mb: 0 },
    }

    return {
      flexDirection: direction,
      [selector]: mapResponsive(direction, (value) => directionStyles[value]),
    }
  }, [direction, spacing])

  /**
   * Divider Styles
   */
  const marginX = mapResponsive(direction, (value) =>
    value.includes("row") ? spacing : 0,
  )

  const marginY = mapResponsive(direction, (value) =>
    value.includes("row") ? 0 : spacing,
  )

  const borderLeftWidth = mapResponsive(direction, (value) =>
    value.includes("row") ? "1px" : 0,
  )

  const borderBottomWidth = mapResponsive(direction, (value) =>
    value.includes("row") ? 0 : "1px",
  )

  const dividerStyles = {
    marginX,
    marginY,
    borderLeftWidth,
    borderBottomWidth,
  }

  const hasDivider = !!divider
  const shouldUseChildren = !shouldWrapChildren && !hasDivider

  const validChildren = getValidChildren(children)

  const clones = shouldUseChildren
    ? validChildren
    : validChildren.map((child, index) => {
        const isLast = index + 1 === validChildren.length
        const wrappedChild = <StackItem key={index}>{child}</StackItem>
        const _child = shouldWrapChildren ? wrappedChild : child

        if (!hasDivider) return _child

        const clonedDivider = React.cloneElement(divider as any, dividerStyles)
        const _divider = isLast ? null : clonedDivider

        return <React.Fragment key={index}>{[_child, _divider]}</React.Fragment>
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
export const HStack = forwardRef<StackProps, "div">((props, ref) => {
  return <Stack align="center" {...props} direction="row" ref={ref} />
})

if (__DEV__) {
  HStack.displayName = "HStack"
}

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = forwardRef<StackProps, "div">((props, ref) => {
  return <Stack align="center" {...props} direction="column" ref={ref} />
})

if (__DEV__) {
  VStack.displayName = "VStack"
}
