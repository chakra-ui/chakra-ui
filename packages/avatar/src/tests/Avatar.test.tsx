import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Avatar, AvatarBadge } from ".."

test("Avatar renders correctly", () => {
  const { asFragment } = render(<Avatar />)
  expect(asFragment()).toMatchSnapshot()
})

test("Avatar with AvatarBadge renders correctly", () => {
  const { asFragment } = render(
    <Avatar>
      <AvatarBadge />
    </Avatar>,
  )
  expect(asFragment()).toMatchSnapshot()
})

/**
 * This was skipped because I haven't figured out
 * how to test/mock an image rendering process with jest
 */
test.skip("renders an image", () => {
  const src = "https://bit.ly/dan-abramov"
  const name = "Dan Abramov"
  const { container, debug } = render(<Avatar src={src} name={name} />)

  debug()

  const img = container.querySelector("img")
  expect(img).toHaveAttribute("src", src)
  expect(img).toHaveAttribute("alt", name)
})

test("renders a name avatar if no src", () => {
  const name = "Dan Abramov"
  const { getByLabelText } = render(<Avatar name="Dan Abramov" />)

  const img = getByLabelText(name)
  expect(img).toHaveTextContent("DA")
})

test("renders a default avatar if no name or src", () => {
  const { getByRole } = render(<Avatar />)
  getByRole("img")
})
