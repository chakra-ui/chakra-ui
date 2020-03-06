import { configure, addDecorator } from "@storybook/react"
import setup from "./story.setup"

configure(
  require.context(`../packages/color-mode/src/`, true, /\.stories\.(js|ts)x?$/),
  module,
)

addDecorator(setup)
