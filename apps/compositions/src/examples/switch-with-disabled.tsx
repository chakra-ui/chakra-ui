import { Switch } from "@sh3yk0-ui/react"

export const SwitchWithDisabled = () => {
  return (
    <Switch.Root disabled>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
