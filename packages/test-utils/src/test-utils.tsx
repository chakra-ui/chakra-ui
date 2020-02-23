import { PortalManager } from "@chakra-ui/portal"
import theme from "@chakra-ui/preset-base"
import { ColorMode, createThemeContext, CSSReset } from "@chakra-ui/system"
import "@testing-library/jest-dom/extend-expect"
import { render, RenderOptions } from "@testing-library/react"
import * as React from "react"

const [ThemeProvider] = createThemeContext(theme)

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <PortalManager>
    <ThemeProvider>
      <CSSReset />
      <ColorMode />
      {children}
    </ThemeProvider>
  </PortalManager>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"
export {
  act as invoke,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks"
export { default as userEvent } from "@testing-library/user-event"
export { customRender as render }
