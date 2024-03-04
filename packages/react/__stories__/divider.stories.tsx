import { StoryFn } from "@storybook/react"
import { Container, Divider } from "../src"

export default {
  title: "Data Display / Divider",
  decorators: [
    (Story: StoryFn) => (
      <Container p={4} height="300px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => <Divider />

export const Vertical = () => <Divider orientation="vertical" />

export const Horizontal = () => <Divider orientation="horizontal" />

export const DashedVariant = () => (
  <Divider orientation="horizontal" variant="dashed" />
)
