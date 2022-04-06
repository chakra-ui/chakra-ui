import * as React from "react"

import { render, testA11y, screen } from "@chakra-ui/test-utils"
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "../src"

describe("<StatGroup />", () => {
  it("should renders correctly", () => {
    render(
      <StatGroup data-testid="group">
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
      </StatGroup>,
    )

    expect(screen.getByTestId("group")).toBeTruthy()
  })

  it("should passes a11y test", async () => {
    await testA11y(
      <StatGroup data-testid="group">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>,
    )
  })
})
