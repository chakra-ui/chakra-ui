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

  it("calls the user's onClick on ActionTrigger", async () => {
    const onClick = vi.fn()
    const { getByTestId, user } = render(
      <Dialog.Root open>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.ActionTrigger
              data-testid="action-trigger"
              onClick={onClick}
            >
              Cancel
            </Dialog.ActionTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>,
    )
    await user.click(getByTestId("action-trigger"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not close when the user calls preventDefault", async () => {
    const onOpenChange = vi.fn()
    const { getByTestId, user } = render(
      <Dialog.Root open onOpenChange={onOpenChange}>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.ActionTrigger
              data-testid="action-trigger"
              onClick={(event) => event.preventDefault()}
            >
              Cancel
            </Dialog.ActionTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>,
    )
    await user.click(getByTestId("action-trigger"))
    expect(onOpenChange).not.toHaveBeenCalled()
  })
})
