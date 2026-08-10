import { Dialog } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Dialog", () => {
  it("defaults ActionTrigger to type=button", () => {
    const { getByTestId } = render(
      <Dialog.Root open>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.ActionTrigger data-testid="action-trigger">
              Cancel
            </Dialog.ActionTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>,
    )
    expect(getByTestId("action-trigger")).toHaveAttribute("type", "button")
  })
})
