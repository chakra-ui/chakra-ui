import { Switch } from "@chakra-ui/react"
import { HiCheck, HiX } from "react-icons/hi"

export const SwitchWithThumbIndicator = () => {
  return (
    <Switch.Root size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb>
          <Switch.ThumbIndicator fallback={<HiX />}>
            <HiCheck />
          </Switch.ThumbIndicator>
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Switch me</Switch.Label>
    </Switch.Root>
  )
}
