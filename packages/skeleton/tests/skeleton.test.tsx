import * as React from "react"
import { ThemeProvider } from "@chakra-ui/system"
import { render } from "@chakra-ui/test-utils"
import MatchMediaMock from "jest-matchmedia-mock"
import { SkeletonText } from "../src"
import { queries, theme } from "./test-data"

let matchMedia: any

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

test("SkeletonText renders noOfLines respective to the responsive breakpoint", () => {
  const desiredNoOfLines = 6

  // sm is the second media query after base, so the SkeletonText should have the desired number of lines
  const { container } = renderWithQuery(
    queries.sm,
    <SkeletonText noOfLines={[5, desiredNoOfLines, 7]} />,
  )

  const skeletonGroup = container.querySelector(".chakra-skeleton__group")

  expect(skeletonGroup).not.toBeNull()
  expect(skeletonGroup!.childElementCount).toBe(desiredNoOfLines)
})

function renderWithQuery(query: string, ui: React.ReactElement) {
  matchMedia.useMediaQuery(query)
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}
