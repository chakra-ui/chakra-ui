import { Box } from "../src"

export default {
  title: "Typography / Code",
  decorators: [(story: Function) => <Box padding="40px">{story()}</Box>],
}

export { CodeBasic as Basic } from "compositions/examples/code-basic"
export { CodeWithColors as WithColors } from "compositions/examples/code-with-colors"
export { CodeSizeTable as Sizes } from "compositions/examples/code-size-table"
export { CodeVariantTable as Variants } from "compositions/examples/code-variant-table"
