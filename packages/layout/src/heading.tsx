import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type HeadingProps = PropsOf<typeof chakra.h2> & ThemingProps

export const Heading = React.forwardRef(function Heading(
  props: HeadingProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Heading", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.h2
      ref={ref}
      className={cx("chakra-heading", props.className)}
      {...rest}
      __css={styles}
    />
  )
})

if (__DEV__) {
  Heading.displayName = "Heading"
}
