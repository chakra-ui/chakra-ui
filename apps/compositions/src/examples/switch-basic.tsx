import { Switch } from "@chakra-ui/react"

export const SwitchBasic = () => {
  return (
    <Switch.Root>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
