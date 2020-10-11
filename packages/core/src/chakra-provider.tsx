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
   * @default true
   */
  resetCSS?: boolean
  /**
   * manager to persist a users color mode preference in
   *
   * omit if you don't render server-side
   * for SSR: choose `cookieStorageManager`
   *
   * @default localStorageManager
   */
  colorModeManager?: ColorModeProviderProps["colorModeManager"]
  children?: React.ReactNode
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
export const ChakraProvider = (props: ChakraProviderProps) => {
  const {
    children,
    colorModeManager,
    portalZIndex,
    resetCSS = true,
    theme = defaultTheme,
  } = props

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        colorModeManager={colorModeManager}
        options={theme.config}
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
