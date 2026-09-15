import { Flex } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipCloseOnEscape = () => {
  return (
    <Flex justify="center">
      <InfoTip
        closeOnEscape={false}
        content="This is some additional information."
      />
    </Flex>
  )
}
