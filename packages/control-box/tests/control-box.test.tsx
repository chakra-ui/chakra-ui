import { testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import ControlBox from "../src/control-box"

it("passes a11y test", async () => {
  await testA11y(<ControlBox />)
})
