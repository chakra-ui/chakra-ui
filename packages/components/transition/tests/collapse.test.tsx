import { render, screen } from "@chakra-ui/test-utils"
import * as React from "react"
import { Collapse } from "../src"

describe("<Collapse />", () => {
  it("should hide its children", async () => {
    render(
      <Collapse>
        <div data-testid="collapse-children">Test</div>
      </Collapse>,
    )
    expect(await screen.findByTestId("collapse-children")).not.toBeVisible()
  })

  it("should render its children on initial in", async () => {
    render(
      <Collapse in>
        <div data-testid="collapse-children">Test</div>
      </Collapse>,
    )
    expect(await screen.findByTestId("collapse-children")).toBeVisible()
  })
})
