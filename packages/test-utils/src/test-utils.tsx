import theme from "@chakra-ui/preset-base"
import { ColorMode, ThemeProvider, CSSReset } from "@chakra-ui/system"
import "@testing-library/jest-dom/extend-expect"
import { render, RenderOptions } from "@testing-library/react"
import * as React from "react"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <ColorMode />
    {children}
  </ThemeProvider>
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

// Used to check for common accessbility violations
export * from "jest-axe"
