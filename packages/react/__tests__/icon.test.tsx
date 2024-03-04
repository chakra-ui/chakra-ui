import { testA11y } from "@chakra-ui/test-utils"
import { Md3DRotation } from "react-icons/md"
import { Icon } from "../src/components/icon"

test("passes a11y test", async () => {
  await testA11y(<Icon />)
})

test("passes a11y test given a third-party icon", async () => {
  await testA11y(<Icon as={Md3DRotation} />)
})
