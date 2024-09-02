import { Box } from "../src"

export default {
  title: "Layout / Center",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { CenterBasic as Basic } from "compositions/examples/center-basic"
export { CenterWithAbsolute as Absolute } from "compositions/examples/center-with-absolute"
export { CenterWithIcons as Icons } from "compositions/examples/center-with-icons"
export { CenterWithInline as Inline } from "compositions/examples/center-with-inline"
export { CenterWithSquare as Square } from "compositions/examples/center-with-square"
