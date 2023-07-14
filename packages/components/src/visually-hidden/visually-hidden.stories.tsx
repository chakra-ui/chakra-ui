import { VisuallyHidden, VisuallyHiddenInput } from "."

export default {
  title: "Components / Disclosure / Visually Hidden",
}

export const hiddenSpan = () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
)

export const hiddenInput = () => (
  <VisuallyHiddenInput
    defaultChecked
    onChange={(event) => {
      console.log(event.target.checked)
    }}
  />
)
