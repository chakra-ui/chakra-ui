import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type TextProps = PropsOf<typeof chakra.p> & ThemingProps

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
export const Text = React.forwardRef(function Text(
  props: TextProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Text", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.span
      ref={ref}
      className={cx("chakra-text", props.className)}
      {...rest}
      __css={styles.text}
    />
  )
})

if (__DEV__) {
  Text.displayName = "Text"
}
