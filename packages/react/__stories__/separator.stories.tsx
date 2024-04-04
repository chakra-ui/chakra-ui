import { StoryFn } from "@storybook/react"
import { Container, Separator } from "../src"

export default {
  title: "Components / Separator",
  decorators: [
    (Story: StoryFn) => (
      <Container p={4} height="300px">
        <Story />
      </Container>
    ),
  ],
}

export const Basic = () => <Separator />

export const Vertical = () => <Separator orientation="vertical" />

export const DashedVariant = () => (
  <Separator orientation="horizontal" variant="dashed" />
)
