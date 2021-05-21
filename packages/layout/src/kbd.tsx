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

export interface KbdProps extends HTMLChakraProps<"kbd">, ThemingProps<"Kbd"> {}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <Kbd>⌘ + T</Kbd>
 * ```
 *
 * @see Docs https://chakra-ui.com/kbd
 */
export const Kbd = forwardRef<KbdProps, "kbd">((props, ref) => {
  const styles = useStyleConfig("Kbd", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.kbd
      ref={ref}
      className={cx("chakra-kbd", className)}
      {...rest}
      __css={{
        fontFamily: "mono",
        ...styles,
      }}
    />
  )
})

if (__DEV__) {
  Kbd.displayName = "Kbd"
}
