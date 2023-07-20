import { CloseButton } from "."

export default {
  title: "Components / Data Display / CloseButton",
}

export const Default = () => <CloseButton />

export const State = () => <CloseButton isDisabled />

export const Sizes = () => (
  <>
    <CloseButton size="sm" />
    <CloseButton size="md" />
    <CloseButton size="lg" />
  </>
)
