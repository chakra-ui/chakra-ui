import { render, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { PortalManager, Portal } from "../src"

test("should render portal", () => {
  const tools = render(
    <PortalManager>
      <Portal>This is a portal</Portal>
    </PortalManager>,
  )

  expect(tools.baseElement.innerHTML).toMatchSnapshot()
})

test("should render nested portal", () => {
  const tools = render(
    <PortalManager>
      <Portal>
        This is a portal.
        <Portal>This is a nested portal</Portal>
      </Portal>
    </PortalManager>,
  )

  expect(tools.asFragment()).toMatchSnapshot()

  const portals = Array.from(
    tools.baseElement.querySelectorAll(".chakra-portal"),
  )

  const [parentPortal, childPortal] = portals
  expect(parentPortal).toContainElement(childPortal as HTMLElement)
})

test("should render in a different node", () => {
  const tools = render(
    <PortalManager>
      <div data-testid="parent">
        <h1 data-testid="child-1">Foo</h1>
        <Portal>
          <h1 data-testid="child-2">Foo</h1>
        </Portal>
      </div>
    </PortalManager>,
  )

  expect(tools.asFragment()).toMatchSnapshot()

  const parent = screen.getByTestId("parent")

  const child1 = screen.getByTestId("child-1")
  const child2 = screen.getByTestId("child-2")

  expect(parent).toContainElement(child1)
  expect(parent).not.toContainElement(child2)
})

test("should render into a custom container", () => {
  const Custom = () => {
    const ref = React.useRef<any>(null)
    return (
      <PortalManager>
        <div data-testid="container" ref={ref} />
        <Portal getContainer={() => ref.current}>
          <h1 data-testid="heading">Hello world</h1>
        </Portal>
      </PortalManager>
    )
  }

  const tools = render(<Custom />)

  expect(tools.asFragment()).toMatchSnapshot()

  const heading = tools.getByTestId("heading")
  const container = tools.getByTestId("container")

  expect(container).toContainElement(heading)
})
