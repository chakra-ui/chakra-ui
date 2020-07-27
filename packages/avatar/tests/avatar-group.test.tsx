import React from "react"
import { render, testA11Y } from "@chakra-ui/test-utils"
import { Avatar, AvatarGroup } from "../src"

describe("<AvatarGroup />", () => {
  test("renders correctly", () => {
    const tools = render(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )
    expect(tools.asFragment()).toMatchSnapshot()
  })

  test("passes a11y test", async () => {
    await testA11Y(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )
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
})
