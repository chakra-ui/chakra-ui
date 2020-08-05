import {
  chakra,
  css,
  PropsOf,
  ResponsiveValue,
  SystemProps,
  forwardRef,
} from "@chakra-ui/system"
import {
  cx,
  Dict,
  getValidChildren,
  mapResponsive,
  __DEV__,
} from "@chakra-ui/utils"
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
}

export type StackProps = PropsOf<typeof chakra.div> & StackOptions

export type StackDividerProps = PropsOf<typeof chakra.div>

export const StackDivider = (props: PropsOf<typeof chakra.div>) => (
  <chakra.div
    className="chakra-stack__item"
    __css={{
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto",
    }}
    {...props}
  />
)

export const StackItem = (props: PropsOf<typeof chakra.div>) => (
  <chakra.div
    className="chakra-stack__item"
    __css={{ display: "inline-block", flex: 0 }}
    {...props}
  />
)

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
export const Stack = forwardRef<StackProps>(function Stack(props, ref) {
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

  /**
   * If we ever run into SSR issues with this, check this post to find a fix for it:
   * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
   */
  const selector = "& > *:not(style) ~ *:not(style)"

  const directionStyles = {
    column: { mt: spacing, ml: 0 },
    row: { ml: spacing, mt: 0 },
    "column-reverse": { mb: spacing, mr: 0 },
    "row-reverse": { mr: spacing, mb: 0 },
  }

  const styles = {
    flexDirection: direction,
    [selector]: mapResponsive(direction, (value) => directionStyles[value]),
  }

  const dividerStyles = mapResponsive(direction, (value) => {
    if (value.includes("row")) {
      return {
        mx: spacing,
        my: 0,
        borderLeftWidth: "1px",
        borderBottomWidth: 0,
      }
    }
    return {
      mx: 0,
      my: spacing,
      borderLeftWidth: 0,
      borderBottomWidth: "1px",
    }
  })

  const hasDivider = !!divider
  const shouldUseChildren = !shouldWrapChildren && !hasDivider

  const validChildren = getValidChildren(children)

  const clones = shouldUseChildren
    ? validChildren
    : validChildren.map((child, index) => {
        const isLast = index + 1 === validChildren.length
        const _child = shouldWrapChildren ? (
          <StackItem children={child} />
        ) : (
          child
        )

        if (!hasDivider) return _child

        const cloneDivider = isLast
          ? null
          : React.cloneElement(divider as any, {
              css: css({ "&": dividerStyles }),
            })

        return (
          <React.Fragment key={index}>
            {_child}
            {cloneDivider}
          </React.Fragment>
        )
      })

  const sx = (theme: Dict) => {
    if (hasDivider) return undefined
    return css({ [selector]: styles[selector] })(theme)
  }

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
      css={sx as any}
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
export const HStack = React.forwardRef(function HStack(
  props: StackProps,
  ref: React.Ref<any>,
) {
  return <Stack align="center" {...props} direction="row" ref={ref} />
})

if (__DEV__) {
  HStack.displayName = "HStack"
}

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = React.forwardRef(function VStack(
  props: StackProps,
  ref: React.Ref<any>,
) {
  return <Stack align="center" {...props} direction="column" ref={ref} />
})

if (__DEV__) {
  VStack.displayName = "VStack"
}
