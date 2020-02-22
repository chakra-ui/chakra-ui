import { configure, addDecorator } from "@storybook/react"
import setup from "./story.setup"

configure(
  require.context(`../packages/Accordion/story/`, true, /\.stories\.(js|ts)x?$/),
  module,
)

addDecorator(setup)
