import { render, testA11y } from "@chakra-ui/test-utils"
import { Stat } from "../src/components/stat"

describe("<StatGroup />", () => {
  test("should renders correctly", () => {
    const { getByTestId } = render(
      <Stat.Group data-testid="group">
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
      </Stat.Group>,
    )
    expect(getByTestId("group")).toBeTruthy()
  })

  test("should passes a11y test", async () => {
    await testA11y(
      <Stat.Group data-testid="group">
        <Stat.Root>
          <Stat.Label>Sent</Stat.Label>
          <Stat.Number>345,670</Stat.Number>
          <Stat.HelpText>
            <Stat.Arrow type="increase" />
            23.36%
          </Stat.HelpText>
        </Stat.Root>
      </Stat.Group>,
    )
  })
})
