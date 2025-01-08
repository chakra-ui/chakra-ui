import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / QrCode",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { QrCodeBasic as Basic } from "compositions/examples/qr-code-basic"
export { QrCodeWithErrorLevel as WithErrorLevel } from "compositions/examples/qr-code-with-error-level"
export { QrCodeWithExport as WithExport } from "compositions/examples/qr-code-with-export"
export { QrCodeWithExportWithLogo as WithExportLogo } from "compositions/examples/qr-code-with-export-with-logo"
export { QrCodeWithFill as WithFill } from "compositions/examples/qr-code-with-fill"
export { QrCodeWithInput as WithInput } from "compositions/examples/qr-code-with-input"
export { QrCodeWithOverlay as WithOverlay } from "compositions/examples/qr-code-with-overlay"
export { QrCodeWithSizes as WithSizes } from "compositions/examples/qr-code-with-sizes"
export { QrCodeWithSpinner as WithSpinner } from "compositions/examples/qr-code-with-spinner"
export { QrCodeWithStore as WithStore } from "compositions/examples/qr-code-with-store"
