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
export { DialogWithCover as Cover } from "compositions/examples/dialog-with-cover"
export { DialogWithDatalist as Datalist } from "compositions/examples/dialog-with-datalist"
export { DialogWithFinalFocus as FinalFocus } from "compositions/examples/dialog-with-final-focus"
export { DialogWithInitialFocus as InitialFocus } from "compositions/examples/dialog-with-initial-focus"
export { DialogWithInsideScroll as InsideScroll } from "compositions/examples/dialog-with-inside-scroll"
export { DialogWithOutsideScroll as OutsideScroll } from "compositions/examples/dialog-with-outside-scroll"
export { DialogWithRole as Role } from "compositions/examples/dialog-with-role"
export { DialogWithSizes as Sizes } from "compositions/examples/dialog-with-sizes"
