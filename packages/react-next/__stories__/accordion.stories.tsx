import type { Meta } from "@storybook/react-vite"

export default {
  title: "Components / Accordion",
  decorators: [(Story) => <Story />],
} satisfies Meta

export { AccordionBasic as Basic } from "compositions-next/examples/accordion-basic"
