import { Flex } from "@chakra-ui/react"
import { render, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import { Wizard, WizardStep } from "../src"

describe("<Wizard />", () => {
  it("should pass a11y test", async () => {
    const wizard = (
      <Wizard py={6} colorScheme="green" activeStep={0}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>
    )
    await testA11y(wizard)
  })

  it("should render labels if present", async () => {
    const { getByText } = render(
      <Wizard colorScheme="green" activeStep={0}>
        <WizardStep label="Step 1" />
        <WizardStep label="Step 2" />
        <WizardStep label="Step 3" />
      </Wizard>,
    )
    expect(getByText("Step 1")).toBeTruthy()
    expect(getByText("Step 2")).toBeTruthy()
    expect(getByText("Step 3")).toBeTruthy()
  })

  it("should NOT render children when horizontal", async () => {
    const { queryByTestId } = render(
      <Wizard colorScheme="green" activeStep={0}>
        <WizardStep label="Step 1">
          <Flex data-testid="child-1">
            <span>Child 1</span>
          </Flex>
        </WizardStep>
      </Wizard>,
    )

    const child = queryByTestId("child-1")

    expect(child).toBe(null)
  })

  it("should render children when vertical", async () => {
    const { queryByTestId } = render(
      <Wizard colorScheme="green" orientation="vertical" activeStep={0}>
        <WizardStep label="Step 1">
          <Flex data-testid="child-1">
            <span>Child 1</span>
          </Flex>
        </WizardStep>
      </Wizard>,
    )

    const child = queryByTestId("child-1")

    expect(child).toBeTruthy()
  })
})
