import { testA11y } from "@chakra-ui/test-utils"
import { ControlBox } from "./control-box"

test("passes a11y test", async () => {
  await testA11y(<ControlBox />)
})
