import { configure, addDecorator } from "@storybook/react"
import setup from "./story.setup"

configure(
  require.context(`../packages/styled/src/`, true, /\.stories\.(js|ts)x?$/),
  module,
)

addDecorator(setup)
