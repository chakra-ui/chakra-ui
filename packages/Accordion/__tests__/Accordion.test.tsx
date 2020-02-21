import React from "react"
import { render } from "../../../test/utils"
import "@testing-library/jest-dom/extend-expect"
import {
  BaseAccordion,
  BaseAccordionButton,
  BaseAccordionItem,
  BaseAccordionPanel,
} from "../src/Accordion.base"

test("Button renders correctly", () => {
  const { asFragment } = render(
    <BaseAccordion>
      <BaseAccordionItem>
        <BaseAccordionButton>Section 1 title</BaseAccordionButton>
        <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("It opens the accordion panel", () => {
  const { getByTestId } = render(
    <BaseAccordion defaultIndex={0}>
      <BaseAccordionItem>
        <BaseAccordionButton data-testid="button">
          Section 1 title
        </BaseAccordionButton>
        <BaseAccordionPanel data-testid="panel">Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )

  const button = getByTestId("button")
  expect(button).toHaveAttribute("aria-expanded", "true")
})
