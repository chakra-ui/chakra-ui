import {
  chakra,
  css,
  ResponsiveValue,
  PropsOf,
  SystemProps,
} from "@chakra-ui/system"
import {
  Dict,
  getValidChildren,
  mapResponsive,
  __DEV__,
  cx,
} from "@chakra-ui/utils"
import * as React from "react"
import { FlexOptions } from "./Flex"

export type StackDirection = ResponsiveValue<"row" | "column">

type StackOptions = Pick<FlexOptions, "align" | "justify" | "wrap"> & {
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
}

export type StackProps = PropsOf<typeof chakra.div> & StackOptions

export type StackDividerProps = PropsOf<typeof StackDivider>

export const StackDivider = chakra("hr", {
  baseStyle: { border: 0, alignSelf: "stretch" },
})

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
export const Stack = React.forwardRef(
  (props: StackProps, ref: React.Ref<any>) => {
    const {
      direction = "column",
      align = "flex-start",
      justify,
      spacing = "0.5rem",
      wrap,
      children,
      divider,
      className,
      ...rest
    } = props

    /**
     * If we ever run into SSR issues with this, check this post to find a fix for it:
     * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
     */
    const selector = "> * + *"

    const styles = {
      flexDirection: direction,
      [selector]: mapResponsive(direction, (value) => ({
        [value === "column" ? "marginTop" : "marginLeft"]: spacing,
        [value === "column" ? "marginLeft" : "marginTop"]: 0,
      })),
    }

    const validChildren = getValidChildren(children)

    const dividerStyles = mapResponsive(direction, (value) => {
      if (value === "row") {
        return {
          marginX: spacing,
          marginY: 0,
          borderLeft: "1px solid",
          borderBottom: 0,
          width: "auto",
        }
      }
      return {
        marginX: 0,
        marginY: spacing,
        borderLeft: 0,
        borderBottom: "1px solid",
        width: "100%",
      }
    })

    const hasDivider = !!divider

    const clones = validChildren.map((child, index) => {
      if (!hasDivider) return child

      const isLast = index + 1 === validChildren.length

      if (!isLast) {
        return (
          <React.Fragment key={index}>
            {child}
            {React.cloneElement(divider as React.ReactElement<any>, {
              css: css({ "&": dividerStyles }),
            })}
          </React.Fragment>
        )
      }

      return child
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
        sx={sx as any}
        {...rest}
      >
        {clones}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  Stack.displayName = "Stack"
}

/**
 * A view that arranges its children in a horizontal line.
 */
export const HStack = (props: StackProps) => (
  <Stack align="center" {...props} direction="row" />
)

if (__DEV__) {
  HStack.displayName = "HStack"
}

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = (props: StackProps) => (
  <Stack align="center" {...props} direction="column" />
)

if (__DEV__) {
  VStack.displayName = "VStack"
}
