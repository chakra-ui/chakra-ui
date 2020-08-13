import * as React from "react"
import { render, testA11y, screen } from "@chakra-ui/test-utils"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../src"

describe("<Alert />", () => {
  test("matches snapshot", () => {
    const tools = render(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    )
    expect(tools.asFragment()).toMatchSnapshot()
  })

  it("passes a11y test", async () => {
    await testA11y(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    )
  })

  test("should have role='alert'", () => {
    render(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
  })
})
