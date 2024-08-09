import { Box } from "../src"

export default {
  title: "Components / Icon",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { IconBasic as Basic } from "compositions/examples/icon-basic"
export { IconWithCustomSvg as WithCustomSvg } from "compositions/examples/icon-with-custom-svg"
export { IconWithReactIcon as WithReactIcon } from "compositions/examples/icon-with-react-icon"
export { IconWithCreateIcon as WithCreateIcon } from "compositions/examples/icon-with-create-icon"
