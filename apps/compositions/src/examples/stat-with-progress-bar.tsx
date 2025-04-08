import { FormatNumber, Progress, Stat } from "@chakra-ui/react"

export const StatWithProgressBar = () => {
  return (
    <Stat.Root maxW="240px">
      <Stat.Label>This week</Stat.Label>
      <Stat.ValueText>
        <FormatNumber
          value={1340}
          style="currency"
          currency="USD"
          maximumFractionDigits={0}
        />
      </Stat.ValueText>
      <Stat.HelpText mb="2">+12% from last week</Stat.HelpText>
      <Progress.Root>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stat.Root>
  )
}
