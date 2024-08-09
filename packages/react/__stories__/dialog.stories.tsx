import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Dialog",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DialogBasic as Basic } from "compositions/examples/dialog-basic"
export { DialogCentered as Centered } from "compositions/examples/dialog-centered"
export { DialogControlled as Controlled } from "compositions/examples/dialog-controlled"
export { DialogNested as Nested } from "compositions/examples/dialog-nested"
export { DialogWithDatalist as WithDatalist } from "compositions/examples/dialog-with-datalist"
export { DialogWithFinalFocus as WithFinalFocus } from "compositions/examples/dialog-with-final-focus"
export { DialogWithInitialFocus as WithInitialFocus } from "compositions/examples/dialog-with-initial-focus"
export { DialogWithInsideScroll as WithInsideScroll } from "compositions/examples/dialog-with-inside-scroll"
export { DialogWithOutsideScroll as WithOutsideScroll } from "compositions/examples/dialog-with-outside-scroll"
export { DialogWithRole as WithRole } from "compositions/examples/dialog-with-role"
export { DialogWithSizes as Sizes } from "compositions/examples/dialog-with-sizes"
