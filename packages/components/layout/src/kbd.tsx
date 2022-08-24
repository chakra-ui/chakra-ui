import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

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
export const Kbd = forwardRef<KbdProps, "kbd">(function Kbd(props, ref) {
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

Kbd.displayName = "Kbd"
