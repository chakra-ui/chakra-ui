import React from "react"
import { Container, Divider } from ".."

export default {
  title: "Divider",
  decorators: [
    (Story: Function) => (
      <Container p={4} height="300px">
        <Story />
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
