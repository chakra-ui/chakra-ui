import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Tag, TagCloseButton, TagLabel } from "../src"

test("Tag (only) renders correctly", () => {
  const { getByTestId } = render(<Tag data-testid="tag">A</Tag>)
  expect(getByTestId("tag")).toBeInTheDocument()
})

test("Tag with close button renders correctly", () => {
  const { getByTestId } = render(
    <Tag data-testid="tag">
      <TagLabel data-testid="label">B</TagLabel>
      <TagCloseButton data-testid="close-btn" />
    </Tag>,
  )
  expect(getByTestId("tag")).toBeInTheDocument()
  expect(getByTestId("label")).toBeInTheDocument()
  expect(getByTestId("close-btn")).toBeInTheDocument()
})
