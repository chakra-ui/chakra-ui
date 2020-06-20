import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Textarea } from "../src"

test("Textarea renders correctly", () => {
  const { asFragment } = render(<Textarea defaultValue="hello" />)
  expect(asFragment()).toMatchSnapshot()
})
