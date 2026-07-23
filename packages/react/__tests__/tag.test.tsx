import { Tag } from "@chakra-ui/react"
import { render } from "./core/render"

describe("Tag", () => {
  it("defaults CloseTrigger to type=button", () => {
    const { getByTestId } = render(
      <Tag.Root>
        <Tag.CloseTrigger data-testid="close-trigger" />
      </Tag.Root>,
    )
    expect(getByTestId("close-trigger")).toHaveAttribute("type", "button")
  })
})
