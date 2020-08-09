import CSSReset from "@chakra-ui/css-reset"
import { PortalManager, PortalManagerProps } from "@chakra-ui/portal"
import {
  ColorModeProvider,
  StorageManager,
  ThemeProviderProps,
  ThemeProvider,
  GlobalStyle,
} from "@chakra-ui/system"
import defaultTheme from "@chakra-ui/theme"
import * as React from "react"

export interface ChakraProviderProps extends Partial<ThemeProviderProps> {
  /**
   * The storage mechanism for the color mode value.
   * - CSR: We recommend using `localStorage`
   * - SSR: We recommend using `cookieStorage`
   */
  storageManager?: StorageManager
  /**
   * Configuration for the `PortalManager`
   */
  portalConfig?: Omit<PortalManagerProps, "children">
  /**
   * If `true`, `CSSReset` component will be mounted to help
   * you reset browser styles
   */
  resetCSS?: boolean
}

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
export const ChakraProvider: React.FC<ChakraProviderProps> = (props) => {
  const {
    theme = defaultTheme,
    children,
    storageManager,
    resetCSS,
    portalConfig,
  } = props

  if (!theme) {
    throw Error("ChakraProvider: the `theme` prop is required")
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        defaultValue={theme?.config?.initialColorMode}
        useSystemColorMode={theme?.config?.useSystemColorMode}
        storageManager={storageManager}
      >
        <GlobalStyle />
        {resetCSS && <CSSReset />}
        {portalConfig ? (
          <PortalManager zIndex={portalConfig?.zIndex}>
            {children}
          </PortalManager>
        ) : (
          children
        )}
      </ColorModeProvider>
    </ThemeProvider>
  )
}
