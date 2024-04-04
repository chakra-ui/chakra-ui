import { create } from "@storybook/theming"
// @ts-expect-error
import brandImage from "./storybook-logo.svg"

export default create({
  base: "light",
  brandTitle: "Chakra UI",
  brandUrl: "https://chakra-ui.com",
  brandImage,
})
