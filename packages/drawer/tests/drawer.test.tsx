import React from "react"
import { render, testA11Y } from "@chakra-ui/test-utils"
import { PortalManager } from "@chakra-ui/portal"
import { Drawer, DrawerOverlay, DrawerContent } from "../src"

describe("<Drawer />", () => {
  test("renders correctly when closed", () => {
    const { asFragment } = render(
      <PortalManager>
        <Drawer isOpen={false} onClose={jest.fn()}>
          <DrawerOverlay>
            <DrawerContent>
              <div>This is the drawer content</div>
              <button>This is a button</button>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PortalManager>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test when closed", async () => {
    await testA11Y(
      <PortalManager>
        <Drawer isOpen={false} onClose={jest.fn()}>
          <DrawerOverlay>
            <DrawerContent>
              <div>This is the drawer content</div>
              <button>This is a button</button>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PortalManager>,
    )
  })

  test("renders correctly when opened", () => {
    const { asFragment } = render(
      <PortalManager>
        <Drawer isOpen onClose={jest.fn()}>
          <DrawerOverlay>
            <DrawerContent>
              <div>This is the drawer content</div>
              <button>This is a button</button>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PortalManager>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test("passes a11y test when opened", async () => {
    await testA11Y(
      <PortalManager>
        <Drawer isOpen onClose={jest.fn()}>
          <DrawerOverlay>
            <DrawerContent>
              <div>This is the drawer content</div>
              <button>This is a button</button>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </PortalManager>,
    )
  })
})
