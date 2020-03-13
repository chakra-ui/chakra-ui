import React from "react"
import { render } from "@chakra-ui/test-utils"
import { Collapse } from "../Collapse"

test("Collapse renders correctly", () => {
  const utils = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
  expect(utils.asFragment()).toMatchSnapshot()
})
