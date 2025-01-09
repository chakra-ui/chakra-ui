import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Foundations / System",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SystemAlertRecipe as AlertRecipe } from "compositions/examples/system/alert-recipe"
export { SystemColorPalette as ColorPalette } from "compositions/examples/system/color-palette"
export { SystemFlexRecipe as FlexRecipe } from "compositions/examples/system/flex-recipe"
export { SystemInlineRecipe as InlineRecipe } from "compositions/examples/system/inline-recipe"
export { SystemInlineSlotRecipe as InlineSlotRecipe } from "compositions/examples/system/inline-slot-recipe"
export { SystemWithAnimation as Animation } from "compositions/examples/system/with-animation"
export { SystemWithAsChild as AsChild } from "compositions/examples/system/with-as-child"
export { WithCompoundBoolean as CompoundBoolean } from "compositions/examples/system/with-compound-boolean"
export { WithCompoundColorPalette as CompoundColorPalette } from "compositions/examples/system/with-compound-color-palette"
export { SystemWithUseRecipe as UseRecipe } from "compositions/examples/system/with-use-recipe"
export { SystemWithUseSlotRecipe as UseSlotRecipe } from "compositions/examples/system/with-use-slot-recipe"
