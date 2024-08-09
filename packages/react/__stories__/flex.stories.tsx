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
export { FlexWithAlign as WithAlign } from "compositions/examples/flex-with-align"
export { FlexWithAutoMargin as AutoMargin } from "compositions/examples/flex-with-auto-margin"
export { FlexWithDirection as WithDirection } from "compositions/examples/flex-with-direction"
export { FlexWithJustify as WithJustify } from "compositions/examples/flex-with-justify"
export { FlexWithOrder as WithOrder } from "compositions/examples/flex-with-order"
export { FlexWithWrap as WithWrap } from "compositions/examples/flex-with-wrap"
