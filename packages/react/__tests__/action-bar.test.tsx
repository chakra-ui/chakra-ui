import { ActionBar } from "@chakra-ui/react"
import { render } from "./core/render"

describe("ActionBar", () => {
  it("defaults SelectionTrigger to type=button", () => {
    const { getByTestId } = render(
      <ActionBar.Root open>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger data-testid="selection-trigger">
              Selection
            </ActionBar.SelectionTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Root>,
    )
    expect(getByTestId("selection-trigger")).toHaveAttribute("type", "button")
  })
})
