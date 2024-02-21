import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { Tooltip } from "."

const buttonLabel = "Hover me"
const tooltipLabel = "tooltip label"

const DummyComponent = (
  props: Omit<Tooltip.RootProps, "children"> & {
    label?: string
    isButtonDisabled?: boolean
  },
) => {
  const { isButtonDisabled, label, ...rootProps } = props
  return (
    <Tooltip.Root {...rootProps}>
      <Tooltip.Trigger disabled={isButtonDisabled || false}>
        {buttonLabel}
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
  )
}

test("passes a11y test when hovered", async () => {
  render(<DummyComponent />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  const tooltip = await screen.findByRole("tooltip")

  await testA11y(tooltip)
})

test("shows on pointerover and closes on pointerleave", async () => {
  render(<DummyComponent />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("should not show on pointerover if isDisabled is true", async () => {
  vi.useFakeTimers()

  render(<DummyComponent isDisabled />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  vi.useRealTimers()
})

test.skip("should close on pointerleave if openDelay is set", async () => {
  vi.useFakeTimers()

  render(<DummyComponent openDelay={500} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })
  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  act(() => {
    vi.advanceTimersByTime(500)
  })
  expect(screen.queryByText(tooltipLabel)).toBeInTheDocument()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )

  vi.useRealTimers()
})

test("should show on pointerover if isDisabled has a falsy value", async () => {
  render(<DummyComponent isDisabled={false} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

test("does not show tooltip after delay when `isDisabled` prop changes to `true`", async () => {
  vi.useFakeTimers()

  const { rerender } = render(
    <DummyComponent openDelay={100} isDisabled={false} />,
  )

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(50)
  })

  rerender(<DummyComponent openDelay={100} isDisabled={true} />)

  act(() => {
    vi.advanceTimersByTime(100)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  vi.useRealTimers()
})

test("should call onClose prop on pointerleave", async () => {
  const onClose = vi.fn()

  render(<DummyComponent onClose={onClose} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByRole("tooltip")).toBeInTheDocument()
  expect(onClose).not.toBeCalled()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  await waitFor(() => expect(onClose).toBeCalledTimes(1))
})
