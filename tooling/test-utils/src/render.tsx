import { ChakraProvider } from "@chakra-ui/react"
import "@testing-library/jest-dom/extend-expect"
import { render as rtlRender, RenderOptions } from "@testing-library/react"
import { toHaveNoViolations } from "jest-axe"
import * as React from "react"
import { userEvent } from "./user-event"

expect.extend(toHaveNoViolations)

export function render(ui: React.ReactElement, options: RenderOptions = {}) {
  const { wrapper: Wrapper = React.Fragment, ...rtlOptions } = options
  const user = userEvent.setup()
  const result = rtlRender(
    <ChakraProvider>
      <Wrapper>{ui}</Wrapper>
    </ChakraProvider>,
    rtlOptions,
  )
  return { user, ...result }
}
