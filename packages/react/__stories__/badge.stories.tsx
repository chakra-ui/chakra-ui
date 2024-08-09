import { Box } from "../src"

export default {
  title: "Components / Badge",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export { BadgeBasic as Basic } from "compositions/examples/badge-basic"
export { BadgeVariantTable as Variants } from "compositions/examples/badge-variant-table"
export { BadgeSizeTable as Sizes } from "compositions/examples/badge-size-table"
export { BadgeWithIcon as WithIcon } from "compositions/examples/badge-with-icon"
export { BadgeWithGroup as WithGroup } from "compositions/examples/badge-with-group"
