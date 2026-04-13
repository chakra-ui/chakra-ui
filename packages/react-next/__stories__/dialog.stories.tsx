import type { Meta } from "@storybook/react-vite"

export default {
  title: "Components / Dialog",
  decorators: [(Story) => <Story />],
} satisfies Meta

export { DialogBasic as Basic } from "compositions-next/examples/dialog-basic"
