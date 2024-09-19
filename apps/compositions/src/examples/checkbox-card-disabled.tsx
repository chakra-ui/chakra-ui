import { CheckboxCard } from "compositions/ui/checkbox-card"

export const CheckboxCardDisabled = () => {
  return (
    <CheckboxCard
      disabled
      label="Disabled"
      description="This is a disabled checkbox"
      maxW="320px"
    />
  )
}
