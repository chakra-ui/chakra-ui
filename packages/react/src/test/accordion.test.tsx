import { render, screen } from "@testing-library/react"
import { MyAccordion } from "../components/myaccordion/myaccordion"
import { system } from "../preset"
import { ChakraProvider } from "../styled-system"

test("Accordion renders without TypeScript errors", () => {
  render(
    <ChakraProvider value={system}>
      <MyAccordion />
    </ChakraProvider>,
  )
  expect(screen.getByText(/Content/i)).toBeInTheDocument()
})
