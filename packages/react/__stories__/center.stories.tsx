import { Box } from "../src"

export default {
  title: "Layout / Center",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { CenterBasic as Basic } from "compositions/examples/center-basic"
export { CenterWithAbsolute as WithAbsolute } from "compositions/examples/center-with-absolute"
export { CenterWithIcons as WithIcons } from "compositions/examples/center-with-icons"
export { CenterWithInline as WithInline } from "compositions/examples/center-with-inline"
export { CenterWithSquare as WithSquare } from "compositions/examples/center-with-square"
