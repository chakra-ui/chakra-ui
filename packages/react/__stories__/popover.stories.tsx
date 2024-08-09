import { Box } from "../src"

export default {
  title: "Components / Popover",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { PopoverBasic as Basic } from "compositions/examples/popover-basic"
export { PopoverControlled as Controlled } from "compositions/examples/popover-controlled"
export { PopoverLazyMounted as LazyMounted } from "compositions/examples/popover-lazy-mounted"
export { PopoverNested as Nested } from "compositions/examples/popover-nested"
export { PopoverSizeTable as Sizes } from "compositions/examples/popover-size-table"
export { PopoverWithForm as WithForm } from "compositions/examples/popover-with-form"
export { PopoverWithInitialFocus as WithInitialFocus } from "compositions/examples/popover-with-initial-focus"
export { PopoverWithOffset as WithOffset } from "compositions/examples/popover-with-offset"
export { PopoverWithPlacement as WithPlacement } from "compositions/examples/popover-with-placement"
export { PopoverWithSameWidth as WithSameWidth } from "compositions/examples/popover-with-same-width"
