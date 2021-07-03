import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface CodeProps
  extends HTMLChakraProps<"code">,
    ThemingProps<"Code"> {}

/**
 * React component to render inline code snippets.
 *
 * @see Docs https://chakra-ui.com/code
 */
export const Code = forwardRef<CodeProps, "code">((props, ref) => {
  const styles = useStyleConfig("Code", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.code
      ref={ref}
      className={cx("chakra-code", props.className)}
      {...rest}
      __css={{
        display: "inline-block",
        ...styles,
      }}
    />
  )
})

if (__DEV__) {
  Code.displayName = "Code"
}
