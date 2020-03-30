import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { PortalManager } from "@chakra-ui/portal"
import { Drawer } from "../Drawer"

test("Drawer renders correctly", () => {
  const { asFragment } = render(
    <PortalManager>
      <Drawer isOpen onClose={jest.fn()} />
    </PortalManager>,
  )
  expect(asFragment()).toMatchSnapshot()
})
