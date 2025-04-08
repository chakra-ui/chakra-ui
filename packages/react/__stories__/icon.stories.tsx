import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Icon",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { IconBasic as Basic } from "compositions/examples/icon-basic"
export { IconWithAsProp as AsProp } from "compositions/examples/icon-with-as-prop"
export { IconWithCreateIcon as CreateIcon } from "compositions/examples/icon-with-create-icon"
export { IconWithCustomSvg as CustomSvg } from "compositions/examples/icon-with-custom-svg"
export { IconWithReactIcon as ReactIcon } from "compositions/examples/icon-with-react-icon"
export { IconWithSizes as Sizes } from "compositions/examples/icon-with-sizes"
