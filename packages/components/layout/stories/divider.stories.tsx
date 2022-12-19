import React from "react"
import { Container, Divider } from ".."

export default {
  title: "Components / Data Display / Divider",
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

export const Vertical = () => <Divider axis="vertical" />

export const Horizontal = () => <Divider axis="horizontal" />

export const DashedVariant = () => <Divider variant="dashed" />
