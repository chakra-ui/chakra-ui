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

export interface HeadingProps extends PropsOf<typeof chakra.h2>, ThemingProps {}

export const Heading = forwardRef<HeadingProps, "h2">(function Heading(
  props,
  ref,
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
