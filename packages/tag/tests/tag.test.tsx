import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { screen } from "@testing-library/react"
import { Tag, TagCloseButton, TagLabel } from "../src"

test("Tag (only) renders correctly", () => {
  render(<Tag data-testid="tag">A</Tag>)
  expect(screen.getByTestId("tag")).toBeInTheDocument()
})

test("Tag with close button renders correctly", () => {
  render(
    <Tag data-testid="tag">
      <TagLabel data-testid="label">B</TagLabel>
      <TagCloseButton data-testid="close-btn" />
    </Tag>,
  )

  expect(screen.getByTestId("tag")).toBeInTheDocument()
  expect(screen.getByTestId("label")).toBeInTheDocument()
  expect(screen.getByTestId("close-btn")).toBeInTheDocument()
  expect(screen.getByTestId("close-btn")).toHaveAttribute("aria-label")
})
