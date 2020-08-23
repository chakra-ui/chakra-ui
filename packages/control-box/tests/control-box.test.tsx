import * as React from "react"

import { testA11y, render } from "@chakra-ui/test-utils"
import ControlBox from "../src/control-box"

it("matches snapshot", () => {
  const { asFragment } = render(<ControlBox />)

  expect(asFragment()).toMatchSnapshot()
})

it("passes a11y test", async () => {
  await testA11y(<ControlBox />)
})
