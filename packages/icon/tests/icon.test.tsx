import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Md3DRotation } from "react-icons/md"
import { Icon } from "../src"

describe("<Icon />", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Icon />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(<Icon />)
  })

  test("renders a third-party icon correctly", () => {
    const { asFragment } = render(<Icon as={Md3DRotation} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("passes a11y test given a third-party icon", async () => {
    await testA11y(<Icon as={Md3DRotation} />)
  })
})
