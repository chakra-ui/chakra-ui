import {
  chakra,
  css,
  forwardRef,
  StylesProvider,
  SystemProps,
  SystemStyleObject,
  useStyles,
  useTheme,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, mapResponsive, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface WrapProps extends HTMLChakraProps<"div"> {
  /**
   * The space between the each child (even if it wraps)
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
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
 * @see Docs https://chakra-ui.com/docs/layout/wrap
 */
export const Wrap = forwardRef<WrapProps, "div">((props, ref) => {
  const {
    spacing = "0.5rem",
    children,
    justify,
    direction,
    align,
    className,
    shouldWrapChildren,
    ...rest
  } = props

  const theme = useTheme()

  const itemSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2)`
  })

  const groupSpacing = mapResponsive(spacing, (value) => {
    const { margin } = css({ margin: value })(theme)
    return `calc(${margin} / 2 * -1)`
  })

  const groupStyles: SystemStyleObject = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction,
    listStyleType: "none",
    padding: "0",
    margin: groupSpacing,
  }

  const itemStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "flex-start",
    margin: itemSpacing,
  }

  const _children = shouldWrapChildren
    ? React.Children.map(children, (child, index) => (
        <WrapItem key={index}>{child}</WrapItem>
      ))
    : children

  return (
    <StylesProvider value={{ item: itemStyles }}>
      <chakra.div ref={ref} className={cx("chakra-wrap", className)} {...rest}>
        <chakra.ul className="chakra-wrap__list" __css={groupStyles}>
          {_children}
        </chakra.ul>
      </chakra.div>
    </StylesProvider>
  )
})

if (__DEV__) {
  Wrap.displayName = "Wrap"
}

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const WrapItem = forwardRef<WrapItemProps, "li">((props, ref) => {
  const { className, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.li
      ref={ref}
      __css={styles.item}
      className={cx("chakra-wrap__listitem", className)}
      {...rest}
    />
  )
})

if (__DEV__) {
  WrapItem.displayName = "WrapItem"
}
