import { ButtonBasic } from "compositions/examples/button-basic"
import { ButtonSizeTable } from "compositions/examples/button-size-table"
import { ButtonVariantTable } from "compositions/examples/button-variant-table"
import { ButtonWithGroup } from "compositions/examples/button-with-group"
import { ButtonWithIcons } from "compositions/examples/button-with-icons"
import { ButtonWithLoading } from "compositions/examples/button-with-loading"
import { ButtonWithStyleOverride } from "compositions/examples/button-with-style-override"
import { Box } from "../src"

export default {
  title: "Components / Button",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <ButtonBasic />
}

export const Variants = () => {
  return <ButtonVariantTable />
}

export const Sizes = () => {
  return <ButtonSizeTable />
}

export const WithIcon = () => {
  return <ButtonWithIcons />
}

export const WithLoading = () => {
  return <ButtonWithLoading />
}

export const WithStyleOverrides = () => {
  return <ButtonWithStyleOverride />
}

export const WithGroup = () => {
  return <ButtonWithGroup />
}
