import { StoryFn } from "@storybook/react"
import { Container, Divider } from ".."

export default {
  title: "Components / Data Display / Divider",
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
