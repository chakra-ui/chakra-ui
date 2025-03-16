import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Radio",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RadioBasic as Basic } from "compositions/examples/radio-basic"
export { RadioControlled as Controlled } from "compositions/examples/radio-controlled"
export { RadioSizeTable as Sizes } from "compositions/examples/radio-size-table"
export { RadioVariantTable as Variants } from "compositions/examples/radio-variant-table"
export { RadioWithColors as Colors } from "compositions/examples/radio-with-colors"
export { RadioWithHookForm as HookForm } from "compositions/examples/radio-with-hook-form"
export { RadioWithVariants as DocsVariants } from "compositions/examples/radio-with-variants"
