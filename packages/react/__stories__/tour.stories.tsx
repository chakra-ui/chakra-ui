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
export { TourWaitStep as WaitStep } from "compositions/examples/tour-wait-step"
export { TourCloseOnEscape as CloseOnEscape } from "compositions/examples/tour-close-on-escape"
export { TourCloseOnInteractOutside as CloseOnInteractOutside } from "compositions/examples/tour-close-on-interact-outside"
export { TourWithKeyboard as Keyboard } from "compositions/examples/tour-with-keyboard"
export { TourWithPlacements as Placements } from "compositions/examples/tour-with-placements"
export { TourPreventInteraction as PreventInteraction } from "compositions/examples/tour-prevent-interaction"
export { TourWithoutArrow as WithoutArrow } from "compositions/examples/tour-without-arrow"
export { TourWithoutBackdrop as WithoutBackdrop } from "compositions/examples/tour-without-backdrop"
export { TourWithRouting as Routing } from "compositions/examples/tour-with-routing"
export { TourWithSpotlightOffset as SpotlightOffset } from "compositions/examples/tour-spotlight-offset"
