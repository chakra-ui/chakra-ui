import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Tag, TagCloseButton, TagLabel, TagLeftIcon } from "../src"

test("Tag (only) renders correctly", () => {
  const { asFragment } = render(<Tag>A</Tag>)
  expect(asFragment()).toMatchSnapshot()
})

test("Tag with close button renders correctly", () => {
  const { asFragment } = render(
    <Tag>
      <TagLabel>B</TagLabel>
      <TagCloseButton />
    </Tag>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("Tag with left icon renders correctly", () => {
  const { asFragment } = render(
    <Tag>
      <TagLeftIcon />
      <TagLabel>C</TagLabel>
      <TagCloseButton />
    </Tag>,
  )
  expect(asFragment()).toMatchSnapshot()
})
