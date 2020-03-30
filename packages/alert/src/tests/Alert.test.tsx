import * as React from "react"
import { render } from "@chakra-ui/test-utils"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../Alert"

test("Alert renders correctly", () => {
  const { asFragment } = render(
    <Alert>
      <AlertIcon />
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description</AlertDescription>
    </Alert>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("alert has role=alert", () => {
  const { getByRole } = render(
    <Alert>
      <AlertIcon />
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description</AlertDescription>
    </Alert>,
  )
  getByRole("alert")
})
