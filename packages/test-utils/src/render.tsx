import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import "@testing-library/jest-dom/vitest"
import { type RenderOptions, render as rtlRender } from "@testing-library/react"
import user from "@testing-library/user-event"

const Provider = (props: any) => (
  <ChakraProvider {...props} value={defaultSystem} />
)

export interface ChakraRenderOptions extends RenderOptions {
  provider?: boolean
}

export function render(
  ui: React.ReactElement,
  opts: ChakraRenderOptions = {},
): ReturnType<typeof rtlRender> & { user: typeof user } {
  const { provider = true, ...options } = opts

  if (provider) {
    options.wrapper = Provider
  }

  const result = rtlRender(ui, options)

  return { user, ...result }
}
