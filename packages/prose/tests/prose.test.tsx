import { render, testA11y } from "@chakra-ui/test-utils"

import { basic } from "../stories/prose.stories"

test("Prose renders correctly", async () => {
  const { container } = render(basic())
  await testA11y(container)
})
