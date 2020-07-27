import * as React from "react"
import { render, axe, testA11Y } from "@chakra-ui/test-utils"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../src"

describe("<Alert />", () => {
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

  test("passes a11y test", async () => {
    await testA11Y(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    )
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
})
