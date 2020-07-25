import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export type KbdProps = PropsOf<typeof chakra.kbd> & ThemingProps

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
 * @see Docs https://chakra-ui.com/components/kbd
 */
export const Kbd = React.forwardRef(function Heading(
  props: KbdProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Kbd", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.kbd
      ref={ref}
      className={cx("chakra-kbd", props.className)}
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
