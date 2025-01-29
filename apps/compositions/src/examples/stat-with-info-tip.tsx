import { Stat } from "@chakra-ui/react"
import { InfoTip } from "compositions/ui/toggle-tip"

export const StatWithInfoTip = () => {
  return (
    <Stat.Root>
      <Stat.Label>
        Unique
        <InfoTip>Some info</InfoTip>
      </Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
    </Stat.Root>
  )
}
