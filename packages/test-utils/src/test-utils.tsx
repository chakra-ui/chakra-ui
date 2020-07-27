import theme from "@chakra-ui/theme"
import { GlobalStyle, ThemeProvider } from "@chakra-ui/system"
import CSSReset from "@chakra-ui/css-reset"
import "@testing-library/jest-dom/extend-expect"
import { render, RenderOptions, fireEvent } from "@testing-library/react"
import React, { ReactElement } from "react"
import { toHaveNoViolations, axe } from "jest-axe"
import serializer from "jest-emotion"

expect.addSnapshotSerializer(serializer)

expect.extend(toHaveNoViolations)

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <GlobalStyle />
    {children}
  </ThemeProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

/**
 * Wrapper for jest-axe
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
async function testA11Y(component: ReactElement, options?: RenderOptions) {
  const { container } = render(component, options)

  const results = await axe(container)

  expect(results).toHaveNoViolations()
}

export * from "@testing-library/react"

export {
  act as invoke,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks"

export { default as userEvent } from "@testing-library/user-event"

export { customRender as render, testA11Y }

export * from "jest-axe"

export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 })
