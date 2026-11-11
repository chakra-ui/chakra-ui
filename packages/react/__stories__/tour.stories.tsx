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
export { TourBranching as Branching } from "compositions/examples/tour-branching"
export { TourDontShowAgain as DontShowAgain } from "compositions/examples/tour-dont-show-again"
export { TourEmptyState as EmptyState } from "compositions/examples/tour-empty-state"
export { TourFeatureAnnouncement as FeatureAnnouncement } from "compositions/examples/tour-feature-announcement"
export { TourPersisted as Persisted } from "compositions/examples/tour-persisted"
export { TourPreventInteraction as PreventInteraction } from "compositions/examples/tour-prevent-interaction"
export { TourWaitForAction as WaitForAction } from "compositions/examples/tour-wait-for-action"
export { TourWithChecklist as Checklist } from "compositions/examples/tour-with-checklist"
export { TourWithMedia as Media } from "compositions/examples/tour-with-media"
export { TourWithPlacement as Placement } from "compositions/examples/tour-with-placement"
export { TourWithProgress as Progress } from "compositions/examples/tour-with-progress"
export { TourWithRouting as Routing } from "compositions/examples/tour-with-routing"
export { TourWithStepTypes as StepTypes } from "compositions/examples/tour-with-step-types"
export { TourWithoutBackdrop as WithoutBackdrop } from "compositions/examples/tour-without-backdrop"
