import { SystemProvider, defaultSystem } from "@chakra-ui/react"
import "@testing-library/jest-dom/vitest"
import { RenderOptions, render as rtlRender } from "@testing-library/react"
import user from "@testing-library/user-event"

const Provider = (props: any) => (
  <SystemProvider {...props} value={defaultSystem} />
)

export interface ChakraRenderOptions extends RenderOptions {
  withChakraProvider?: boolean
}

export function render(
  ui: React.ReactElement,
  { withChakraProvider, ...options }: ChakraRenderOptions = {
    withChakraProvider: true,
  },
): ReturnType<typeof rtlRender> & { user: typeof user } {
  if (withChakraProvider) {
    options.wrapper = Provider
  }

  const result = rtlRender(ui, options)

  return { user, ...result }
}
