import * as React from "react"
import { __DEV__, noop } from "@chakra-ui/utils"
import { ColorModeContext, ColorModeContextType } from "@chakra-ui/color-mode"
import { HTMLChakraProps } from "./system"
import { chakra } from "./factory"

type WithDomElement =
  | {
      withSemanticTokens?: false
      children?: React.ReactNode | undefined
    }
  | ({
      /**
       * The DarkMode and LightMode components render a DOM element
       * when `withSemanticTokens` is set to `true`.
       * This forces the semantic tokens to use the desired color mode as well.
       *
       * This is an optional prop for backwards compatibility reasons and
       * will be the default in an upcoming major release.
       */
      withSemanticTokens: true
    } & HTMLChakraProps<"div">)

export type DarkModeProps = WithDomElement

/**
 * Locks the color mode to `dark`, without any way to change it.
 */
export const DarkMode = ({
  withSemanticTokens,
  children,
  ...restProps
}: DarkModeProps) => {
  const colorMode = "dark"
  const context = React.useMemo<ColorModeContextType>(
    () => ({
      colorMode,
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  const maybeDomElement = withSemanticTokens ? (
    <chakra.div {...restProps} data-theme={colorMode} data-css-vars-root>
      {children}
    </chakra.div>
  ) : (
    children
  )

  return (
    <ColorModeContext.Provider value={context}>
      {maybeDomElement}
    </ColorModeContext.Provider>
  )
}

if (__DEV__) {
  DarkMode.displayName = "DarkMode"
}

export type LightModeProps = WithDomElement

/**
 * Locks the color mode to `light` without any way to change it.
 */
export const LightMode: React.FC<LightModeProps> = ({
  withSemanticTokens,
  children,
  ...restProps
}) => {
  const colorMode = "light"
  const context = React.useMemo<ColorModeContextType>(
    () => ({
      colorMode,
      toggleColorMode: noop,
      setColorMode: noop,
    }),
    [],
  )

  const maybeDomElement = withSemanticTokens ? (
    <chakra.div {...restProps} data-theme={colorMode} data-css-vars-root>
      {children}
    </chakra.div>
  ) : (
    children
  )

  return (
    <ColorModeContext.Provider value={context}>
      {maybeDomElement}
    </ColorModeContext.Provider>
  )
}

if (__DEV__) {
  LightMode.displayName = "LightMode"
}
