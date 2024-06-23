import { Group, Stat } from "../src"

export default {
  title: "Components / Stat",
}

export const Basic = () => {
  return (
    <Stat.Root>
      <Stat.Label>Collected Fees</Stat.Label>
      <Stat.ValueText>£0.00</Stat.ValueText>
      <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
    </Stat.Root>
  )
}

export const WithIndicator = () => {
  return (
    <Group gap="10">
      <Stat.Root>
        <Stat.Label>Sent</Stat.Label>
        <Stat.ValueText>345,670</Stat.ValueText>
        <Stat.HelpText>
          <Stat.UpIndicator />
          23.36%
        </Stat.HelpText>
      </Stat.Root>

      <Stat.Root>
        <Stat.Label>Clicked</Stat.Label>
        <Stat.ValueText>45</Stat.ValueText>
        <Stat.HelpText>
          <Stat.DownIndicator />
          9.05%
        </Stat.HelpText>
      </Stat.Root>
    </Group>
  )
}
