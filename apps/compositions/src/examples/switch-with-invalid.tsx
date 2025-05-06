import { Switch } from "@sh3yk0-ui/react"

export const SwitchWithInvalid = () => {
  return (
    <Switch.Root invalid>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
