import * as React from "react"
import { render } from "@chakra-ui/test-utils/src"
import { PortalManager } from "@chakra-ui/portal/src"
import { Drawer } from "../src"

test("Drawer renders correctly", () => {
  const { asFragment } = render(
    <PortalManager>
      <Drawer isOpen onClose={jest.fn()} />
    </PortalManager>,
  )
  expect(asFragment()).toMatchSnapshot()
})
