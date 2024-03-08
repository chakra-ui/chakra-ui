import { CloseButton } from "../src/components/close-button"

export default {
  title: "Components / CloseButton",
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
