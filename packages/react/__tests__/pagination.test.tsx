import "@testing-library/jest-dom/vitest"
import { render, screen } from "@testing-library/react"
import { LocaleProvider } from "../src/components/locale"
import {
  PaginationPageText,
  PaginationRoot,
} from "../src/components/pagination"
import { defaultSystem } from "../src/preset"
import { ChakraProvider } from "../src/styled-system/provider"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

describe("Pagination.PageText", () => {
  test("uses the current default English text", () => {
    render(
      <PaginationRoot count={100} pageSize={10} defaultPage={2}>
        <PaginationPageText />
      </PaginationRoot>,
      { wrapper },
    )

    expect(screen.getByText("2 of 10")).toBeInTheDocument()
  })

  test("supports a custom formatter", () => {
    render(
      <LocaleProvider locale="de-DE">
        <PaginationRoot count={12345} pageSize={10} defaultPage={124}>
          <PaginationPageText
            format="long"
            formatText={(details) =>
              `${details.formattedRangeStart} - ${details.formattedRangeEnd} von ${details.formattedCount}`
            }
          />
        </PaginationRoot>
      </LocaleProvider>,
      { wrapper },
    )

    expect(screen.getByText("1.231 - 1.240 von 12.345")).toBeInTheDocument()
  })
})
