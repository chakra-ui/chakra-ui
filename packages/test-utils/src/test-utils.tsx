import { ChakraProvider } from "@chakra-ui/core"
import "@testing-library/jest-dom/extend-expect"
import {
  render as RTLRender,
  RenderOptions,
  fireEvent,
  RenderResult,
  Queries,
} from "@testing-library/react"
import * as React from "react"
import { toHaveNoViolations } from "jest-axe"
import serializer from "jest-emotion"

expect.addSnapshotSerializer(serializer)
expect.extend(toHaveNoViolations)

const AllProviders: React.FC = ({ children }) => (
  <ChakraProvider resetCSS>{children}</ChakraProvider>
)

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
): RenderResult

export function render(ui: React.ReactElement, options?: RenderOptions) {
  return RTLRender(ui, { wrapper: AllProviders, ...options })
}

export * from "@testing-library/react"

export {
  act as invoke,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks"

export { default as userEvent } from "@testing-library/user-event"

export * from "jest-axe"

export const escape = (ui: HTMLElement) =>
  fireEvent.keyDown(ui, { key: "Escape", keyCode: 27 })
