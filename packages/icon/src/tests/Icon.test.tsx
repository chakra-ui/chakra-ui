import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Md3DRotation } from "react-icons/md"
import { Icon } from ".."

test("Icon renders correctly", () => {
  const { asFragment } = render(<Icon />)
  expect(asFragment()).toMatchSnapshot()
})

test("Icon renders a third-party icon correctly", () => {
  const { asFragment } = render(<Icon as={Md3DRotation} />)
  expect(asFragment()).toMatchSnapshot()
})
