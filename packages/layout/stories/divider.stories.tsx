import React from "react"
import { StoryFn } from "@storybook/addons"
import { Container, Divider } from ".."

export default {
  title: "Divider",
  decorators: [
    (story: StoryFn) => (
      <Container p={4} height="300px">
        {story()}
      </Container>
    ),
  ],
}

/**
 * Divider will use the `horizontal` variant by default.
 *
 * @see `/theme/components/Divider.ts`
 */
export const Basic = () => <Divider />

export const Vertical = () => <Divider variant="vertical" />
