import * as React from "react"
import { render, axe } from "@chakra-ui/test-utils"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from ".."

test("should have no accessibility issue", async () => {
  const tools = render(
    <Alert>
      <AlertIcon />
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description</AlertDescription>
    </Alert>,
  )

  const results = await axe(tools.container)
  expect(results).toHaveNoViolations()
})

test("should render correctly", () => {
  const tools = render(
    <Alert>
      <AlertIcon />
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description</AlertDescription>
    </Alert>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("should have role='alert'", () => {
  const tools = render(
    <Alert>
      <AlertIcon />
      <AlertTitle>Alert title</AlertTitle>
      <AlertDescription>Alert description</AlertDescription>
    </Alert>,
  )
  const alert = tools.getByRole("alert")
  expect(alert).toBeInTheDocument()
})
