import "@testing-library/jest-dom/extend-expect"
// import userEvent from "@testing-library/user-event"
import React from "react"
import { render } from "../../../test/utils"
import { Collapse } from "../src/Collapse"

test("Collapse renders correctly", () => {
  const utils = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
  expect(utils.asFragment()).toMatchSnapshot()
})
