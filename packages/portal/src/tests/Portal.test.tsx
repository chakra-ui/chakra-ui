import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { PortalManager, Portal } from ".."

test("should render portal", () => {
  const utils = render(
    <PortalManager>
      <Portal>This is a portal</Portal>
    </PortalManager>,
  )

  expect(utils.asFragment()).toMatchSnapshot()
})

test("should render nested portal", () => {
  const utils = render(
    <PortalManager>
      <Portal>
        This is a portal.
        <Portal>This is a nested portal</Portal>
      </Portal>
    </PortalManager>,
  )

  expect(utils.asFragment()).toMatchSnapshot()
})
