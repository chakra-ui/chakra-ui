import { render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Drawer } from "../src/components/drawer"

const DrawerDemo = (props: Partial<Drawer.RootProps>) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen || false)
  const onClose = () => setIsOpen(false)

  return (
    <Drawer.Root placement={props.placement} onClose={onClose} isOpen={isOpen}>
      <Drawer.Overlay />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header borderBottomWidth="1px">Basic Drawer</Drawer.Header>
          <Drawer.Body>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

test("does not render when isOpen is false", () => {
  render(<DrawerDemo placement="left" isOpen={false} />)

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})

test("does renders when isOpen is true", () => {
  render(<DrawerDemo placement="left" isOpen />)

  expect(screen.queryByRole("dialog")).toBeInTheDocument()
})

test("passes a11y test", async () => {
  const { baseElement } = render(<DrawerDemo placement="left" isOpen />)
  // Test baseElement because we're in a portal
  await testA11y(baseElement, {
    axeOptions: {
      rules: {
        // https://github.com/chakra-ui/chakra-ui/issues/7006
        "aria-dialog-name": { enabled: false },
      },
    },
  })
})

test("renders on the correct side under 'ltr' direction", () => {
  render(<DrawerDemo placement="left" isOpen />)

  expect(screen.queryByRole("dialog")).toHaveStyle("left: 0")
})

test("should make other elements inert when opened", () => {
  const { container } = render(<DrawerDemo placement="right" isOpen />)

  expect(container).toHaveAttribute("data-aria-hidden", "true")
  expect(container).toHaveAttribute("aria-hidden", "true")
})
