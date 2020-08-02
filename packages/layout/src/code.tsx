import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type CodeProps = PropsOf<typeof chakra.code> & ThemingProps

/**
 * React component to render inline code snippets.
 *
 * @see Docs https://chakra-ui.com/components/code
 */
export const Code = React.forwardRef(function Badge(
  props: CodeProps,
  ref: React.Ref<any>,
) {
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
