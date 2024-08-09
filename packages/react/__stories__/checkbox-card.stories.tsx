import { Box } from "../src"

export default {
  title: "Components / Checkbox Card",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { CheckboxCardBasic as Basic } from "compositions/examples/checkbox-card-basic"
export { CheckboxCardDisabled as Disabled } from "compositions/examples/checkbox-card-disabled"
export { CheckboxCardWithStates as States } from "compositions/examples/checkbox-card-with-states"
export { CheckboxCardWithAddon as WithAddon } from "compositions/examples/checkbox-card-with-addon"
export { CheckboxCardWithIcon as WithIcon } from "compositions/examples/checkbox-card-with-icon"
export { CheckboxCardVariantTable as Variants } from "compositions/examples/checkbox-card-variant-table"
export { CheckboxCardSizeTable as Sizes } from "compositions/examples/checkbox-card-size-table"
export { CheckboxCardWithGroup as WithGroup } from "compositions/examples/checkbox-card-with-group"
