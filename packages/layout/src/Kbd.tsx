import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type KbdProps = PropsOf<typeof Kbd>

/**
 * Keyboard key
 *
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
export const Kbd = chakra("kbd", { themeKey: "Kbd" })

if (__DEV__) {
  Kbd.displayName = "Kbd"
}
