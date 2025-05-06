import { Switch } from "@sh3yk0-ui/react"
import { HiCheck, HiX } from "react-icons/hi"

export const SwitchWithThumbIndicator = () => {
  return (
    <Switch.Root size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb>
          <Switch.ThumbIndicator fallback={<HiX color="black" />}>
            <HiCheck />
          </Switch.ThumbIndicator>
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Switch me</Switch.Label>
    </Switch.Root>
  )
}
