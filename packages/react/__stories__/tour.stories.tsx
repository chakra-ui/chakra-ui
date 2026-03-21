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
export { TourWithStepTypes as StepTypes } from "compositions/examples/tour-with-step-types"
export { TourWithPlacement as Placement } from "compositions/examples/tour-with-placement"
export { TourWithCustomActions as CustomActions } from "compositions/examples/tour-with-custom-actions"
export { TourWithCallbacks as Callbacks } from "compositions/examples/tour-with-callbacks"
export { TourWithProgress as WithProgress } from "compositions/examples/tour-with-progress"
export { TourWithRouting as Routing } from "compositions/examples/tour-with-routing"
export { TourWithoutBackdrop as WithoutBackdrop } from "compositions/examples/tour-without-backdrop"
export { TourWithKeyboard as Keyboard } from "compositions/examples/tour-with-keyboard"
export { TourOnboarding as Onboarding } from "compositions/examples/tour-onboarding"
export { TourFormGuide as FormGuide } from "compositions/examples/tour-form-guide"
export { TourFeatureDiscovery as FeatureDiscovery } from "compositions/examples/tour-feature-discovery"
export { TourMultiPage as MultiPage } from "compositions/examples/tour-multi-page"
export { TourEcommerce as Ecommerce } from "compositions/examples/tour-ecommerce"
export { TourKanban as Kanban } from "compositions/examples/tour-kanban"
export { TourConditional as Conditional } from "compositions/examples/tour-conditional"
export { TourDataTable as DataTable } from "compositions/examples/tour-data-table"
export { TourChatApp as ChatApp } from "compositions/examples/tour-chat-app"
