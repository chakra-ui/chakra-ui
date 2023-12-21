import { ChakraProvider } from "@chakra-ui/react/chakra-provider"
import { theme } from "@chakra-ui/theme"
import "@testing-library/jest-dom/vitest"
import { RenderOptions, render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as React from "react"

const ChakraProviderWrapper = (props: any) => (
  <ChakraProvider {...props} theme={theme} />
)

export interface ChakraRenderOptions extends RenderOptions {
  withChakraProvider?: boolean
}

export function render(
  ui: React.ReactElement,
  { withChakraProvider, ...options }: ChakraRenderOptions = {
    withChakraProvider: true,
  },
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup()

  if (withChakraProvider) {
    options.wrapper = ChakraProviderWrapper
  }

  const result = rtlRender(ui, options)

  return { user, ...result }
}
