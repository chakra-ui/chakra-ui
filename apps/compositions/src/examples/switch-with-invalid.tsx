import { Switch } from "@chakra-ui/react"

export const SwitchWithInvalid = () => {
  return (
    <Switch.Root invalid>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
