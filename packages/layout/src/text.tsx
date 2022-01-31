import { useBreakpointValue } from "@chakra-ui/media-query"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__, filterUndefined } from "@chakra-ui/utils"
import * as React from "react"

export interface TextProps extends HTMLChakraProps<"p">, ThemingProps<"Text"> {
  /**
   * The CSS `text-align` property
   * @type SystemProps["textAlign"]
   */
  align?: SystemProps["textAlign"]
  /**
   * The CSS `text-decoration` property
   * @type SystemProps["textDecoration"]
   */
  decoration?: SystemProps["textDecoration"]
  /**
   * The CSS `text-transform` property
   * @type SystemProps["textTransform"]
   */
  casing?: SystemProps["textTransform"]
}

const defaultNoOfLines = 3

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/text
 */
export const Text = forwardRef<TextProps, "p">((props, ref) => {
  const styles = useStyleConfig("Text", props)
  const {
    className,
    align,
    decoration,
    casing,
    noOfLines = [],
    ...rest
  } = omitThemingProps(props)

  const aliasedProps = filterUndefined({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing,
  })

  const noOfLinesValue =
    useBreakpointValue(
      typeof noOfLines === "number" ? [noOfLines] : noOfLines,
    ) || defaultNoOfLines

  return (
    <chakra.p
      ref={ref}
      className={cx("chakra-text", props.className)}
      {...aliasedProps}
      noOfLines={noOfLinesValue}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Text.displayName = "Text"
}
