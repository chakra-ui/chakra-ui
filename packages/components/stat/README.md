# Stat

As the name implies, the Stat component is used to display some statistics.

## Installation

```sh
yarn add @chakra-ui/stat

# or

npm i @chakra-ui/stat
```

## Import components

```jsx
import {
  Stat,
  StatArrow,
  StatLabel,
  StatGroup,
  StatNumber,
  StatUpArrow,
  StatHelpText,
  StatDownArrow,
} from "@chakra-ui/stat"
```

## Usage

```jsx
<Stat>
  <StatLabel>Collected Fees</StatLabel>
  <StatNumber>£0.00</StatNumber>
  <StatHelpText>Feb 12 - Feb 28</StatHelpText>
</Stat>


<StatGroup>
  <Stat>
    <StatLabel>Sent</StatLabel>
    <StatNumber>345,670</StatNumber>
    <StatHelpText>
      23.36%
    </StatHelpText>
  </Stat>

  <Stat>
    <StatLabel>Clicked</StatLabel>
    <StatNumber>45</StatNumber>
    <StatHelpText>
      9.05%
    </StatHelpText>
  </Stat>
</StatGroup>
```

## Stat with Indicator

```jsx
<StatGroup>
  <Stat>
    <StatLabel>Sent</StatLabel>
    <StatNumber>345,670</StatNumber>
    <StatHelpText>
      <StatArrow type="increase" />
      23.36%
    </StatHelpText>
  </Stat>
</StatGroup>
```
