import { Flex } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipCloseOnEscape = () => {
  return (
    <Flex justify="center">
      <InfoTip closeOnEscape={false}>
        Try pressing Escape — this popover stays open because closeOnEscape is
        set to false.
      </InfoTip>
    </Flex>
  )
}
