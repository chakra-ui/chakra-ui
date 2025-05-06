"use client"

import { Icon, Switch } from "@sh3yk0-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

export const SwitchWithTrackIndicator = () => {
  return (
    <Switch.Root colorPalette="blue" size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator fallback={<Icon as={FaMoon} color="gray.400" />}>
          <Icon as={FaSun} color="yellow.400" />
        </Switch.Indicator>
      </Switch.Control>
      <Switch.Label>Switch me</Switch.Label>
    </Switch.Root>
  )
}
