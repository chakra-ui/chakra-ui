import { render, testA11y } from "@chakra-ui/test-utils"
import { Spinner } from "."

test("Spinner renders correctly", async () => {
  const { container } = render(<Spinner />)
  await testA11y(container)
})
