import { render, screen } from "@testing-library/react"
import * as React from "react"
import { Portal, PortalManager } from "../src/components/portal"

test("should render portal", async () => {
  const { baseElement } = render(
    <Portal>
      <>This is a portal 1</>
      <Portal>This is a portal 2</Portal>
    </Portal>,
  )

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="chakra-portal"
      >
        This is a portal 1
        <div
          class="chakra-portal"
        >
          This is a portal 2
        </div>
      </div>
    </body>
  `)
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

  const portals: HTMLElement[] = Array.from(
    tools.baseElement.querySelectorAll(Portal.selector),
  )

  const [parentPortal, childPortal] = portals
  expect(parentPortal).toContainElement(childPortal)
})

test("should render in a different node", () => {
  render(
    <PortalManager>
      <div data-testid="parent">
        <h1 data-testid="child-1">Foo</h1>
        <Portal>
          <h1 data-testid="child-2">Foo</h1>
        </Portal>
      </div>
    </PortalManager>,
  )

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
        <Portal containerRef={ref}>
          <h1 data-testid="heading">Hello world</h1>
        </Portal>
      </PortalManager>
    )
  }

  const tools = render(<Custom />)

  const heading = tools.getByTestId("heading")
  const container = tools.getByTestId("container")

  expect(container).toContainElement(heading)
})
