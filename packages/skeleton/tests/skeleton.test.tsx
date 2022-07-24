import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import MatchMediaMock from "jest-matchmedia-mock"
import { ChakraProvider } from "@chakra-ui/provider"
import { Skeleton, SkeletonText } from "../src"
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

test("Change in parent state does not cause animation if already loaded", () => {
  const TestComponent = () => {
    const [, setState] = React.useState(false)
    React.useEffect(() => {
      setState(true)
    }, [])
    return (
      <ChakraProvider theme={theme}>
        <Skeleton isLoaded />
      </ChakraProvider>
    )
  }

  const { container } = render(<TestComponent />)

  const skeleton = container.querySelector(".chakra-skeleton")

  expect(skeleton).not.toBeNull()
  expect(skeleton).toHaveStyle({ animation: "none" })
})

function renderWithQuery(query: string, ui: React.ReactElement) {
  matchMedia.useMediaQuery(query)
  return render(<ChakraProvider theme={theme}>{ui}</ChakraProvider>)
}
