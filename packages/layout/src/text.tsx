import * as React from "react"
import {
  chakra,
  GetProps,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export interface TextProps extends GetProps<typeof chakra.p>, ThemingProps {}

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
export const Text = forwardRef<TextProps, "p">(function Text(props, ref) {
  const styles = useStyleConfig("Text", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.p
      ref={ref}
      className={cx("chakra-text", props.className)}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Text.displayName = "Text"
}
