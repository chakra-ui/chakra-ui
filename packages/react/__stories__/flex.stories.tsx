import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Flex",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FlexBasic as Basic } from "compositions/examples/flex-basic"
export { FlexWithAlign as Align } from "compositions/examples/flex-with-align"
export { FlexWithAutoMargin as AutoMargin } from "compositions/examples/flex-with-auto-margin"
export { FlexWithDirection as Direction } from "compositions/examples/flex-with-direction"
export { FlexWithJustify as Justify } from "compositions/examples/flex-with-justify"
export { FlexWithOrder as Order } from "compositions/examples/flex-with-order"
export { FlexWithWrap as Wrap } from "compositions/examples/flex-with-wrap"
