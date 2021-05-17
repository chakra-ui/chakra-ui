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

export interface ContainerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Container"> {
  /**
   * If `true`, container will center its children
   * regardless of their width.
   */
  centerContent?: boolean
}

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
export const Container = forwardRef<ContainerProps, "div">((props, ref) => {
  const { className, centerContent, ...rest } = omitThemingProps(props)

  const styles = useStyleConfig("Container", props)

  return (
    <chakra.div
      ref={ref}
      className={cx("chakra-container", className)}
      {...rest}
      __css={{
        ...styles,
        ...(centerContent && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }),
      }}
    />
  )
})

if (__DEV__) {
  Container.displayName = "Container"
}
