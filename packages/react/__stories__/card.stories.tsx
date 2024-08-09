import { Box } from "../src"

export default {
  title: "Components / Card",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { CardBasic as Basic } from "compositions/examples/card-basic"
export { CardVariantTable as Variants } from "compositions/examples/card-variant-table"
export { CardSizeTable as Sizes } from "compositions/examples/card-size-table"
export { CardWithAvatar as WithAvatar } from "compositions/examples/card-with-avatar"
export { CardWithImage as WithImage } from "compositions/examples/card-with-image"
export { CardHorizontal as Horizontal } from "compositions/examples/card-horizontal"
export { CardWithForm as WithForm } from "compositions/examples/card-with-form"
