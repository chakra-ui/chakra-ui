import { Stat } from "../src/components/stat"

export default {
  title: "Components / Stat",
}

export const Basic = () => {
  return (
    <Stat.Root>
      <Stat.Label>Collected Fees</Stat.Label>
      <Stat.Value>£0.00</Stat.Value>
      <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
    </Stat.Root>
  )
}

export const WithIndicators = () => {
  return (
    <Stat.Group>
      <Stat.Root>
        <Stat.Label>Sent</Stat.Label>
        <Stat.Value>345,670</Stat.Value>
        <Stat.HelpText>
          <Stat.Indicator type="increase" />
          23.36%
        </Stat.HelpText>
      </Stat.Root>

      <Stat.Root>
        <Stat.Label>Clicked</Stat.Label>
        <Stat.Value>45</Stat.Value>
        <Stat.HelpText>
          <Stat.Indicator type="decrease" />
          9.05%
        </Stat.HelpText>
      </Stat.Root>
    </Stat.Group>
  )
}
