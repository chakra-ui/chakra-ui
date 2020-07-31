import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type TextProps = PropsOf<typeof chakra.p> & ThemingProps

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/components/text
 */
export const Text: React.FC<TextProps> = forwardRef((props, ref) => {
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
