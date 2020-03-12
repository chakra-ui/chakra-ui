import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Editable, EditableInput, EditablePreview } from "../Editable"

test("should match snapshot", () => {
  const utils = render(
    <Editable defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )

  expect(utils.asFragment()).toMatchSnapshot()
})

test("should render properly", () => {
  const utils = render(
    <Editable defaultValue="testing">
      <EditablePreview data-testid="preview" />
      <EditableInput data-testid="input" />
    </Editable>,
  )

  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  expect(input).toHaveAttribute("hidden")
  expect(preview).toHaveTextContent("testing")
})
