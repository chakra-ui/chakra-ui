import { VisuallyHidden } from "../src/components/visually-hidden"

export default {
  title: "Layout / Visually Hidden",
}

export const hiddenSpan = () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
)

export const hiddenInput = () => (
  <VisuallyHidden asChild>
    <input type="checkbox" defaultChecked />
  </VisuallyHidden>
)
