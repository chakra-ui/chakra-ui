import { render } from "@chakra-ui/test-utils"
import * as React from "react"
import { chakra } from "../src"

const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

test("should allow custom should forward props", () => {
  const Div = chakra<"div", { sample: string; isBig: string }>("div", {
    shouldForwardProp: (prop) => !["sample"].includes(prop),
  })
  const { getByTestId } = render(
    <Div sample="testing" isBig="ddf" data-testid="div" />,
  )
  expect(getByTestId("div")).not.toHaveAttribute("sample")
  expect(getByTestId("div")).toHaveAttribute("isBig")
  /**
   * React-DOM should show an error about `isBig` getting to the DOM
   */
  expect(consoleSpy).toHaveBeenCalled()
})
