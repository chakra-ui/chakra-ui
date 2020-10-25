import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemProps,
  ThemingProps,
  useStyleConfig,
  WithChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface TextProps extends WithChakraProps<"p">, ThemingProps {
  /**
   * The CSS `text-align` property
   */
  align?: SystemProps["textAlign"]
  /**
   * The CSS `text-decoration` property
   */
  decoration?: SystemProps["textDecoration"]
  /**
   * The CSS `text-transform` property
   */
  casing?: SystemProps["textTransform"]
}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
export const Text = forwardRef<TextProps, "p">(function Text(props, ref) {
  const styles = useStyleConfig("Text", props)
  const { className, align, decoration, casing, ...rest } = omitThemingProps(
    props,
  )

  return (
    <chakra.p
      ref={ref}
      className={cx("chakra-text", props.className)}
      textAlign={align}
      textDecoration={decoration}
      textTransform={casing}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Text.displayName = "Text"
}
