import { testA11y } from "@chakra-ui/test-utils"
import { Avatar, AvatarBadge } from "../src/components/avatar"

const AvatarComp = (
  props: Avatar.RootProps & { src?: string; name?: string },
) => {
  const { src, name, ...rest } = props
  return (
    <Avatar.Root {...rest}>
      <Avatar.Image src={src} />
      <Avatar.Fallback name={name} />
      {props.children}
    </Avatar.Root>
  )
}

describe("Avatar", () => {
  test("passes a11y test", async () => {
    await testA11y(<AvatarComp />, {
      axeOptions: {
        rules: {
          "svg-img-alt": { enabled: false },
        },
      },
    })
  })

  test("passes a11y test with AvatarBadge", async () => {
    await testA11y(
      <AvatarComp>
        <AvatarBadge />
      </AvatarComp>,
      {
        axeOptions: {
          rules: {
            "svg-img-alt": { enabled: false },
          },
        },
      },
    )
  })
})
