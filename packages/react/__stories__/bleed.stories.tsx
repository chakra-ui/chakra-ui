import { Box } from "../src"

export default {
  title: "Layout / Bleed",
  decorators: [(story: Function) => <Box padding="4">{story()}</Box>],
}

export { BleedBasic as Basic } from "compositions/examples/bleed-basic"
export { BleedVertical as Vertical } from "compositions/examples/bleed-vertical"
export { BleedWithDirection as WithDirection } from "compositions/examples/bleed-with-direction"
