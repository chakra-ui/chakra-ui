import { Stat } from "@chakra-ui/react"

export const StatWithValueUnit = () => {
  return (
    <Stat.Root>
      <Stat.Label>Time to complete</Stat.Label>
      <Stat.ValueText alignItems="baseline">
        3 <Stat.ValueUnit>hr</Stat.ValueUnit>
        20 <Stat.ValueUnit>min</Stat.ValueUnit>
      </Stat.ValueText>
    </Stat.Root>
  )
}
