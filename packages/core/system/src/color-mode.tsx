import { useMemo } from "react"
import { chakra, forwardRef, HTMLChakraProps } from "../"

import { ColorModeContextType, ColorModeContext } from "@chakra-ui/color-mode"

const noop = () => {}

export interface ForcedMode extends HTMLChakraProps<"div"> {}

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode = forwardRef<ForcedMode, "div">((props) => {
  const { as } = props
  const context = useMemo<ColorModeContextType>(
    () => ({
      colorMode: "dark",
      toggleColorMode: noop,
      setColorMode: noop,
      forced: true,
    }),
    [],
  )

  if (as)
    return (
      <chakra.div
        data-theme="dark"
        bg="chakra-body-bg"
        color="chakra-body-text"
        {...props}
      />
    )

  return <ColorModeContext.Provider value={context} {...props} />
})

DarkMode.displayName = "DarkMode"

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode = forwardRef<ForcedMode, "div">((props) => {
  const { as } = props
  const context = useMemo<ColorModeContextType>(
    () => ({
      colorMode: "light",
      toggleColorMode: noop,
      setColorMode: noop,
      forced: true,
    }),
    [],
  )

  if (as)
    return (
      <chakra.div
        data-theme="light"
        bg="chakra-body-bg"
        color="chakra-body-text"
        {...props}
      />
    )

  return <ColorModeContext.Provider value={context} {...props} />
})

LightMode.displayName = "LightMode"
