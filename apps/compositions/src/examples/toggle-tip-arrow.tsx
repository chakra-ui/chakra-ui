import { Flex } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipArrow = () => {
  return (
    <Flex justify="center">
      <InfoTip
        showArrow
        content="This toggle tip has an arrow pointing to the trigger."
      />
    </Flex>
  )
}
