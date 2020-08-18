import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Avatar, AvatarGroup } from "../src"

test("AvatarGroup renders correctly", () => {
  const tools = render(
    <AvatarGroup>
      <Avatar />
    </AvatarGroup>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("renders a number avatar showing count of truncated avatars", () => {
  const tools = render(
    <AvatarGroup max={2}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )
  const moreLabel = tools.getByText("+3")
  expect(moreLabel).toBeInTheDocument()
})

test("does not render a number avatar showing count of truncated avatars if max is equal to avatars given", async () => {
  const tools = render(
    <AvatarGroup max={4}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )
  const moreLabel = tools.container.querySelector(".chakra-avatar--excess")
  expect(moreLabel).not.toBeInTheDocument()
})

test("does not render a number avatar showing count of truncated avatars if max is more than avatars given", async () => {
  const tools = render(
    <AvatarGroup max={6}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )
  const moreLabel = tools.container.querySelector(".chakra-avatar--excess")
  expect(moreLabel).not.toBeInTheDocument()
})
