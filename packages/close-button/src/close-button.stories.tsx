import * as React from "react"
import { CloseButton } from "."

export default {
  title: "CloseButton",
}

/**
 * A simple close button component.
 */

export const Default = () => <CloseButton />

/**
 * Pass the `isDisabled` prop to put the close button component in a disabled state.
 */

export const State = () => <CloseButton isDisabled />

/**
 * Pass the size prop to adjust the size of the close button.
 * Values can be sm, md or lg.
 */

export const Sizes = () => (
  <>
    <CloseButton size="sm" />
    <CloseButton size="md" />
    <CloseButton size="lg" />
  </>
)
