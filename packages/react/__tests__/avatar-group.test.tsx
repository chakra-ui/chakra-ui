import { testA11y } from "@chakra-ui/test-utils"
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
