import { CheckboxCardBasic } from "compositions/examples/checkbox-card-basic"
import { CheckboxCardDisabled } from "compositions/examples/checkbox-card-disabled"
import { CheckboxCardSizeTable } from "compositions/examples/checkbox-card-size-table"
import { CheckboxCardVariantTable } from "compositions/examples/checkbox-card-variant-table"
import { CheckboxCardWithAddon } from "compositions/examples/checkbox-card-with-addon"
import { CheckboxCardWithGroup } from "compositions/examples/checkbox-card-with-group"
import { CheckboxCardWithIcon } from "compositions/examples/checkbox-card-with-icon"
import { CheckboxCardWithStates } from "compositions/examples/checkbox-card-with-states"
import { Box } from "../src"

export default {
  title: "Components / Checkbox Card",
  decorators: [
    (story: Function) => (
      <Box mt="40px" padding="10">
        {story()}
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <CheckboxCardBasic />
}

export const Disabled = () => {
  return <CheckboxCardDisabled />
}

export const States = () => {
  return <CheckboxCardWithStates />
}

export const WithAddon = () => {
  return <CheckboxCardWithAddon />
}

export const WithIcon = () => {
  return <CheckboxCardWithIcon />
}

export const Variants = () => {
  return <CheckboxCardVariantTable />
}

export const Sizes = () => {
  return <CheckboxCardSizeTable />
}

export const WithGroup = () => {
  return <CheckboxCardWithGroup />
}
