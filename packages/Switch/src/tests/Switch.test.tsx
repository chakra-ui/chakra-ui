import React from "react"
import { userEvent, render } from "@chakra-ui/test-utils"
import Switch from "../Switch"

test("Switch renders correctly", () => {
  const utils = render(<Switch />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("", () => {})
