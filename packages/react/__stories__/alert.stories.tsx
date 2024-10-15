import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Alert",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { AlertBasic as Basic } from "compositions/examples/alert-basic"
export { AlertSizeTable as Sizes } from "compositions/examples/alert-size-table"
export { AlertVariantTable as Variants } from "compositions/examples/alert-variant-table"
export { AlertWithButtons as Buttons } from "compositions/examples/alert-with-buttons"
export { AlertWithCloseButton as CloseButton } from "compositions/examples/alert-with-close-button"
export { AlertWithColorPaletteOverride as ColorPaletteOverride } from "compositions/examples/alert-with-color-palette-override"
export { AlertWithCustomIcon as CustomIcon } from "compositions/examples/alert-with-custom-icon"
export { AlertWithCustomization as Customization } from "compositions/examples/alert-with-customization"
export { AlertWithDescription as Description } from "compositions/examples/alert-with-description"
export { AlertWithSpinner as Spinner } from "compositions/examples/alert-with-spinner"
export { AlertWithStatus as Status } from "compositions/examples/alert-with-status"
