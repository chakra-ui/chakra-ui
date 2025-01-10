import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Steps",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { StepsBasic as Basic } from "compositions/examples/steps-basic"
export { StepsControlled as Controlled } from "compositions/examples/steps-controlled"
export { StepsSizeTable as Sizes } from "compositions/examples/steps-size-table"
export { StepsVariantTable as Variants } from "compositions/examples/steps-variant-table"
export { StepsVertical as Vertical } from "compositions/examples/steps-vertical"
export { StepsWithDescription as Description } from "compositions/examples/steps-with-description"
export { StepsWithIcon as Icon } from "compositions/examples/steps-with-icon"
export { StepsWithLines as Lines } from "compositions/examples/steps-with-lines"
export { StepsWithStore as Store } from "compositions/examples/steps-with-store"
