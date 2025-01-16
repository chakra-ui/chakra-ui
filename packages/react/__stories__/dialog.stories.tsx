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
export { DialogControlled as Controlled } from "compositions/examples/dialog-controlled"
export { DialogNested as Nested } from "compositions/examples/dialog-nested"
export { DialogWithCloseOutside as CloseOutside } from "compositions/examples/dialog-with-close-outside"
export { DialogWithContext as Context } from "compositions/examples/dialog-with-context"
export { DialogWithCover as Cover } from "compositions/examples/dialog-with-cover"
export { DialogWithDatalist as Datalist } from "compositions/examples/dialog-with-datalist"
export { DialogWithFinalFocus as FinalFocus } from "compositions/examples/dialog-with-final-focus"
export { DialogWithFullscreen as Fullscreen } from "compositions/examples/dialog-with-fullscreen"
export { DialogWithInitialFocus as InitialFocus } from "compositions/examples/dialog-with-initial-focus"
export { DialogWithInsideScroll as InsideScroll } from "compositions/examples/dialog-with-inside-scroll"
export { DialogWithOutsideScroll as OutsideScroll } from "compositions/examples/dialog-with-outside-scroll"
export { DialogWithPlacement as Placement } from "compositions/examples/dialog-with-placement"
export { DialogWithRole as Role } from "compositions/examples/dialog-with-role"
export { DialogWithSizes as Sizes } from "compositions/examples/dialog-with-sizes"
export { DialogWithStore as Store } from "compositions/examples/dialog-with-store"
