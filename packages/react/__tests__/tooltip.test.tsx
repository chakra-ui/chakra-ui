import { act, render, screen, testA11y, waitFor } from "@chakra-ui/test-utils"
import { Tooltip } from "../src"

const DemoTooltip = (props: Omit<Tooltip.RootProps, "children">) => {
  const { disabled, ...rest } = props
  return (
    <Tooltip.Root disabled={disabled} {...rest}>
      <Tooltip.Trigger data-testid="trigger" disabled={disabled || false}>
        Hover me
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>Tooltip label</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

const trigger = () => screen.getByText("Hover me")
const tooltip = () => screen.queryByText("Tooltip label")

describe("Tooltip", () => {
  test("passes a11y test when hovered", async () => {
    const { user } = render(<DemoTooltip openDelay={0} />)

    await act(() => user.hover(trigger()))
    expect(tooltip()).toBeInTheDocument()

    await testA11y(tooltip()!)
  })

  test("shows on pointerover and closes on pointerleave", async () => {
    const { user } = render(<DemoTooltip openDelay={0} closeDelay={0} />)

    await act(() => user.hover(trigger()))
    expect(tooltip()).toBeInTheDocument()

    await act(() => user.unhover(trigger()))
    await waitFor(() => expect(tooltip()).not.toBeInTheDocument())
  })

  test("should not show on pointerover if disabled is true", async () => {
    const { user } = render(<DemoTooltip disabled />)
    await act(() => user.hover(trigger()))
    expect(tooltip()).not.toBeInTheDocument()
  })

  test("should close on pointerleave if openDelay is set", async () => {
    const { user } = render(<DemoTooltip openDelay={500} />)

    await act(() => user.hover(trigger()))
    expect(tooltip()).not.toBeInTheDocument()

    await act(() => user.unhover(trigger()))
    await waitFor(() => expect(tooltip()).not.toBeInTheDocument())
  })

  test("should call onClose prop on pointerleave", async () => {
    const onClose = vi.fn()
    const { user } = render(<DemoTooltip onClose={onClose} />)

    await act(() => user.hover(trigger()))
    expect(tooltip()).toBeInTheDocument()

    expect(onClose).not.toBeCalled()

    await act(() => user.unhover(trigger()))
    await waitFor(() => expect(onClose).toBeCalledTimes(1))
  })
})
