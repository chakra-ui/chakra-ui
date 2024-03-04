import { render, screen, testA11y } from "@chakra-ui/test-utils"
import { Avatar, AvatarGroup } from "../src/components/avatar"

const AvatarComp = (props: Avatar.RootProps) => {
  return (
    <Avatar.Root {...props}>
      <Avatar.Image />
      <Avatar.Fallback />
    </Avatar.Root>
  )
}

test("passes a11y test", async () => {
  await testA11y(
    <AvatarGroup>
      <AvatarComp />
    </AvatarGroup>,
    {
      axeOptions: {
        rules: {
          "svg-img-alt": { enabled: false },
        },
      },
    },
  )
})

test("renders a number avatar showing count of truncated avatars", () => {
  render(
    <AvatarGroup max={2}>
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
    </AvatarGroup>,
  )
  const moreLabel = screen.getByText("+3")
  expect(moreLabel).toBeInTheDocument()
})

test("does not render a number avatar showing count of truncated avatars if max is equal to avatars given", async () => {
  const tools = render(
    <AvatarGroup max={4}>
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
    </AvatarGroup>,
  )
  const moreLabel = tools.container.querySelector(".chakra-avatar--excess")
  expect(moreLabel).not.toBeInTheDocument()
})

test("does not render a number avatar showing count of truncated avatars if max is more than avatars given", async () => {
  const tools = render(
    <AvatarGroup max={6}>
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
      <AvatarComp />
    </AvatarGroup>,
  )
  const moreLabel = tools.container.querySelector(".chakra-avatar--excess")
  expect(moreLabel).not.toBeInTheDocument()
})
