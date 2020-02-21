/** @jsx jsx */
import { jsx } from "@emotion/core"
import { createChakra, PropsOf } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"

const Button = createChakra("button", {
  themeKey: "CloseButton.Button",
  attrs: {
    type: "button",
    "aria-label": "Close",
  },
})

function CloseIcon(props: IconProps) {
  return (
    <Icon focusable="false" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
      />
    </Icon>
  )
}

const ButtonIcon = createChakra(CloseIcon, {
  themeKey: "CloseButton.Icon",
})

export function CloseButton(props: PropsOf<typeof Button>) {
  const { variantSize, ...rest } = props
  return (
    <Button outline="0" variantSize={variantSize} {...rest}>
      <ButtonIcon variantSize={variantSize} />
    </Button>
  )
}

export default CloseButton
