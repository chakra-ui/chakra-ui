import { Drawer } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Drawer", () => {
  it("defaults ActionTrigger to type=button", () => {
    const { getByTestId } = render(
      <Drawer.Root open>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.ActionTrigger data-testid="action-trigger">
              Cancel
            </Drawer.ActionTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>,
    )
    expect(getByTestId("action-trigger")).toHaveAttribute("type", "button")
  })

  it("calls the user's onClick on ActionTrigger", async () => {
    const onClick = vi.fn()
    const { getByTestId, user } = render(
      <Drawer.Root open>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.ActionTrigger
              data-testid="action-trigger"
              onClick={onClick}
            >
              Cancel
            </Drawer.ActionTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>,
    )
    await user.click(getByTestId("action-trigger"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
