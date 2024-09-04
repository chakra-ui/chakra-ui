import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Card",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CardBasic as Basic } from "compositions/examples/card-basic"
export { CardVariantTable as Variants } from "compositions/examples/card-variant-table"
export { CardSizeTable as Sizes } from "compositions/examples/card-size-table"
export { CardWithAvatar as Avatar } from "compositions/examples/card-with-avatar"
export { CardWithImage as Image } from "compositions/examples/card-with-image"
export { CardHorizontal as Horizontal } from "compositions/examples/card-horizontal"
export { CardWithForm as Form } from "compositions/examples/card-with-form"
