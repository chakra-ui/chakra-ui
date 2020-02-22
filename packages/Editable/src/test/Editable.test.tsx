import "@testing-library/jest-dom/extend-expect"
import * as React from "react"
import { render } from "../../../../test/utils"
import {
  BaseEditable,
  BaseEditableInput,
  BaseEditablePreview,
} from "../Editable"

test("should match snapshot", () => {
  const utils = render(
    <BaseEditable defaultValue="testing">
      <BaseEditablePreview data-testid="preview" />
      <BaseEditableInput data-testid="input" />
    </BaseEditable>,
  )

  expect(utils.asFragment()).toMatchSnapshot()
})

test("should render properly", () => {
  const utils = render(
    <BaseEditable defaultValue="testing">
      <BaseEditablePreview data-testid="preview" />
      <BaseEditableInput data-testid="input" />
    </BaseEditable>,
  )

  const preview = utils.getByTestId("preview")
  const input = utils.getByTestId("input")

  expect(input).toHaveAttribute("hidden")
  expect(preview).toHaveTextContent("testing")
})
