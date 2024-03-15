import { CloseButton } from "."

export default {
  title: "Data Display / CloseButton",
}

/**
 * A simple close button component.
 */

export const Default = () => <CloseButton />

/**
 * Pass the `disabled` prop to put the close button component in a disabled state.
 */

export const State = () => <CloseButton disabled />

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
