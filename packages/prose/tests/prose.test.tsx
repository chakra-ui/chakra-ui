import { render, testA11y } from "@chakra-ui/test-utils"

import { Basic } from "../stories/prose.stories"

test("Prose renders correctly", async () => {
  const { container } = render(Basic())
  await testA11y(container)
})
