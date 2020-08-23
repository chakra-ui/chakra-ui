import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { PortalManager } from "@chakra-ui/portal"
import { Drawer } from "../src"

test("renders correctly", () => {
  const { asFragment } = render(
    <PortalManager>
      <Drawer isOpen onClose={jest.fn()}>
        I'm a drawer
      </Drawer>
    </PortalManager>,
  )
  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test", async () => {
  await testA11y(
    <PortalManager>
      <Drawer isOpen onClose={jest.fn()}>
        I'm a drawer
      </Drawer>
    </PortalManager>,
  )
})
