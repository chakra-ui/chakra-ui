import { Flex } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipCloseOnInteractOutside = () => {
  return (
    <Flex justify="center">
      <InfoTip closeOnInteractOutside={false}>
        Click outside this popover — it stays open because
        closeOnInteractOutside is set to false.
      </InfoTip>
    </Flex>
  )
}
