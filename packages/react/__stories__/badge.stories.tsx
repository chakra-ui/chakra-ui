import { BadgeBasic } from "compositions/examples/badge-basic"
import { BadgeSizeTable } from "compositions/examples/badge-size-table"
import { BadgeVariantTable } from "compositions/examples/badge-variant-table"
import { BadgeWithGroup } from "compositions/examples/badge-with-group"
import { BadgeWithIcon } from "compositions/examples/badge-with-icon"
import { Box } from "../src"

export default {
  title: "Components / Badge",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <BadgeBasic />
}

export const Variants = () => {
  return <BadgeVariantTable />
}

export const Sizes = () => {
  return <BadgeSizeTable />
}

export const WithIcon = () => {
  return <BadgeWithIcon />
}

export const WithGroup = () => {
  return <BadgeWithGroup />
}
