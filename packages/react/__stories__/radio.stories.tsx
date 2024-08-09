import { Box } from "../src"

export default {
  title: "Components / Radio",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { RadioBasic as Basic } from "compositions/examples/radio-basic"
export { RadioControlled as Controlled } from "compositions/examples/radio-controlled"
export { RadioSizeTable as Sizes } from "compositions/examples/radio-size-table"
export { RadioVariantTable as Variants } from "compositions/examples/radio-variant-table"
export { RadioWithColors as WithColors } from "compositions/examples/radio-with-colors"
export { RadioWithForm as WithForm } from "compositions/examples/radio-with-form"
