import * as React from "react"
import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import "@testing-library/jest-dom"
import { states } from "./mock"
import { InputSearch } from "../src"

test("should have no accessibility violations", async () => {
  const { baseElement } = render(
    <InputSearch options={[]} onQueryChange={() => {}} />,
  )

  await testA11y(baseElement)
})

test("should have the proper attributes", () => {
  render(<InputSearch options={[]} onQueryChange={() => {}} />)

  const input = screen.getByRole("searchbox")

  expect(input).toHaveAttribute("type", "search")
  expect(input).toHaveValue("")
})

describe("InputSearch", () => {
  test("renders with options", () => {
    render(<InputSearch options={states} onQueryChange={() => {}} />)

    expect(screen.getByText(states[0].label)).toBeInTheDocument()
    expect(screen.getByText(states[1].label)).toBeInTheDocument()
  })

  test("calls onResultSelect when an option is selected", () => {
    const onResultSelectMock = jest.fn()

    render(
      <InputSearch
        options={states}
        onQueryChange={() => {}}
        onResultSelect={onResultSelectMock}
      />,
    )

    fireEvent.click(screen.getByText(states[0].label))

    expect(onResultSelectMock).toHaveBeenCalledWith({
      ...states[0],
    })
  })

  test("calls onQueryChange when query changes", () => {
    const onQueryChangeMock = jest.fn()

    render(<InputSearch options={[]} onQueryChange={onQueryChangeMock} />)

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "test" },
    })

    expect(onQueryChangeMock).toHaveBeenCalledWith("test")
  })

  test("closes the dropdown when clicking outside", () => {
    render(<InputSearch options={states} onQueryChange={() => {}} />)

    fireEvent.click(screen.getByText(states[0].label))
    expect(screen.getByRole("list")).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByText(states[1].label))
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  test("toggles the dropdown visibility on input click", () => {
    render(<InputSearch options={states} onQueryChange={() => {}} />)

    expect(screen.queryByRole("list")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("searchbox"))

    expect(screen.getByRole("list")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("searchbox"))

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })
})
