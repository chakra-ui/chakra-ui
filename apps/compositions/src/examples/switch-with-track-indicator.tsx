import { Icon, Switch } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

export const SwitchWithTrackIndicator = () => {
  return (
    <Switch.Root colorPalette="blue" size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator
          fallback={
            <Icon color="gray.400">
              <FaMoon />
            </Icon>
          }
        >
          <Icon color="yellow.400">
            <FaSun />
          </Icon>
        </Switch.Indicator>
      </Switch.Control>
      <Switch.Label>Switch me</Switch.Label>
    </Switch.Root>
  )
}
