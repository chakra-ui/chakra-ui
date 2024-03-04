import { render, screen, testA11y, waitFor } from "@chakra-ui/test-utils"
import { Tooltip } from "../src/components/tooltip"

const DummyComponent = (
  props: Omit<Tooltip.RootProps, "children"> & {
    label: React.ReactNode
    content?: string
    disabled?: boolean
  },
) => {
  const { disabled, label, content, ...rootProps } = props
  return (
    <Tooltip.Root {...rootProps}>
      <Tooltip.Trigger disabled={disabled || false}>{label}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>{content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

const buttonLabel = "Hover me"
const tooltipLabel = "tooltip label"

test("passes a11y test when hovered", async () => {
  const { user } = render(
    <DummyComponent label={buttonLabel} content={tooltipLabel} />,
  )

  await user.hover(screen.getByText(buttonLabel))

  await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())

  const tooltip = screen.getByRole("tooltip")
  await testA11y(tooltip)
})

test("shows on pointerover and closes on pointerleave", async () => {
  const { user } = render(
    <DummyComponent label={buttonLabel} content={tooltipLabel} />,
  )

  await user.hover(screen.getByText(buttonLabel))
  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  await user.unhover(screen.getByText(buttonLabel))

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("should not show on pointerover if isDisabled is true", async () => {
  const { user } = render(
    <DummyComponent isDisabled label={buttonLabel} content={tooltipLabel} />,
  )

  await user.hover(screen.getByText(buttonLabel))

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()
})

test("should close on pointerleave if openDelay is set", async () => {
  const { user } = render(
    <DummyComponent
      openDelay={500}
      label={buttonLabel}
      content={tooltipLabel}
    />,
  )

  await user.hover(screen.getByText(buttonLabel))
  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  await user.unhover(screen.getByText(buttonLabel))
  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("should show on pointerover if isDisabled has a falsy value", async () => {
  const { user } = render(
    <DummyComponent
      isDisabled={false}
      label={buttonLabel}
      content={tooltipLabel}
    />,
  )

  await user.hover(screen.getByText(buttonLabel))
  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

test("does not show tooltip after delay when `isDisabled` prop changes to `true`", async () => {
  const { user, rerender } = render(
    <DummyComponent
      openDelay={100}
      isDisabled={false}
      label={buttonLabel}
      content={tooltipLabel}
    />,
  )

  await user.hover(screen.getByText(buttonLabel))

  rerender(
    <DummyComponent
      openDelay={100}
      isDisabled={true}
      label={buttonLabel}
      content={tooltipLabel}
    />,
  )

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()
})

test("should call onClose prop on pointerleave", async () => {
  const onClose = vi.fn()

  const { user } = render(
    <DummyComponent
      onClose={onClose}
      label={buttonLabel}
      content={tooltipLabel}
    />,
  )

  await user.hover(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  expect(onClose).not.toBeCalled()

  await user.unhover(screen.getByText(buttonLabel))
  await waitFor(() => expect(onClose).toBeCalledTimes(1))
})
