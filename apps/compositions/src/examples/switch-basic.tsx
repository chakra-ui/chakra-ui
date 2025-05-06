import { Switch } from "@sh3yk0-ui/react"

export const SwitchBasic = () => {
  return (
    <Switch.Root>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
