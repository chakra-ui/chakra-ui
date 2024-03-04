import { Stat } from "../src/components/stat"

export default {
  title: "Data Display / Stat",
}

export const Basic = () => {
  return (
    <Stat.Root>
      <Stat.Label>Collected Fees</Stat.Label>
      <Stat.Number>£0.00</Stat.Number>
      <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
    </Stat.Root>
  )
}

export const WithIndicators = () => {
  return (
    <Stat.Group>
      <Stat.Root>
        <Stat.Label>Sent</Stat.Label>
        <Stat.Number>345,670</Stat.Number>
        <Stat.HelpText>
          <Stat.Arrow type="increase" />
          23.36%
        </Stat.HelpText>
      </Stat.Root>

      <Stat.Root>
        <Stat.Label>Clicked</Stat.Label>
        <Stat.Number>45</Stat.Number>
        <Stat.HelpText>
          <Stat.Arrow type="decrease" />
          9.05%
        </Stat.HelpText>
      </Stat.Root>
    </Stat.Group>
  )
}
