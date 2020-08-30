import CSSReset from "@chakra-ui/css-reset"
import { PortalManager, PortalManagerProps } from "@chakra-ui/portal"
import {
  ColorModeProvider,
  ThemeProviderProps,
  ThemeProvider,
  GlobalStyle,
} from "@chakra-ui/system"
import defaultTheme, { Theme } from "@chakra-ui/theme"
import { merge } from "@chakra-ui/utils"
import * as React from "react"

export interface ChakraProviderProps extends Partial<ThemeProviderProps> {
  /**
   * Common z-index to use for `Portal`
   */
  portalZIndex?: PortalManagerProps["zIndex"]
  /**
   * If `true`, `CSSReset` component will be mounted to help
   * you reset browser styles
   */
  resetCSS?: boolean
  children?: React.ReactNode
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
export const ChakraProvider = (props: ChakraProviderProps) => {
  const { children, resetCSS, portalZIndex, theme = defaultTheme } = props

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        {resetCSS && <CSSReset />}
        <GlobalStyle />
        {portalZIndex ? (
          <PortalManager zIndex={portalZIndex}>{children}</PortalManager>
        ) : (
          children
        )}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export function extendTheme<T extends Theme | Record<string, any>>(
  overrides: T,
) {
  return merge(defaultTheme, overrides)
}
