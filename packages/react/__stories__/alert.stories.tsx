import { AlertBasic } from "compositions/examples/alert-basic"
import { AlertSizeTable } from "compositions/examples/alert-size-table"
import { AlertVariantTable } from "compositions/examples/alert-variant-table"
import { AlertWithSpinner } from "compositions/examples/alert-with-spinner"
import { Box } from "../src"

export default {
  title: "Components / Alert",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export const Basic = () => {
  return <AlertBasic />
}

export const Variants = () => {
  return <AlertVariantTable />
}

export const Sizes = () => {
  return <AlertSizeTable />
}

export const WithSpinner = () => {
  return <AlertWithSpinner />
}
