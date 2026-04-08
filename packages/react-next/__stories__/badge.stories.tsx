import type { Meta } from "@storybook/react-vite"

export default {
  title: "Components / Badge",
  decorators: [(Story) => <Story />],
} satisfies Meta

export { BadgeBasic as Basic } from "compositions-next/examples/badge-basic"
export { BadgeWithSizes as WithSizes } from "compositions-next/examples/badge-with-sizes"
