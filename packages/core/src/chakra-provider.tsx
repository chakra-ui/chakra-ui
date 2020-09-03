import CSSReset from "@chakra-ui/css-reset"
import { PortalManager, PortalManagerProps } from "@chakra-ui/portal"
import {
  ColorModeProvider,
  ThemeProviderProps,
  ThemeProvider,
  GlobalStyle,
  ColorModeProviderProps,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import * as React from "react"

export interface ChakraProviderProps {
  /**
   * a theme. if omitted, uses the default theme provided by chakra
   */
  theme?: ThemeProviderProps["theme"]
  /**
   * Common z-index to use for `Portal`
   *
   * @default undefined
   */
  portalZIndex?: PortalManagerProps["zIndex"]
  /**
   * If `true`, `CSSReset` component will be mounted to help
   * you reset browser styles
   *
   * @default false
   */
  resetCSS?: boolean
  /**
   * the storage to persist the theme in
   *
   * @default localStorageManager
   */
  storageManager?: ColorModeProviderProps["storageManager"]
  children?: React.ReactNode
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
export const ChakraProvider = (props: ChakraProviderProps) => {
  const {
    children,
    resetCSS,
    portalZIndex,
    theme = defaultTheme,
    storageManager,
  } = props

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        storageManager={storageManager}
        defaultValue={theme.config?.initialColorMode}
        useSystemColorMode={theme.config?.useInitialColorMode}
      >
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
