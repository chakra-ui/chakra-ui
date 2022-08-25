import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Textarea } from "../src"

test("Textarea renders correctly", async () => {
  const { container } = render(
    <Textarea aria-label="Enter notes" defaultValue="hello" />,
  )
  await testA11y(container)
})
