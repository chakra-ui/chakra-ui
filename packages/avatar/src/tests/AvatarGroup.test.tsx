import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Avatar } from "../Avatar"
import { AvatarGroup } from "../AvatarGroup"

test("AvatarGroup renders correctly", () => {
  const { asFragment } = render(
    <AvatarGroup>
      <Avatar />
    </AvatarGroup>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("renders a number avatar showing count of truncated avatars", () => {
  const { getByText } = render(
    <AvatarGroup max={2}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )
  getByText("+3")
})
