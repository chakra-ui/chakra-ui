import { testA11y, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Md3DRotation } from "react-icons/md"
import { Icon } from "../src"

it("passes a11y test", async () => {
  await testA11y(<Icon />)
})

it("passes a11y test given a third-party icon", async () => {
  await testA11y(<Icon as={Md3DRotation} />)
})

it("handles priority for style props correctly", () => {
  const cssPropStyleColor = "blue"
  const colorProp = "red"

  const { getByTestId } = render(
    <Icon
      data-testid="test-icon"
      __css={{ color: cssPropStyleColor }}
      color={colorProp}
    />,
  )

  const createdIcon = getByTestId("test-icon")
  expect(createdIcon).toHaveStyle({
    color: colorProp,
  })
})
