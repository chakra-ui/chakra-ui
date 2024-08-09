import { Box } from "../src"

export default {
  title: "Components / Dialog",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { DialogBasic as Basic } from "compositions/examples/dialog-basic"
export { DialogControlled as Controlled } from "compositions/examples/dialog-controlled"
export { DialogCentered as Centered } from "compositions/examples/dialog-centered"
export { DialogWithRole as WithRole } from "compositions/examples/dialog-with-role"
export { DialogNested as Nested } from "compositions/examples/dialog-nested"
export { DialogWithDatalist as WithDatalist } from "compositions/examples/dialog-with-datalist"
export { DialogWithFinalFocus as WithFinalFocus } from "compositions/examples/dialog-with-final-focus"
export { DialogWithInitialFocus as WithInitialFocus } from "compositions/examples/dialog-with-initial-focus"
export { DialogWithInsideScroll as WithInsideScroll } from "compositions/examples/dialog-with-inside-scroll"
export { DialogWithOutsideScroll as WithOutsideScroll } from "compositions/examples/dialog-with-outside-scroll"
export { DialogWithSizes as Sizes } from "compositions/examples/dialog-with-sizes"
