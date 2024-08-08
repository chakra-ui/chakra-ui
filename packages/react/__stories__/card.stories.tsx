import { CardBasic } from "compositions/examples/card-basic"
import { CardHorizontal } from "compositions/examples/card-horizontal"
import { CardSizeTable } from "compositions/examples/card-size-table"
import { CardVariantTable } from "compositions/examples/card-variant-table"
import { CardWithAvatar } from "compositions/examples/card-with-avatar"
import { CardWithForm } from "compositions/examples/card-with-form"
import { CardWithImage } from "compositions/examples/card-with-image"
import { Box } from "../src"

export default {
  title: "Components / Card",
  decorators: [
    (Story: any) => (
      <Box padding="10">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <CardBasic />
}

export const WithAvatar = () => {
  return <CardWithAvatar />
}

export const Variants = () => {
  return <CardVariantTable />
}

export const Sizes = () => {
  return <CardSizeTable />
}

export const WithImage = () => {
  return <CardWithImage />
}

export const Horizontal = () => {
  return <CardHorizontal />
}

export const WithForm = () => {
  return <CardWithForm />
}
