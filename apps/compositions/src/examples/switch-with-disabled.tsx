import { Switch } from "@chakra-ui/react"

export const SwitchWithDisabled = () => {
  return (
    <Switch.Root disabled>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
