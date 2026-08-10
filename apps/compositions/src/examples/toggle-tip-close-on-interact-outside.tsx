import { Flex } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const ToggleTipCloseOnInteractOutside = () => {
  return (
    <Flex justify="center">
      <InfoTip
        closeOnInteractOutside={false}
        content="This is some additional information."
      />
    </Flex>
  )
}
