import { SwitchBasic } from "compositions/examples/switch-basic"
import { SwitchControlled } from "compositions/examples/switch-controlled"
import { SwitchSizeTable } from "compositions/examples/switch-size-table"
import { SwitchVariantTable } from "compositions/examples/switch-variant-table"
import { SwitchWithDisabled } from "compositions/examples/switch-with-disabled"
import { SwitchWithIndicator } from "compositions/examples/switch-with-indicator"
import { SwitchWithInvalid } from "compositions/examples/switch-with-invalid"
import { SwitchWithTooltip } from "compositions/examples/switch-with-tooltip"
import { Box } from "../src"

export default {
  title: "Components / Switch",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export const Basic = () => {
  return <SwitchBasic />
}

export const Controlled = () => {
  return <SwitchControlled />
}

export const WithDisabled = () => {
  return <SwitchWithDisabled />
}

export const WithTooltip = () => {
  return <SwitchWithTooltip />
}

export const WithInvalid = () => {
  return <SwitchWithInvalid />
}

export const WithIndicator = () => {
  return <SwitchWithIndicator />
}

export const Variants = () => {
  return <SwitchVariantTable />
}

export const Sizes = () => {
  return <SwitchSizeTable />
}
