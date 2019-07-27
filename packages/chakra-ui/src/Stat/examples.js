/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from ".";

const stories = storiesOf("Stats", module);

stories.add("Default", () => {
  return (
    <Stat>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>£0.00</StatNumber>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
    </Stat>
  );
});

stories.add("With Indicators", () => {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText>
      </Stat>

      <Stat>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          9.05%
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
});
