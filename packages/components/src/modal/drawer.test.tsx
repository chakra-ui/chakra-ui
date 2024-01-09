import { render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from "."

const SimpleDrawer = (props: {
  placement?: DrawerProps["placement"]
  isOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen || false)
  const onClose = () => setIsOpen(false)

  return (
    <Drawer placement={props.placement} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

test("does not render when isOpen is false", () => {
  render(<SimpleDrawer placement="left" isOpen={false} />)

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})

test("does renders when isOpen is true", () => {
  render(<SimpleDrawer placement="left" isOpen />)

  expect(screen.queryByRole("dialog")).toBeInTheDocument()
})

test("passes a11y test", async () => {
  const { baseElement } = render(<SimpleDrawer placement="left" isOpen />)
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
  render(<SimpleDrawer placement="left" isOpen />)

  expect(screen.queryByRole("dialog")).toHaveStyle("left: 0")
})

test("should make other elements inert when opened", () => {
  const { container } = render(<SimpleDrawer placement="right" isOpen />)

  expect(container).toHaveAttribute("data-aria-hidden", "true")
  expect(container).toHaveAttribute("aria-hidden", "true")
})

// test("swaps sides (left/right) under 'rtl' direction", () => {
//   render(
//     <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
//       <SimpleDrawer placement="start" isOpen />
//     </ThemeProvider>,
//   )

//   expect(screen.queryByRole("dialog")).toHaveStyle("right: 0")
// })

// test("renders correctly (top/bottom) under 'rtl' direction", () => {
//   render(
//     <ThemeProvider theme={extendTheme({ direction: "rtl" })}>
//       <SimpleDrawer placement="top" isOpen />
//     </ThemeProvider>,
//   )

//   expect(screen.queryByRole("dialog")).toHaveStyle("top: 0")
// })
