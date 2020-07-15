import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Collapse } from "../src"

test("Collapse renders correctly", () => {
  const utils = render(<Collapse>sfsjdfkbfkjdfdjksf</Collapse>)
  expect(utils.asFragment()).toMatchSnapshot()
})
