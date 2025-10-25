import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Tour",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TourBasic as Basic } from "compositions/examples/tour-basic"
export { TourControlled as Controlled } from "compositions/examples/tour-controlled"
export { TourWaitStep as WaitStep } from "compositions/examples/tour-wait-step"
export { TourWithCloseOnEscape as CloseOnEscape } from "compositions/examples/tour-with-close-on-escape"
export { TourWithCloseOnInteractOutside as CloseOnInteractOutside } from "compositions/examples/tour-with-close-on-interact-outside"
export { TourWithImmediate as Immediate } from "compositions/examples/tour-with-immediate"
export { TourWithKeyboard as Keyboard } from "compositions/examples/tour-with-keyboard"
export { TourWithPlacements as Placements } from "compositions/examples/tour-with-placements"
export { TourWithPreventInteraction as PreventInteraction } from "compositions/examples/tour-with-prevent-interaction"
export { TourWithSizes as Sizes } from "compositions/examples/tour-with-sizes"
export { TourWithSpotlightOffset as SpotlightOffset } from "compositions/examples/tour-with-spotlight-offset"
export { TourWithoutArrow as WithoutArrow } from "compositions/examples/tour-without-arrow"
export { TourWithoutBackdrop as WithoutBackdrop } from "compositions/examples/tour-without-backdrop"
