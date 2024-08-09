import { Box } from "../src"

export default {
  title: "Components / Action Bar",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { ActionBarBasic as Basic } from "compositions/examples/action-bar-basic"
export { ActionBarWithCloseTrigger as WithCloseTrigger } from "compositions/examples/action-bar-with-close-trigger"
