import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { Avatar, AvatarGroup } from "../src"

describe("<AvatarGroup />", () => {
  test("matches snapshot", () => {
    const tools = render(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )
    expect(tools.asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )
  })

  test("renders a number avatar showing count of truncated avatars", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )
    const moreLabel = screen.getByText("+3")
    expect(moreLabel).toBeInTheDocument()
  })
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
