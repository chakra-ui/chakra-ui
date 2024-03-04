import { render, screen } from "@chakra-ui/test-utils"
import { Collapse } from "../src/components/transition"

describe("<Collapse />", () => {
  test("should hide its children", async () => {
    render(
      <Collapse>
        <div data-testid="collapse-children">Test</div>
      </Collapse>,
    )
    expect(await screen.findByTestId("collapse-children")).not.toBeVisible()
  })

  test("should render its children on initial in", async () => {
    render(
      <Collapse in>
        <div data-testid="collapse-children">Test</div>
      </Collapse>,
    )
    expect(await screen.findByTestId("collapse-children")).toBeVisible()
  })
})
